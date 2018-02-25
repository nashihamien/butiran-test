/*
	scripts.js
	JavaScript examples
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180116
	Create this script.
	20180120
	Create repo with doi:10.5281/zenodo.1156177 in  Zenodo.
	20180122
	Add some examples and doi:10.5281/zenodo.1156176 is for
	all versions.
	20180124
	Examples of Maclaurin series for sin x.
	20180129
	Create example of matrix manipulation.
	20180203
	Create further example of matrix manipulation.
	20180204
	Create implementation of linear regression
*/

// Call a test function
test_polynomial_interpolation();
//test_linear_regression();
//test_lineq_textarea();
//test_linear_equation();
//test_transform_matrix();
//test_merge_matrix();
//test_copy_matrix();
//test_set_matrix();
//test_creating_matrix();

// 20180204.1954 !ok
function test_polynomial_interpolation() {
	// Define interpolation points
	var x = [0, 1, 2, 3];
	//var y = [0, 1, 4, 9];
	var y = [1, 4, 15, 40];
	var N = x.length;
	console.log("Data = ");
	for(var i = 0; i < N; i++) {
		console.log(x[i] + "\t" + y[i]);
	}
	
	// Create Vandermonde matrix
	var MVDM = createVandermondeMatrix(x);
	console.log("Vandermonde matrix = ");
	console.log(stringMatrix(MVDM));
	
	// Create column matrix
	var Y = rowToColumMatrix(y);
	console.log("Column matrix = ");
	console.log(stringMatrix(Y));
	
	// Create merge matrix
	console.log("Merged matrix = ");
	var MY = horizMergeMatrix(MVDM, Y);
	console.log(stringMatrix(MY));
	
	// Solve equation using Gauss elimination
	makeEchelonMatrix(MY);
	makeReducedEchelonMatrix(MY);
	var sol = getLastColumn(MY);
	console.log("Solution = ");
	var t = "f(x) = ";
	for(var i = 0; i < N; i++) {
		t += sol[i][0];
		if(i > 0) {
			if(i == 1) {
				t += "x";
			} else {
				t += "x^" + i;
			}
		}
		if(i < N - 1) {
			t += " + ";
		}
	}
	console.log(t);
}

function createVandermondeMatrix(x) {
	var N = x.length;
	var M = [];
	for(var r = 0; r < N; r++) {
		var row = [];
		for(var c = 0; c < N; c++) {
			var xn = Math.pow(x[r], c);
			row.push(xn);
		}
		M.push(row);
	}
	return M;
}

function rowToColumMatrix() {
	var mat = arguments[0];
	var ROW = mat.length;
	var M = [];
	for(var r = 0; r < ROW; r++) {
		var row = [];
		row.push(mat[r]);
		M.push(row);
	}
	return M;
}

// 20180204.1916 ok
function test_linear_regression() {
	var dv = document.createElement("div");
	dv.style.width = "200px";
	document.body.appendChild(dv);
	
	var ta = document.createElement("textarea");
	ta.id = "textarea1";
	ta.style.width = "194px";
	ta.style.height = "200px";
	ta.style.overflowY = "scroll";
	ta.addEventListener("keyup", changeTextarea);
	dv.appendChild(ta);
	
	var b1 = document.createElement("button");
	b1.innerHTML = "Load Test";
	b1.style.width = "80px";
	b1.addEventListener("click", loadTestLinreg);
	dv.appendChild(b1);
	
	var b2 = document.createElement("button");
	b2.innerHTML = "Solve";
	b2.disabled = true;
	b2.style.width = "60px";
	b2.addEventListener("click", solveLinreg);
	dv.appendChild(b2);
	
	var b3 = document.createElement("button");
	b3.innerHTML = "Clear";
	b3.style.width = "60px";
	b3.addEventListener("click", clearLinreg);
	dv.appendChild(b3);
	
	function loadTestLinreg() {
		var t= "";
		t += "0 1\n";
		t += "1 3\n";
		t += "2 5\n";
		t += "3 7\n";
		t += "4 9\n";
		ta.value = t;
		b2.disabled = false;
	}
	
	function solveLinreg() {
		var M = getLineqMatrix("textarea1");
		var c = calculateLinearRegression(M);
		ta.value += "\nSolution = \n";
		ta.value += "y = " + c[0] + " + ";
		ta.value += c[1] + "x\n";
		ta.value += "R^2 = " + c[2] + "\n";
		ta.value += "R^2 = " + c[3] + "\n";
	}
	
	function clearLinreg() {
		ta.value = "";
		b2.disabled = true;
	}
	
	function changeTextarea() {
		if(ta.value.length > 0) {
			b2.disabled = false;
		} else {
			b2.disabled = true;
		}
	}
	
	function getLineqMatrix(id) {
		var ta = document.getElementById(id);
		var tx = ta.value;
		var lines = tx.split("\n");
		var N = lines.length;
		if(lines[N-1].length == 0) {
			N--;
		}
		var ROW = N;
		var M = createZeroMatrix(ROW, COL);
		for(var r = 0; r < ROW; r++) {
			var cols = lines[r].split(" ");
			var COL = cols.length;
			for(var c = 0; c < COL; c++) {
				M[r][c] = cols[c];
			}
		}
		return M;
	}	
}

function calculateLinearRegression(M) {
	var N = M.length;
	var x = [];
	var y = [];
	for(var i = 0; i < N; i++) {
		x[i] = parseFloat(M[i][0]);
		y[i] = parseFloat(M[i][1]);
	}
	
	var Sx = 0;
	var Sy = 0;
	var Sxx = 0;
	var Sxy = 0;
	for(var i = 0; i < N; i++) {
		Sx += x[i];
		Sy += y[i];
		Sxx += (x[i] * x[i]);
		Sxy += (x[i] * y[i]);
	}
	var xavg = Sx / N;
	var yavg = Sy / N;
	
	var denom = N * Sxx - Sx * Sx;
	var c0 = (Sy * Sxx - Sx * Sxy) / denom;
	var c1 = (N * Sxy - Sx * Sy) / denom;
	
	// Calculate CoD
	var SSxx = 0;
	var SSyy = 0;
	var SSxy = 0;
	var SSyx = 0;
	var SStot = 0;
	var SSres = 0;
	for(var i = 0; i < N; i++) {
		SSxx += (x[i] - xavg)*(x[i] - xavg);
		SSyy += (y[i] - yavg)*(y[i] - yavg);
		SSxy += (x[i] - xavg)*(y[i] - yavg);
		SSyx += (y[i] - yavg)*(x[i] - xavg);
		SStot += (y[i] - yavg)*(y[i] - yavg);
		SSres += (y[i] - c0 - c1*x[i])
			*(y[i] - c0 - c1*x[i]);
	}
	// One way to get CoD
	var RR = (SSxy * SSyx) / (SSxx * SSyy);
	// The other way to get CoD
	var RR2 = 1 - SSres / SStot;
	
	var c = [c0, c1, RR, RR2];
	return c;
}

// 20180204.1546 ok
function test_lineq_textarea() {
	var dv = document.createElement("div");
	dv.style.width = "200px";
	document.body.appendChild(dv);
	
	var ta = document.createElement("textarea");
	ta.id = "textarea1";
	ta.style.width = "194px";
	ta.style.height = "200px";
	ta.style.overflowY = "scroll";
	ta.addEventListener("keyup", changeTextarea);
	dv.appendChild(ta);
	
	var b1 = document.createElement("button");
	b1.innerHTML = "Load Test";
	b1.style.width = "80px";
	b1.addEventListener("click", loadTestLineq);
	dv.appendChild(b1);
	
	var b2 = document.createElement("button");
	b2.innerHTML = "Solve";
	b2.disabled = true;
	b2.style.width = "60px";
	b2.addEventListener("click", solveLineq);
	dv.appendChild(b2);
	
	var b3 = document.createElement("button");
	b3.innerHTML = "Clear";
	b3.style.width = "60px";
	b3.addEventListener("click", clearLineq);
	dv.appendChild(b3);
	
	function loadTestLineq() {
		var t = "1 1 1 1 6\n";
		t += "2 -1 1 1 3\n";
		t += "4 1 -1 1 1\n";
		t += "2 -4 2 -1 3\n";
		ta.value = t;
		b2.disabled = false;
	}
	
	function solveLineq() {
		var M = getLineqMatrix("textarea1");
		makeEchelonMatrix(M);
		makeReducedEchelonMatrix(M);
		var sol = getLastColumn(M);
		ta.value += "\nSolution = \n";
		ta.value += stringMatrix(sol);
	}
	
	function clearLineq() {
		ta.value = "";
		b2.disabled = true;
	}
	
	function changeTextarea() {
		if(ta.value.length > 0) {
			b2.disabled = false;
		} else {
			b2.disabled = true;
		}
	}
	
	function getLineqMatrix(id) {
		var ta = document.getElementById(id);
		var tx = ta.value;
		var lines = tx.split("\n");
		var N = lines.length;
		if(lines[N-1].length == 0) {
			N--;
		}
		var ROW = N;
		var M = createZeroMatrix(ROW, COL);
		for(var r = 0; r < ROW; r++) {
			var cols = lines[r].split(" ");
			var COL = cols.length;
			for(var c = 0; c < COL; c++) {
				M[r][c] = cols[c];
			}
		}
		return M;
	}
}

// 20180204.0551 ok
function test_linear_equation() {
	// Define set of linear equations
	/*
	 w +  x +  y + z = 6
	2w -  x +  y + z = 3
	4w +  x -  y + z = 1
	2w - 4x + 2y - z = 3
	*/
	var MLE = [
		[1,  1,  1,  1,  6],
		[2, -1,  1,  1,  3],
		[4,  1, -1,  1,  1],
		[2, -4,  2, -1,  3]
	];
	
	// Show original matrix
	console.log("MLE = ");
	console.log(stringMatrix(MLE));
	
	// Make echelon matrix and show result
	makeEchelonMatrix(MLE);
	console.log("MLEechelon = ");
	console.log(stringMatrix(MLE));
	
	// Make reduced echelon matrix and show result
	makeReducedEchelonMatrix(MLE);
	console.log("MLEreducedechelon = ");
	console.log(stringMatrix(MLE));
	
	// Show solution
	var sol = getLastColumn(MLE);
	console.log("Solution = ");
	console.log(stringMatrix(sol));
}

function getLastColumn(M) {
	var ROW = M.length;
	var COL = M[0].length;
	var N = createZeroMatrix(ROW, 1);
	for(var r = 0; r < ROW; r++) {
		N[r][0] = M[r][COL - 1];
	}
	return N;
}

function makeReducedEchelonMatrix(M) {
	var ROW = M.length;
	var COL = M[0].length;
	for(var cc = ROW - 1; cc >= 0; cc--) {
		for(var r = cc - 1; r >= 0; r--) {
			var piv = M[r][cc] / M[cc][cc];
			for(var c = COL - 1; c >= 0; c--) {
				M[r][c] = M[r][c] - piv * M[cc][c];
			}
		}
	}
	for(var r = ROW - 1; r >= 0; r--) {
		for(var c = COL - 1; c >= 0; c--) {
			M[r][c] = M[r][c] / M[r][r];
		}
	}
}

function makeEchelonMatrix(M) {
	var ROW = M.length;
	var COL = M[0].length;
	for(var cc = 0; cc < ROW; cc++) {
		for(var r = cc + 1; r < ROW; r++) {
			var piv = M[r][cc] / M[cc][cc];
			for(var c = cc; c < COL; c++) {
				M[r][c] = M[r][c] - piv * M[cc][c];
			}
		}
	}
}

// 20180203.1927 ok
function test_transform_matrix() {
	// Define a coordinate (x, y)
	var r = [
		[1],
		[1],
		[1]
	];
	console.log("r = ");
	console.log(stringMatrix(r));
	
	// Translate by (1, 5)
	var T = createTranslationMatrix2(1, 5);
	var rT = transform(r, T);
	console.log("rT = ");
	console.log(stringMatrix(rT));
	
	// Rotate by (0.5 pi)
	var R = createRotationMatrix2(1 * Math.PI);
	var rR = transform(r, R);
	console.log("rR = ");
	console.log(stringMatrix(rR));
	
	// Rotate -pi/2 with center of rotation (2, 1)
	var theta = -1.0 * Math.PI;
	var rCenter = [
		[2],
		[1], 
		[1]
	];
	var dx = -rCenter[0][0];
	var dy = -rCenter[1][0];
	var T1 = createTranslationMatrix2(dx, dy);
	var R1 = createRotationMatrix2(theta);
	var T2 = createTranslationMatrix2(-dx, -dy);
	var T2R1T1 = mulMatrix(T2, mulMatrix(R1, T1));
	var rTRT = transform(r, T2R1T1);
	console.log("rTRT = ");
	console.log(stringMatrix(rTRT));
}

function transform(ri, M) {
	var rf = mulMatrix(M, ri);
	return rf;
}

function createRotationMatrix2(theta) {
	var c = Math.cos(theta);
	var s = Math.sin(theta);
	var M = [
		[c, -s, 0],
		[s, c, 0],
		[0, 0, 1]
	];
	return M;
}

function createTranslationMatrix2(dx, dy) {
	var M = [
		[1, 0, dx],
		[0, 1, dy],
		[0, 0, 1]
	];
	return M;
}

// 20180203.1858 ok
function test_merge_matrix() {
	// Create two matrices
	var M1 = [
		[1, 2, 3, 4],
		[5, 6, 7, 8]
	];
	var M2 = [
		[-1, -2, -3, -4],
		[-5, -6, -7, -8]
	];
	console.log("M1 = ");
	console.log(stringMatrix(M1));
	console.log("M2 = ");
	console.log(stringMatrix(M2));
	
	// Merge matrices horizontally
	var Mhoriz = horizMergeMatrix(M1, M2);
	console.log("Mhoriz = ");
	console.log(stringMatrix(Mhoriz));
	
	// Merge matrices vertically
	var Mvert = vertMergeMatrix(M1, M2);
	console.log("Mvert = ");
	console.log(stringMatrix(Mvert));
}

function vertMergeMatrix() {
	var matrix1 = arguments[0];
	var ROW1 = matrix1.length;
	var COL1 = matrix1[0].length;
	var matrix2 = arguments[1];
	var ROW2 = matrix2.length;	
	var COL2 = matrix2[0].length;
	if(COL1 != COL2) {
		return 0;
	}
	var ROW = ROW1 + ROW2;
	var COL = COL1;
	var M = createZeroMatrix(ROW, COL);
	for(var r = 0; r < ROW; r++) {
		for(var c = 0; c < COL; c++) {
			if(r < ROW1) {
				M[r][c] = matrix1[r][c];
			} else {
				M[r][c] = matrix2[r - ROW1][c];				
			}
		}
	}
	return M;
}

function horizMergeMatrix() {
	var matrix1 = arguments[0];
	var ROW1 = matrix1.length;
	var COL1 = matrix1[0].length;
	var matrix2 = arguments[1];
	var ROW2 = matrix2.length;	
	var COL2 = matrix2[0].length;
	if(ROW1 != ROW2) {
		return 0;
	}
	var ROW = ROW1;
	var COL = COL1 + COL2;
	var M = createZeroMatrix(ROW, COL);
	for(var r = 0; r < ROW; r++) {
		for(var c = 0; c < COL; c++) {
			if(c < COL1) {
				M[r][c] = matrix1[r][c];
			} else {
				M[r][c] = matrix2[r][c - COL1];				
			}
		}
	}
	return M;
}

// 20180203.0555 ok
function test_copy_matrix() {
	// Create a matrix
	var M = createIdentityMatrix(3);
	console.log(stringMatrix(M));
	console.log("");
	
	// Create a new matrix by assigning the old one
	var N = M;
	console.log(stringMatrix(N));
	console.log("");
	
	// Change the old and show both
	M[1][1] = 123;
	console.log(stringMatrix(M));
	console.log("");
	console.log(stringMatrix(N));
	console.log("");
	
	// Create new matrix using function
	N = copyMatrix(M);
	console.log(stringMatrix(N));
	console.log("");
	
	// Change the old and show both
	M[1][1] = 898;
	console.log(stringMatrix(M));
	console.log("");
	console.log(stringMatrix(N));
	console.log("");
}

// Copy a matrix
function copyMatrix() {
	var matrix = arguments[0];
	var ROW = matrix.length;
	var COL = matrix[0].length;
	var newMatrix = [];
	for(var r = 0; r < ROW; r++) {
		var row = [];
		for(var c = 0; c < COL; c++) {
			var col = matrix[r][c];
			row.push(col);
		}
		newMatrix.push(row);
	}
	return newMatrix;
}

// 20180203.0545 ok
function test_set_matrix() {
	var M = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[1, 1, 0],
	];
	console.log(stringMatrix(M));
	setMatrix(M, 0);
	console.log(stringMatrix(M));
	M[2][2] = 100;
	console.log(stringMatrix(M));
}

function setMatrix() {
	var matrix = arguments[0];
	var value = arguments[1];
	var ROW = matrix.length;
	var COL = matrix[0].length;
	for(var r = 0; r < ROW; r++) {
		for(var c = 0; c < COL; c++) {
			matrix[r][c] = value;
		}
	}
}

// 20180203.0529 ok
function test_creating_matrix() {
	var M = createZeroMatrix(3);
	console.log(stringMatrix(M));
	M = createZeroMatrix(3, 5);
	console.log(stringMatrix(M));
	M = createIdentityMatrix(4);
	console.log(stringMatrix(M));
}

// Create identity matrix
function createIdentityMatrix() {
	var ROW = parseInt(arguments[0]);
	var COL = ROW;
	var matrix = [];
	for(var r = 0; r < ROW; r++) {
		var row = [];
		for(var c = 0; c < COL; c++) {
			var col = (r == c)? 1 : 0;
			row.push(col);
		}
		matrix.push(row);
	}
	return matrix;
}

// Create zero matrix
function createZeroMatrix() {
	var COL = 0;
	var ROW = 0;
	if(arguments.length == 1) {
		ROW = parseInt(arguments[0]);
		COL = ROW;
	} else {
		ROW = parseInt(arguments[0]);
		COL = parseInt(arguments[1]);
	}
	var matrix = [];
	for(var r = 0; r < ROW; r++) {
		var row = [];
		for(var c = 0; c < COL; c++) {
			var col = 0;
			row.push(col);
		}
		matrix.push(row);
	}
	return matrix;
}

// 20180129.0831 ok
function test_time_matrix() {
	var A = [
		[1, 2, 3],
		[1, 0, 1],
		[1, 1, 2],
		[0, 0, 4]
	];
	
	var k = 2;
	
	var C = timeMatrix(A, k);
	console.log(stringMatrix(C));
}

// Time matrix with scalar
function timeMatrix(A, a) {
	// Get rows and cols information
	var row = A.length;
	var col = A[0].length;
	
	var C = [];
	for(var r = 0; r < row; r++) {
		var arow = [];
		for(var c = 0; c < col; c++) {
			var acol = a * A[r][c];
			arow.push(acol);
		}
		C.push(arow);
	}
	return C;
}

// 20180129.0826 ok
function test_mul_matrix() {
	var A = [
		[1, 2, 3],
		[1, 0, 1],
		[1, 1, 2],
		[0, 0, 4]
	];
	
	var B = [
		[1, 0],
		[1, 0],
		[5, 3]
	];
	
	var C = mulMatrix(A, B);
	console.log(stringMatrix(C));
}

// Multiply two matrices
function mulMatrix(A, B) {
	// Get rows and cols information
	var rowA = A.length;
	var colA = A[0].length;
	var rowB = B.length;
	var colB = B[0].length;
	if(colA != rowB) {
		return 0;
	}
	
	var row = rowA;
	var mid = colA;
	var col = colB;
	
	var C = [];
	for(var r = 0; r < row; r++) {
		var arow = [];
		for(var c = 0; c < col; c++) {
			var acol = 0;
			for(var m = 0; m < mid; m++) {
				acol += A[r][m] * B[m][c];
			}
			arow.push(acol);
		}
		C.push(arow);
	}
	return C;
}

// 20180129.0814 ok
function test_sub_matrix() {
	var A = [
		[1, 2, 3],
		[4, 5, 6]
	];
	
	var B = [
		[-1, -2, -3],
		[4, -1, -5]
	];
	
	var C = subMatrix(A, B);
	console.log(stringMatrix(C));
}

// Substract two matrices
function subMatrix(A, B) {
	// Get rows and cols information
	var rowA = A.length;
	var colA = A[0].length;
	var rowB = B.length;
	var colB = B[0].length;
	if((rowA != rowB) || (colA != colB)) {
		return 0;
	}
	
	var row = rowA;
	var col = colA;
	
	var C = [];
	for(var r = 0; r < row; r++) {
		var arow = [];
		for(var c = 0; c < col; c++) {
			var acol = A[r][c] - B[r][c];
			arow.push(acol);
		}
		C.push(arow);
	}
	return C;
}

// 20180129.0812 !ok
function test_add_matrix() {
	var A = [
		[1, 2, 3],
		[4, 5, 6]
	];
	
	var B = [
		[-1, -2, -3],
		[4, -1, -5]
	];
	
	var C = addMatrix(A, B);
	console.log(stringMatrix(C));
}

// Add two matrices
function addMatrix(A, B) {
	// Get rows and cols information
	var rowA = A.length;
	var colA = A[0].length;
	var rowB = B.length;
	var colB = B[0].length;
	if((rowA != rowB) || (colA != colB)) {
		return 0;
	}
	
	var row = rowA;
	var col = colA;
	
	var C = [];
	for(var r = 0; r < row; r++) {
		var arow = [];
		for(var c = 0; c < col; c++) {
			var acol = A[r][c] + B[r][c];
			arow.push(acol);
		}
		C.push(arow);
	}
	return C;
}

// 20180129.0753 ok
function test_display_matrix() {
	var A = [
		[1, 2, 3],
		[4, 5, 6]
	];
	
	console.log(stringMatrix(A));
}

// Get string representastion of matrix
function stringMatrix(M) {
	var row = M.length;
	if(row == undefined) {
		return 0;
	}
	var col = M[0].length;
	var strval = "";
	for(var r = 0; r < row; r++) {
		for(var c = 0; c < col; c++) {
			strval += M[r][c];
			if(c < col - 1) {
				strval += "\t";
			} else {
				strval += "\n";
			}
		}
	}
	return strval;
}

// 20180124.0834 ok
function test_factorial() {
	
	var N = 22;
	console.log("# n\tn!");
	for(var n = 0; n < N; n++) {
		console.log(n + "\t" + factr(n) + "\t" + facti(n));
	}
	
	// Calculate factorial with recursive function
	function factr(n) {
		var F = 1;
		if(n == 0) {
			F *= 1;
		} else {
			F *= n * factr(n - 1);
		}
		return F;
	}
	
	// Calculate factorial with iteration
	function facti(n) {
		var F = 1;
		for(var i = 1; i <= n; i++) {
			F *= i;
		}
		return F;
	}
}

// 20180122.0531 ok
function test_mul_poly() {
	// Define two polynomial functions
	var c1 = [1, 0, 1];
	var c2 = [5, 1];
	
	// Calculate multiplication of two polynomial functions
	var cm = mulPoly(c1, c2);
	console.log(cm);
	
	// Multiply two polynomial functions
	function mulPoly(c1, c2) {
		var N1 = c1.length;
		var N2 = c2.length;
		var cmul = [];
		for(var i1 = 0; i1 < N1; i1++) {
			for(var i2 = 0; i2 < N2; i2++) {
				if(cmul[i1 + i2] == undefined) {
					cmul[i1 + i2] = c1[i1] * c2[i2];
				} else {
					cmul[i1 + i2] += c1[i1] * c2[i2];
				}
			}
		}
		return cmul;
	}
}

// 20180122.0443 ok
function test_compare_int_polynom_anal_num() {
	// Define a polynomial
	var c = [1, 2, 3];
	
	// Define error for numerical integration
	var eps = 1E-9;
	
	// Define lower and upper limits of integration
	var xa = 0;
	var xb = 1;
	
	// Calculate integration results
	var analResult = intPolyAnal(c, xa, xb);
	var numResult = intPolyNum(c, eps, xa, xb);
	
	// Display results
	console.log("Analytical result = " + analResult);
	console.log("Numerical result = " + numResult);
	
	// Perform numerical integration of a polynomial function
	function intPolyNum(c, eps, xa, xb) {
		// Define number of partition
		var N = 1;
		
		// Define previous result
		var Aold = 1;
		
		// Define initial calculation difference
		var DeltaA = 100;
		
		// Perform numerical integration using trapezium rule
		while(DeltaA > eps) {
			var A = 0;
			var x = xa;
			var dx = (xb - xa) / N;
			for(var i = 0; i < N; i++) {
				var y1 = polyf(c, x);
				var y2 = polyf(c, x + dx);
				var dA = 0.5 * dx * (y1 + y2);
				A += dA;
				x += dx;
			}
			DeltaA = Math.abs(Aold - A);
			N *= 2;
			Aold = A;
		}
		return A;
	}
	
	// Perform analytical integration of a polynomial function
	function intPolyAnal(c, xa, xb) {
		// Integrate the polynomial function
		var c0 = 0;
		var ic = intPoly(c, c0);
		
		// Calculate definite integral
		var Fa = polyf(ic, xa);
		var Fb = polyf(ic, xb);
		var intfx = Fb - Fa;
		return intfx;
	}
	
	// Integrate a polynomial function
	function intPoly(c, c0) {
		var N = c.length;
		var ic = [];
		ic[0] = c0;
		for(var i = 0; i < N; i++) {
			ic[i + 1] = c[i] / (i + 1);
		}
		return ic;
	}
	
	// Get value of a polynomial function
	function polyf(c, x) {
		var y = 0;
		var N = c.length;
		for(var i = 0; i < N; i++) {
			var dy = c[i] * Math.pow(x, i);
			y += dy;
		}
		return y;
	}
}

// 20180122.0432 ok
function test_num_int_polynomial() {
	// Define a polynomial
	var c = [0, 0, 3];
	
	// Define error
	var eps = 1E-3;
	var DeltaA = 100;
	
	// Define lower and upper limits of integration
	var xa = 0;
	var xb = 1;
	
	// Define number of partition
	var N = 1;
	
	// Define previous result
	var Aold = 1;
	
	// Perform numerical integration using trapezium rule
	console.log("# N\tDeltaA\tA");
	while(DeltaA > eps) {
		var A = 0;
		var x = xa;
		var dx = (xb - xa) / N;
		for(var i = 0; i < N; i++) {
			var y1 = polyf(c, x);
			var y2 = polyf(c, x + dx);
			var dA = 0.5 * dx * (y1 + y2);
			A += dA;
			x += dx;
		}
		
		i++;
		DeltaA = Math.abs(Aold - A);
		console.log(N + "\t" + DeltaA + "\t" + A);
		
		N *= 2;
		Aold = A;
	}
	
	// Get value of a polynomial function
	function polyf(c, x) {
		var y = 0;
		var N = c.length;
		for(var i = 0; i < N; i++) {
			var dy = c[i] * Math.pow(x, i);
			y += dy;
		}
		return y;
	}
}



// 20180122.0408 ok
function test_def_int_polynomial() {
	// Define a polynomial
	var c = [0, 0, 3];
	
	// Define integration constant
	var c0 = 0;
	
	// Define lower and upper limits of integration
	var xa = 0;
	var xb = 1;
	
	// Integrate the polynomial function
	var ic = intPoly(c, c0);
	
	// Calculate definite integral
	var Fa = polyf(ic, xa);
	var Fb = polyf(ic, xb);
	var intfx = Fb - Fa;
	console.log(intfx);
	
	// Integrate a polynomial function
	function intPoly(c, c0) {
		var N = c.length;
		var ic = [];
		ic[0] = c0;
		for(var i = 0; i < N; i++) {
			ic[i + 1] = c[i] / (i + 1);
		}
		return ic;
	}
	
	// Get value of a polynomial function
	function polyf(c, x) {
		var y = 0;
		var N = c.length;
		for(var i = 0; i < N; i++) {
			var dy = c[i] * Math.pow(x, i);
			y += dy;
		}
		return y;
	}
}

// 20180122.0336 ok
function test_newton_raphson_polynom() {
	// Define constants of a polynomial function
	var c = [-4, 0, 1];
	
	// Define error
	var eps = 1E-8;
	
	// Get root(s) of the polynomial function
	var x1 = getRoot(eps, c, 15);
	console.log("x1 = " + x1);
	
	var x2 = getRoot(eps, c, -6);
	console.log("x2 = " + x2);
	
	// Get root with error and initial value
	function getRoot(eps, c, x) {
		// Tune verbose options
		var verbose = false;
		// Define initial difference of x
		var Dx = 1.0;
		
		// Perform iteration
		var i = 0;
		while(Dx > eps) {
			if(verbose) {
				console.log(i + "\t" + Dx + "\t" + x);
			}
			
			var xold = x;
			var fx = polyf(c, x);
			var dfdx = polyf(diffPoly(c), x);
			x = x - fx / dfdx;
			
			Dx = Math.abs(x - xold);
			i++;
		}
		
		return x;
	}
	
	// Differentiate a polynomial function
	function diffPoly(c) {
		var N = c.length;
		var dc = [];
		for(var i = 0; i < N-1; i++) {
			dc[i] = c[i + 1] * (i + 1);
		}
		return dc;
	}
	
	// Get value of a polynomial function
	function polyf(c, x) {
		var y = 0;
		var N = c.length;
		for(var i = 0; i < N; i++) {
			var dy = c[i] * Math.pow(x, i);
			y += dy;
		}
		return y;
	}
}


// 20180122.0327 !ok
function test_int_polynomial() {
	// Define constants of a polynomial function
	var c = [-9, 2];
	console.log(c);
	
	// Calculate integration of a polynomial function
	var ic = intPoly(c, 8);
	console.log(ic);
	
	// Integrate a polynomial function
	function intPoly(c, c0) {
		var N = c.length;
		var ic = [];
		ic[0] = c0;
		for(var i = 0; i < N; i++) {
			ic[i + 1] = c[i] / (i + 1);
		}
		return ic;
	}
}

// 20180122.0319 ok
function test_diff_polynomial() {
	// Define constants of a polynomial function
	var c = [8, -9, 1];
	console.log(c);
	
	// Calculate differential of a polynomial function
	var dc = diffPoly(c);
	console.log(dc);
	
	// Differentiate a polynomial function
	function diffPoly(c) {
		var N = c.length;
		var dc = [];
		for(var i = 0; i < N-1; i++) {
			dc[i] = c[i + 1] * (i + 1);
		}
		return dc;
	}
}

// 20180122.0312 !ok
function test_polynomial() {
	// Define constants of a polynomial function
	var c = [8, -9, 1];
	
	// Define output sampling parameter
	var xbeg = 0;
	var xend = 10;
	var dx = 1;
	
	// Output some values
	console.log("# x\tf(x)");
	var x = xbeg;
	while(x <= xend) {
		var y = polyf(c, x);
		console.log(x + "\t" + y);
		x += dx;
	}
	
	// Get value of a polynomial function
	function polyf(c, x) {
		var y = 0;
		var N = c.length;
		for(var i = 0; i < N; i++) {
			var dy = c[i] * Math.pow(x, i);
			y += dy;
		}
		return y;
	}
}

// 20180122.0259 ok
function test_newon_raphson_params() {
	// Define error
	var eps = 1.0E-10;
	
	// Calculate root(s)
	var x1 = getRoot(eps, 15);
	console.log("x1 = " + x1);
	
	var x2 = getRoot(eps, -6);
	console.log("x2 = " + x2);
	
	// Get root with error and initial value
	function getRoot(eps, x) {
		// Tune verbose options
		var verbose = false;
		// Define initial difference of x
		var Dx = 1.0;
		
		// Perform iteration
		var i = 0;
		while(Dx > eps) {
			if(verbose) {
				console.log(i + "\t" + Dx + "\t" + x);
			}
			
			var xold = x;
			x = x - f(x) / dfdx(x);
			
			Dx = Math.abs(x - xold);
			i++;
		}
		
		// Define a function
		function f(x) {
			var y = x * x - 9 * x + 8;
			return y;
		}
		
		// Define derivative of the function
		function dfdx(x) {
			var dydx = 2 * x - 9;
			return dydx;
		}
		
		return x;
	}
}

// 20180122.0248 ok
function test_newon_raphson() {
	// Define initial value
	var x = 5;
	
	// Define error
	var eps = 1.0E-10;
	var Dx = 1.0;
	
	// Perform iteration
	var i = 0;
	while(Dx > eps) {
		console.log(i + "\t" + Dx + "\t" + x);
		
		var xold = x;
		x = x - f(x) / dfdx(x);
		
		Dx = Math.abs(x - xold);
		i++;
	}
	
	// Define a function
	function f(x) {
		var y = x * x - 9 * x + 8;
		return y;
	}
	
	// Define derivative of the function
	function dfdx(x) {
		var dydx = 2 * x - 9;
		return dydx;
	}
}

// 20180117.0610 ok
function test_canvas_draw_color() {
	// Define color of drawing pen
	var penColor = "#fff";
	
	// Define variabel for storing position
	var px = 0;
	var py = 0;
	
	// Define mouse state
	var MOUSESTILLDOWN = false;
	
	// Create color palette
	createCanvas("red", 10, 10, 40, 40, "#faa", "#aaa");
	createCanvas("green", 10, 50, 40, 40, "#afa", "#aaa");
	createCanvas("blue", 10, 90, 40, 40, "#aaf", "#aaa");
	createCanvas("board", 50, 10, 120, 120, "#fff", "#aaa");
	
	// Add event to canvas
	addEvent("red", "click", mouseClick);
	addEvent("green", "click", mouseClick);
	addEvent("blue", "click", mouseClick);
	addEvent("board", "mousemove", mouseMove);
	addEvent("board", "mousedown", mouseDown);
	addEvent("board", "mouseup", mouseUp);
	
	// Create canvas box
	function createCanvas(id, x, y, w, h, c, b) {
		var cv = document.createElement("canvas");
		cv.id = id;
		cv.style.position = "absolute";
		cv.style.left = x + "px";
		cv.style.top = y + "px";
		cv.style.width = w + "px";
		cv.style.height = h + "px";
		cv.style.background = c;
		cv.style.border = "1px solid " + b;
		document.body.appendChild(cv);
	}
	
	// Add event to object with id
	function addEvent(id, eventType, functionName) {
			var cv = document.getElementById(id);
			cv.addEventListener(eventType, functionName);
		}
	
	// Handle mouseclick event
	function mouseClick() {
		var id = event.target.id;
		var cv = document.getElementById(id);
		var c = cv.style.background;
		penColor = c;
		console.log(c);
	}
	
	// Handle mouseclick event
	function mouseMove() {
		var id = event.target.id;
		var c = document.getElementById(id);
		
		// Get relative coordinate -- still not work
		px = event.clientX - 0 * parseInt(c.style.left);
		py = event.clientY - 0 * parseInt(c.style.top);
		
		if(MOUSESTILLDOWN) {
			var cx = c.getContext("2d");
			cx.strokeStyle = penColor;
			cx.beginPath();
			cx.arc(px, py, 1, 0, 2 * Math.PI);
			cx.stroke();
		}
	}
	
	// Handle mouseDown
	function mouseDown() {
		MOUSESTILLDOWN = true;
		console.log(MOUSESTILLDOWN);
	}
	
	// Handle mouseDown
	function mouseUp() {
		MOUSESTILLDOWN = false;
		console.log(MOUSESTILLDOWN);
	}
}

// 20180117.0414 ok.
function test_mouse_event() {
	var c1 = document.createElement("canvas");
	c1.id = "light_red";
	c1.style.background = "#faa";
	c1.style.width = "100px";
	c1.style.height = "100px";
	c1.style.left = "100px";
	c1.style.top = "50px";
	c1.style.position = "absolute";
	document.body.appendChild(c1);
	
	var c2 = document.createElement("canvas");
	c2.id = "light_blue";
	c2.style.background = "#aaf";
	c2.style.width = "100px";
	c2.style.height = "100px";
	c2.style.left = "280px";
	c2.style.top = "20px";
	c2.style.position = "absolute";
	document.body.appendChild(c2);
	
	var c3 = document.createElement("canvas");
	c3.id = "light_blue";
	c3.style.background = "#afa";
	c3.style.width = "100px";
	c3.style.height = "100px";
	c3.style.left = "400px";
	c3.style.top = "120px";
	c3.style.position = "absolute";
	document.body.appendChild(c3);
	
	c1.addEventListener("mousemove", mouseMove);
	c2.addEventListener("mousemove", mouseMove);
	c3.addEventListener("mousemove", mouseMove);
	window.addEventListener("mousemove", mouseMove);
	
	c1.addEventListener("mousedown", mouseDown);
	c2.addEventListener("mousedown", mouseDown);
	c3.addEventListener("mousedown", mouseDown);
	window.addEventListener("mousedown", mouseDown);
	
	c1.addEventListener("mouseup", mouseUp);
	c2.addEventListener("mouseup", mouseUp);
	c3.addEventListener("mouseup", mouseUp);
	window.addEventListener("mouseup", mouseUp);
	
	function mouseMove() {
		px = event.clientX;
		py = event.clientY;
		var id = event.target.id;
		if(id == "") {
			id = "window";
		}
		console.log(
			"mousemove in "
			+ id + " at "
			+ "(" + px + ", " + py + ")"
		);
	}
	
	function mouseDown() {
		var id = event.target.id;
		if(id == "") {
			id = "window";
		}
		console.log("mousedown in " + id);
	}
	
	function mouseUp() {
		var id = event.target.id;
		if(id == "") {
			id = "window";
		}
		console.log("mouseup in " + id);
	}	
}

// 20180116.2137 ok
function test_canvas_drag() {
	var px = 0;
	var py = 0;
	var id;
	
	var c1 = document.createElement("canvas");
	c1.id = "drag1";
	c1.style.background = "#faa";
	c1.style.width = "100px";
	c1.style.height = "100px";
	c1.style.left = "100px";
	c1.style.top = "50px";
	c1.style.position = "absolute";
	document.body.appendChild(c1);
	
	var c2 = document.createElement("canvas");
	c2.id = "drag2";
	c2.style.background = "#aaf";
	c2.style.width = "100px";
	c2.style.height = "100px";
	c2.style.left = "280px";
	c2.style.top = "20px";
	c2.style.position = "absolute";
	document.body.appendChild(c2);
	
	var c3 = document.createElement("canvas");
	c3.id = "drag3";
	c3.style.background = "#afa";
	c3.style.width = "100px";
	c3.style.height = "100px";
	c3.style.left = "400px";
	c3.style.top = "120px";
	c3.style.position = "absolute";
	document.body.appendChild(c3);
	
	c1.addEventListener("mousedown", mouseDown);
	c1.addEventListener("mousemove", mouseMove);
	c2.addEventListener("mousedown", mouseDown);
	c2.addEventListener("mousemove", mouseMove);
	c3.addEventListener("mousedown", mouseDown);
	c3.addEventListener("mousemove", mouseMove);
	window.addEventListener("mouseup", mouseUp);
	
	function mouseMove() {
		px = event.clientX;
		py = event.clientY;
		id = event.target.id;
		var c = document.getElementById(id);
		px -= parseInt(c.style.left);
		py -= parseInt(c.style.top);
	}
	
	function mouseDown() {
		id = event.target.id;
		window.addEventListener("mousemove", divMove);
	}
	
	function mouseUp() {
		window.removeEventListener("mousemove", divMove);
	}
	
	function divMove() {
		var c = document.getElementById(id);
		c.style.top = (event.clientY - py) + "px";
		c.style.left = (event.clientX - px) + "px";
	}
}

// 20180116.2016 ok
function test_button_move() {
	var btn = document.createElement("button");
	btn.id = "click_move";
	btn.innerHTML = "Click";
	btn.style.left = "0px";
	btn.style.top = "0px";
	btn.style.position = "relative";
	btn.addEventListener("click", moveMe);
	document.body.appendChild(btn);
	
	function moveMe() {
		var id = event.target.id;
		var btncm = document.getElementById(id);
		var left = parseInt(btncm.style.left);
		var top = parseInt(btncm.style.top);
		btncm.style.left = left + 10 + "px";
		btncm.style.top = top + 5 + "px";
		console.log(left + "\t" + top);
	}
}

// 20180116.1932 ok
function test_two_buttons() {
	// Add 1st button for Lissajous curve
	var btn1 = document.createElement("button");
	btn1.innerHTML = "Lissajous";
	btn1.addEventListener("click", test_lissajous_canvas_raw);
	document.body.appendChild(btn1);
	
	// Add 2nd button for color table
	var btn2 = document.createElement("button");
	btn2.innerHTML = "Color";
	btn2.addEventListener("click", test_colored_spans_in_div);
	document.body.appendChild(btn2);
}

// 20180116.1925 ok
function test_lissajous_canvas_raw() {
	// Define 1st oscillator
	var T1 = 3;
	var phi1 = 1 * Math.PI / 2;
	var A1 = 1;
	
	// Define 2nd oscillator
	var T2 = 5;
	var phi2 = 0 * Math.PI / 2;
	var A2 = 1;
	
	// Get max amplitudo and periode
	var A = Math.max(A1, A2);
	var T = T1 * T2;
	
	// Set time range and step
	var tbeg = 0;
	var tend = T;
	var dt = 0.001;
	
	// Create rectangular canvas with A dependent size
	var c = document.createElement("canvas");
	document.body.appendChild(c);
	c.width = 2 * A * 100;
	c.height = 2 * A * 100;
	c.style.background = "#272";
	var cx = c.getContext("2d");
	
	// Initialize time
	var t = tbeg;
	
	// Perform iteration
	while(t <= tend) {
		// Calculate x position due to 1st oscillator
		var x = A1 * Math.sin(2 * Math.PI / T1 * t + phi1);
	
		// Calculate y position due to 2nd oscillator
		var y = A2 * Math.sin(2 * Math.PI / T2 * t + phi2);
		
		// Transform (x, y) from real world coordinate
		// to (X, Y) in canvas coordinate roughly
		var X = 100 + x * 90;
		var Y = 100 + y * 90;
		
		// Draw
		cx.strokeStyle = "#cfc";
		cx.beginPath();
		cx.arc(X, Y, 1, 0, 2 * Math.PI);
		cx.stroke();
		
		t += dt;
	}
}

// 20180116.1904 ok
function test_series_nusm_canvas_raw() {
	// Define initial condition
	var x0 = 0;
	var v0 = 0;
	var a = 1;
	
	// Define intial, final time and time step
	var tbeg = 0;
	var tend = 10;
	var dt = 1;
	
	// Initiate time and position
	var t = tbeg;
	var x = x0;
	var v = v0;
	
	// Display result in canvas
	var c = document.createElement("canvas");
	c.width = 200;
	c.height = 275;
	c.style.background = "#efe";
	var cx = c.getContext("2d");
	cx.strokeStyle = "#f00";
	
	while(t <= tend) {
		// Display results in console
		console.log(t + "\t" + x + "\t" + v);
		
		// Draw circle at position (t * 20, x * 5) using arc
		cx.beginPath();
		cx.arc(t * 20, x * 5, 3, 0, 2 * Math.PI);
		cx.stroke();
		
		// Calculate new position and velocity
		v += a * dt;
		x += v * dt;
		
		// Increase time
		t += dt;
	}
	
	document.body.appendChild(c);
}

// 20180116.1752 ok
function test_series_usm_canvas_raw() {
	// Define initial condition
	var x0 = 3;
	var v = 2;
	
	// Define intial, final time and time step
	var tbeg = 0;
	var tend = 10;
	var dt = 1;
	
	// Initiate time and position
	var t = tbeg;
	var x = x0;
	
	// Display result in canvas
	var c = document.createElement("canvas");
	c.width = 200;
	c.height = 230;
	c.style.background = "#efe";
	var cx = c.getContext("2d");
	cx.strokeStyle = "#f00";
	
	while(t <= tend) {
		// Draw circle at position (t * 20, x * 10) using arc
		cx.beginPath();
		cx.arc(t * 20, x * 10, 3, 0, 2 * Math.PI);
		cx.stroke();
		
		// Calculate new position
		x += v * dt;
		
		// Increase time
		t += dt;
	}
	
	document.body.appendChild(c);
}

// 20180116.1743 ok
function test_series_usm_table() {
	// Define initial condition
	var x0 = 3;
	var v = 2;
	
	// Define intial, final time and time step
	var tbeg = 0;
	var tend = 10;
	var dt = 1;
	
	// Initiate time and position
	var t = tbeg;
	var x = x0;
	
	// Display result in table
	var table = document.createElement("table");
	var hrow = document.createElement("tr");
	
	var td1 = document.createElement("td");
	td1.innerHTML = "<b><i>t</i> (s)</b>";
	td1.width = "80px";
	td1.style.textAlign = "center";
	hrow.appendChild(td1);
	var td2 = document.createElement("td");
	td2.innerHTML = "<b><i>x</i> (m) </b>";
	td2.width = "80px";
	td2.style.textAlign = "center";
	hrow.appendChild(td2);
	var td3 = document.createElement("td");
	td3.innerHTML = "<b><i>v</i> (m/s)</b>";
	td3.width = "80px";
	td3.style.textAlign = "center";
	hrow.appendChild(td3);
	
	hrow.style.background = "#eef";
	table.appendChild(hrow);
	
	while(t <= tend) {
		var row = document.createElement("tr");
		
		var td1 = document.createElement("td");
		td1.innerHTML = t;
		td1.style.textAlign = "center";
		row.appendChild(td1);
		var td2 = document.createElement("td");
		td2.innerHTML = x;
		td2.style.textAlign = "center";
		row.appendChild(td2);
		var td3 = document.createElement("td");
		td3.innerHTML = v;
		td3.style.textAlign = "center";
		row.appendChild(td3);
		
		row.style.background = "#fee";
		table.appendChild(row);
		
		// Calculate new position
		x += v * dt;
		
		// Increase time
		t += dt;
	}
	
	document.body.appendChild(table);
}

// 20180116.1726 ok
function test_series_usm_console() {
	// Define initial condition
	var x0 = 3;
	var v = 2;
	
	// Define intial, final time and time step
	var tbeg = 0;
	var tend = 10;
	var dt = 1;
	
	// Initiate time and position
	var t = tbeg;
	var x = x0;
	
	// Display result in console
	console.log("#t\tx\tv");
	while(t <= tend) {
		console.log(t + "\t" + x + "\t" + v);
		
		// Calculate new position
		x += v * dt;
		
		// Increase time
		t += dt;
	}
}

// 20180116.1652 ok
function test_colored_spans_in_div() {
	// Define number of columns and rows
	var COLS = 16;
	var ROWS = 16;
	for(var j = 0; j < ROWS; j++) {
		var div = document.createElement("div");
		for(var i = 0; i < COLS; i++) {
			// Define color
			var r = 0;
			var g = parseInt(i * 16);
			var b = parseInt(j * 16);
			rgb = "rgb(" + r + ", " + g + "," + b + ")";
			var span = document.createElement("span");
			span.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
			span.style.background = rgb;
			div.appendChild(span);
		}
		document.body.appendChild(div);
	}
}

// 20180116.1649 ok
function test_table() {
	// Define number of columns and rows
	var COLS = 5;
	var ROWS = 7;
	
	// Create table element
	var table = document.createElement("table");
	for(var j = 0; j < ROWS; j++) {
		// Create row element
		var row = document.createElement("tr");
		for(var i = 0; i < COLS; i++) {
			// Create column element
			var col = document.createElement("td");
			col.innerHTML = "(" + j + ", " + i + ")";
			
			// Append column to row
			row.appendChild(col);
		}
		
		// Append row to table
		table.appendChild(row);
	}
	table.border = "1";
	
	// Append table to document.body
	document.body.appendChild(table);
}

// 20180116.1637 ok
function test_divs_in_span() {
	// Create first div element
	var div1 = document.createElement("div");
	div1.innerHTML = "1st div";
	div1.style.background = "#fbb";
	div1.style.width = "100px";
	
	// Create second div element
	var div2 = document.createElement("div");
	div2.innerHTML = "2nd div";
	div2.style.background = "#bbf";
	div2.style.width = "100px";
	
	// Create span element as container for the two divs
	// even it is a wrong implementation
	var sp = document.createElement("span");
	sp.style.background = "#bfb";
	sp.style.padding = "4px";
	sp.style.textAlign = "center";
	sp.style.width = "300px";
	
	// Append the two spans to div element
	sp.appendChild(div1);
	sp.appendChild(div2);
	
	// Append div element to document.body
	document.body.appendChild(sp);
}

// 20180116.1633 ok
function test_spans_in_div() {
	// Create first span element
	var sp1 = document.createElement("span");
	sp1.innerHTML = "1st span";
	sp1.style.background = "#fbb";
	
	// Create second span element
	var sp2 = document.createElement("span");
	sp2.innerHTML = "2nd span";
	sp2.style.background = "#bbf";
	
	// Create div element as container for the two spans
	var dv = document.createElement("div");
	dv.style.background = "#bfb";
	dv.style.padding = "4px";
	dv.style.textAlign = "center";
	dv.style.width = "200px";
	
	// Append the two spans to div element
	dv.appendChild(sp1);
	dv.appendChild(sp2);
	
	// Append div element to document.body
	document.body.appendChild(dv);
}

// 20180116.125 ok
function test_hello_div() {
	var dv = document.createElement("div");
	dv.innerHTML = "Hello, World!";
	document.body.appendChild(dv);
}

// 20180116.124 ok
function test_hello_span() {
	var sp = document.createElement("span");
	sp.innerHTML = "Hello, World!";
	document.body.appendChild(sp);
}

// 20180116.1555 ok
function test_hello_docwrite() {
	document.write("Hello, World!");
}