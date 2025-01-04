export interface Script {
  name: string;
  description: string;
  action: (() => void) | null;
}
