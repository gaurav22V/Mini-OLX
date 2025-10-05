const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/multerConfig');
const productController = require('../controllers/productController');


router.get('/', productController.getProducts);
router.post('/', auth, upload.single('file'), productController.createProduct);
router.get('/:id',  productController.getProductDetails);
router.patch('/:id', auth, upload.single('file'), productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;
