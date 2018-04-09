var dot = require('dot');
var fs = require('fs');
var loaderUtils = require('loader-utils');

module.exports = function(content) {
  var options = loaderUtils.getOptions(this);
  if (this.cacheable) {
    this.cacheable();
  }

  options.selfcontained = true;
  dot.templateSettings = Object.assign(dot.templateSettings, options);

  var content = fs.readFileSync(this.resourcePath);
  return "module.exports = " + dot.template(content);
};
