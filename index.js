var dot = require('dot');
var fs = require('fs');
var loader-utils = require('loader-utils');
var path = require('path');

function findConfig(dir, filename){
	var path = path.join(dir, filename);
	if (fs.existsSync(path)){
		return fs.readFileSync(path);
	}

	var parentDir = path.dirname(dir);
	if (parentDir !== dir){
		return findConfig(parentDir, filename);
	}
}

module.exports = function(content) {
  if (this.cacheable) {
    this.cacheable();
  }

  const templateSettings = findConfig(path.dirname(this.context), '.dotrc');
  dot.templateSettings = templateSettings;
  dot.templateSettings.selfcontained = true;

  var content = fs.readFileSync(this.resourcePath);
  return "module.exports = " + dot.template(content);
};
