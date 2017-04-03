// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function getQueryParams(qs) {
	 qs = qs.split("+").join(" ");
	 var params = {},
		 tokens,
		 re = /[?&]?([^=]+)=([^&]*)/g;
	 while (tokens = re.exec(qs)) {
		params[decodeURIComponent(tokens[1])]
		= decodeURIComponent(tokens[2]);
	 }
	return params;
}

var $_GET = getQueryParams(document.location.search);
console.log($_GET["json"]); 

function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	 $('#slideShow').click(function(){
		$('.img').text(galleryImage.next());
	});
	mCurrentIndex++;
	if (mCurrentIndex >= mImages.length)
	{
		mCurrentIndex = 0;
	}
	
	var mImg = mImages[mCurrentIndex];
	console.log("swapfoto: " + mImg.imgPath);
	document.getElementById("photo").src = mImg.imgPath;
	document.getElementsByClassName("location")[0].innerHTML  = "location: " + mImg.imgLocation;
	document.getElementsByClassName("description")[0].innerHTML  = "description: " + mImg.description;
	document.getElementsByClassName("date")[0].innerHTML  = "date: " + mImg.date;
	
	console.log('swap photo');
}

// Counter for the mImages array
var mCurrentIndex = 0;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = "images.json";
// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

mRequest.onreadystatechange = function() 
{
	console.log("mRequest.onreadystatechange")
	// Do something interesting if file is opened successfully
	if (mRequest.readyState == 4 && mRequest.status == 200) 
	{
		try 
		{
		// Let’s try and see if we can parse JSON
			mJson = JSON.parse(mRequest.responseText);
		// Let’s print out the JSON; It will likely show as “obj”
			console.log(mJson);
			for(var i=0; i < mJson.images.length;i++)
			{
				mImages.push(new GalleryImage(mJson.images[i].imgLocation,mJson.images[i].description,mJson.images[i].date,mJson.images[i].imgPath));
				console.log(mJson.images[i].imgLocation + " " + mJson.images[i].description  + " " + mJson.images[i].date + " " + mJson.images[i].imgPath);
			}
		} 
		catch(err) 
		{
			console.log(err.message)
		}
	}
};
console.log("mRequest Open " + mUrl);
mRequest.open("GET",mUrl, true);
mRequest.send();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson = {};

//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
	$('.moreIndicator').click(function()
	{
		console.log(".moreIndicator");
		
		
		
		
		if ($('.moreIndicator').hasClass("rot90"))
		{
			console.log("has rot90");
			$('.moreIndicator').addClass("rot270").removeClass("rot90");
			$('div.details').fadeToggle("fast", function()
			{
				$('div.details').slideDown();
			});
		}
		else if ($('.moreIndicator').hasClass("rot270"))
		{
			console.log("has rot270");
			$('.moreIndicator').addClass("rot90").removeClass("rot270");
			$('div.details').fadeToggle("fast", function()
			{
				$('div.details').slideUp();
			});
		}
		else
		{
			$('.moreIndicator').add("rot270")
		}
	
	});

	$('#prevPhoto').click(function(){
		console.log("prevPhoto");
		mCurrentIndex = mCurrentIndex - 2;
		if (mCurrentIndex < 0)
		{
			mCurrentIndex = mImages.length;
		}
		swapPhoto();
	});

	$("#nextPhoto").click(function()
	{
		console.log("nextPhoto")
		swapPhoto();
	});
	
	
});



window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage(imgLoc, desc, dt, src) {
	return {
		imgLocation: imgLoc,
		description: desc,
		date: dt,
		imgPath: src
    };
}