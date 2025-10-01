import Route from "../../../types/route";

export default {
  path: "/investors/icon/:id",
  method: "get",
  execute: (_, req, res) => {
    const { id } = req.params;
    res.redirect(`https://api.dicebear.com/9.x/avataaars/svg?seed=${id}`);
  },
} satisfies Route;
