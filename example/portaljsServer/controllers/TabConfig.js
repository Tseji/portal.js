'use strict';

var utils = require('../utils/writer.js');
var TabConfig = require('../service/TabConfigService');

module.exports.userApiUserIdGET = function userApiUserIdGET (req, res, next) {
  var userId = req.swagger.params['userId'].value;
  TabConfig.userApiUserIdGET(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userApiUserIdPOST = function userApiUserIdPOST (req, res, next) {
  var userId = req.swagger.params['userId'].value;
  var tabconfig = req.swagger.params['tabconfig'].value;
  TabConfig.userApiUserIdPOST(userId,tabconfig)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
