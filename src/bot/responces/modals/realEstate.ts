import { ActionRowBuilder, TextInputBuilder } from "@discordjs/builders";
import { ModalBuilder, TextInputStyle } from "discord.js";
import CustomId from "../../../types/customId";
import CustomIdManager from "../../../classes/customIdManager";
import Cache from "../../../types/cache";

const realEstateModal = (cache: Cache, customId: CustomId) =>
  new ModalBuilder()
    .setTitle(`Enter Real Estate`)
    .setCustomId(CustomIdManager.create(cache, customId))
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("name")
          .setLabel("Name")
          .setStyle(TextInputStyle.Short)
      )
    );

export default realEstateModal;
