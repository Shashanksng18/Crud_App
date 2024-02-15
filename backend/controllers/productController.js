const Product = require("../model/Product");
const User = require("../model/User");
module.exports.add_product = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      category,
      createdAt,
      updatedAt,
      userId,
    } = req.body;
    const User = new Product({
      name,
      description,
      price,
      quantity,
      category,
      updatedAt,
      userId,
    });
    const data = await User.save();
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, data: "no data found" });
  }
};

module.exports.get_products = async (req, res) => {
  const id = req.user._id;
  const email = req.user.email;
  if(req.user.role === 'user') {
    const data = await Product.find({userId: id});
    res.status(200).json({data, email});
  } else if(req.user.role === 'admin') {
    const data = await Product.find({});
    res.status(200).json({data, email})
  } else {
    res.status(400).json({data: "no data found for this user"})
  }
};

module.exports.get_product_by_id = async (req, res) => {
  const id = req.params.id;
  const data = await Product.findById(id);
  res.json({ data });
};

module.exports.delete_product = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Product.deleteOne({ _id: id });
    if (data.deletedCount === 1) {
      res.status(200).json({ msg: "deleted" });
    }
    if (data.deletedCount === 0) {
      res.status(400).json({ msg: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports.update_product = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Product.updateOne({ _id: id }, { $set: req.body });

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.search_by_key = async (req, res) => {
  try {
    const key = req.params.key;
    const data = await Product.find({
      $or: [
        { name: { $regex: req.params.key } },
        // {description: {$regex: req.params.key}}
      ],
    });
    if (data.length > 0) {
      res.status(200).json({ data });
    } else {
      res.status(404).json({ msg: "no data found" });
    }
  } catch (err) {
    res.status(500).json({ msg: "no data found" });
  }
};
