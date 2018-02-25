/*
template.html
<DOCTYPE html>
<html>
	<head>
		<title>template</title>
		<script type="text/x-mathjax-config">
			MathJax.Hub.Config({
				TeX: { equationNumbers: { autoNumber: "AMS" } }
			});
		</script>
		<script type="text/x-mathjax-config">
			MathJax.Hub.Config({
				tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
			});
		</script>
		<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML">
		</script>
	</head>
	<body>
	</body>
</html>



contoh-mathjax.html
<DOCTYPE html>
<html>
<head>
<title></title>
<script type="text/x-mathjax-config">
	MathJax.Hub.Config({
		TeX: { equationNumbers: { autoNumber: "AMS" } }
	});
</script>
<script type="text/x-mathjax-config">
	MathJax.Hub.Config({
		tex2jax: { inlineMath: [['$','$'], ['\\(','\\)']]}
	});
</script>
<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML">
</script>
<style>
body {
	text-align: justify;
	padding: 10px;
}
a:visited, a:link {
	color: #00f;
	text-decoration: none;
	font-weight: bold;
}
</style>
</head>

<body>

Persamaan kuadrat dalam bentuk

\begin{equation}
y = ax^2 + bx + c,
\label{eq:persamaan-kuadrat}
\end{equation}

memiliki akar-akar

\begin{equation}
x_{1,2} = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}.
\label{eq:akar-persamaan-kuadrat}
\end{equation}

Persamaan (\ref{eq:persamaan-kuadrat}) dan (\ref{eq:akar-persamaan-kuadrat}) menarik.


<div id="polinom">
</div>

<script>
	var c = [2, 3, 4, 5];
	var div = document.getElementById("polinom");
	var s = "";
	for(var i = 0; i < c.length; i++) {
		s += c[i] + "x^" + i;
		if(i < c.length - 1) {
			s += " + ";
		}
	}
	div.innerHTML = "\\begin{equation}"
	+ "y = "
	+ s
	+ "\\end{equation}";
</script>

<div id="matrix">
</div>

<script>
	var M = [
		[1, 92, 0, 0],
		[14, 2, 0, 4],
		[1, -2, 3, 5],
		[31, 21, 3, 8],
	];
	var div = document.getElementById("matrix");
	
	var ROW = M.length;
	var COL = M[0].length;
	
	var s = "";
	for(var i = 0; i < ROW; i++) {
		for(var j = 0; j < COL; j++) {
			s += M[i][j];
			if(j < COL - 1) {
				s += " & ";
			} else {
				s += " \\\\\n";
			}
		}
	}
	
	var format = "";
	for(var j = 0; j < COL; j++) {
		format += "c";
	}
	
	div.innerHTML = "\\begin{equation}\n"
	+ "M = \\left["
	+ "\\begin{array}{" + format + "}\n"
	+ s
	+ "\\end{array}\n"
	+ "\\right]"
	//+ "\\nonumber"
	+ "\\end{equation}";
</script>

</body>

</html>


20180214-01.html
<!DOCTYPE html>
<html>
	<head>
		<title>20180214-01</title>
	</head>
	<body>
		<!-- Try div element -->
		<div id="mydiv"
		style="
			color: blue;                 / Font color /
			background: #eef;            / Background color /
			border: 1px solid green;     / Border line width, style, color /
			width: 100px;                / Width /
			height: 200px;               / Height /
			padding: 20px 10px 5px 30px; / Padding top right bottom left /
		">
			<!-- Content of div element -->
			Pembahasan kembali HTML dan JS.
		</div>
	</body>
</html>



20180214-02.html
<!DOCTYPE html>
<html>
	<head>
		<title>20180214-02</title>
	</head>
	<body>
		<!-- Try div element -->
		<div id="paragraph2">
		</div>
		
		<!-- JavaScript for modifying element -->
		<script>
			var div = document.getElementById("paragraph2");
			div.innerHTML = "This is second paragraph";
			div.style.border = "red 1px dashed";
			div.style.width = "300px";
			div.style.height = "200px";
			div.style.color = "blue";
			div.style.background = "#faa";
		</script>
	</body>
</html>


20180214-03.html
<!DOCTYPE html>
<html>
	<head>
		<title>20180214-03</title>
	</head>
	<body>
		<!-- JavaScript for creating and modifying element -->
		<script>
			var div = document.createElement("div");
			div.innerHTML = "This is second paragraph";
			div.style.border = "red 1px dashed";
			div.style.width = "300px";
			div.style.height = "200px";
			div.style.color = "blue";
			div.style.background = "#faa";
			document.body.appendChild(div);
		</script>
	</body>
</html>


20180214-04.html
<!DOCTYPE html>
<html>
	<head>
		<title>20180214-04</title>
	</head>
	<body>
		<!-- JavaScript for creating and modifying element -->
		<script>
			var div = document.createElement("div");
			div.id = "mother";
			div.style.border = "red 1px solid";
			div.style.width = "450px";
			div.style.height = "450px";
			div.style.background = "#faa";
			document.body.appendChild(div);
		</script>
		
		<script>
			var mother = document.getElementById("mother");
			var N = 16;
			for(var i = 0; i < N; i++) {
				var div = document.createElement("div");
				div.style.width = "100px";
				div.style.height = "100px";
				div.style.border = "1px green dashed";
				div.style.float = "left";
				div.style.background = "rgb(0, 0, " + i * 15 + ")";
				div.style.color = "#fff";
				div.innerHTML = "Kotak ke-" + (i + 1);
				mother.appendChild(div);
			}
		</script>
	</body>
</html>

*/