/*
 * Version - 0.0.0 - Dec 28, 2015
 * Ivy Zhou
 * Functionality for offscreen navigation, works by swiping as well
 * Animates level of profieceny on each skill
 * Hides/shows info on the Conway cavnas
 * Scrolls to sections from menu bar
 */

// Menu scroll
 $("#projects-link").click(function(event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $("#projects").offset().top
    }, 1000);
 });
 $("#about-link").click(function(event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $("#about").offset().top
    }, 1000);
 });
 $("#home-link").click(function(event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $("#home").offset().top
    }, 1000);
 });

// toggles navigation menu in and out for page by clicking nav icon
function toggleNav() {
  if($("#nav-tab").attr("class") == "closed")
    openNav();
  // close out nav if we're open right now
  else
    closeNav();
  $("#nav-tab").toggleClass("closed"); // change states so we know what to do next time
}

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

function openNav() {
  $('#nav').animate({left: "0px"}, 200);
  $('body').animate({left: "240px"}, 200);
}

function closeNav() {
  $('#nav').animate({left: "-240px"}, 200);
  $('body').animate({left: "0px"}, 200);
}


function toggleConwayInfo() {
  // if the button has been clicked before, don't pulse anymore!
  if(localStorage.getItem("cButtonClicked") !== null)
    $("#conway-info-button").addClass("NoAnimation");

  localStorage.setItem("cButtonClicked", "clicked");

  // do an svg line drawing here in the future
  if($("#conway-info").attr("class") == "hidden")
    $("#conway-info").css("opacity", 0).animate({opacity:1}, 600);
  else
    $("#conway-info").css("opacity", 1).animate({opacity:0}, 400);
  $("#conway-info").toggleClass("hidden");
}

// animate tags on about page, need a more specific selector in the future
// need to figure out how to dynamically resize li objects to create slide-in, slide-out effect!
$('#quick-stats > ul > li').hover(
  // hover in
  function()
  {
    if($(this).hasClass('proficient')){
    // append "proficient", "familiar", "learning" tags
      var object = this;
      // $(object).append(" | Proficient");
      $(object).css("background-color", "#59CD90");

      // implement resize with animation later
      // $(object).css({'width': $(object).width() + 'px'});
    }
    if($(this).hasClass('familiar')){
      $(this).css("background-color", "#FFCB47");
    }
    if($(this).hasClass('learning')){
      $(this).css("background-color", "#EE6352");
    }
  },

  //hover out
  function()
  {
    if($(this).hasClass('proficient') || $(this).hasClass('familiar') ||
      $(this).hasClass('learning')){
      // $(this).html($(this).html().split(" | Proficient").join(""));
      // $(this).css({'width': $(this).width() + 'px'});
      $(this).css("background-color", "#ddd");
    }
  }
);

// creates the appropriate animations to start
$(document).ready(function() {
  if(localStorage.getItem("cButtonClicked") !== null)
    $("#conway-info-button").addClass("NoAnimation");
});
