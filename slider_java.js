/* https://picsum.photos/300/200 photo generator */
/* https://javascript.info/js-animation */

const sliderWidth = 300; //px
const sliderHeight = 200; //px
const sliderGap = 10; //px
const slideDuration = 500; //ms
const slideDurationFast = 200; //ms

const imgPath = 'slider/img/';
let targetSet = [10, 1, 2];

const frameActive = document.getElementById('slide_2');
const frameLeft = document.getElementById('slide_1');
const frameRight = document.getElementById('slide_3');
//initial picture
frameActive.style.backgroundImage = 'url(' + imgPath + targetSet[1] + '.jpg)';

let disableClick = false;
let stepsMove = 0; // navigation steps

/* ***** Animator ***** */
function animate({duration, draw, timing}) {

	let start = performance.now();
  
	requestAnimationFrame(function animate(time) {
	  let timeFraction = (time - start) / duration;
	  if (timeFraction > 1) timeFraction = 1;
  
	  let progress = timing(timeFraction)
  
	  draw(progress);
  
	  if (timeFraction < 1) {
		requestAnimationFrame(animate); //it's the same wonder trick
	  }
  
	});
  }
/* service part start*/
function targetForward() {

    for (var i = 0; i <= 2; i++){
        targetSet[i] = ++targetSet[i];
            if (targetSet[i]>10) {
                targetSet[i] = targetSet[i] -10;
            }
        }

    console.log ('New set: ' + targetSet);
}

function targetBack() {
    for (var i = 0; i <= 2; i++){
        targetSet[i] = --targetSet[i];
            if (targetSet[i]<=0) {
                targetSet[i] = targetSet[i] + 10;
            }
        }
    console.log ('New set1: ' + targetSet);
}

// Determinator of Number
function isInt(value) {
    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
  }

function pointerActive(idItem){
    //clear activity
    for (var i = 1; i <= 10; i++){
        const d = document.getElementById('point_' + i);
        d.classList.remove("point--active");
    }
    const a = document.getElementById('point_' + idItem);
    a.classList.add("point--active");
}

function durationTime(){
    //slideDurationFast
    if (stepsMove != 0) {
        return slideDurationFast;
    } 
    return slideDuration;
}

/* service part end*/

function runForward(){
    disableClick =true;
    console.log ('Start set: ' + targetSet);
    frameActive.style.backgroundImage = 'url(' + imgPath + targetSet[1] + '.jpg)';
    frameRight.style.backgroundImage = 'url(' + imgPath + targetSet[2] + '.jpg)';

    animate({ // **** transition the object ****
		duration: durationTime(), //ms 
		timing: function(timeFraction) { //sort of time function 
		return timeFraction;
		},
		draw: function(progress) { //progress is the consequences 0....100
		//moving part
        const pathLength = sliderWidth + sliderGap;
		frameRight.style.right = -1 * pathLength + pathLength*progress + 'px';
        frameActive.style.right = pathLength*progress + 'px';
        if (progress === 1) { 
            frameActive.style.backgroundImage = 'url(' + imgPath + targetSet[2] + '.jpg)';
            frameActive.style.right = '0px';
            frameRight.style.right = -1 * pathLength + 'px';
            console.log ('End set: ' + targetSet);
            targetForward();
            disableClick = false;
            if (stepsMove != 0) {
                --stepsMove;
                runForward(); //wonder command looping itselves
            }else {
                pointerActive(targetSet[1]); //set active pointer
            }
            
        }
		}
	})
}  

function runBack(){
    disableClick =true;
    console.log ('Start set: ' + targetSet);
    frameActive.style.backgroundImage = 'url(' + imgPath + targetSet[1] + '.jpg)';
    frameLeft.style.backgroundImage = 'url(' + imgPath + targetSet[0] + '.jpg)';

    animate({ // **** transition the object ****
		duration: durationTime(), //ms slideDurationFast
        
		timing: function(timeFraction) { //sort of time function 
		return timeFraction;
		},
		draw: function(progress) { //progress is the consequences 0....100
		//moving part
        const pathLength = sliderWidth + sliderGap;
		frameLeft.style.left = -pathLength + pathLength*progress + 'px';
        frameActive.style.right =  -1* pathLength*progress + 'px';
        if (progress === 1) { 
            frameActive.style.backgroundImage = 'url(' + imgPath + targetSet[0] + '.jpg)';
            frameActive.style.right = '0px';
            frameLeft.style.left = -1 * pathLength + 'px';
            console.log ('End set: ' + targetSet);
            targetBack();
            disableClick = false;
            if (stepsMove != 0) {
                --stepsMove;
                runBack(); //wonder command looping itselves
            } else {
                pointerActive(targetSet[1]); //set active pointer
            }
        }
		}
	})
} 

//???window.requestAnimationFrame()
const bb = document.getElementById('btn-back');
bb.onclick = function(){
    if (disableClick) {
        return;
    }
    runBack();
}

const bf = document.getElementById('btn-fw');
bf.onclick = function(){
    if (disableClick) {
        return;
    }
    console.log('Hello forward');
    runForward();
    
    
}

/* ==== Experiment==== */
const onClick = (event) => {
    const idString = event.srcElement.id;
    const a = idString.split("point_");
    //pointer found. Let's show.
    isInt(a[1]) ? onMovie(parseInt(a[1])): false;

  }
window.addEventListener('click', onClick);

function onMovie(i) {
    if (disableClick) {
        return;
    }
    const st = i - targetSet[1];
    if (st > 0) {
        stepsMove = st -1;
        runForward();
        console.log('target: '+targetSet[1] + ', i: ' + i + ', st: ' + st);
    } else if (st < 0) {
        stepsMove = -1 * st -1;
        runBack();       
        console.log('target: '+targetSet[1] + ', i: ' + i + ', stepsMove: ' + stepsMove);
    }
    pointerActive(i); //set active pointer
 }



