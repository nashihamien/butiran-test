/*
	graphics.js
	Function related for drawing object
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180107
	Create this library.
*/

// Add a canvas with some attributes
function addGraphics() {
	if(arguments.length == 1) {
		var arg = arguments[0];
		
		var id = arg.id;
		id = (id == undefined) ? "canvas" : id;
		
		var width = arg.width;
		width = (width == undefined) ? 200 : width;
		
		var height = arg.height;
		height = (height == undefined) ? 200 : height;
		
		var background = arg.background;
		background = (background == undefined) ? "#fafafa" : background;
		
		var border = arg.border;
		border = (border == undefined) ? "1px solid #f0f0f0" : border;
		
		var c = document.createElement("canvas");
		c.id = id;
		c.width = width;
		c.height = height;
		c.style.border = border;
		c.style.background = background;
		
		document.body.appendChild(c);
	}
}

// Plot (x, y) data
function plotSeries() {
	var tr = arguments[0];
	var data = arguments[1];
	
	var ctx = document.getElementById(tr.id).getContext("2d");
	ctx.strokeStyle = "#f00";
	var N = data.length;
	for(var i = 0; i <= N; i++) {
		var X = tr.getX(data.x[i]);
		var Y = tr.getY(data.y[i]);
		ctx.rect(X, Y, 1, 1);
		ctx.stroke();
	}
}