
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

    console.log(`OpenAI API key validation passed: ${openAIApiKey.substring(0, 3)}...${openAIApiKey.substring(openAIApiKey.length - 4)}`);

    // Parse and validate request body
    let requestBody;
    try {
      const requestText = await req.text();
      console.log(`Request body received, length: ${requestText.length} characters`);
      requestBody = JSON.parse(requestText);
      console.log(`Request body parsed successfully, containing: ${JSON.stringify(Object.keys(requestBody))}`);
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

    console.log(`Processing request for stage: ${stage || 'initial'} with ${messages.length} messages`);
    console.log(`Message sample: ${JSON.stringify(messages[messages.length - 1] || {}).substring(0, 200)}...`);
    
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

    // Use gpt-3.5-turbo which is a stable model with good compatibility
    const modelName = "gpt-3.5-turbo";
    console.log(`Calling OpenAI API with model: ${modelName}`);
    
    const retryOpenAI = async (attempt = 1, maxAttempts = 3) => {
      try {
        console.log(`OpenAI API request attempt ${attempt} of ${maxAttempts}`);
        
        const openAIRequestBody = JSON.stringify({
          model: modelName,
          messages: allMessages,
          temperature: 0.7,
          max_tokens: 1000,
        });
        
        console.log(`OpenAI request body (abbreviated): ${openAIRequestBody.substring(0, 200)}...`);
        
        const controller = new AbortController();
        // Set timeout to 25 seconds
        const timeoutId = setTimeout(() => controller.abort(), 25000);
        
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${openAIApiKey}`,
            "Content-Type": "application/json",
          },
          body: openAIRequestBody,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        // Log response status for debugging
        console.log(`OpenAI API response status: ${response.status}`);
        
        // Get response text for logging before parsing JSON
        const responseText = await response.text();
        
        if (!response.ok) {
          // Handle non-200 responses with better error information
          let errorMessage = `OpenAI API error (${response.status})`;
          let errorData = {};
          
          try {
            errorData = JSON.parse(responseText);
            errorMessage += `: ${errorData.error?.message || "Unknown error"}`;
          } catch (e) {
            errorMessage += `: ${responseText.substring(0, 100)}`;
          }
          
          console.error(errorMessage);
          
          // Check if we should retry based on the error type
          if (attempt < maxAttempts) {
            const delay = attempt * 1000; // Exponential backoff
            console.log(`Retrying in ${delay}ms...`);
            await new Promise(r => setTimeout(r, delay));
            return retryOpenAI(attempt + 1, maxAttempts);
          }
          
          throw new Error(errorMessage);
        }
        
        // Parse the successful response
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (jsonError) {
          console.error("Failed to parse OpenAI response:", jsonError);
          throw new Error("Invalid JSON in OpenAI response");
        }
        
        console.log("OpenAI API response received successfully");
        
        return data;
      } catch (error) {
        if (error.name === "AbortError") {
          console.error("Request timed out");
          if (attempt < maxAttempts) {
            const delay = attempt * 1000;
            console.log(`Request timed out. Retrying in ${delay}ms...`);
            await new Promise(r => setTimeout(r, delay));
            return retryOpenAI(attempt + 1, maxAttempts);
          }
          throw new Error("OpenAI API request timed out after multiple attempts");
        }
        
        if (attempt < maxAttempts) {
          const delay = attempt * 1000;
          console.log(`Error: ${error.message}. Retrying in ${delay}ms...`);
          await new Promise(r => setTimeout(r, delay));
          return retryOpenAI(attempt + 1, maxAttempts);
        }
        
        throw error;
      }
    };
    
    try {
      const data = await retryOpenAI();
      
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
      // Determine if this is a rate limit or quota issue
      if (apiError.message.includes("rate limit") || apiError.message.includes("quota")) {
        return new Response(JSON.stringify({
          error: "OpenAI API quota exceeded. Please update your billing details or use a different API key.",
          details: "The current API key has reached its usage limit. Please check your OpenAI account billing settings."
        }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
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
