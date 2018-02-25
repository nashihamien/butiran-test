/*
	xychart.js
	Chart for plotting (x, y) data using canvas object
	
	Sparisoma Viridi | dudung@gmail.com
	Dede Enan | dede@fi.itb.ac.id
	
	20180108
	Create this object.
*/

// Define class of chart
class XYChart {
	constructor() {
		// Define default values
		{
			this.canvasId = "canvas";
			this.grid = {
				color: "#ccc",
				width: 1,
				style: "dashed"
			}
			this.axis = {
				x: {
					range: {min: 0, max: 1},
					tics: {value: 0.1,visible: true},
					label: "x",
					font: {size: "10px", family: "Times"}
				},
				y: {
					range: {min: 0, max: 1},
					tics: {value: 0.2,visible: true},
					label: "y",
					font: {size: "10px", family: "Times"}
				}
			}
			this.series = [];
		}
		
		// Change values if provided
		if(arguments.length == 1) {
			var arg = arguments[0];
			
			this.canvasId = arg.canvasId;
			if(this.canvasId == undefined) {
				this.canvasId = "canvas";
			}
			
			this.grid = arg.grid;
			if(this.grid == undefined) {
				this.grid = {
					color: "#ccc",
					width: 1,
					style: "dashed"
				}
			}
			
			this.axis == arg.axis;
			if(this.axis == undefined) {
				this.axis = {
					x: {
						range: {min: 0, max: 1},
						tics: {value: 0.1,visible: true},
						label: "x",
						font: {size: "10px", family: "Times"}
					},
					y: {
						range: {min: 0, max: 1},
						tics: {value: 0.2,visible: true},
						label: "y",
						font: {size: "10px", family: "Times"}
					}
				}
			}
		}
		
		this.drawChart();
	}
	
	// Add data series of type dataXY
	addSeries() {
		this.series.push(arguments[0]);
		//this.redrawChart();
	}
	
	// Remove last series
	deleteLastSeries() {
		this.series.pop();
	}
	
	// Draw chart
	drawChart() {
		var c = document.createElement("canvas");
		c.id = this.canvasId;
		c.style.background = "#f0faff";
		document.body.appendChild(c);
	}
	
	// Redraw chart
	redrawChart() {
		var c = document.getElementById(this.canvasId);
		var ctx = c.getContext("2d");
		
		var tr = new Transform({
			canvasId: this.canvasId,
			// Coordinates should derived from series[]
			coordinates: {xmin: 0, ymin: -10, xmax: 11, ymax: 110}
		});
		
		var Nseries = this.series.length;
		for(var s = 0; s < Nseries; s++) {
			var Ndata = this.series[s].length;
			var data = this.series[s];
			if(s == 0) {
				ctx.fillStyle = "#f00";
			} else {
				ctx.fillStyle = "#00f";
			}
			for(var i = 0; i < Ndata; i++) {
				var X = tr.getX(data.x[i]);
				var Y = tr.getY(data.y[i]);
				ctx.fillRect(X, Y, 6, 6);
			}
			ctx.stroke();
		}
	}
}
