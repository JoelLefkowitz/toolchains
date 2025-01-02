export interface Task {
  name?: string;
  description?: string;
  task: () => void;
}
