/*jshint esversion: 6 */

(function () {
  var bodyEl = document.body,
		content = document.querySelector('.content-wrap'),
		openbtn = document.getElementById('open-button'),
		isOpen = false;
	
	function toggleMenu() {
    if (isOpen) {
			bodyEl.classList.remove('show-menu');
    } else {
			bodyEl.classList.add('show-menu');
    }
    isOpen = !isOpen;
  }
	
	function isCanvasSupported(){
  	var elem = document.createElement('canvas');
  	return !!(elem.getContext && elem.getContext('2d'));
	}
	
  function initEvents() {
    openbtn.addEventListener('click', toggleMenu);

		// close the menu element if the target it´s not the menu element or one of its descendants..
    bodyEl.addEventListener('click', function (ev) {
			if(!document.querySelector('.menu-wrap').contains(ev.target) && !openbtn.contains(ev.target) && document.querySelector('.content-wrap').contains(ev.target)) {
				bodyEl.classList.remove('show-menu');
				isOpen = false;
			}
    });
  }
	
  initEvents();
	
	// If the canvas isn't supported draw the background
	if(!isCanvasSupported()) {
		document.getElementsByClassName('content-wrap')[0]
			.style.backgroundColor = "#FED18C";
	}
	
	
}());

