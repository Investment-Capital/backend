import Investor from "../../../types/investor";
import Route from "../../../types/route";

export default {
  path: "/investors/updates/:id",
  method: "ws",
  event: "investor",
  filter: (_, req, data: Investor) => req.params.id == data.account.profile.id,
  map: (_, __, data: Investor) => {
    const newData: any = { ...data };
    delete newData.account.infomation;

    return newData;
  },
} satisfies Route;
