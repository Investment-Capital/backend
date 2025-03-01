import { ButtonBuilder, ButtonStyle, User } from "discord.js";
import Cache from "../../../../types/cache";
import CustomIdManager from "../../../../classes/customIdManager";
import RealEstate from "../../../../types/realEstate";
import Emojis from "../../../../classes/emojis";

const realEstateSellButton = (
  cache: Cache,
  user: User,
  realEstate: RealEstate
) => {
  return new ButtonBuilder()
    .setCustomId(
      CustomIdManager.create(cache, {
        user: user.id,
        id: "realEstateSell",
        name: realEstate.name,
      })
    )
    .setDisabled(!realEstate.built)
    .setLabel("Sell")
    .setStyle(ButtonStyle.Danger)
    .setEmoji(Emojis.label);
};

export default realEstateSellButton;
