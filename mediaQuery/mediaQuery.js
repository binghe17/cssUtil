mediaQuery = (function() {

  // Same as in bootstrap/_variables.less
  // var screenXs = 480; // Not used
  var screenSm = 768;
  var screenMd = 992;
  var screenLg = 1200;

  var screenXsMax = screenSm - 1;
  var screenSmMax = screenMd - 1;
  var screenMdMax = screenLg - 1;

  return {

    /**
     * match() returns true
     * if there's any match to the media query
     *
     * @param {String} str
     * @return {Boolean}
     *
     * ex1: mediaQuery.match('xs')
     * ex2: mediaQuery.match('md lg')
     */
    match: function(str) {
      var arr = str.split(/[\s,|]+/);

      // If there's any match, return true.
      for (var i = 0; i < arr.length; i++) {
        switch (arr[i]) {
          case 'xs':
            if (window.matchMedia('(max-width: ' + screenXsMax + 'px)').matches)
              return true;
            break;
          case 'sm':
            if (window.matchMedia('(min-width: ' + screenSm + 'px) and (max-width: ' + screenSmMax + 'px)').matches)
              return true;
            break;
          case 'md':
            if (window.matchMedia('(min-width: ' + screenMd + 'px) and (max-width: ' + screenMdMax + 'px)').matches)
              return true;
            break;
          case 'lg':
            if (window.matchMedia('(min-width: ' + screenLg + 'px)').matches)
              return true;
            break;
        }
      }
      return false;
    }
  }
})();