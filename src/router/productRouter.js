const express = require('express');
const { validarJWT } = require('../middlewares/validateToken');
const { checkAdminPermission } = require('../middlewares/checkAdminPermission');
const {
  getProductos,
  createProducto,
  getProductoById,
  updateProducto,
  deleteProducto,
} = require('../controllers/productControllers');

const router = express.Router();

router.get('/productos', getProductos);
router.post('/productos', validarJWT, checkAdminPermission, createProducto);
router.get('/productos/:id', getProductoById);
router.put('/productos/:id', validarJWT, checkAdminPermission, updateProducto);
router.delete('/productos/:id', validarJWT, checkAdminPermission, deleteProducto);

module.exports = router;
