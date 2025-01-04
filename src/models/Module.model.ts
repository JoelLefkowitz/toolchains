export interface Module {
  file: string;
  imported: Record<string, unknown>;
}
