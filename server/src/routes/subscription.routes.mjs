import express from "express";
import authMiddleware from "../middleware/auth.middleware.mjs";
import roleMiddleware from "../middleware/role.middleware.mjs";
import Subscription from "../models/subscription.model.mjs";
import Plan from "../models/plan.model.mjs";

const router = express.Router();

/* Subscribe */
// subscription.routes.mjs
router.post("/subscribe/:planId", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const planId = req.params.planId;

  // deactivate old subscription
  await Subscription.updateMany(
    { user_id: userId, status: "active" },
    { status: "expired" }
  );

  const plan = await Plan.findById(planId);

  const start = new Date();
  const end = new Date();
  end.setDate(end.getDate() + plan.duration);

  const sub = await Subscription.create({
    user_id: userId,
    plan_id: planId,
    start_date: start,
    end_date: end,
    status: "active",
  });

  res.json(sub);
});


/* My subscription */
router.get(
  "/my-subscription",
  authMiddleware,
  async (req, res) => {
    const sub = await Subscription.findOne({
      user_id: req.user.id,
      status: "active",
    }).populate("plan_id");

    res.json(sub);
  }
);

/* Admin only */
router.get(
  "/admin/subscriptions",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    const subs = await Subscription.find()
      .populate("user_id", "email")
      .populate("plan_id", "name");

    res.json(subs);
  }
);

export default router;
