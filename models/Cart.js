import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true, 
        },
        quantity: {
            type: Number,
            required: true,
        },
    }],
    productName: String,
})

export default mongoose.model('Cart' , cartSchema);