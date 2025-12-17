// controllers/subscriptionController.js
export const subscribe = async (req, res) => {
  const plan = await Plan.findById(req.params.planId);
  const start = new Date();
  const end = new Date(start.getTime() + plan.duration * 86400000);

  const subscription = await Subscription.create({
    user_id: req.user.id,
    plan_id: plan._id,
    start_date: start,
    end_date: end,
    status: "active"
  });

  res.json(subscription);
};
