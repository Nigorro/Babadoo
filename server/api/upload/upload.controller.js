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
    // var uploadFolder = req.body.uploadFolder || req.params.uploadFolder || '/',
    //     makeCrop = req.body.makeCrop || req.params.makeCrop || false,
    //     makeThumbnail = req.body.thumbnail || req.params. makeThumbnail || false,
    //     form = new multiparty.Form();

    var form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
        var uploadFiles = files;
        var images = [];
        var imagesPath = '/uploadFiles/' + fields.saveTo[0] + '/';
        var savePath = '.' + imagesPath;
        var filesNumber = _.values(uploadFiles).length;
        var filesArr = _.values(uploadFiles);


        var upload = function (file) {
            easyimage.resize({
                src: file[0].path, dst: file[0].path,
                width:1280, height:720,
            }).then( function (data) {
                var image = data;
                fs.readFile(image.path, function (err, data) {
                    if (err) { return handleError(res, err) }
                    
                    images.push({
                        original: imagesPath + image.name,
                        thumbnail: imagesPath + image.name,
                    });

                    fs.writeFile(savePath + image.name, data, function (err) {
                        if (err) { return handleError(res, err) }
                    });

                    if (images.length === filesNumber) {
                        return res.status(201).json(images)
                    }
                })
            },

            function (err) {
                return handleError(res, err);
            });
        };

        if (!fs.existsSync(savePath)){
            fs.mkdirSync(savePath);
        }

        if (err) { return handleError(res, err) }
        if (!uploadFiles) { return res.status(404).send('Files are missing'); }

        for (var i = 0; i < filesArr.length; i++) {
            upload(filesArr[i]);
        }
    })
}

function handleError(res, err) {
  return res.status(500).send(err);
}