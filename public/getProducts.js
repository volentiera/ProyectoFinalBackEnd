const titulo = document.getElementById("titulo")
const getItems = async () =>{
    try {
        await fetch("http://localhost:8080/api/productos",{
            method: 'GET'
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {response.map(e => {
            titulo.innerHTML += 
            `<div class="card col">
                <img src="" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${e.nombre}</h5>
                    <p class="card-text">${e.descripcion}</p>
                    <p class="card-text">$${e.precio}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>`
        } )});
    } catch (error) {
        console.log(error)
    }
}


getItems()
