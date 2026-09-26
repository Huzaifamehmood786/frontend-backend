import express from "express";
import Order from "../models/order.model.js";

const router = express.Router();

// create order
router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get orders
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

export default router;