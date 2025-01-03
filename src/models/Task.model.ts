export interface Task {
  name: string;
  description: string;
  action: (() => void) | null;
}
