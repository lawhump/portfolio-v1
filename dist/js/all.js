var $ = function $(query) {
    var res = document.querySelectorAll(query);
    if (res.length === 1) {
        return res[0];
    }
    return res;
};

var interests = [
                  "data visualizations", "rock climbing", "ideating",
                  "triangles", "eclectic music", "geometric design", "Radiolab",
                  "Ruby", "adventuring", "dancing", "driving at night",
                  "coffee", "meeting new people", "India Pale Ales", "Java",
                  "being barefoot", "minimalism", "working with talented people",
                  "Orbit Wintermint gum", "taking public transportation",
                  "playing with dogs", "board games", "a tasteful romcom",
                  "browsing Dribbble", "ice skating", "oatmeal for breakfast",
                  "lending a helping hand", "functional programming",
                  "prototyping UI components", "seafood", "open world RPGs",
                  "Team Valor", "wireframing",
                  "contemplating impossible scenarios", "rainy days",
                  "the Christmas season", "teaching", "learning",
                  "expressive code"
                ];

var len = interests.length;
var index = Math.floor(Math.random() * (len));

var currDevice = $('.right .selected');
var address = $('.address');
var iframe = document.getElementById('iframe');
var dropdown = $('.dropdown');
var home = $('.home');
var projectPage = $('.project-page-wrapper');

var bodyWrapper = $('.body-wrapper');

var portfolio = $('section.portfolio');

var selectedProj;
var currentDesc;

var tabletWidth = 0.8*1280 + 30;
var laptopWidth = 0.8*768 + 30;



function ctaHandler () {
  function changeButton() {
    function submit() {
      var message = "Hey! My name is [name], and I'm contacting you regarding [a project/employment/to chat].";
      window.location='mailto:lawrenceh1993@gmail.com?subject=Hey Lawrence!&body=' + message;
    }

    var cta		= $('.cta');
    cta.classList.add('flat');
    cta.textContent = 'Hit Me Up'
    cta.removeEventListener('click', ctaHandler);
    cta.addEventListener('click', submit);
  }

	var me 		= $('.me img');
	var blurb = $('.blurb');

	// TODO animate me first, setTimeout for the blurb

	me.classList.add('shrink');
  // This can be done with CSS
  var blurb = $('.blurb');
  blurb.removeAttribute('hidden');

  window.setTimeout(function() {
    blurb.classList.add('show');
    changeButton();
  }, 100);
}

function resizeDevice(w) {
  var width = w;

  var phone = $('.right .fa-mobile');
  var tablet = $('.right .fa-tablet');
  var selected = $('.right .selected');

  if(width < 1300) {
    if(width < 1030) {
      selected.classList.remove('selected');
      phone.classList.add('selected');

      var iframeContainer = $('.iframe-container .container');
      iframeContainer.classList.remove('tablet');
      iframeContainer.classList.add('phone');

      currDevice = phone;
    }
    else {
      selected.classList.remove('selected');
      tablet.classList.add('selected');

      var iframeContainer = $('.iframe-container .container');
      iframeContainer.classList.remove('laptop');
      iframeContainer.classList.add('tablet');

      currDevice = tablet;
    }
  }
}

function showInterest () {
  var interest = interests[index];

  var interestSpan = $('.interest');
  interestSpan.textContent = interest;
  index = (index+1)%len;
}

(function() {

  function fadeMeIn() {
  	$('.me').classList.add('fadeIn');
  }

	fadeMeIn();
	showInterest();

	resizeDevice(window.outerWidth);
})();

$('.cta').onclick = ctaHandler;
$('.interest').onclick = showInterest;

$(".portfolio").addEventListener("click", function(e) {
	if(e.target && e.target.nodeName == "IMG") {
		var me = $('.me');
		var portfolio = $('.portfolio');

    window.scrollTo(0, 0);

		var visibleAddress = e.target.dataset.projectUrl.split('http://')[1];
    address.value = visibleAddress;

		selectedProj = dropdown.querySelector('[data-project="'+e.target.dataset.name+'"]');
		selectedProj.classList.add('selected');
		currentDesc = $('.descriptions .' + e.target.dataset.name);
    currentDesc.classList.add('fadeIn');
		currentDesc.removeAttribute('hidden');

		projectPage.classList.add('show');
    // window.setTimeout("projectPage.classList.add('show');", 300);

    bodyWrapper.classList.add('scroll');

    home.setAttribute('hidden', '');

    iframe.parentNode.parentNode.classList.add('active');

    var loadSite = function () { iframe.src = e.target.dataset.projectUrl; };
    window.setTimeout(loadSite, 1250);
	}
});

$(".top-bar .right").addEventListener("click", function(e) {
	if(e.target && e.target.nodeName == "I") {
    var iframeContainer = $('.'+currDevice.dataset.device);
    currDevice.classList.remove('selected');
    e.target.classList.add('selected');
    iframeContainer.classList.remove(currDevice.dataset.device);
    iframeContainer.classList.add(e.target.dataset.device);
    currDevice = e.target;
	}
});

dropdown.addEventListener("click", function(e) {
	if(e.target && e.target.nodeName == "LI") {
    selectedProj.classList.remove('selected');
    e.target.classList.add('selected');
    selectedProj = e.target;
    var visibleAddress = e.target.dataset.url.split('http://')[1];
    address.value = visibleAddress;
    iframe.src = e.target.dataset.url;

    currentDesc.classList.add('fadeOut');
    currentDesc.setAttribute('hidden', '');

    currentDesc = $('.descriptions .' + e.target.dataset.project);
    currentDesc.classList.add('fadeIn');
    currentDesc.removeAttribute('hidden');

    dropdown.classList.remove("hovered");
	}
});

dropdown.addEventListener("mouseenter", function(e) {
  dropdown.classList.add("hovered");
});

dropdown.addEventListener("mouseleave", function(e) {
  dropdown.classList.remove("hovered");
});


$(".left button").addEventListener("click", function(e) {
  bodyWrapper.classList.remove('scroll');
  iframe.parentNode.classList.remove('active');
  currentDesc.classList.add('fadeOut');
  currentDesc.setAttribute('hidden', '');
	projectPage.classList.remove('show');
  home.removeAttribute('hidden');
  iframe.src = "";
});

window.onresize = function(e) {
	resizeDevice(e.target.outerWidth);
};

// window.onscroll = function(e) {
//   console.log('bitch');
//   if (!projectPage.classList.contains('show')) {
//     portfolio.scrollTop += 10;
//   }
// };

$('.address').addEventListener('focus', function(e) {
  $('.iframe-container .address').select();
});

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
