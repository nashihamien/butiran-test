/*
	point2.js
	Point in 2-d for drawing
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180107
	Create this object.
*/

// Define class of Point2
class Point2 {
	// Create constructor
	constructor() {
		this.x = 0;
		this.y = 0;
		this.c = int2rgb(0, 0, 0);
		this.s = 1;
	}
	
	// Convert from Vect3
	getXY(r) {
		this.x = r.x;
		this.y = r.y;
	}
	getYZ(r) {
		this.x = r.y;
		this.y = r.z;
	}
	getZX(r) {
		this.x = r.z;
		this.y = r.x;
	}
	getYX(r) {
		this.x = r.y;
		this.y = r.x;
	}
	getZY(r) {
		this.x = r.z;
		this.y = r.y;
	}
	getXZ(r) {
		this.x = r.x;
		this.y = r.z;
	}
	
	// Get string value
	strval() {
		var s = "(";
		s += this.x + ", ";
		s += this.y + ", ";
		s += this.c + ", ";
		s += this.s + ", ";
		s += ")";
		return s;
	}
}
