const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    },
    price: {
        type: String,
    },
    quantity: {
        type: String,
    },
    category: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
    },
    userId: {
        type: String,
    }
})

module.exports = mongoose.model('products', productSchema)