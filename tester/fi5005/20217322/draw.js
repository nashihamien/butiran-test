function drawCanvas()
{
	var cv = document.getElementById("cvs");
	var canvasHeight = cv.height;
	var canvasWidth = cv.width;
	var worldMxX = 25;
	var worldMnX = -25;
	var worldMxY = 0;
	var worldMnY = -50;
	
	function transX(x)
	{
		var xc = ((x - worldMnX)*(canvasWidth - 0)/(worldMxX-worldMnX) + 0);
		return xc;
	}
		
	function transY(y)
	{
		var yc = ((y - worldMnY)*(0 - canvasHeight)/(worldMxY-worldMnY) + canvasHeight);
		return yc;
	}		
	
	var ctx = cv.getContext("2d");
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, cv.width, cv.height);
	var x1c = transX(P1.x);
	var y1c = transY(P1.y);
	var x2c = transX(P2.x);
	var y2c = transY(P2.y);
	
	ctx.beginPath();
	ctx.moveTo(250,0);
	ctx.lineTo(x1c,y1c);
	ctx.closePath();
	ctx.stroke();
	
	ctx.beginPath();
	ctx.moveTo(x1c,y1c);
	ctx.lineTo(x2c,y2c);
	ctx.closePath();
	ctx.stroke();
	
	ctx.beginPath();
	ctx.fillStyle='green';
	ctx.arc(x2c,y2c,P2.mass*10,0,2*Math.PI)
	ctx.fill();
	ctx.closePath();
	ctx.stroke();
	
	ctx.beginPath();
	ctx.fillStyle='green';
	ctx.arc(x1c,y1c,P1.mass*10,0,2*Math.PI)
	ctx.fill();
	ctx.closePath();
	ctx.stroke();
}