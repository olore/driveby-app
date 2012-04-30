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

  $( '.item' ).bind("click", function(){
    $( '.item' ).css('background-color', '#F9F9F9');
    $( '.item' ).attr('data-selected', 'false');

    $( this ).css('background-color', 'cyan');
    $( this ).attr('data-selected', 'true');
    //selected_state = $( this ).attr('id');
  });

  //go get recent posts
  $.get( "/posts", function( posts ) {

    //TODO: move this out somewhere
    var post_source = "<li><p title='{{post.created_at}}' class='timeago ui-li-aside'>{{post.created_at}}</p><h3>{{post.state}} {{post.license_plate}}</h3><p>{{post.comment}}</p></li>";
    var post_template = Handlebars.compile(post_source);

    $.each( posts , function(index, post) {
      $( "#recent-list" ).append(post_template( {'post': post} ));
    });
    $( '#recent-list' ).listview('refresh'); //apply the jqm style
    $(".timeago").timeago();

  });

  $( '#index' ).live('pageinit', function(event){
    console.log("woot");
  });

  $( '#new_post' ).submit( function( e ) {
    var f = $( this );
    e.preventDefault();

    var state   = $( '.item[data-selected=true]' ).attr('id');
    var plate   = $( '#license_plate' ).val();
    var comment = $( '#comment' ).val();
    var creator = $( '#creator' ).val();

    var params = { state: state, license_plate: plate, comment: comment, creator: creator};
    $.post( "/posts", params, function( data, textStatus, jqXHR ){
      if (data['success'] == true) {
        $.mobile.changePage("/app/saved.html", { reloadPage: true}); //, { transition: "slideup"} );
      } else {
        $.mobile.changePage("/app/error.html", { reloadPage: true}); //, { transition: "slideup"} );
      }
      
    });
    console.log("posted");
  });                    

};
