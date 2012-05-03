DriveBy = {};

DriveBy.states = [
 'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 
 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 
 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];

Handlebars.registerHelper('toLowerCase', function(value) {
  if (value == null) return 'nj';
  return new Handlebars.SafeString(value.toLowerCase());
});

DriveBy.add_recent_posts_to = function( recent_list ) {

  $.get( "/posts", function( posts ) {
    var post_source   = $("#recent_posts_template").html();
    var post_template = Handlebars.compile(post_source);

    $.each( posts , function(index, post) {
      recent_list.append(post_template( {'post': post} ));
    });

    recent_list.listview('refresh'); //apply the jqm style
    $(".timeago").timeago();

  });
};

DriveBy.initialize = function() {
  
  //add states
  $.each( DriveBy.states , function(index, state) {
    $( '.slider' ).append('<div class="item" id ="' + state + '"><a href="#"><img width="120" height="60" src="/app/images/' + state.toLowerCase() + '.jpg" /></a></div>');
  });

  //log any ajax errors
  $(document).ajaxError(function(e, jqxhr, settings, exception) {
    console.log( "ajax error: " + exception);
  });

  //listen for mobileinit (phonegap i think)
  $(document).bind("mobileinit", function(){
    $.mobile.touchOverflowEnabled = true;
    $.mobile.defaultPageTransition = "slide";
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
  });

  //listen to clicking to states
  var states = $( '.item' )
  states.bind("click", function(){
    states.css('background-color', '#F9F9F9');
    states.attr('data-selected', 'false');

    $( this ).css('background-color', 'cyan');
    $( this ).attr('data-selected', 'true');
  });

  DriveBy.add_recent_posts_to( $( '#recent-list' ) );

  //listen to pageinit (phonegap i think)
  $( '#index' ).live('pageinit', function(event){
    console.log('pageinit called');
  });

  //listen to new post being submitted
  $( '#new_post' ).submit( function( e ) {
    var f = $( this );
    e.preventDefault();

    var state   = $( '.item[data-selected=true]' ).attr('id');
    var plate   = $( '#license_plate' ).val();
    var comment = $( '#comment' ).val();
    var creator = $( '#creator' ).val();

    var params = {  state:          state, 
                    license_plate:  plate, 
                    comment:        comment, 
                    creator:        creator};

    $.post( "/posts", params, function( data, textStatus, jqXHR ){
      if (data['success'] == true) {
        $.mobile.changePage("/app/saved.html", { reloadPage: true, transition: "flip"} );
      } else {
        $.mobile.changePage("/app/error.html", { reloadPage: true, transition: "flip"} );
      }
      
    });
  });                    

};
