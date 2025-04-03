
export type ChatStage = 'initial' | 'requirements' | 'scope' | 'tasks' | 'estimate' | 'payment';

export type MessageType = "user" | "assistant";

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  role?: string;
}

export interface TaskItem {
  id: number;
  title: string;
  description: string;
  hours: number;
}

export interface ProjectResult {
  scope: string;
  tasks: TaskItem[];
  estimate: { standard: string; fastTrack: string };
  totalHours: number;
}

export const BUILD_STAGES = [
  { key: 'initial', label: 'Initial Idea' },
  { key: 'requirements', label: 'Requirements' },
  { key: 'scope', label: 'Project Scope' },
  { key: 'tasks', label: 'Task Breakdown' },
  { key: 'estimate', label: 'Cost Estimate' },
  { key: 'payment', label: 'Payment' }
];
