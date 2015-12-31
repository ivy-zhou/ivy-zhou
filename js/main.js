/*
 * Version - 0.0.0 - Dec 28, 2015
 * Ivy Zhou
 * Functionality for offscreen navigation, works by swiping as well!
 */

// toggles navigation menu in and out for page by clicking nav icon
function toggleNav() {
  if($("#nav-tab").attr("class") == "closed")
    openNav();
  // close out nav if we're open right now
  else
    closeNav();

  $("#nav-tab").toggleClass("closed"); // change states so we know what to do next time
};

// toggles navigation menu in and out for page by swiping on page
$('body').swipe({
  swipeStatus: function(event, phase, direction, distance, duration, fingers){
    if (phase=="move" && direction =="right"){
      openNav();
      return false;
    }
    if (phase == "move" && direction =="left"){
      closeNav();
      return false;
    }
  }
});

// jquery animation, too slow, change in the future
function openNav() {
  $('#nav').animate({left: "0px"}, 200);
  $('body').animate({left: "240px"}, 200);
};

function closeNav() {
  $('#nav').animate({left: "-240px"}, 200);
  $('body').animate({left: "0px"}, 200);
};
