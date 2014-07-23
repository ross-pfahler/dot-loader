# [dot](https://github.com/olado/doT) loader for [webpack](http://webpack.github.io/)

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var template = require("dot!./file.dot");
// => returns file.dot compiled as template function
```

### Recommended config

``` javascript
module.exports = {
  module: {
    loaders: [
      { test: /\.dot$/, loader: "dot-loader" }
    ]
  }
};
```

Then you only need to write: `require("./file.dot")`
