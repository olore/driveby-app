(function( AppiraterData, $, undefined ) {

  /* public */
  AppiraterData.get = function(key) {
    var value = localStorage[key];
    return value && JSON.parse(value);
  };
  
  AppiraterData.set = function(key, val) {
    localStorage[key] = JSON.stringify(val);
  };

  AppiraterData.increment = function(key) {
    AppiraterData.set(key, parseInt(AppiraterData.get(key) + 1, 10));
    return AppiraterData.get(key);
  };

}( window.AppiraterData = window.AppiraterData || {}, jQuery ));
