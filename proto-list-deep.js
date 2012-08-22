var ProtoList = require('proto-list'),
    inherits = require('inherits');

module.exports = ProtoListDeep;

function ProtoListDeep (delim) {
  this.delim = delim || ':';
  this.__defineGetter__('deepSnapshot', this.deep);
  ProtoListDeep.super.apply(this, arguments);
}
inherits(ProtoListDeep, ProtoList);

ProtoListDeep.prototype.flatten = function(obj) {
  var self = this, flat = {};
  Object.keys(obj).forEach(function(key) {
    if(Object.prototype.toString.call(obj[key]) === '[object Object]') {
      var child = self.flatten(obj[key]);
      Object.keys(child).forEach(function(childKey) {
        flat[key + self.delim + childKey] = child[childKey];
      });
    }
    else {
      flat[key] = obj[key];
    }
  });
  return flat;
};

ProtoListDeep.prototype.unflatten = function(obj) {
  var self = this, deep = {};
  Object.keys(obj).forEach(function(key) {
    var root = deep;
    var parts = key.split(self.delim);
    var last = parts.pop();
    parts.forEach(function(part) {
      if (!root[part]) root[part] = {};
      root = root[part];
    });
    root[last] = obj[key];
  });
  return deep;
};

ProtoListDeep.prototype.deep = function() {
  var self = this;
  var copy = self.list.slice(0);
  var flatList = new ProtoList();

  // Flatten all levels of the list.
  copy.forEach(function(level) {
    flatList.push(self.flatten(level));
  });

  // Unflatten the snapshot.
  return self.unflatten(flatList.snapshot);
};
