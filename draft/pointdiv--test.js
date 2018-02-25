/*
	test_pointdiv.js
	
	20140418
	Create this example in HTML format (example2.html).
	20180224
	Convert to JS format and delete previous repo
	https://raw.githubusercontent.com/dudung
	/LineChart.js/master/Pointdiv.js
*/

// 20180224.0705 !ok
function createDiv0() {
/*
<div style="font-family: Times; font-weight: bold; font-size: 12pt; text-align: center;">
Drawing using HTML div tag and CSS style
<br /><br /><br /><br />
</div>
*/
}

// 20180224.0703 ok
function createDiv1() {
	var div = document.createElement("div");
	div.width = "300";
	div.height = "200";
	div.style.width = "300px";
	div.style.height = "200px";
	div.style.border = "1px black solid";
	div.style.position = "relative";
	document.body.appendChild(dv);
}

function test_pointdiv() {
	setparent("blank");
	setlinewidth(1);
	setlinecolor("red");
	circle(80, 100, 50);
	setlinewidth(2);
	setlinecolor("green");
	circle(150, 70, 50);
	setlinewidth(3);
	setlinecolor("blue");
	circle(220, 100, 50);
}
