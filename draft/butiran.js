/*
	butiran.js
	Include related JavaScript files for simulation of physical
	system based on granular particle
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180106
	Create this file.
	Modified script proposed by Michael Sharman from
	http://chapter31.com
	/2006/12/07/including-js-files-from-within-js-files/
	which is more compact than proposed by e-satis from
	https://stackoverflow.com
	/questions/950087/how-do-i-include-a-javascript-file
	-in-another-javascript-file as answered Jun 4 '09 at 12:13
	and still avoiding ECMAScript 6.
	20180222
	Change the name from grains.js to butiran.js and upload to
	GitHub, also try to improve loadScript but still fails.
	20180224
	Delete repo in GitHub and recreate it.
	Change license to MIT one.
*/

/*
	Include JS file
	By Michael Sharman December 7, 2006
	http://chapter31.com/2006/12/07
	/including-js-files-from-within-js-files/
*/
function include(file) {
	var script = document.createElement ("script");
	script.src = file;
	script.type = "text/javascript";
	script.defer = true;
	
	var head = document.getElementsByTagName("head");
	head.item(0).appendChild(script);
}

/*
	Execute callback after the script loaded
	By e-satis on Jun 4 '09 at 12:13
	URL https://stackoverflow.com/questions/950087
	/how-do-i-include-a-javascript-file-in-another
	-javascript-file
*/
function loadScript(url, callback) {
	var head = document.getElementsByTagName("head")[0];
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	script.async = false;
	
	script.onreadystatechange = callback;
	script.onload = callback;
	
	head.appendChild(script);
}

/*
	Modified further using trial and error method
	20180222.1832 !ok
*/
function loadScripts(scripts, i) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = scripts[i];
	script.async = false;
	
	script.onreadystatechange = callback;
	script.onload = callback;
		
	if(i < scripts.length - 1) {
		document.head.appendChild(script);
	}
	
	function callback() {
		loadScripts(scripts, i + 1);
	}
}

var scripts = [
	"grains/vect3.js",
	"grains/particle.js",
	"grains/sphere.js",
	"grains/grid4.js",
	"grains/field.js",
	"grains/force.js",
	"grains/point2.js",
	"color/rgb.js",
	"canvas/graphics.js",
	"data/dataxy.js",
	"canvas/transform.js",
	"canvas/xychart.js",
	"test/test.js",
	"canvas/chart2.js",
	"canvas/xyseries.js"
];
loadScripts(scripts, 0);
