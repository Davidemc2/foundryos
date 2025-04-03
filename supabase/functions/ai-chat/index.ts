
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
      return "You are Foundry OS, breaking down the project into specific development tasks. For each task, provide a title, short description, and estimated hours. These tasks should cover the entire scope discussed. Format each task as '## Task Title (X hours)' followed by a description. Calculate total estimated hours at the end. Be specific and thorough.";
    case 'estimate':
      return "You are Foundry OS, presenting cost estimates based on task breakdown. Offer standard and fast-track build options with different price points and timelines. Ask the user which option they prefer. Be professional and helpful.";
    case 'payment':
      return "You are Foundry OS, guiding the user through the final steps of the build process. Ask for their email to proceed with building their product. Thank them for their interest. Be professional and grateful.";
    default:
      return "You are Foundry OS, an AI assistant specialized in helping users build software applications. Be professional, helpful, and expert in software development.";
  }
};

// Validate OpenAI model availability
const validateModel = (model: string): string => {
  // List of known working models
  const availableModels = [
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-16k",
    "gpt-4o-mini",
    "gpt-4o"
  ];
  
  // Default to gpt-3.5-turbo if model not in list or not provided
  if (!model || !availableModels.includes(model)) {
    console.log(`Model ${model} not in validated list. Using gpt-3.5-turbo instead.`);
    return "gpt-3.5-turbo";
  }
  
  return model;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Edge function invoked - starting execution");
    
    // Validate OpenAI API key - improved error message
    if (!openAIApiKey || openAIApiKey.trim() === "") {
      console.error("OpenAI API key is not configured or empty");
      return new Response(JSON.stringify({
        error: "OpenAI API key is not configured. Please add a valid API key in Supabase Edge Function secrets.",
        errorType: "configuration",
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check if API key is valid (not the placeholder or default API key)
    if (openAIApiKey.includes("sk-proj-")) {
      console.error("OpenAI API key appears to be a placeholder or invalid key");
      return new Response(JSON.stringify({
        error: "The OpenAI API key appears to be invalid or a placeholder. Please replace it with a valid API key.",
        errorType: "authentication",
      }), {
        status: 401,
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
        error: "Invalid request format. Expected JSON body.",
        errorType: "client",
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
        error: "Missing or invalid messages array in request body",
        errorType: "client",
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Processing request for stage: ${stage || 'initial'} with ${messages.length} messages`);
    if (messages.length > 0) {
      console.log(`Last message role: ${messages[messages.length - 1].role}, length: ${messages[messages.length - 1].content.length} chars`);
    }
    
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

    // Use a validated model that's reliable
    const modelName = validateModel("gpt-3.5-turbo");
    console.log(`Calling OpenAI API with model: ${modelName}`);
    
    const retryOpenAI = async (attempt = 1, maxAttempts = 3) => {
      try {
        console.log(`OpenAI API request attempt ${attempt} of ${maxAttempts}`);
        
        const openAIRequestBody = JSON.stringify({
          model: modelName,
          messages: allMessages,
          temperature: 0.7,
          max_tokens: 1500,
        });
        
        console.log(`OpenAI request body size: ${openAIRequestBody.length} bytes`);
        
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
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`OpenAI API error (${response.status}): ${errorText}`);
          
          // Parse the error for more details if possible
          let errorData = {};
          try {
            errorData = JSON.parse(errorText);
          } catch (e) {
            console.error("Failed to parse error response:", e);
          }
          
          // Check if we should retry based on the error type
          if (response.status === 429 || response.status >= 500) {
            if (attempt < maxAttempts) {
              const delay = attempt * 2000; // Exponential backoff with longer delay
              console.log(`Rate limit or server error. Retrying in ${delay}ms...`);
              await new Promise(r => setTimeout(r, delay));
              return retryOpenAI(attempt + 1, maxAttempts);
            }
          }
          
          // Return specific error message based on status code with error type
          if (response.status === 429) {
            return new Response(JSON.stringify({
              error: "OpenAI API rate limit exceeded. Please try again later.",
              details: errorData,
              errorType: "rate_limit"
            }), {
              status: 429,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          } else if (response.status === 401) {
            return new Response(JSON.stringify({
              error: "Invalid API key or authentication error.",
              details: errorData,
              errorType: "authentication"
            }), {
              status: 401,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          } else {
            return new Response(JSON.stringify({
              error: `OpenAI API error: ${errorData.error?.message || "Unknown error"}`,
              details: errorData,
              errorType: "openai_api"
            }), {
              status: response.status,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
        }
        
        // Parse the successful response
        const data = await response.json();
        console.log("OpenAI API response received successfully");
        
        // Log usage stats
        if (data.usage) {
          console.log(`Tokens: ${data.usage.prompt_tokens} prompt, ${data.usage.completion_tokens} completion, ${data.usage.total_tokens} total`);
        }
        
        return data;
      } catch (error) {
        if (error.name === "AbortError") {
          console.error("Request timed out");
          if (attempt < maxAttempts) {
            const delay = attempt * 2000;
            console.log(`Request timed out. Retrying in ${delay}ms...`);
            await new Promise(r => setTimeout(r, delay));
            return retryOpenAI(attempt + 1, maxAttempts);
          }
          
          return new Response(JSON.stringify({
            error: "OpenAI API request timed out after multiple attempts",
            errorType: "timeout"
          }), {
            status: 408,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        
        console.error("Error during OpenAI API call:", error);
        
        if (attempt < maxAttempts) {
          const delay = attempt * 2000;
          console.log(`Error: ${error.message}. Retrying in ${delay}ms...`);
          await new Promise(r => setTimeout(r, delay));
          return retryOpenAI(attempt + 1, maxAttempts);
        }
        
        return new Response(JSON.stringify({
          error: `Error calling OpenAI API: ${error.message}`,
          errorType: "network"
        }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    };
    
    // Call OpenAI API with retries
    const result = await retryOpenAI();
    
    // Check if result is already a Response (error case)
    if (result instanceof Response) {
      return result;
    }
    
    // Validate response structure
    if (!result.choices || !result.choices[0] || !result.choices[0].message) {
      console.error("Unexpected OpenAI API response format:", result);
      return new Response(JSON.stringify({
        error: "Unexpected response format from OpenAI API",
        details: result,
        errorType: "invalid_response"
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    // Return successful response with usage info
    return new Response(JSON.stringify({
      response: result.choices[0].message.content,
      usage: result.usage,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
    
  } catch (error) {
    console.error("Error in AI chat function:", error);
    
    return new Response(JSON.stringify({
      error: error.message || "An error occurred during the request",
      stack: error.stack || "No stack trace available",
      errorType: "server"
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
