export const isAction = (action: unknown): action is () => void =>
  action instanceof Function && action.length === 0;
