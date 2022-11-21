const { promises: fs } = require('fs')
const Product = require('../controllers/products')
const pathProd = new Product('./products.json')

class Cart {
    constructor(route) {
        this.route = route
    }
    async getAll(){
        try {
            const content = JSON.parse(await fs.readFile(`./${this.route}`,'utf-8'))
            return content
        } catch (error) {
        console.log(error)
        return []
        }
    }
    async createCart(){
        try {
            const cart = await this.getAll()
            const isEmpty = Object.keys(cart).length === 0;

            if (isEmpty){
                const newCartFromCero = {
                    id: 1,
                    productos: []
                }
                cart.push(newCartFromCero)
            }else{
                const lastId = (cart.length - 1) + 1
                const newCartCompleted = {
                    id: (lastId + 1),
                    productos: []
                }
                cart.push(newCartCompleted)
            }
            await fs.writeFile(`./${this.route}`, JSON.stringify(cart, null, 2))
            return cart
        } catch (error) {
            console.log(error)
        }
    }
    async deleteById(idRecieved){
        try {
            const content = await this.getAll()
            const filteredCart = content.filter(e => e.id !== idRecieved)
            await fs.writeFile(`./${this.route}`, JSON.stringify(filteredCart, null, 2))
            return content
        } catch (error) {
            console.log(error)
        }
    }
    async deleteByIdCartAndIdProd(idCartRecieved, idProdRecieved){
        try {
            const content = await this.getAll()
            const filteredCart = content[idCartRecieved - 1]
            const filteredProducts = filteredCart.productos.filter(e => e.id !== idProdRecieved)
            filteredCart.productos = filteredProducts
            await fs.writeFile(`./${this.route}`, JSON.stringify(content, null, 2))
            return content
        } catch (error) {
            console.log(error)
        }
    }
    async getById(idRecieved){
        try {
            const content = await this.getAll()
            const filteredCart = content[idRecieved - 1]
            const filteredProducts = filteredCart.productos
            return filteredProducts
        } catch (error) {
            console.log(error)
        }
    }
    async save(idCart, idProd){
        try {
            const getAllCarts = await this.getAll()
            const getCartById = getAllCarts[idCart-1]
            const allProducts = await pathProd.getAll()
            const filteredProductsById =  allProducts.filter(e => e.id === idProd)[0]
            getCartById.productos.push(filteredProductsById)
            await fs.writeFile(`./${this.route}`, JSON.stringify(getAllCarts, null, 2))
            return getAllCarts
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Cart