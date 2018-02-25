/*
	test.js
	Functions for testing the script.
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180107
	Create function for testing objects and functions.
	
*/

// 20180112.2304 ok
function test_ctrl() {
	// Create window resizeable textarea
	test_tawresize();
	
	// Find textarea object and add an eventlistener
	var ta = document.getElementById("ta1");
	ta.addEventListener("keypress", response, false);
	
	// Detect keypress
	function response() {
		var code = event.code;
		var ctrlKey = event.ctrlKey;
		if(code == "KeyQ" && ctrlKey) {
			runJS();
		}
	}
	
	// Fill textarea with default value
	ta.value = "// Clear console\n";
	ta.value += "console.clear();\n";
	ta.value += "\n";
	ta.value += "// Do Iteration\n";
	ta.value += "var N = 5;\n";
	ta.value += "for(var i = 0; i < N; i++) {\n";
	ta.value += "  console.log(i + \"^2 = \" + i*i);\n";
	ta.value += "}\n";
	
	// Run script from textarea
	function runJS() {
		var script = document.createElement ("script");
		script.type = "text/javascript";
		script.innerHTML = ta.value;
		
		var head = document.getElementsByTagName("head");
		head.item(0).appendChild(script);
	}
	
}

// 2018012.2047 ok
function test_tawresize() {
	/*
		tawresize.js
		Resize textarea object as browser window is resized
		
		Sparisoma Viridi | dudung@gmail.com
		
		20171203
		Create this script and it works, but value of dwidth and
		dheight are still unknown, since document.style.padding
		and document.style.border are still empty.
		Change name from stretchwta to tawresize.
	*/

	// Define some global parameters
	var dwidth = 22;
	var dheight = 26;

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
	
	exec();
}

// 20180111.0535 ok
function test_svg() {
	var url = "http://www.w3.org/2000/svg";
	var svg = document.createElementNS(url, "svg");
	svg.style.background = "#fee";
	
	var N = 5;
	var Lx = 40;
	var Ly = 20;
	for(var i = 0; i < N; i++) {
		var circle = document.createElementNS(url, "circle");
		var cx = 30 + i * Lx;
		var cy = 30 + i * Ly;
		circle.setAttribute("cx", cx);
		circle.setAttribute("cy", cy);
		circle.setAttribute("r", "10");
		circle.setAttribute("stroke", "red");
		circle.setAttribute("fill", "blue");
		circle.setAttribute("stroke-width", "4");
		svg.appendChild(circle);
	}	
	
	document.body.appendChild(svg);
}

// 20180108.1853 ok
function test_series() {
	var series1 = {
		length: 11,
		x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
	};
	var series2 = {
		length: 11,
		x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		y: [0, 2, 4, 9, 16, 25, 35, 49, 64, 81, 100]
	};
	
	var chart = new XYChart({canvasId: "canvas1"});
	chart.addSeries(series1);
	chart.addSeries(series2);
	chart.redrawChart();
}

// 20180108.1151 ok
function test_xychart_default_values() {
	var chart1 = new XYChart();
	var chart2 = new XYChart({canvasId: "canvas1"});
}

// 20180108.1150 ok
function test_xychart_with_more_values() {
	var chart = new XYChart({
		canvasId: "canvas1",
		grid: {
			color: "#ccc",
			width: 1,
			style: "dashed"
		},
		axis: {
			x: {
				range: {min: 0, max: 1},
				tics: {value: 0.1,visible: true},
				label: "x",
				font: {size: "10px", family: "Times"}
			},
			y: {
				range: {min: 0, max: 1},
				tics: {value: 0.2, visible: true},
				label: "y",
				font: {size: "10px", family: "Times"}
			}
		}
	});
}

// 20180108.0657 ok
function test_parabolic_1() {
	// Define particle with initial velocity
	var particle = new Particle();
	particle.v = new Vect3(0, 10, 80);
	
	// Define field with type of gravitational one
	var aField = new Field(10, new Vect3(0, 0, -1), FieldType[0]);
	
	// Define time parameters for iteration
	var dt = 0.01;
	var tbeg = 0;
	var tend = 16;
	var N = (tend - tbeg + 1) / dt;
	
	// Create object for data
	var data = new DataXY();
	var Tdata = 10;
	var idata = Tdata;
	
	// Set display status
	var DISPLAY_IN_CONSOLE = false;
	
	// Perform iteration
	for(var i = 0; i < N; i++) {
		// Calculate time
		var t = i * dt;
		
		// Display result
		if(DISPLAY_IN_CONSOLE) {
			console.log(
				t.toFixed(2) + "\t" +
				particle.r.y.toFixed(2) + "\t" +
				particle.r.z.toFixed(2) + "\t" +
				particle.v.y.toFixed(2) + "\t" +
				particle.v.z.toFixed(2)
			);
		}
		
		// Store data to data object
		if(idata == Tdata) {
			data.push(particle.r.y, particle.r.z);
			idata = 0;
		}
		idata++;
		
		// Calculate force
		var Force = force(particle, aField);
		particle.a = Vect3.div(Force, particle.m);
		
		// Update velocity
		particle.v = Vect3.add(
			particle.v,
			Vect3.mul(particle.a, dt)
		);
		
		// Update position
		particle.r = Vect3.add(
			particle.r,
			Vect3.mul(particle.v, dt)
		);
		
		// Force to break
		if(particle.r.z < -dt) {
			data.push(particle.r.y, particle.r.z);
			break;
		}
	}
	
	// Check results
	if(DISPLAY_IN_CONSOLE) {
		console.log(data);
	}
	
	// Add a canvas
	addGraphics({
		id: "canvas1",
		width: 320,
		height: 320,
		background: "#e0f0ff"
	});
	
	// Set transformation
	var tr = new Transform({
		canvasId: "canvas1",
		coordinates: {
			xmin: 0,
			ymin: 0,
			xmax: 160,
			ymax: 320
		}
	});
	
	// Plot data using transformation
	plotSeries(tr, data);
}

// 20180108.0535 ok
function test_parabolic_0() {
	// Define particle with initial velocity
	var particle = new Particle();
	particle.v = new Vect3(0, 0, 80);
	
	// Define field with type of gravitational one
	var aField = new Field(10, new Vect3(0, 0, -1), FieldType[0]);
	
	// Define time parameters for iteration
	var dt = 0.01;
	var tbeg = 0;
	var tend = 16;
	var N = (tend - tbeg + 1) / dt;
	
	// Perform iteration
	for(var i = 0; i < N; i++) {
		// Calculate time
		var t = i * dt;
		
		// Display result
		console.log(
			t.toFixed(2) + "\t" +
			particle.v.z.toFixed(2) + "\t" +
			particle.r.z.toFixed(2)
		);
		
		// Calculate force
		var Force = force(particle, aField);
		particle.a = Vect3.div(Force, particle.m);
		
		// Update velocity
		particle.v = Vect3.add(
			particle.v,
			Vect3.mul(particle.a, dt)
		);
		
		// Update position
		particle.r = Vect3.add(
			particle.r,
			Vect3.mul(particle.v, dt)
		);
		
		// Break
		if(particle.r.z < 0) {
			break;
		}
	}
}

// 20180107.2013 ok
function test_transform() {
	// Create a canvas
	addGraphics({
		id: "canvas3",
		width: 400,
		height: 200
		});
	
	// Create transformation object
	var trf = new Transform({
		canvasId: "canvas3",
		coordinates: {xmin: 0, ymin: 0, xmax: 2, ymax: 1}
	});
	
	console.log(trf);
	
	// Perform transformation
	var x = 1.0;
	var y = 0.25;
	var X = trf.getX(x);
	var Y = trf.getY(y);
	
	console.log("x: " + x + " --> X: " + X);
	console.log("y: " + y + " --> Y: " + Y);
}

// 20180107.1918 ok
function test_dataxy() {
	var data = new DataXY();
	data.push(0, 1);
	data.push(1, 3);
	data.push(2, 5);
	data.push(3, 7);
	data.push(4, 9);
	data.push(5, 11);
	
	console.log(data);
	
	var xy = data.pop();
	console.log(xy);

	console.log(data);
	
	console.log(data.get(3));
	console.log(data.get(5));
}

// 20180107.1729 ok
function test_graphics() {
		addGraphics({
			id: "canvas1",
			width: 400,
			height: 200,
			background: "#efe",
			border: "1px dotted #99f"
		});
		addGraphics({id: "canvas2"});
}

// 20180107.0816 ok
function test_rgb() {
	console.log(int2rgb(128, 255, 66));
	console.log(double2rgb(0.5, 1.0, 0.26));
}

// 201780107.0538 ok
function test_force() {
	// Define a particle with mass m, charge q, velocity v
	var p = new Particle();
	p.m = 0.5;
	p.q = 1;
	p.v = new Vect3(0, 2, 0);
	
	// Define gravitational field and calclate related force
	var g = new Field(10, new Vect3(0, 0, -1), FieldType[0]);
	var F1 = force(p, g);
	console.log(F1.strval());
	
	// Define electric field and calclate related force
	var E = new Field(5, new Vect3(0.3, 0.4, 0), FieldType[1]);
	var F2 = force(p, E);
	console.log(F2.strval());
	
	// Define magnetic field and calclate related force
	var B = new Field(4, new Vect3(0, 0, 1), FieldType[2]);
	var F3 = force(p, B);
	console.log(F3.strval());
}
