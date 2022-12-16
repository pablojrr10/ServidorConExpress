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

app.get('/products', async (req, res) => {
	const limit = parseInt(req.query.limit)
	console.log(typeof limit)
	const products = await productos.getAll()
	console.log(products)
	console.log(typeof products)
	const nuevaLista = products.filter((products) => products.id >= 1 && products.id <=limit )
	console.log(nuevaLista)

	res.send({nuevaLista})
});