export interface Candidate {
  id: 'xiaoxi' | 'lijie';
  name: string;
  role: string;
  grade: string;
  avatarUrl: string;
  tagline: string;
  coreQuote: string;
  fullStatement: string;
  keyPoints: string[];
  experiences: {
    title: string;
    organization: string;
    period?: string;
    description?: string;
  }[];
  personalTraits: string[];
}

export interface VisionPillar {
  id: number;
  policyNumber?: string; // e.g. "2", "3", "4", "5", or "封面"
  numberText: string;
  title: string;
  subTitle: string;
  defaultImageUrl: string;
  customImageUrl?: string;
  caption: string;
  summary: string;
  actionDetails: string[];
  keyQuote: string;
  category: 'cover' | 'community' | 'feedback' | 'space' | 'bulletin' | 'care';
  officialFlyerQuote?: string; // Exact text from the uploaded campaign flyers
  flyerTags?: string[];
  flyerPhotoDescription?: string;
}

export interface EndorsementMessage {
  id: string;
  author: string;
  identity: string; // e.g., '碩一同學', '博班學長姐', '城鄉所友', '關注者'
  content: string;
  timestamp: string;
  tag: '支持' | '空間建議' | '有意加入' | '學術與活動' | '溫馨鼓勵';
  likes: number;
}
