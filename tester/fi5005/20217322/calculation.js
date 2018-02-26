function ddtht1(dtht1)
{
	var res = 0;	
	res = -P2.mass*P1.L*dtht1*dtht1*Math.sin(P1.tht-P2.tht)*Math.cos(P1.tht-P2.tht);
	res = res + 9.8*P2.mass*Math.sin(P2.tht)*Math.cos(P1.tht-P2.tht);
	res = res - P2.mass*P2.L*P2.dtht*P2.dtht*Math.sin(P1.tht-P2.tht) - (P1.mass+P2.mass)*9.8*Math.sin(P1.tht);
	res = res/(P1.L*(P1.mass+P2.mass)-P2.mass*P1.L*(Math.cos(P1.tht-P2.tht))^2);
	return res;
}

function ddtht2(dtht2)
{
	var res = 0;
	res = P2.mass*P2.L*dtht2*dtht2*Math.sin(P1.tht-P2.tht)*Math.cos(P1.tht-P2.tht);
	res = res + 9.8*Math.sin(P1.tht)*Math.cos(P1.tht-P2.tht)*(P1.mass+P2.mass);
	res = res + P1.L*P1.dtht*P1.dtht*Math.sin(P1.tht-P2.tht)*(P1.mass+P2.mass) - 9.8*Math.sin(P2.tht)*(P1.mass+P2.mass);
	res = res/(P2.L*(P1.mass+P2.mass)-P2.mass*P2.L*(Math.cos(P1.tht1-P2.tht))^2);
	return res;
}

function getData()
{
	var tht1 = parseFloat(document.getElementById("tht1").value);
	var tht2 = parseFloat(document.getElementById("tht2").value);
	var L1 = parseFloat(document.getElementById("L1").value);
	var L2 = parseFloat(document.getElementById("L2").value);
	var m1 = parseFloat(document.getElementById("m1").value);
	var m2 = parseFloat(document.getElementById("m2").value);
	
	var x1 = L1*Math.sin(tht1);
	var y1 = -L1*Math.cos(tht1);
	var x2 = x1 + L2*Math.sin(tht2);
	var y2 = y1 - L2*Math.cos(tht2);
	
	P1.x = x1;
	P1.y = y1;
	P1.L = L1;
	P1.tht = tht1;
	P1.mass = m1;
	
	P2.x = x2;
	P2.y = y2;
	P2.L = L2;
	P2.tht = tht2;
	P2.mass = m2;
}	

function resetData()
{
	document.getElementById("m1").value = 1;
	document.getElementById("m2").value = 1;
	document.getElementById("L1").value = 10;
	document.getElementById("L2").value = 10;
	document.getElementById("dt").value = 0.01;
	document.getElementById("tht1").value = 0.5;
	document.getElementById("tht2").value = 0.5;
	getData();
	drawCanvas();
	P1.dtht = 0;
	P2.dtht = 0;
}

function Runge_Kutta()
{
	var dt = parseFloat(document.getElementById("dt").value);
	var k11 = ddtht1(P1.dtht);
	var k12 = ddtht2(P2.dtht);
	var k21 = ddtht1(P1.dtht+dt*k11/2);
	var k22 = ddtht2(P2.dtht+dt*k12/2);
	var k31 = ddtht1(P1.dtht+dt*k21/2);
	var k32 = ddtht2(P2.dtht+dt*k22/2);
	var k41 = ddtht1(P1.dtht+dt*k31);
	var k42 = ddtht2(P2.dtht+dt*k32);
	
	P1.dtht = P1.dtht + dt*(k11+2*k21+2*k31+k41)/6;
	P2.dtht = P2.dtht + dt*(k12+2*k22+2*k32+k42)/6;
	P1.tht = P1.tht + dt*P1.dtht;
	P2.tht = P2.tht + dt*P2.dtht;
	P1.x = P1.L*Math.sin(P1.tht);
	P1.y = -P1.L*Math.cos(P1.tht);
	P2.x = P1.x + P2.L*Math.sin(P2.tht);
	P2.y = P1.y - P2.L*Math.cos(P2.tht);
}

function buttonClick()
{
	if(document.getElementById("btn1").innerHTML=="Start")
	{
		document.getElementById("btn1").innerHTML="Stop";
		getData();
		var dt = parseFloat(document.getElementById("dt").value);
		sim = setInterval(Simulation,dt*1000);
		function Simulation()
		{		
			document.getElementById("tht1").value = P1.tht;
			document.getElementById("tht2").value = P2.tht;
			Runge_Kutta();
			drawCanvas();
		}
	}
	else
	{
		document.getElementById("btn1").innerHTML="Start";
		clearInterval(sim);
	}
}

function onBrowserLoad()
{
	getData();
	drawCanvas();
}