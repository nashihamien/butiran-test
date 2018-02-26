
//Define Pendulum Class
class Pendulum
{
		constructor(m,L)
		{
			this.mass = m;
			this.L = L;
			this.x = 0;
			this.y = 0;
			this.tht = 0;
			this.dtht = 0;
			this.ddtht = 0;
		}
}

let P1 = new Pendulum(1,1);
let P2 = new Pendulum(1,1);

