/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /goods              ->  index
 * POST    /goods              ->  create
 * GET     /goods/:id          ->  show
 * PUT     /goods/:id          ->  update
 * DELETE  /goods/:id          ->  destroy
 */

'use strict';
var _ = require('lodash');
var Goods = require('./goods.model');

// Get list of Goods
exports.index = function (req, res) {
    Goods.find({})
        .sort({updated: -1})
        .exec(function (err, goods) {
            if (err) { return handleError(res, err) }
            return res.status(200).json(goods)
    });
};

// Create a new Goods in the DB
exports.create = function (req, res) {
    Goods.create(req.body, function (err, goods) {
        if (err) { return handleError(res, err); }

        Goods.on('es-indexed', function (err, res) {
            if (err) { return handleError(res, err) }
            if (res) {
                console.log('!!! Document was indexed' , res);
            }
        })
        return res.status(201).json(goods)
    });
}

// Remove a Goods from the DB by _id
exports.remove = function (req, res) {
    Goods.findById(req.params.id, function (err, goods) {
        if (err) { return handleError(res, err); }
        if (!goods) { return res.status(404).send('Not Found'); }
        goods.remove(function(err) {
            if(err) { return handleError(res, err)}
            return res.status(204).send('No Content')
        });
    })
}

// Updates an existing Goods in the DB.
exports.update = function (req, res) {
    var goodsId = req.body.id || req.params.id;

    if (req.body.id) { delete req.body.id; }
    if (req.params.id) { delete req.params.id}
    Goods.findById(goodsId, function (err, goods) {
        if (err) { return handleError(res, err) }
        if (!goods) { return res.status(404).send('Not Found') }
        // var update = _.merge(goods, req.body);
        goods = _.merge(goods, req.body)

        goods.markModified('photos');
        goods.markModified('keyWords');
        goods.markModified('views');
        goods.save( function (err, data) {
            if (err) { console.log(err) }
            console.log(err, data);
            return res.status(200).json(goods)
        })
    })
}

// Get a single Goods
exports.show = function (req, res) {
    Goods.findById(req.params.id, function (err, goods) {
        if (err) { return handleError(res, err) }
        if (!goods) { return res.status(404).send('Not Found') }
        return res.status(200).json(goods)
    })
}

//Get all Goods where userId 
exports.getAllByUserId = function (req, res) {
    Goods.find({ sellerId: req.params.id })
        .sort({date: -1})
        .exec( function (err, goods) {
            if (err) { return handleError(res, err) }
            if (!goods) { return res.status(404).send('Not Found') }
            return res.status(200).json(goods)
        });
}

//Elasticsearch api for Goods models
exports.search = function (req, res) {
    var searchQuery = req.query.q || '*',
        page = req.query.page - 1 || 0,
        pageSize = req.query.pageSize || 10,
        sortingField = req.query.sortingField || 'updated:-asc';

    Goods.search({
        query_string: {
            query: searchQuery
        }
    },{
        from: page,
        size: pageSize,
        sort: sortingField,
        hydrate: true,
    },function(err, results) {
      if (err) { return handleError(res, err) }
      return res.status(200).json(results)
    });
}

function handleError(res, err) {
  return res.status(500).send(err);
}

function merge (obj1, obj2) {
    var obj3 = {};

    for(var attr in obj2) {
        console.log('!', attr, obj1[attr], obj2[attr]);
        obj1[attr].set(obj2[attr]);
    }

    return obj1;
}


