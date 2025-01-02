import { register } from "../src/services/collectors";

register([
  {
    name: "Example",
    description: "Does nothing",
    task: () => {
      console.log("Running");
    },
  },
]);
