/*
	force.js
	Constant gravitational, electric, and magnetic force
	in 3-d Cartesian coordinate system
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180106
	Create function for calculating forces.
*/

function force() {
	var f = new Vect3();
	var x = arguments[0];
	var y = arguments[1];
	if(x instanceof Particle && y instanceof Field) {
			switch(y.typ) {
				case FieldType[0]:
					var m = x.m;
					var g = Vect3.mul(y.mag, y.dir)
					f = Vect3.mul(m, g);
					break;
				case FieldType[1]:
					var q = x.q;
					var E = Vect3.mul(y.mag, y.dir)
					f = Vect3.mul(q, E);
					break;
				case FieldType[2]:
					var q = x.q;
					var v = x.v;
					var B = Vect3.mul(y.mag, y.dir)
					var vxB = Vect3.cross(v, B);
					f = Vect3.mul(q, vxB);
					break;
			}
		}
	return f;
}
