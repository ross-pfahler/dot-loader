var dot = require('dot');
var fs = require('fs');
var path = require('path');

function findConfig(dir, filename){
	var configPath = path.join(dir, filename);
	if (fs.existsSync(configPath)){
		return JSON.parse(fs.readFileSync(configPath, {
			encoding: 'utf-8'
		}));
	}

	var parentDir = path.dirname(dir);
	if (parentDir !== dir){
		return findConfig(parentDir, filename);
	}

	return {};
}

module.exports = function(content) {
  if (this.cacheable) {
    this.cacheable();
  }

  dot.templateSettings.selfcontained = true;
  var templateSettings = findConfig(path.dirname(this.context), '.dotrc');
  dot.templateSettings = Object.assign(dot.templateSettings, templateSettings);
  
  var content = fs.readFileSync(this.resourcePath);
  return "module.exports = " + dot.template(content);
};
