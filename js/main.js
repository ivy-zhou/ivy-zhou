/*
 * Version - 0.0.0 - Dec 28, 2015
 * Ivy Zhou
 * Functionality for offscreen navigation, works by swiping as well
 * Hides/shows info on the Conway cavnas
 * Scrolls to sections from menu bar
 * Highlights and unhighlights title sections
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
$("#nav-tab").click(function(){
    if($("#nav-tab").attr("class") == "closed")
      openNav();
    else
      closeNav();
    $("#nav-tab").toggleClass("closed"); // change states so we know what to do next time
  }
);

// toggles navigation menu in and out for page by swiping on page
$('body').swipe({swipeLeft:closeNav, swipeRight:openNav, allowPageScroll:'auto'});

function openNav() {
  $('#nav').animate({left: "0px"}, 200);
  $('body').animate({left: "240px"}, 200);
}

function closeNav() {
  $('#nav').animate({left: "-240px"}, 200);
  $('body').animate({left: "0px"}, 200);
}

$('#conway-info-button').click(function(){
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
);

// animate tags on about page?

// projects carousel using slick
$("#projects-carousel").slick({
  dots: true
});

// // fade in projects display
// $(".projects-container > img").mouseenter(function() {
//   console.log("you moused me over!");
//   //this.animate({filter: "greyscale(100%)"}, 200);
//   $(".project-description").show();
// }).mouseleave(function() {
//   $(".project-description").hide();
// });

// creates the appropriate animations to start
$(document).ready(function() {
  if(localStorage.getItem("cButtonClicked") !== null)
    $("#conway-info-button").addClass("NoAnimation");

  // reizes the projects and about sections to fit the browser window
  // $('#projects').css("height", $(window).height() + "px");
  // $('#projects').css("width", $(window).width() + "px");
  // $('#about').css("height", $(window).height() + "px");
  // $('#about').css("width", $(window).width() + "px");
});
