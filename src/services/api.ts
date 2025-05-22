
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

    const prompt = `Generate an emotionally engaging, vulnerable, and expertly crafted social media caption for a ${request.businessType} business. 
    The caption should be ${postType} in nature and designed for ${postPurpose}.
    Business description: ${request.businessDescription}
    
    Make the caption captivating from the first word to a compelling call-to-action, and finish with 5-7 curated trending hashtags.
    Ensure the caption is personalized to this specific business type and description.`;

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
            content: "You are an expert social media caption writer who specializes in creating engaging, emotionally resonant content that drives engagement."
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
