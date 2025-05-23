
export interface User {
  id: string;
  email: string;
  phone: string;
  username: string;
  businessName: string;
  businessType: string;
  businessDescription: string;
}

export type PostType = 'promotional' | 'inspirational' | 'educational' | 'conversational' | 'custom';
export type PostPurpose = 'attention' | 'sales' | 'community' | 'storytelling' | 'custom';

export interface CaptionRequest {
  postType: PostType;
  postPurpose: PostPurpose;
  customType?: string;
  customPurpose?: string;
  businessType: string;
  businessDescription: string;
}

export interface CaptionResponse {
  id: string;
  caption: string;
  hashtags: string[];
  createdAt: string;
}

export interface HighLevelContact {
  email: string;
  phone: string;
  firstName: string;
  lastName?: string;
  businessName?: string;
  businessTypeId?: string;
  businessDescription?: string;
  source?: string;
}
