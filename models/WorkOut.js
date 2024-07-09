const mongoose = require('mongoose');

const workOutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity Price is required']
    },
    isActive: {
        type: Boolean,
        default: true
    
    }
});

module.exports = mongoose.model('WorkOut', workOutSchema);