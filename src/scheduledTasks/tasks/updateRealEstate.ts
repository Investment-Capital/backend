import Logger from "../../classes/logger";
import Times from "../../classes/times";
import realEstateConfig from "../../config/realEstateConfig";
import realEstateUpgradesConfig from "../../config/realEstateUpgradesConfig";
import editInvestor from "../../functions/editInvestor";
import Cache from "../../types/cache";
import ScheduledTask from "../../types/scheduledTask";

export default {
  time: Times.minute * 5,
  execute: (cache: Cache) => {
    for (const investor of cache.investors) {
      for (const realEstate of investor.realEstate) {
        if (realEstate.built) {
          for (const upgrade of realEstate.upgrades.filter(
            (upgrade) => !upgrade.completed
          )) {
            const completedDate =
              upgrade.created +
              realEstateUpgradesConfig[upgrade.type].upgradeTime;

            if (Date.now() + Times.minute * 5 >= completedDate) {
              setTimeout(() => {
                editInvestor(cache, investor, () => {
                  upgrade.completed = true;
                });

                Logger.success(
                  `Completed real estate upgrade for ${investor.user.username}\nReal Estate: ${realEstate.name}\nUpgrade: ${upgrade.type}`
                );
              }, completedDate - Date.now());
            }
          }
        } else {
          const completedDate =
            realEstate.created + realEstateConfig[realEstate.type].buildTime;

          if (Date.now() + Times.minute * 5 >= completedDate) {
            setTimeout(() => {
              editInvestor(cache, investor, () => {
                realEstate.built = true;
              });

              Logger.success(
                `Built real estate for ${investor.user.username} called ${realEstate.name}`
              );
            }, completedDate - Date.now());
          }
        }
      }
    }
  },
} satisfies ScheduledTask;
