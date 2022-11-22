
const {Router} = require('express');
const router = Router();
const Product = require('../controllers/products')
const path = new Product('./products.json')

const admin = true

router.get('/api/productos/:id?', async (req,res) => {
    try {
        const newId = req.params.id
        if (newId !== undefined){
            const idRecieved = Number(newId)
            const productById = await path.getById(idRecieved)
            res.json(productById)
        } else {
            const allProducts = await path.getAll()
            res.json(allProducts)
        }
    } catch (error) {
        console.log(error)
    }
})
router.post('/api/productos', async (req,res)=>{
    if (admin){
        try {
            const producto = req.body
            const newProduct = await path.save(producto)
            res.json(newProduct)
        } catch (error) {
            console.log(error)
        }
    } else {
        const response = {error: -1, descripcion: "ruta /api/productos metodo POST no autorizada"}
        res.json(response)
    }
})
router.delete('/api/productos/:id', async (req,res)=>{
    if (admin){
    try {
        const id = Number(req.params.id)
        const elementDeleted = await path.deleteByid(id)
        res.json(elementDeleted)
    } catch (error) {
        console.log(error)
    }
    }else {
        const response = {error: -1, descripcion: "ruta /api/productos/:id metodo DELETE no autorizada"}
        res.json(response)
    }
})
router.put('/api/productos/:id', async (req,res)=>{
    if (admin){
    try {
        const id = Number(req.params.id)
        const modifyProduct = await path.modifyProductById(id, (req.body))
        res.json(modifyProduct)
    } catch (error) {
        console.log(error)
    }
    }else {
        const response = {error: -1, descripcion: "ruta /api/productos/:id metodo PUT no autorizada"}
        res.json(response)
    }
})
module.exports = router;