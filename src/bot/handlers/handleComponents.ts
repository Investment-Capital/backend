import Component from "../../types/component";
import Handler from "../../types/handler";
import fs from "fs";

export default (async (cache) => {
  for (const folder of fs.readdirSync("src/bot/components")) {
    for (const file of fs.readdirSync(`src/bot/components/${folder}`)) {
      const component: Component = (
        await import(`../components/${folder}/${file}`)
      ).default;

      ((cache.components as any)[folder] as Component[]).push(component);
    }
  }
}) satisfies Handler;
