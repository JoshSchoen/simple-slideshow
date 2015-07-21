function slideSwitch() {
  //set active main image & thumbnails
    var $active = $('#slideshow IMG.active');
    var $activeThumbs = $('#thumbs IMG.active');

    //check is active image exisits
    if ( $active.length == 0 ) $active = $('#slideshow IMG:last');
    if ( $activeThumbs.length == 0 ) $activeThumbs = $('#slideshow IMG:last');
    //next images
    var $next =  $active.next().length ? $active.next()
        : $('#slideshow IMG:first');
    var $nextThumbs =  $activeThumbs.next().length ? $activeThumbs.next()
        : $('#thumbs IMG:first');
    //add transitions
    $active.addClass('last-active');
    $next.css({opacity: 0.0})
        .addClass('active')
        .animate({opacity: 1.0}, 1000, function() {
            $active.removeClass('active last-active');
        });
      $activeThumbs.addClass('last-active');
      $nextThumbs.addClass('active')
      .animate({opacity: 1.0}, 1000, function() {
      $activeThumbs.removeClass('active last-active').removeAttr('style', 'opacity');

        });
}

$( document ).ready(function() {
//set delay of image switch
$(function() {

    var slideTimer = setInterval("slideSwitch()", 5000 );
   
     $('#slideshow IMG').mouseover(function(){
      clearInterval(slideTimer);
    });

    $('#slideshow IMG').mouseout(function(){
      slideTimer = setInterval("slideSwitch()", 5000 );
    });
});
//manual switching on images
    $('#thumbs IMG').click(function() {

        var imgSrc = $(this).attr('src').split('/');
        var file = imgSrc[imgSrc.length-1];

        $('#slideshow IMG').removeClass('active');

          $('#slideshow IMG').each(function(index) {
            var imgSrcFull = $(this).attr('src').split('/');
            var fileFull = imgSrcFull[imgSrcFull.length-1];
          
            if (fileFull === file) {
                $(this).addClass('active');
            }
          });

          $('#thumbs IMG').removeClass('active').removeAttr('style', 'opacity');
          $(this).addClass('active');
  });
  //dyanmically calculate the height of the main image, sets the slide height 20px taller than the actual height to give teh thumbnail some spaces  
  $(window).resize(checkImageWidth);
    function checkImageWidth() {
    var imgHeight = $('#slideshow IMG').height();
    $('#slideshow').css('height', imgHeight + 20);

    }
//check intial height of the slideshow container
  $(window).load(function () {
   checkImageWidth();
   });

});