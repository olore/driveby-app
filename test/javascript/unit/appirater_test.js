(function( $ ) {

  module( "Appirater", {
    setup: function() {
    },
    teardown: function() {
      console.log("tearing down");
      localStorage.clear();
    }
  });


  test("a basic test example", function() {
    ok( true, "this test is fine" );
    var value = "hello";
    equal( value, "hello", "We expect value to be hello" );
  });

  test("AppiraterData.increment adds 1", function() {
    AppiraterData.set("foo", 1);
    AppiraterData.increment("foo");
    var actual = AppiraterData.get("foo");
    var expected = 2;
    equal( actual, expected, "We expect value to be incremented to 2" );
  });



  test("increment_use_count happy path", function () {
    var previous_use_count = 1;
    AppiraterData.set('use_count', previous_use_count);

    Appirater.increment_use_count();

    equal( AppiraterData.get('current_version'), '1.0', "expected current_version to be set to 1.0");
    equal( AppiraterData.get('use_count'), previous_use_count + 1, "expected use_count to be incremented");
    notEqual( AppiraterData.get('first_use_date'), null, "expected first_use_date to be set");

  });
  test("AppiraterData.increment returns updated value", function() {
    AppiraterData.set("foo", 10);
    var actual = AppiraterData.increment("foo");
    var expected = 11;
    equal( actual, expected, "We expect value to be incremented to 11" );
  });

  test("increment_use_count doesn't overwrite current_version", function () {
    AppiraterData.set('current_version', '5.5');
    Appirater.increment_use_count();
    equal(AppiraterData.get('current_version'), '5.5', "expected current_version not to change");
  });

  test("increment_use_count doesn't overwrite first_use_date", function () {
    AppiraterData.set('current_version', '1.0');
    AppiraterData.set('first_use_date', 100);
    Appirater.increment_use_count();
    equal(AppiraterData.get('first_use_date'), 100, "expected first_use_date not to change");
  });


  test("increment_use_count resets data when new version", function () {
    AppiraterData.set('current_version', '1.2');

    Appirater.increment_use_count();

    equal(AppiraterData.get('use_count'), 1, "expected use count to be reset to 1")
    equal(AppiraterData.get('significant_event_count'), 0);
    equal(AppiraterData.get('rated_current_version'), false);
    equal(AppiraterData.get('declined_to_rate'), false);
    equal(AppiraterData.get('reminder_request_date'), 0);
    
  });
/*
    test("Appirater will not ask user to rate if we haven't passed the days_until_prompt", function () {
      
    });
*/
}( jQuery ) );


