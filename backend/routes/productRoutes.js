const express = require("express");
const router = express();
const productController = require("../controllers/productController");
const { requireAuth, authRole, userRole } = require("../middleware/authMiddleware");

router.post("/add-product", productController.add_product);

router.get("/products", requireAuth, productController.get_products);

router.delete("/product/:id", authRole, userRole('admin'), productController.delete_product);


router.put('/product/:id', productController.update_product)

router.get("/product/:key", productController.search_by_key);

router.get("/get/:id", productController.get_product_by_id);


module.exports = router;