export interface JournalEntry {
  id: string;
  content: string;
  mood_rating: string;
  created_at: string;
  analysis?: {
    detected_distortions: string[];
    reframing_questions: string[];
  };
}