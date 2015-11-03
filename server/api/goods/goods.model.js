'use strict';

var mongoose = require('mongoose'),
    mongoosastic = require("mongoosastic"),
    Schema = mongoose.Schema;

var GoodsSchema = new Schema({
    type: String,
    title: String,
    description: String,
    price: {
        type: Number,
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
    photos: [],
    keyWords: [],
    views: [],

    date: {
        type: Date,
        default: Date.now,
    },
    updated: { 
        type: Date, 
        default: Date.now,
    },
    status: String,
});
GoodsSchema.plugin(mongoosastic)
module.exports = mongoose.model('Goods', GoodsSchema);