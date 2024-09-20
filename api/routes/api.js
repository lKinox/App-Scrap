var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');


const productGamaSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    results: { type: Array, required: true }
});

const ProductGama = mongoose.model('gama', productGamaSchema, 'gama'); // Especifica el nombre de la colección

router.get('/gama', async (req, res) => {
    try {
        const products = await ProductGama.find();
        console.log('Productos encontrados:', products); // Agrega esta línea para depurar
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener productos'
        });
    }
});

const productSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    results: { type: Array, required: true }
});

const ProductPlazas = mongoose.model('plazas', productSchema, 'plazas'); // Especifica el nombre de la colección

router.get('/plazas', async (req, res) => {
    try {
        const products = await ProductPlazas.find();
        console.log('Productos encontrados:', products); // Agrega esta línea para depurar
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener productos'
        });
    }
});

module.exports = router;