module.exports.register = function (Handlebars) {
    'use strict';

    Handlebars.registerHelper('webfont', function (name) {

        name = name.replace(/\s/g, '+');

        if(name) {
            return new Handlebars.SafeString('<link href="//fonts.googleapis.com/css?family='+ name +'" rel="stylesheet" type="text/css">');
        }

        return name;
    });
};