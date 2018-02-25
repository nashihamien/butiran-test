/*
	transform.js
	Object for transformation between real and drawing
	coordinates
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180107
	Create this library.
*/

// Class transformation of coordinates
class Transform {
	constructor() {
		var arg = arguments[0];
		
		var id = arg.canvasId;
		id = (id == undefined) ? "" : id;
		this.id = id;
		
		var coord = arg.coordinates;
		coord = (coord == undefined) ?
			{xmin: 0, ymin: 0, xmax: 1, ymax: 1} : coord;
		this.coord = coord;
		
		var c = document.getElementById(this.id);
		var COORD = {
			XMIN: 0,
			YMIN: c.height,
			XMAX: c.width,
			YMAX: 0
		};
		this.COORD = COORD;
	}
	
	// Get transformed x
	getX(x) {
		var X = (x - this.coord.xmin);
		X /= (this.coord.xmax - this.coord.xmin);
		X *= (this.COORD.XMAX - this.COORD.XMIN);
		X += this.COORD.XMIN;
		return X;
	}
	
	// Get transformed y
	getY(y) {
		var Y = (y - this.coord.ymin);
		Y /= (this.coord.ymax - this.coord.ymin);
		Y *= (this.COORD.YMAX - this.COORD.YMIN);
		Y += this.COORD.YMIN;
		return Y;
	}
}