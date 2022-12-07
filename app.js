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

app.get('/products/:pid', async (req, res) => {
	const mostrarProductos = await productos.getById(2);
	res.send(mostrarProductos);
});