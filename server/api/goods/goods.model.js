'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GoodsSchema = new Schema({
    type: String,
    title: String,
    description: String,
    date: {
        type: Date,
        default: Date.now,
    },
    updated: { 
        type: Date, 
        default: Date.now,
    },
    price: {
        type: String,
        default: 0
    },
    sellerId: String,
    contacts: {
        address: {
            cityId: Number,
            street: String,
        },
    },

    settings: {
        gender: String,
        season: String,
        age: {
            min: { type: Number },
            max: { type: Number } 
        },
    },

    photos: [{
        original: String,
        thumbnail: String
    }],

    keyWords: [],
    views: [],
});

module.exports = mongoose.model('Goods', GoodsSchema);