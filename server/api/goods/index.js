'use strict'

var express = require('express'),
    controller = require('./goods.controller'),
    router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);
router.get('/user/:id', controller.getAllByUserId);
router.get('/elastic/search/', controller.search);

module.exports = router;