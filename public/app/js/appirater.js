/*global AppiraterData:true */
(function( Appirater, $, undefined ) {
  
  /* private */
  var APP_ID                  = 123454321;    //your app id 
  var DAYS_UNTIL_PROMPT       = 30;           //days
  var USES_UNTIL_PROMPT       = 20;           //count
  var SIG_EVENTS_UNTIL_PROMPT = -1;           //count
  var TIME_BEFORE_REMINDING   = 1;            //days

  Appirater.initialize = function() {
    if (rating_conditions_have_been_met) {
      console.log("ask user to rate!");
      return true;
    } else {
      console.log("don't ask user to rate!");
      return false;
    }
  };

  /* private */
  connected_to_network = function() {
  };

  seconds_since_now = function(then_date) {
  };

  show_rating_alert = function() {
  };

  rating_conditions_have_been_met = function() {
    var first_launch_date = AppiraterData.get('first_launch_date');
    var time_since_first_launch = Appirater.seconds_since_now(first_launch_date );
    var time_until_rate = 60 * 60 * 24 * Appirater.DAYS_UNTIL_PROMPT;

    if (time_since_first_launch < time_until_rate) {
      return false;
    }

    // check if the app has been used enough
    var use_count = parseInt(AppiraterData.get('use_count'), 10);
    if (use_count <= APPIRATER_USES_UNTIL_PROMPT) {
      return false;
    }

    // check if the user has done enough      significant events
    var sig_event_count = parseInt(AppiraterData.get('significant_event_count'), 10);
    if (sig_event_count <= APPIRATER_SIG_EVENTS_UNTIL_PROMPT) {
      return false;
    }

    // has the user previously declined to rate this version of the app?
    if (AppiraterData.get('declined_to_rate') === true) {
      return false;
    }

    // has the user already rated the app?
    if (AppiraterData.get('rated_current_version') === true) {
      return false;
    }

    // if the user wanted to be reminded later, has enough time passed?
    var reminder_request_date = AppiraterData.get('reminder_request_date');
    var time_since_reminder_request_date = Appirater.seconds_since_now(reminder_request_date);
    var time_until_reminder = 60 * 60 * 24 * Appirater.TIME_BEFORE_REMINDING;
    if (time_since_reminder_request_date < time_until_reminder) {
      return false; 
    }

    return true;
  };

  // call this on deviceready?
  Appirater.increment_use_count = function() {
    var version = '1.0'; //FIXME can we get the version of the app?
    var tracking_version = AppiraterData.get('current_version');
    if (tracking_version === undefined || tracking_version === '') {
      tracking_version = version;
      AppiraterData.set('current_version', version);
    }

    if (tracking_version === version) {
      var first_use_date = AppiraterData.get('first_use_date');
      if (first_use_date === undefined || first_use_date === '') {
        AppiraterData.set('first_use_date', Date.now());
      }
      
      AppiraterData.increment('use_count');
    } else {

      // it's a new version of the app, so restart tracking
      AppiraterData.set('first_use_date', Date.now());
      AppiraterData.set('use_count', 1);
      AppiraterData.set('significant_event_count', 0);
      AppiraterData.set('rated_current_version', false);
      AppiraterData.set('declined_to_rate', false);
      AppiraterData.set('reminder_request_date', 0);
    
    }


  };

  increment_significant_event_count = function() {
  };

  increment_and_rate = function() {
  };
  
  increment_significant_event_and_rate = function() {
  };
  
  app_launched = function() {
  };

  hide_rating_alert = function() {
  };

  app_entered_foreground = function() {
  };

  user_did_significant_event = function() {
  };

  rate_app = function() {
  };

  alert_view = function() {
  };

}( window.Appirater = window.Appirater || {}, jQuery ));
