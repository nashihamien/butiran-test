/*
	field.js
	Constant gravitational, electric, and magnetic fields
	in 3-d Cartesian coordinate system
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180106
	Create this object.
*/

// Define type of fields
const FieldType = ["Gravitational", "Electrical", "Magnetic"];

// Define class of Field
class Field {
	// Create constructor
	constructor() {
		if(arguments.length == 0) {
			this.mag = 0;
			this.dir = new Vect3();
			this.type = -1;
		} else if(arguments.length == 3) {
			this.mag = arguments[0];
			this.dir = arguments[1];
			for(var i in FieldType) {
				if(arguments[2] == FieldType[i]) {
					this.typ = arguments[2];
				}
			}
		}
	}
	
	// Get string value
	strval() {
		var s = "(";
		s += this.mag + ", ";
		s += this.dir.strval() + ", ";
		s += this.typ;
		s += ")";
		return s;
	}
}
