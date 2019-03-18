var querystring = require('querystring');
var https = require('https');
var path = require("path");
var fs = require('fs');
var underscore = require("underscore");
var md5 = require("MD5");
var request = require('request');
var FormData = require('form-data');


var Taobao = function (options) {
    this.options = {
        app_key:null,
        app_secret:null,
        access_token:null,
        user_id:0,
        refresh_token:null,
        format:"JSON",
        redirect_uri:"",
        api_group:[],
        scope:""
    };
    
    underscore.extend(this.options, options);

    this.oauth=this._oauth();

};

Taobao.prototype._oauth = function () {
    var self = this;
    return {
        //生成authorize url
        authorize:function () {
            var options = {
                client_id:self.options.app_key,
                response_type:"code",
                redirect_uri:self.options.redirect_uri,
                view:"wap",
                from_site:"fuwu"


            };
            return  'https://oauth.taobao.com/authorize?' + querystring.stringify(options);
        },
        //用code换取accesstoken
        accesstoken:function (code, callback) {
            var options = {
                grant_type:"authorization_code",
                code:code,
                client_id:self.options.app_key,
                client_secret:self.options.app_secret,
                redirect_uri:self.options.redirect_uri
            };

            var post_body = querystring.stringify(options);
            var headers = {};
            //    headers ["Content-length"] = post_body ? post_body.length : 0;
            headers ["Content-Type"] = 'application/x-www-form-urlencoded';
            var opts = {
                host:"https://oauth.taobao.com/",
                path:'token',
                method:'POST',
                headers:headers
            };
            request({
                url:opts.host+opts.path,
                method:'POST',
                headers:headers,
                body:post_body
            },function(e,r,body){
                //console.log(body)
                body=JSON.parse(body)
                callback&&callback({},body)
            })
        //   self.base._request(opts, post_body, callback);
        }
    }
};


exports.Taobao = Taobao ;
