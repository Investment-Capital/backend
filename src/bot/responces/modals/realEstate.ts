import { ActionRowBuilder, TextInputBuilder } from "@discordjs/builders";
import { ModalBuilder, TextInputStyle } from "discord.js";

const realEstateModal = (customId: string) =>
  new ModalBuilder()
    .setTitle(`Enter Real Estate`)
    .setCustomId(customId)
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("name")
          .setLabel("Name")
          .setStyle(TextInputStyle.Short)
      )
    );

export default realEstateModal;
