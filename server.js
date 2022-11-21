const express = require('express')

const routeProducts = require('./src/routes/routeProducts.js')
const routeCart = require('./src/routes/routeCart.js')

const app = express()

const PORT = 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(express.json());

app.use(routeProducts)
app.use(routeCart)

app.get('/', (req, res) => {
    res.redirect('/api/productos');
})


const server = app.listen(PORT, () =>
    console.log(
        `Server started on PORT http://localhost:${PORT} at ${new Date().toLocaleString()}`
    )
);

server.on('error', (err) =>{
    console.log('Error en el servidor:', err)
})