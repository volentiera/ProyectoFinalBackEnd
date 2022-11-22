
const { promises: fs } = require('fs')

class Product {
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

    async deleteByid(idRecieved){
        
        try {
            const content = await this.getAll()
            const elementoFiltrado = content.filter(e => e.id !== idRecieved)
            const elementoFiltradoParaCond = content.filter(e => e.id === idRecieved)
            const isEmpty = Object.keys(elementoFiltradoParaCond).length === 0;
            if (!isEmpty){
                await fs.writeFile(`./${this.route}`, JSON.stringify(elementoFiltrado, null, 2))
                return elementoFiltrado
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

    async save(newProduct){
        try {
            const content = await this.getAll()
            
            const lastId = content[content.length - 1]
            if (lastId === undefined){
                const newProductFromCero = {
                    id: 1,
                    timestamp: `Creado: ${new Date().toLocaleString()}`,
                    nombre: newProduct.nombre,
                    descripcion: newProduct.descripcion,
                    codigo: newProduct.codigo,
                    foto: newProduct.foto,
                    precio: newProduct.precio,
                    stock: newProduct.stock
                }
                await content.push(newProductFromCero)
            }else{
                
                const newProductCompleted = {
                    id: (lastId.id +1),
                    timestamp: `Creado: ${new Date().toLocaleString()}`,
                    nombre: newProduct.nombre,
                    descripcion: newProduct.descripcion,
                    codigo: newProduct.codigo,
                    foto: newProduct.foto,
                    precio: newProduct.precio,
                    stock: newProduct.stock
                }
                await content.push(newProductCompleted)
            }
            await fs.writeFile(`./${this.route}`, JSON.stringify(content, null, 2))
            return content
        } catch (error) {
            console.log(error)
        }
    }
    async getById(id){
        const content = await this.getAll()
        const filteredObject = await content.filter(e => e.id === id)

        const isEmpty = Object.keys(filteredObject).length === 0;

        if (!isEmpty){
            const filteredObject = await content.filter(e => e.id === id)
            return filteredObject
        }else{
            const error = {
                error: -3,
                descripcion: "error en busqueda de id de producto",
            }
            return error
        }
    }
    async modifyProductById(idRecieved, product){
        try {
            const content = await this.getAll()
            const filterById = await content.filter(e => e.id === idRecieved)

            const isEmpty = Object.keys(filterById).length === 0;
            const newProduct =  {id: idRecieved, timestamp: `Modificado: ${new Date().toLocaleString()}`, ... product }
            if (!isEmpty){
            content.splice((idRecieved-1), 1 , newProduct )
            await fs.writeFile(`./${this.route}`, JSON.stringify(content, null, 2))
            return content
            } else{
                const error = {
                    error: -3,
                    descripcion: "error en busqueda de id de producto",
                }
                return error
            }
        } catch (error) {
            console.log(error)
        }
    }
}


module.exports = Product