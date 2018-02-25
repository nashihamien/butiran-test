/*
index_20180106.html
<!DOCTYPE html>
<html>
<head>
<title>code-repo</title>
<link rel="stylesheet" type="text/css" href="style.css">
</head>
<!--script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script-->

<script src="Grains.js"></script>

<body onload="test()">
<h1>code-repo</h1>
<p>
Sparisoma Viridi | dudung@gmail.com | https://dudung.github.io
</p>

<p>
<a href="logs.txt">logs.txt</a>,
<a href="mathjax/mjgauss.html.txt">mjgauss.html</a>,
<a href="mathjax/mjnernst.html.txt">mjnernst.html</a>,
<a href="textarea/tawresize.js.txt">tawresize.js</a>,
<a href="textarea/tawresize.html.txt">tawresize.html</a>.
<a href="grains/vect3.js">vect3.js</a>.
</p>

<script>

</script>

</body>
</html>


info.txt
[20180222]
url	https://rawgit.com/



logs.txt
Logs for code-repo project
Sparisoma Viridi | dudung@gmail.com | https://dudung.github.io

[20171203]
Start this code-repo project in order to collect all codes and scripts in one place. Code-repo files are index.html, style.css, and logs.txt. Today project produces tawresize.html and tawresize.js. There is an unsatisfactory display of file content, especially for html format. And for consistency all filenames have extension .txt additionally.

[20171204]
Implement of MathJax library in the topic related to Nernst equation. Numbering and equation environment can be implemented easily in a HTML file. Produced file is mjnernst.html.

[20171205]
Create example of Gauss law using MathJax and dynamic value. Charge parallel plates problem is chosen. It has not been yet finished. Output is mjgauss.html.

[20171226]
Try to create next examples based on function and saved in JS files called from a standar HTML file (index.html). Start over learning object in JS and make an example. Fail to accomplish and reiventing the wheel, recreate vect3.js while learning the non-existing operator-overloading in JS. Ref1: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create and Ref2: https://www.phpied.com/3-ways-to-define-a-javascript-class/ The file vect3.js is tested using console.

[20171227]
Add comment for clearer documentation for vect3.js file. Move vect3.js from sandbox to grains. Interesting to study https://www.edemsimulation.com/resources-learning/dem-literature-database/ about DEM (proprietary)

[20180105]
Try to learn about export and import but have not succeeded and still been confused.

[20180106]
Move mjgauss.html.txt, mjnernst.html.txt, and index.html (ranamed as index_20180106.html) to darkness. Erase MathJax folder. Move tawresize.js.txt and tawresize.html.txt to darkness. Erase also textarea folder. Define include function from Michael Sharman and call main function using onload event from body. Make grid4.js, sphere.js, and field.js. Try to make force.js but not yet finished.

[20180107]
Continue with force.js at 0459+07. Force from field such as gravitational, electrical, and magnetic. Tested in text. Make color/rgb.js (first file in other folder today). Sometimes error message: sphere.js:12 Uncaught ReferenceError: Particle is not defined at sphere.js:12 still coming up, if less than 0.017 s than first script reuired it (mostly related to Particle in sphere.js). Probablu due to Sphere extends Particle? Make data/dataxy.js and tested. Make canvas/transform.js and tested. And the structure
Grains.js
index.html
test.js
canvas -+- graphics.js
        +- transform.js
color --- rgb.js
darkness -+- index_20180106.html
          +- logs.txt
					+- mjgauss.html.txt
					+- mjnernst.html.txt
					+- style.css
					+- tawresize.html.txt
					+- tawresize.js.txt
data --- dataxy.js
grains -+- field.js
        +- force.js
        +- grid4.js
        +- particle.js
        +- point2.js
        +- sphere.js
        +- vect3.js
and close today at 2019 :-).

[20180106]
Make test folder and move test.js and logs.txt to the folder. Make test/test_parabolic with Euler method. Copy all to campus and add folder cpp from it at 0654 local time. 
function test_parabolic_1() --> requires plotSeries(tr, data) still in campus
function test_series() --> not flexible for max / min data
other two are ok.

[20180109]
Copy what left at campus. Not tested again. Assumed it still works.

[20180111]
Create test_svg in learning SVG. It is bunch of objects that already have interactivity.

[20180112]
Order darkness folder. Integrate CSS and JS into HTML and delete index.html file. Move logs.txt from test folder to root. Updated files are logs.txt and all in darkness folder.

Delete tawresize.html and integrate it to test_tawresize() in test.js file. Rename darkness to mjphys.


style.css
h2 {
	color: #77f;
	font-size: 14pt;
	font-weight: bold;
}

a {
	text-decoration: none;
	color: blue;
}

a:hover {
	text-decoration: underline;
	color: #a77;	
}


tawresize.js
//
	tawresize.js
	Resize textarea object as browser window is resized
	
	Sparisoma Viridi | dudung@gmail.com
	
	20171203
	Create this script and it works, but value of dwidth and
	dheight are still unknown, since document.style.padding
	and document.style.border are still empty.
	Change name from stretchwta to tawresize.
//

// Define some global parameters
dwidth = 22;
dheight = 26;

// Define main script
function exec() {
	createTextarea();
	window.addEventListener("resize", resizeTextarea, false);
}

// Create textarea object
function createTextarea() {
	var wiw = window.innerWidth;
	var wih = window.innerHeight;
	var ta = document.createElement("textarea");
	ta.id = "ta1";
	wiw -= dwidth;
	wih -= dheight;
	ta.style.width = wiw + "px";
	ta.style.height = wih + "px";
	document.body.appendChild(ta);
}

// Resize textarea as window is resized
function resizeTextarea() {
	var ta = document.getElementById("ta1");
	var wiw = window.innerWidth;
	var wih = window.innerHeight;
	wiw -= dwidth;
	wih -= dheight;
	ta.style.width = wiw + "px";
	ta.style.height = wih + "px";
}
*/