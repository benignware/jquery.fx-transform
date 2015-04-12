var CSSMatrix = require('../vendor/components/arian-css-matrix');
module.export = (function($) {

  // Detect transform style
  var transformStyle = (function(prop, prefixes) {
    var i,
      elem = document.createElement('div'),
      capitalized = prop.charAt(0).toUpperCase() + prop.slice(1);
    for (i = 0; i < prefixes.length; i++) {
      if (typeof elem.style[prefixes[i] + capitalized] !== "undefined") {
        return prefixes[i] + capitalized;
      }
    }
    return null;
  })('transform', ['', 'Moz', 'Webkit', 'O', 'Ms']);
  if (!transformStyle || typeof CSSMatrix === 'undefined') {
    // Not supported
    return;
  }

  // Register plugin
  $.extend($.fx.step, {
    transform: function(tween) {
      $(tween.elem).css(transformStyle, tween.start);
      var start = $(tween.elem).css(transformStyle);
      $(tween.elem).css(transformStyle, tween.end);
      var end = $(tween.elem).css(transformStyle);
      var startMatrix = new CSSMatrix(start);
      var endMatrix = new CSSMatrix(end);
      var nowMatrix = startMatrix;
      if (startMatrix !== endMatrix) {
        nowMatrix = new CSSMatrix();
        for (var param in endMatrix) {
          if (typeof endMatrix[param] === 'number') {
            nowMatrix[param] = ( endMatrix[param] - startMatrix[param] ) * tween.pos + startMatrix[param];
          }
        }
      }
      tween.now = nowMatrix.toString();
      tween.elem.style[transformStyle] = tween.now;
    }
  });
})(jQuery);