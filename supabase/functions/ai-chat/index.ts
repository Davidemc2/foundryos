
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
    // Check if OpenAI API key is configured
    if (!openAIApiKey) {
      console.error("OpenAI API key is not configured");
      return new Response(JSON.stringify({
        error: "OpenAI API key is not configured. Please add it to the Supabase secrets."
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages, stage, uploadedFiles } = await req.json();
    console.log(`Processing request for stage: ${stage} with ${messages.length} messages`);
    
    // Add system message based on the current stage
    const systemMessage = getSystemMessage(stage);
    const allMessages = [
      { role: "system", content: systemMessage },
      ...messages
    ];
    
    // Handle file uploads if present
    if (uploadedFiles && uploadedFiles.length > 0) {
      console.log("Files included in the request:", uploadedFiles);
    }

    // Using gpt-4 as per the available models in OpenAI documentation
    const modelName = "gpt-4o-mini";
    console.log(`Calling OpenAI API with model: ${modelName}`);
    
    try {
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

      // Handle non-successful responses
      if (!response.ok) {
        const errorData = await response.json();
        console.error(`OpenAI API error (${response.status}):`, errorData);
        
        // Provide more detailed error message
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
      const data = await response.json();
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
