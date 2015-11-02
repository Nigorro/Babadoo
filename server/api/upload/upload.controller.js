/**
 * Using Rails-like standard naming convention for endpoints.
 * POST     /upload              ->  index
 */

'use strict';
var _ = require('lodash'),
    multiparty = require('multiparty'),
    easyimage = require('easyimage'),
    // knox = require('knox'),
    // http = require('http'),
    // request = require("request"),
    // aws = require('aws-sdk'),
    // s3 = require('s3'),
    fs = require('fs');

exports.index = function (req, res) {
    var uploadFolder = req.body.uploadFolder || req.params.uploadFolder || '/',
        makeCrop = req.body.makeCrop || req.params.makeCrop || false,
        makeThumbnail = req.body.thumbnail || req.params. makeThumbnail || false,
        form = new multiparty.Form();


    form.parse(req, function (err, fields, files) {
        var uploadFiles = files;
        var images = [];
        var savePath = './uploadFiles/' + fields.saveTo[0] + '/';

        if (!fs.existsSync(savePath)){
            fs.mkdirSync(savePath);
        }

        if (err) { return handleError(res, err) };
        if (!uploadFiles) { return res.status(404).send('Files are missing'); }

        _.values(uploadFiles).map(function(files) {
            for(var i in files) {

                var uploadFiles = function (file) {
                    easyimage.resize({
                        src: file.path, dst: file.path,
                        width:1280, height:720,
                    }).then( function (image) {
                        fs.readFile(image.path, function (err, data) {
                            if (err) { return handleError(res, err) };
                            
                            images.push({
                                original: savePath + image.name,
                                thumbnail: savePath + image.name,
                            });

                            fs.writeFile(savePath + image.name, data, function (err) {
                                if (err) { return handleError(res, err) };
                            });

                            if (images.length == files.length) {
                                return res.status(201).json(images);
                            };
                        });
                    },

                    function (err) {
                        return handleError(res, err);
                    });
                };

                uploadFiles(files[i]);
            }
        });
    })
}

function handleError(res, err) {
  return res.status(500).send(err);
}