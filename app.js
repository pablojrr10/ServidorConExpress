const ProductManager = require("./ProductManager");
const express = require('express');

const PORT = 8080;
const app = express();
const server = app.listen(process.env.PORT || PORT, () =>
	console.log(`El servidor esta escuchando el puerto ${PORT}`)
);
server.on('error', err => console.log(`Error: ${err}`));

const productos = new ProductManager('productos.txt');

app.get('/productos', async (req, res) => {
	const mostrarProductos = await productos.getAll();
	res.send(mostrarProductos);
});

app.get('/productos/:pid', async (req, res) => {
	const idproduct = parseInt(req.params.pid)
	const producto = await productos.getById(idproduct)
	if(!producto) res.send({error:"el producto no existe"})
	else res.send({producto})
});

app.get('/', async (req, res) => {
	let limit = parseInt(req.query.limit)
	for(let idprod=1; idprod <= limit; idprod++){
		const producto = await productos.getById(idprod)
		return res.send({producto})
	}
});