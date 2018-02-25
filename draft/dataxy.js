/*
	dataxy.js
	Pair of (x, y) for plotting in chart
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180107
	Create this object.
*/

// Define class of (x, y) data
class DataXY {
	// Create constructor
	constructor() {
		this.length = 0;
		this.x = [];
		this.y = [];
	}
	
	// Add data to array of x and y
	push() {
		this.x.push(arguments[0]);
		this.y.push(arguments[1]);
		this.length++;
	}
	
	// Remove last data
	pop() {
		var x = this.x.pop();
		var y = this.y.pop();
		this.length--;
		var d = {x: x, y: y};
		return d;
	}
	
	// Get data at position
	get() {
		var i = arguments[0];
		var x = (i < this.length) ? this.x[i] : undefined;
		var y = (i < this.length) ? this.y[i] : undefined;
		var d = {x: x, y: y};
		return d;
	}
}
