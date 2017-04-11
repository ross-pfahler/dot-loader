var dot = require('dot');
var fs = require('fs');
var path = require('path');

function findConfig(dir, filename){
	var configPath = path.join(dir, filename);
	if (fs.existsSync(configPath)){
		return fs.readFileSync(configPath);
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
