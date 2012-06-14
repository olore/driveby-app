(function( $ ) {

  module( "AppiraterData", {
    setup: function() {
    },
    teardown: function() {
      localStorage.clear();
    }
  });

  test("AppiraterData.increment adds 1", function() {
    AppiraterData.set("foo", 1);
    AppiraterData.increment("foo");
    var actual = AppiraterData.get("foo");
    var expected = 2;
    equal( actual, expected, "We expect value to be incremented to 2" );
  });

  test("AppiraterData.increment returns updated value", function() {
    AppiraterData.set("foo", 10);
    var actual = AppiraterData.increment("foo");
    var expected = 11;
    equal( actual, expected, "We expect value to be incremented to 11" );
  });

}( jQuery ) );
