import { isEqual } from "lodash";
import Cache from "../types/cache";
import CustomId from "../types/customId";
import generateCode from "../functions/generateCode";

class CustomIdManager {
  static create = (cache: Cache, customId: CustomId) => {
    const savedCustomId = Object.entries(cache.customIds).find(([_, data]) =>
      isEqual(data, customId)
    );

    if (savedCustomId) return savedCustomId[0];

    const code = generateCode();
    cache.customIds[code] = customId;

    return code;
  };

  static parse = (cache: Cache, customId: string) => cache.customIds[customId];
}

export default CustomIdManager;
