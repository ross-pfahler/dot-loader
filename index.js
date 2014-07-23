var dot = require('dot');
var fs = require('fs');

module.exports = function(content) {
  if (this.cacheable) {
    this.cacheable();
  }

  var content = fs.readFileSync(this.resourcePath);
  return "module.exports = " + doT.template(content);
};
