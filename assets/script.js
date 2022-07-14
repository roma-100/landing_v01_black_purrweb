//**** Collect the data */ 
// Calculate browser width
const browWidth = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;
//console.log('doc width: ' + browWidth);


// define object data
const animateVision = {
    'phone': {
        'elem': document.getElementById('vision_phone'),
        'degrStart': 90, //degrees
		'leftPosStart': - browWidth*0.12,
		'leftPosEnd': (browWidth-500)/2, //%
    },
    'article': {
        'elem': document.getElementById('vision_article--block'),
		'topPosStart': 350, //px
		'topPosEnd': 600 //px
    }
}; 


/* https://javascript.info/js-animation */
/* ***** Animator ***** */
function animate({duration, draw, timing}) {

	let start = performance.now();
  
	requestAnimationFrame(function animate(time) {
	  let timeFraction = (time - start) / duration;
	  if (timeFraction > 1) timeFraction = 1;
  
	  let progress = timing(timeFraction)
  
	  draw(progress);
  
	  if (timeFraction < 1) {
		requestAnimationFrame(animate);
	  }
  
	});
  }

//*** universal rotation function */ 
const rotatePhoneElem = ((degrees) => {
	const elem  = animateVision.phone.elem;

	if(navigator.userAgent.match("Chrome")){
		elem.style.WebkitTransform = strRotate;
	} else if(navigator.userAgent.match("Firefox")){
		elem.style.MozTransform = strRotate;
	} else if(navigator.userAgent.match("MSIE")){
		elem.style.msTransform = strRotate;
	} else if(navigator.userAgent.match("Opera")){
		elem.style.OTransform = strRotate;
	} else {
		elem.style.transform = strRotate;
	}
  })

/* Animating two obgects simontaniously */
function animeVision() {
	const a = animateVision.phone;
	const elem1  = animateVision.phone.elem;
	let degrees = a.degrStart;

	const b = animateVision.article;
	const elem2  = animateVision.article.elem;

	animate({ // **** transition the object ****
		duration: 2000, //ms 
		timing: function(timeFraction) { //sort of time function 
		return timeFraction;
		},
		draw: function(progress) { //progress is the consequences 0....100
		//moving part
		const leftPos = a.leftPosStart + (progress * a.leftPosEnd - a.leftPosStart) ;
		elem1.style.left = leftPos + 'px';
		//rotate part	
		step = degrees - progress*degrees;
		strRotate = 'rotate(' + step + 'deg)';
		rotatePhoneElem (strRotate);
		}
	}),
	animate({ // **** transition the object ****
		duration: 1000, //ms 
		timing: function(timeFraction) { //sort of time function 
		return timeFraction;
		},
		draw: function(progress) { //progress is the consequences 0....100
		//moving part
		elem2.style.top = 
			b.topPosStart + progress*(b.topPosEnd - b.topPosStart) + 'px';
		elem2.style.opacity = 1 - progress;	
			if (progress === 1) {
				elem2.style.display = 'none';
			}
		}
	})	

};
/* hold event */
/* animateVision.phone.elem.onclick = function(){
	if (browWidth >= 700 ) {
		animeVision();
	}
}
 */
let animatePassed = false;

// add listener of the Vision's region
window.addEventListener('scroll', function() {
	lastScrollY = window.scrollY;
	if (animatePassed) return; // test the reason of continue

	if (lastScrollY > 1500 
		&& lastScrollY < 2000
		&& browWidth >= 700) {
			window.requestAnimationFrame(animeVision);
			animatePassed = true;
	  }
  });

/* cookie */

/* **************************
Start Cookie Alert after 8 sec 
******************************/

window.addEventListener('load', function() {setTimeout});
const alertDuration = 5000; //ms
const alertDelay = 2000; //mc

function animeCookieAlertOn() {
	const a = document.getElementById('cookie-alert');//document.getElementById('cookie-alert')

	animate({ // **** transition the object ****
		duration: alertDuration, //ms 
		timing: function(timeFraction) { //sort of time function 
		return timeFraction;
		},
		draw: function(progress) { //progress is the consequences 0....100
		a.style.opacity = progress;
		i = progress*100 -100;
		a.style.bottom = i + 'px';
		}
	})
};

setTimeout(function() {
	animeCookieAlertOn();	
  }, alertDelay);
//************************************** */  

/* **************************
Start Cookie Alert button event 
******************************/

document.getElementById('cookie-alert-btn').onclick = function(){ //cookie-alert
	a = document.getElementById('cookie-alert')
	a.style.display = 'none';
}





/******** Empty fields test  *********/
/* 
***** Form Kingdom ********

*/

const form = document.getElementById('form_q');
//get nummbers of Inputs on this form (except Submit)
const elemetsInput = form.getElementsByTagName("input").length;
//document.getElementById('form_q')  //document.querySelector('form')  

form.addEventListener('submit', function (e) {
  let flagEmpty = true; //suppose all fields is empty
  for (var i = 0; i < elemetsInput; i++){
    if (form.elements[i].value != '') {
      flagEmpty = false; // field is not empty
      break; //found not empty. Stop iteration.
    }
  }
    // let's red color the fields and stop submitting
  if (flagEmpty) {
    recolorInput();  
    e.preventDefault(); //stop form from submitting
    console.log('This form is empty!');
  }
});

// refresh the class
function recolorInput(){
  for (var i = 0; i < elemetsInput; i++){
    form.elements[i].classList.remove ('form_item');
    form.elements[i].classList.add ('form_item_warning');
  }    
}

/* document.getElementById('cookie-alert-btn').onclick = function(){ //cookie-alert
	a = document.getElementById('cookie-alert')
	a.style.display = 'none';
} */