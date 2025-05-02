import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  barintreeTokenController,
  braintreePaymentController,
  createProductController,
  deleteProductController,
  filterProductController,
  getProductController,
  getSimilarProducts,
  getSingleProductController,
  photoController,
  productCategoryController,
  searchController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
router.get("/get-product", getProductController);
router.get("/get-single-product/:slug", getSingleProductController);
router.get("/photo-product/:pid", photoController);
router.delete("/delete-product/:pid", deleteProductController);
router.post("/filter-product", filterProductController);
router.get("/search/:keyword", searchController);
router.get("/related-products/:pid/:cid", getSimilarProducts);
router.get("/product-category/:slug", productCategoryController);
router.get("/braintree/token", barintreeTokenController);
router.post("/braintree/payment", requireSignIn, braintreePaymentController);
export default router;
