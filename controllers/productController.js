import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import braintree from "braintree";
import OrderModel from "../models/OrderModel.js";
import dotenv from "dotenv";

dotenv.config();
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
export const createProductController = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      category,
      quantity,
      shipping,
      isEcoFriendly,
      carbonFootprint,
    } = req.fields;
    const { photo } = req.files;
    if (!name) {
      return res.status(500).send({ error: "Name is required" });
    }
    if (!description) {
      return res.status(500).send({ error: "Description is required" });
    }
    if (!price) {
      return res.status(500).send({ error: "price is required" });
    }
    if (!category) {
      return res.status(500).send({ error: "category is required" });
    }
    if (!quantity) {
      return res.status(500).send({ error: "quantity is required" });
    }
    // Example of checking specifically for null or undefined
    if (isEcoFriendly === null || isEcoFriendly === undefined) {
      return res.status(500).send({ error: "Eco-friendliness is required" });
    }
    if (carbonFootprint === null || carbonFootprint === undefined) {
      return res.status(500).send({ error: "Carbon footprint is required" });
    }

    if (photo && photo.size > 100000) {
      return res.status(500).send({
        error: "photo is required and photo should be less than 1 MB",
      });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "product created successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in creation of product",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      category,
      quantity,
      shipping,
      isEcoFriendly,
      carbonFootprint,
    } = req.fields;
    const { photo } = req.files;
    if (!name) {
      return res.status(500).send({ error: "Name is required" });
    }
    if (!description) {
      return res.status(500).send({ error: "Description is required" });
    }
    if (!price) {
      return res.status(500).send({ error: "price is required" });
    }
    if (!category) {
      return res.status(500).send({ error: "category is required" });
    }
    if (!quantity) {
      return res.status(500).send({ error: "quantity is required" });
    }
    // Example of checking specifically for null or undefined
    if (isEcoFriendly === null || isEcoFriendly === undefined) {
      return res.status(500).send({ error: "Eco-friendliness is required" });
    }
    if (carbonFootprint === null || carbonFootprint === undefined) {
      return res.status(500).send({ error: "Carbon footprint is required" });
    }

    if (photo && photo.size > 100000) {
      return res.status(500).send({
        error: "photo is required and photo should be less than 1 MB",
      });
    }
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "product updated successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in updating product",
      error,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(201).send({
      success: true,
      Totalcount: products.length,
      message: "products List",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getting product",
      error,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(201).send({
      success: true,
      message: "Single Product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getting single product",
      error,
    });
  }
};

export const photoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getting photo",
      error,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("photo");
    res.status(201).send({
      success: true,
      message: "Product deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in deleting category",
      error,
    });
  }
};

export const filterProductController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) {
      args.category = { $in: checked };
    }
    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }
    const products = await productModel.find(args);
    res.status(201).send({
      success: true,
      message: "Filtered Success",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

export const searchController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong in searching products",
      error,
    });
  }
};

export const getSimilarProducts = async (req, res) => {
  try {
    const [pid, cid] = req.params;
    const products = await productModel
      .find({ category: cid, _id: { $ne: pid } })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Similar products success",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
  }
};

export const barintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body; // Get cart and nonce from the request body

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty or not valid" });
    }

    if (!nonce) {
      return res.status(400).json({ error: "Payment nonce is required" });
    }

    let total = 0;
    cart.forEach((i) => {
      total += i.price;
    });

    const newTransaction = gateway.transaction.sale(
      {
        amount: total.toFixed(2), // Ensure the total is a string with two decimal places
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Transaction failed", details: error });
        }

        if (result) {
          try {
            const order = new OrderModel({
              products: cart,
              payment: result,
              buyer: req.user._id,
              status: "Not Process",
            });
            await order.save();
            res.json({ ok: true });
          } catch (orderError) {
            res
              .status(500)
              .json({ error: "Order creation failed", details: orderError });
          }
        } else {
          res.status(500).json({ error: "Transaction result is invalid" });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", details: error });
  }
};
