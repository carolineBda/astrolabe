var _ = require('underscore');

function URL(base) {
    this.base   = base;
    this.paths  = [];
    this.params = {};
}

URL.prototype = Object.create({}, {
    url:   { get: function() { return this.base + this.path + this.query; } },
    path:  { get: function() { return this.paths.length ? '/' + this.paths.join('/') : ''; }},
    query: {
        get: function() {
            var params = _.map(this.params, function(param, key){ return key + '=' + param; });
            return params.length ? '?' + params.join('&') : '';
        }
    }
});
URL.prototype.addPath = function() {

    var self = this;

    _.each(arguments, function(arg) {
        self.paths.push(arg);
    });

    return self;
};
URL.prototype.addParams = function(params) {
    _.extend(this.params, params);
    return this;
};

module.exports = URL;