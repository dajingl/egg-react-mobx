'use strict';

var apiClient = require('../lib/api/topClient.js').TopClient;
var tmcClient = require('../lib/tmc/tmcClient.js').TmcClient;
var taoBao = require("../lib/api/oauth.js").Taobao;
module.exports = {
    ApiClient: apiClient,
    TmcClient: tmcClient,
    Taobao : taoBao
};
