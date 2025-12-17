const { Order } = require("../module/order");

module.exports.AddOrder = async (req, res) => {
  try {
    const {  products } = req.body;

    const totalPrice = products.reduce(
      (acc, p) => acc + (p.id || 0) * p.count,
      0
    );

    const order = new Order({
      user: req.user._id,
      products,
      totalPrice,
    });

    await order.save();

    res.status(201).json({ message: "Order created", order });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error creating order", error: err.message });
  }
};
