/*
	figures.js
	Figure for spring-mass-horiz-1d.html
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180222
	Create this file
*/

function drawFigure1() {
	var div = document.getElementById("fg:spring-mass-system");
	div.style.textAlign = "center";
	div.style.padding = "10px";
	var can = document.createElement("canvas");
	can.width = "300";
	can.height = "100";
	can.style.width = "300px";
	can.style.height = "100px";
	can.style.background = "#fff";
	div.appendChild(can);
	var br = document.createElement("br");
	div.appendChild(br);
	var cap = document.createElement("text");
	cap.innerHTML = "Gambar 1 Sistem pegas-benda di atas lantai mendatar tanpa gesekan."
	div.appendChild(cap);
	
	var cx = can.getContext("2d");
	cx.beginPath();
	cx.strokeStyle = "black";
	cx.lineWidth = "1";
	cx.moveTo(40, 30);
	cx.lineTo(40, 70)
	cx.lineTo(260, 70)
	cx.stroke();
	
	cx.beginPath();
	cx.strokeStyle = "blue";
	cx.lineWidth = "1";
	cx.rect(130, 30, 40, 40);
	cx.stroke();
	
	cx.beginPath();
	cx.strokeStyle = "#090";
	cx.lineWidth = "2";
	cx.moveTo(40, 50);
	cx.lineTo(60, 50);
	cx.lineTo(70, 40);
	cx.lineTo(75, 60);
	cx.lineTo(80, 40);
	cx.lineTo(85, 60);
	cx.lineTo(90, 40);
	cx.lineTo(95, 60);
	cx.lineTo(100, 40);
	cx.lineTo(110, 50);
	cx.lineTo(130, 50)
	cx.stroke();
	
	cx.fillStyle = "#000";
	cx.font = "italic 16px Times";
	cx.textAlign = "center";
	cx.fillText("m", 150, 55);
	cx.fillText("k", 90, 30);
	var c = "00b5";
	cx.fillText(String.fromCharCode(parseInt(c, 16)), 135, 90);
	cx.font = "normal 16px Times";
	cx.fillText(" = 0", 155, 91);
}

function drawFigure2() {
	var div = document.getElementById("fg:analytical-solution");
	div.style.textAlign = "center";
	div.style.padding = "10px";
	var can = document.createElement("canvas");
	can.id = "fg:analytical-solution-chart";
	can.width = "450";
	can.height = "250";
	can.style.width = "450px";
	can.style.height = "250px";
	can.style.background = "#eef";
	div.appendChild(can);
	var br = document.createElement("br");
	div.appendChild(br);
	var cap = document.createElement("text");
	cap.innerHTML = "Gambar 2 Solusi analitik untuk $k = 100\\pi^2$ N/m, $m = 2.5$ g, dengan syarat awal $x_0 = 1$ cm dan $v_0 = 0$ (satuan $x$ dalam m dan $t$ dalam s)."
	div.appendChild(cap);
	
	var xx = [];
	var yy = [];
	
	var T = 10E-3;
	var omega = 2 * Math.PI / T;
	var A = 0.01;
	var fi0 = 0.5 * Math.PI;
	var tmin = 0;
	var tmax = 25E-3;
	var N = 100;
	var dt = (tmax - tmin) / N;
	var t = tmin;
	while(t <= tmax) {
		var x = A * Math.sin(omega * t + fi0);
		var v = omega * A * Math.cos(omega * t + fi0);
		xx.push(t);
		yy.push(x);
		t += dt;
	}
	var xy = new XYSeries("x", xx, yy);
	xy.setColor("#f00");
	
	var chart = new Chart2(can.id);
	chart.setXRange({min: 0, max: 25E-3});
	chart.setYRange({min: -1.5E-2, max: 1.5E-2});
	chart.setXLabel("t");
	chart.setYLabel("x");
	chart.setBackground("#fff");
	chart.addSeries(xy);
	chart.drawGrid();
	chart.drawBothAxis();
	chart.drawSeries("x");
}
