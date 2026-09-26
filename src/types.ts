export type NavSection =
  | 'home'
  | 'anatomy'
  | 'brushing'
  | 'food'
  | 'plaque'
  | 'cavity'
  | 'games'
  | 'posttest'
  | 'faq'
  | 'about';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  funFact?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'healthy' | 'caution';
  icon: string;
  description: string;
  why: string;
}
