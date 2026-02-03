export interface Question {
  id: number;
  text: string;
  options: {
    id: string; // 'A', 'B', 'C', 'D'
    text: string;
  }[];
  correctAnswer: string;
}

export interface UserInfo {
  name: string;
  group: string;
}

export type GameState = 'welcome' | 'playing' | 'finished';

export interface ScoreLog {
  questionId: number;
  timeTaken: number; // in ms
  points: number;
}
