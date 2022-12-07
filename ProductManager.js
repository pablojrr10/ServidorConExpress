const fs = require('fs');

class ProductManager {
	constructor(products) {
		this.path = products;
		this.format = 'utf-8'
	}

	getAddProduct = async (obj) => {
		const objs = await this.getAll();
		try {
			let newId;
			objs.length === 0
				? (newId = 1)
				: (newId = objs[objs.length - 1].id + 1);
			const newObj = { ...obj, id: newId ,code: 'code'+newId};
			objs.push(newObj);
			await this.writeFile(objs);
			return newObj.id;
		} catch (error) {
			console.log(error);
		}
	};

	getById = async (id) => {
		const objs = await this.getAll();
		try {
			const obj = objs.find(obj => obj.id === id);
			return obj ? obj : null;
		} catch (error) {
			console.log(error.message);
		}
	};

	getAll = async () => {
		try {
			const objs = await fs.promises.readFile(this.path, this.format);
			return JSON.parse(objs);
		} catch (error) {
			if (error.message.includes('no such file or directory')) return [];
			else console.log(error.message);
		}
	};

	getProductsArray = async () => {
		try {
			const objs = await fs.promises.readFile(this.path, this.format);
			return objs;
		} catch (error) {
			if (error.message.includes('no such file or directory')) return [];
			else console.log(error.message);
		}
	};

	deleteProductById = async (id) => {
		let objs = await this.getAll();
		try {
			objs = objs.filter(obj => obj.id != id);
			await this.writeFile(objs);
		} catch (error) {
			console.log(error.message);
		}
	};

	deleteProductAll = async () => await this.writeFile([]);

	updateProductByID = async (id , {title, description, price, thumbnail, stock}) => {
		let objs = await this.getAll();
		try {
			objs = objs.find(obj => obj.id === id)
			objs.title = title;
			objs.price = price ;
			objs.description = description;
			objs.thumbnail = thumbnail;
			objs.stock = stock;
			console.log(objs);
			return await this.writeFile(objs)
		} catch (error) {
			console.log(error.message);
		}
	};


	writeFile = async (data) => {
		try {
			await fs.promises.writeFile(
				this.path,
				JSON.stringify(data, null, 2)
			);
		} catch (error) {
			console.log(error.message);
		}
	};
}

module.exports = ProductManager;