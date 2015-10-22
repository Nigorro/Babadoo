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
    Goods.find(function (err, goods) {
        if (err) { return handleError(res, err); };
        return res.status(200).json(goods);
    })
};

// Create a new Goods in the DB
exports.create = function (req, res) {
    Goods.create(req.body, function (err, goods) {
        if (err) { return handleError(res, err); }
        return res.status(201).json(goods);
    });
}

// Remove a Goods from the DB by _id
exports.remove = function (req, res) {
    Goods.findById(req.params.id, function (err, goods) {
        if (err) { return handleError(res, err); }
        if (!goods) { return res.status(404).send('Not Found'); }
        goods.remove(function(err) {
            if(err) { return handleError(res, err); }
            return res.status(204).send('No Content');
        });
    })
}

// Updates an existing Goods in the DB.
exports.update = function (req, res) {
    if (req.body._id) { delete req.body._id; }
    Goods.findById(require.params.id, function (err, goods) {
        if (err) { return handleError(res, err); }
        if (!goods) { return res.status(404).send('Not Found'); }
        var update = _.merge(goods, req.body);
        update.save( function (err) {
            if (err) { return handleError(res, err); };
            return res.status(200).json(goods)
        })
    })
}

// Get a single Goods
exports.show = function (req, res) {
    Goods.findById(req.params.id, function (err, goods) {
        if (err) { return handleError(res, err); };
        if (!goods) { return res.status(404).send('Not Found'); };
        return res.status(200).json(goods);
    })
}

function handleError(res, err) {
  return res.status(500).send(err);
}

