import { Task } from "../models/Task.model";
import { guard, isRecord, isString } from "reviewed";
import { head } from "../containers/strings";
import { isAction } from "../containers/guards";

export const collect = (files: string[]): Promise<Task[]> =>
  Promise.all(
    files.map(async (file) => {
      const imported = (await import(file)) as Record<string, unknown>;

      const task: Task = {
        name: head(file),
        description: "",
        action: null,
      };

      if (guard(isString)(imported.name)) {
        task.name = imported.name;
      }

      if (guard(isString)(imported.description)) {
        task.description = imported.description;
      }

      if (isAction(imported.action)) {
        task.action = imported.action;
      }

      if (isAction(imported.default)) {
        task.action = imported.default;
      } else {
        const $default = isRecord(imported.default);

        if ($default.valid) {
          const { parsed } = $default;

          if (guard(isString)(parsed.name)) {
            task.name = parsed.name;
          }

          if (guard(isString)(parsed.description)) {
            task.description = parsed.description;
          }

          if (isAction(parsed.action)) {
            task.action = parsed.action;
          }
        }
      }

      return task;
    }),
  );
