/**
 * Using Rails-like standard naming convention for endpoints.
 * POST     /upload              ->  index
 */

'use strict';
var _ = require('lodash'),
    multiparty = require('multiparty'),
    easyimage = require('easyimage'),
    knox = require('knox'),
    http = require('http'),
    request = require("request"),
    aws = require('aws-sdk'),
    s3 = require('s3'),
    variables = require('../../config/variables');

var AWS_ACCESS_KEY = variables.AMAZONS3.AWS_ACCESS_KEY  || '',
    AWS_SECRET_KEY = variables.AMAZONS3.AWS_SECRET_KEY  || '',
    S3_BUCKET = variables.AMAZONS3.S3_BUCKET  || '';

exports.index = function (req, res) {
    var uploadFolder = req.body.uploadFolder || req.params.uploadFolder || '/',
        makeCrop = req.body.makeCrop || req.params.makeCrop || false,
        makeThumbnail = req.body.thumbnail || req.params. makeThumbnail || false,

        form = new multiparty.Form();

    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
    var s3 = new aws.S3();

    form.parse(req, function (err, fields, files) {
        var uploadFiles = files;

        var images = [];
        if (err) { return handleError(res, err); };
        if (!uploadFiles) { return res.status(404).send('Аiles are missing'); }
        
        _.values(uploadFiles).map(function(files) {
            for(var i in files) {
                easyimage.rescrop({
                     src: files[i].path, dst: files[i].path,
                     width:500, height:500,
                     cropwidth:128, cropheight:128,
                     x:0, y:0
                  }).then(
                  function(image) {
                    images.push(image)

                    if (images.length == files.length) {

                        var data = images;

                        var s3_params = {
                            Bucket: S3_BUCKET,
                            Key: images[0].name,
                            Expires: 10000,
                            ContentType: images[0].type,
                            ACL: 'public-read'
                        };

                        s3.getSignedUrl('putObject', s3_params, function (err, data) {
                            if(err){
                                console.log('!!!!!', err);
                                res.status(400).send(err);
                            }
                            else {
                                var return_data = {
                                    signed_request: data,
                                    url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+ images[0].name
                                };
                                console.log(return_data);

                                request({
                                    method: 'PUT',
                                    uri: return_data.signed_request,
                                    form: images,
                                    headers: {
                                        'Content-Type': images[0].type,
                                    },
                                }, function(error, response, body) {
                                  console.log(error, body);
                                });
                            }
                        });

                        return res.status(200).json(images);
                    };
                  },
                  function (err) {
                    return handleError(res, err);
                  }
                );
            }
        });
    })
}

function handleError(res, err) {
  return res.status(500).send(err);
}