
const {Router} = require('express');
const router = Router();
const Product = require('../controllers/products')
const path = new Product('./products.json')


router.get('/api/productos', async (req,res) => {
    try {
        const allProducts = await path.getAll()
        res.json(allProducts)
    } catch (error) {
        console.log(error)
    }
})
router.get('/api/productos/:id', async (req,res) => {
    try {
        const newId = Number(req.params.id)
        const productById = await path.getById(newId)
        const productNotFound = {error: 'Producto no encontrado'}
        if (productById !== undefined){
            res.json(productById)
        } else {
            res.json(productNotFound)
        }
    } catch (error) {
        console.log(error)
    }
})
router.post('/api/productos', async (req,res)=>{
    try {
        const producto = {name: req.body.name, price: Number(req.body.price) }
        const newProduct = await path.save(producto)
        const allProducts = await path.getAll()
        res.json(allProducts)
    } catch (error) {
        console.log(error)
    }
})
router.delete('/api/productos/:id', async (req,res)=>{
    try {
        const id = Number(req.params.id)
        const elementDeleted = await path.deleteByid(id)
        res.json(elementDeleted)
    } catch (error) {
        console.log(error)
    }
})
router.put('/api/productos/:id', async (req,res)=>{
    try {
        const id = Number(req.params.id)
        const modifyProduct = await path.modifyProductById(id, (req.body))
        res.json(modifyProduct)
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;