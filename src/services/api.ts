
import { CaptionRequest, CaptionResponse } from "../types";

const API_KEY = "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";

export const generateCaption = async (request: CaptionRequest): Promise<CaptionResponse> => {
  try {
    const postType = request.customType && request.postType === 'custom' 
      ? request.customType 
      : request.postType;
    
    const postPurpose = request.customPurpose && request.postPurpose === 'custom'
      ? request.customPurpose
      : request.postPurpose;

    // Enhanced prompt to include all business details
    const prompt = `Generate a social media caption for a ${request.businessType} business that is vulnerable, conversational, and emotionally engaging.
    
    The caption should be ${postType} in nature and designed for ${postPurpose}.
    
    Business details: 
    - Business type: ${request.businessType}
    - Business description: ${request.businessDescription}
    ${request.additionalDetails ? `- Additional context: ${request.additionalDetails}` : ''}
    
    Style guidelines:
    - Write in a simple, direct style similar to Alex Hormozi
    - Keep it conversational but not too informal or street
    - Make it vulnerable and authentic
    - Use minimal emojis (max 1-2 if needed)
    - Format with one point per line for easy readability
    - Always include a clear call-to-action at the end
    - Include 5-7 relevant trending hashtags
    
    Use the actual business information provided - no placeholders.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an expert social media caption writer who specializes in creating engaging, emotionally resonant content that drives engagement. Write in a simple, direct style similar to Alex Hormozi - vulnerable, authentic, but professional."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate caption");
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;
    
    // Extract hashtags from the text
    const hashtagRegex = /#[\w]+/g;
    const hashtags = generatedText.match(hashtagRegex) || [];
    
    // Remove hashtags from the caption text
    const caption = generatedText.replace(hashtagRegex, '').trim();

    return {
      id: Date.now().toString(),
      caption,
      hashtags: hashtags.map(tag => tag.substring(1)),
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error generating caption:", error);
    throw error;
  }
};
