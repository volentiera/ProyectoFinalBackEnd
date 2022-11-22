const {Router} = require('express');
const router = Router();
const Cart = require('../controllers/cart')
const pathCart = new Cart('./cart.json')


router.get('/api/carritos', async (req,res) =>{
    try {
        const allCart = await pathCart.getAll()
        res.json(allCart)
    } catch (error) {
        console.log(error)
    }
})

router.post('/api/carritos', async (req,res) => {
    try {
        await pathCart.createCart()
        const allCart = await pathCart.getAll()
        res.json(allCart)
    } catch (error) {
        console.log(error)
    }
})
router.delete('/api/carritos/:id', async (req,res)=>{
    try {
        const idRecieved = Number(req.params.id)
        const deletedCart = await pathCart.deleteById(idRecieved)
        res.json(deletedCart) 
    } catch (error) {
        console.log(error);
    }
})
router.delete('/api/carritos/:id_cart/productos/:id_prod', async (req,res)=>{
    try {
        const idCartRecieved = Number(req.params.id_cart)
        const idProdRecieved = Number(req.params.id_prod)
        const deletedProduct = await pathCart.deleteByIdCartAndIdProd(idCartRecieved, idProdRecieved)
        res.json(deletedProduct) 
    } catch (error) {
        console.log(error);
    }
})

router.get('/api/carritos/:id/productos', async (req,res) =>{
    try {
        const idRecieved = Number(req.params.id)
        const cart = await pathCart.getById(idRecieved)
        res.json(cart)
    } catch (error) {
        console.log(error)
    }
})
router.put('/api/carritos/:id_cart/productos/:id_prod', async (req,res)=>{
    try {
        const idCartRecieved = Number(req.params.id_cart)
        const idProdRecieved = Number(req.params.id_prod)
        const addProductsToCart = await pathCart.save(idCartRecieved, idProdRecieved)
        res.json(addProductsToCart)
    } catch (error) {
        console.log(error);
    }
})


module.exports = router