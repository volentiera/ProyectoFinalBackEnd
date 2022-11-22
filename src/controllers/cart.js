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
            const filteredCartForCond = content.filter(e => e.id === idRecieved)
            const isEmpty = Object.keys(filteredCartForCond).length === 0;
            if (!isEmpty){
                const filteredCart = content.filter(e => e.id !== idRecieved)
                await fs.writeFile(`./${this.route}`, JSON.stringify(filteredCart, null, 2))
                return filteredCart
            }else {
                const error = {
                    error: -3,
                    descripcion: "error en busqueda de id de carrito",
                }
                return error
            }
        } catch (error) {
            console.log(error)
        }
    }
    async deleteByIdCartAndIdProd(idCartRecieved, idProdRecieved){
        try {
            const content = await this.getAll()
            const filteredCart = content[idCartRecieved - 1]
            if (filteredCart !== undefined){
                const filteredProductsForCond = filteredCart.productos.filter(e => e.id === idProdRecieved)
                const isEmpty = Object.keys(filteredProductsForCond).length === 0;
                if (!isEmpty){
                    const filteredProducts = filteredCart.productos.filter(e => e.id !== idProdRecieved)
                    filteredCart.productos = filteredProducts
                    await fs.writeFile(`./${this.route}`, JSON.stringify(content, null, 2))
                    return content
                }else{
                    const error = {
                        error: -3,
                        descripcion: "error en busqueda de id de producto",
                    }
                    return error
                }
            }else {
                const error = {
                    error: -3,
                    descripcion: "error en busqueda de id de carrito",
                }
                return error
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getById(idRecieved){
        try {
            const content = await this.getAll()
            const filteredCart = content[idRecieved - 1]
            if (filteredCart !== undefined){
                const filteredProducts = filteredCart.productos
                return filteredProducts
            }else {
                const error = {
                    error: -3,
                    descripcion: "error en busqueda de id",
                }
                return error
            }
        } catch (error) {
            console.log(error)
        }
    }
    async save(idCart, idProd){
        try {
            const getAllCarts = await this.getAll()
            const getCartById = getAllCarts[idCart-1]
            if (getCartById !== undefined){
                const allProducts = await pathProd.getAll()
                const filteredProductsById =  allProducts.filter(e => e.id === idProd)[0]
                if (filteredProductsById !== undefined){
                    filteredProductsById.stock = filteredProductsById.stock - 1
                    getCartById.productos.push(filteredProductsById)
                    const newProduct = allProducts[idProd-1]
                    allProducts.push(newProduct)[idProd-1]
                    allProducts.pop()
                    await fs.writeFile(`./${this.route}`, JSON.stringify(getAllCarts, null, 2))
                    await fs.writeFile(`./products.json`, JSON.stringify(allProducts, null, 2))
                } else {
                    const error = {
                        error: -3,
                        descripcion: "error en busqueda de id de producto",
                    }
                    return error
                }
            }else{
                const error = {
                    error: -3,
                    descripcion: "error en busqueda de id de carrito",
                }
                return error
            }
            return getAllCarts
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Cart