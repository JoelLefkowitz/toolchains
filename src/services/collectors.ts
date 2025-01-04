import { Module } from "../models/Module.model";
import { Script } from "../models/Script.model";
import { guard, isRecord, isString } from "reviewed";
import { head } from "../containers/strings";
import { isAction } from "../containers/guards";

export const collect = ({ file, imported }: Module): Script => {
  const script: Script = {
    name: head(file),
    description: "",
    action: null,
  };

  if (guard(isString)(imported.name)) {
    script.name = imported.name;
  }

  if (guard(isString)(imported.description)) {
    script.description = imported.description;
  }

  if (isAction(imported.action)) {
    script.action = imported.action;
  }

  if (isAction(imported.default)) {
    script.action = imported.default;
  } else {
    const $default = isRecord(imported.default);

    if ($default.valid) {
      const { parsed } = $default;

      if (guard(isString)(parsed.name)) {
        script.name = parsed.name;
      }

      if (guard(isString)(parsed.description)) {
        script.description = parsed.description;
      }

      if (isAction(parsed.action)) {
        script.action = parsed.action;
      }
    }
  }

  return script;
};
