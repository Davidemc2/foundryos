
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get("OPENAI_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Build system messages based on conversation stage
const getSystemMessage = (stage: string) => {
  switch(stage) {
    case 'initial':
      return "You are Foundry OS, an AI assistant specialized in helping users build software applications. Begin by understanding the user's app idea at a high level. Your goal is to ask follow-up questions to understand requirements better. Be friendly, helpful, and expert.";
    case 'requirements':
      return "You are Foundry OS, collecting detailed requirements for the user's app idea. Ask about target users, core features, design preferences, and timelines. Help the user think through what's most important. Be specific, friendly, and expert.";
    case 'scope':
      return "You are Foundry OS, defining project scope based on collected requirements. Present a clear overview of what will be built, focus on core functionality, and ask if the scope aligns with the user's vision. Be specific and business-like.";
    case 'tasks':
      return "You are Foundry OS, breaking down the project into specific development tasks. For each task, provide a title, short description, and estimated hours. These tasks should cover the entire scope discussed. Calculate total estimated hours at the end. Be specific and thorough.";
    case 'estimate':
      return "You are Foundry OS, presenting cost estimates based on task breakdown. Offer standard and fast-track build options with different price points and timelines. Ask the user which option they prefer. Be professional and helpful.";
    case 'payment':
      return "You are Foundry OS, guiding the user through the final steps of the build process. Ask for their email to proceed with building their product. Thank them for their interest. Be professional and grateful.";
    default:
      return "You are Foundry OS, an AI assistant specialized in helping users build software applications. Be professional, helpful, and expert in software development.";
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Edge function invoked - starting execution");
    
    // Validate OpenAI API key
    if (!openAIApiKey) {
      console.error("OpenAI API key is not configured");
      return new Response(JSON.stringify({
        error: "OpenAI API key is not configured. Please add it to the Supabase secrets."
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("API key validation passed");

    // Parse and validate request body
    let requestBody;
    try {
      const requestText = await req.text();
      console.log(`Request body: ${requestText.substring(0, 100)}...`);
      requestBody = JSON.parse(requestText);
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return new Response(JSON.stringify({
        error: "Invalid request format. Expected JSON body."
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages, stage, uploadedFiles } = requestBody;
    
    // Validate required fields
    if (!messages || !Array.isArray(messages)) {
      console.error("Missing or invalid messages array");
      return new Response(JSON.stringify({
        error: "Missing or invalid messages array in request body"
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Processing request for stage: ${stage} with ${messages.length} messages`);
    
    // Add system message based on the current stage
    const systemMessage = getSystemMessage(stage || 'initial');
    const allMessages = [
      { role: "system", content: systemMessage },
      ...messages
    ];
    
    // Handle file uploads if present
    if (uploadedFiles && uploadedFiles.length > 0) {
      console.log("Files included in the request:", uploadedFiles);
    }

    // Use gpt-3.5-turbo as a fallback model since it has higher rate limits
    // and is more likely to work with free tier accounts
    const modelName = "gpt-3.5-turbo";
    console.log(`Calling OpenAI API with model: ${modelName}`);
    
    try {
      console.log("About to make OpenAI API request");
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openAIApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: modelName,
          messages: allMessages,
          temperature: 0.7,
        }),
      });

      // Log response status for debugging
      console.log(`OpenAI API response status: ${response.status}`);
      
      // Get response text for logging before parsing JSON
      const responseText = await response.text();
      console.log(`OpenAI API raw response: ${responseText.substring(0, 200)}${responseText.length > 200 ? '...' : ''}`);
      
      // Handle non-successful responses
      if (!response.ok) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (jsonError) {
          console.error("Failed to parse error response as JSON:", jsonError);
          errorData = { error: { message: "Unknown error: " + responseText.substring(0, 200) } };
        }
        
        console.error(`OpenAI API error (${response.status}):`, errorData);
        
        // Check specifically for quota errors
        if (errorData.error?.type === "insufficient_quota") {
          return new Response(JSON.stringify({
            error: "OpenAI API quota exceeded. Please update your billing details or use a different API key.",
            details: "The current API key has reached its usage limit. Please check your OpenAI account billing settings."
          }), {
            status: 429, // Using 429 for rate limit/quota issues
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        
        // Provide more detailed error message for other errors
        const errorMessage = errorData.error?.message || "Unknown error";
        const errorType = errorData.error?.type || "Unknown error type";
        const statusCode = response.status;
        
        return new Response(JSON.stringify({
          error: `OpenAI API error (${statusCode}): ${errorType} - ${errorMessage}`,
          details: errorData
        }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Parse the JSON response
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error("Failed to parse successful response as JSON:", jsonError);
        return new Response(JSON.stringify({
          error: "Failed to parse OpenAI API response as JSON",
          rawResponse: responseText.substring(0, 500)
        }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      console.log("OpenAI API response received successfully");
      
      // Validate response structure
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error("Unexpected OpenAI API response format:", data);
        return new Response(JSON.stringify({
          error: "Unexpected response format from OpenAI API",
          details: data
        }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      // Return successful response
      return new Response(JSON.stringify({
        response: data.choices[0].message.content,
        usage: data.usage,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (apiError) {
      console.error("Error calling OpenAI API:", apiError);
      return new Response(JSON.stringify({
        error: "Failed to communicate with OpenAI API",
        details: apiError.message || "Unknown API error"
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error in AI chat function:", error);
    
    return new Response(JSON.stringify({
      error: error.message || "An error occurred during the request",
      stack: error.stack || "No stack trace available"
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
