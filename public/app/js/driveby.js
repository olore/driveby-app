DriveBy = {};

DriveBy.initialize = function() {

  $(document).ajaxError(function(e, jqxhr, settings, exception) {
    console.log( "ajax error: " + exception);
  });

  $(document).bind("mobileinit", function(){
    $.mobile.touchOverflowEnabled = true;
    $.mobile.defaultPageTransition = "slide";
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
  });

  $('#index').live('pageinit', function(event){
    console.log("woot");
  });

  $( '#new_post' ).submit( function( e ) {
    var f = $( this );
    e.preventDefault();
    $.post( "/posts", f.serialize(), function( data, textStatus, jqXHR ){
      if (data['success'] == true) {
        $.mobile.changePage("/app/saved.html", { reloadPage: true}); //, { transition: "slideup"} );
      } else {
        $.mobile.changePage("/app/error.html", { reloadPage: true}); //, { transition: "slideup"} );
      }
      
    });
    console.log("posted");
  });                    

};
