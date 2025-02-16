import Route from "../../../types/route";
import publicInvestor from "../../../functions/publicInvestor";
import pageSize from "../../../config/pageSize";

export default {
  path: "/investors",
  method: "post",
  execute: (cache, req, res) => {
    const { investors } = req.body;

    if (!investors)
      return res.json({
        error: "Investors proporty has not been filled out.",
      });

    if (!Array.isArray(investors))
      return res.json({
        error: "Investors proporty is not an array.",
      });

    if (investors.length == 0)
      return res.json({
        error: "No investors provided.",
      });

    if (investors.length > pageSize)
      return res.json({
        error: `You can only lookup ${pageSize} investors per request.`,
      });

    const invalidIds: string[] = [];
    const foundInvestors = investors.map((investor) => {
      const foundCache = cache.investors.find(
        (cachedInvestor) => cachedInvestor.user.id == investor
      );

      if (foundCache) return publicInvestor(foundCache);
      invalidIds.push(investor);
    });

    if (invalidIds.length > 0)
      return res.json({
        error: `Invalid Investor IDs: ${invalidIds.join(", ")}`,
      });

    res.json(foundInvestors);
  },
} satisfies Route;
