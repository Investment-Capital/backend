import path from "path";
import Cache from "../../types/cache";
import Component from "../../types/component";
import Execute from "../../types/execute";
import fs from "fs";

export default (async (cache: Cache) => {
  for (const folder of fs.readdirSync(path.join(__dirname, "../components"))) {
    for (const file of fs.readdirSync(
      path.join(__dirname, `../components/${folder}`)
    )) {
      const component: Component = (
        await import(`../components/${folder}/${file}`)
      ).default;

      if (!component.requiedPrestige) component.requiedPrestige = 1;
      if (component.requiresAccount == undefined)
        component.requiresAccount = true;
      if (!component.owner) component.owner = false;
      if (!component.admin) component.admin = false;

      ((cache.components as any)[folder] as Component[]).push(component);
    }
  }
}) satisfies Execute;
