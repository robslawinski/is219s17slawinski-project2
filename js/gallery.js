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
	document.getElementById("photo").src = mImages[mCurrentIndex];
	console.log('swap photo');
	//d
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
	
	$('img.moreIndicator').click(function()
	{
		if (this.hasClass("rot90"))
		{
			this.add("rot270").remove("rot90");
		}
		else if (this.hasClass("rot270"))
		{
			this.add("rot90").remove("rot270");
		}
		else{}
		$('div.details').fadeToggle("fast", function()
		{
			$('img.moreIndicator').slideUp();
		});
		$("#prevPhoto").click(function() 
		{
			mCurrentIndex = mCurrentIndex - 2;
			swapPhoto();
			console.log(mCurrentIndex);
		});
		$("#nextPhoto").click(function()
		{
			swapPhoto();
		});
	});

	
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

var imgLocation;
var description;
var date;
var src;

function GalleryImage(imgLoc, desc, dt, src) {
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	imgLocation = imgLoc;
	//2. description of photo
	description = desc;
	//3. the date when the photo was taken
	date = dt;
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
	src = src;
}