/**
 * Module dependencies.
 */
var scripts = require('scripts')
  , path = require('path')
  , fs = require('fs')
  , existsSync = fs.existsSync || path.existsSync // node <=0.6

module.exports = function(options) {
  if ('string' == typeof options) {
    options = { dirname: options }
  }
  options = options || {};
  var dirname = options.dirname || 'app/objects'
    , extensions = options.extensions
    , dir = path.resolve(dirname);
  return function node(id) {
    var aid = path.join(dir, id)
      , script = scripts.resolve(aid, extensions);
    //console.log('id', id, script);
    if (!existsSync(script)) { return; }
    var m = require(script);
    //console.log(m);
    if (m['@require']) {
      m['@require'] = m['@require'].map(function (dep) {
        if (['!', '_', '/'].indexOf(dep[0]) === -1) {
          return '/' + options.namespace + '/' + dep;
        }
        return dep;
      });
    }
    return m;
  }
}