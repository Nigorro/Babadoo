/**
 * Using Rails-like standard naming convention for endpoints.
 * POST     /upload              ->  index
 */

'use strict';
var _ = require('lodash'),
    multiparty = require('multiparty'),
    easyimage = require('easyimage'),
    knox = require('knox'),


var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY  || '';
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY  || '';
var S3_BUCKET = process.env.S3_BUCKET  || '';
var client = knox.createClient({
    key: AWS_ACCESS_KEY,
    secret: AWS_SECRET_KEY,
    bucket: S3_BUCKET
});

exports.index = function (req, res) {
    var uploadFolder = req.body.uploadFolder || req.params.uploadFolder || '/',
        makeCrop = req.body.makeCrop || req.params.makeCrop || false,
        makeThumbnail = req.body.thumbnail || req.params. makeThumbnail || false,

        form = new multiparty.Form(),
        filesArr = [];

    form.parse(req, function (err, fields, files) {
        if (err) { return handleError(res, err); };
        if (files.length <= 0) { return res.status(404).send('Аiles are missing'); }

        if (files.length > 0) {
            for (var file in files) {
                var fileTmp = file[0];

                var imagesPromises = _.values(files).map(function(file) {

                    var promiseObject =  easyimage.resize({
                        src: fileTmp.path, 
                        dst: fileTmp.path, 
                        width:640, height:480
                    }).then(function(images) {
                        return Promise.fromNode(function(callback) {
                            console.log('sending');
                            client.putFile(file[0].path,  'uploads/images/' + uploadFolder + '/' + fileTmp.originalFilename, {'Content-Type': 'image/jpeg'}, callback);
                        });
                    });

                    return promiseObject;
                });

                Promise.all(imagesPromises).then ( function (images) {
                    images.map(function(image) {
                        return image.req.url;
                    });
                });
            }
        };
    })
}