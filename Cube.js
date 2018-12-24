var cubes = [];

function Cube(x, y, z, s, f, b, t, bt, l, r, left, right, top, bottom, back) {
	this.points = [];
	this.fc = f;
	this.bc = b;
	this.tc = t;
	this.ldisplay = left;
	this.rdisplay = right;
	this.tdisplay = top;
	this.bdisplay = bottom;
	this.backdisplay = back;
	this.btc = bt;
	this.lc = l;
	this.rc = r;
	this.projection = [];
	this.rX = [];
	this.rY = [];
	this.rZ = [];
	this.size = s;
	this.angle = 0;
	for (let i = 0; i < 2; i++) {
		this.projection[i] = Array(3);
	}
	for (let i = 0; i < 3; i++) {
		this.rX[i] = Array(3);
		this.rY[i] = Array(3);
		this.rZ[i] = Array(3);
	}
	this.front = function(arr) {
		beginShape();
		strokeWeight(2);
		fill(this.fc);
		vertex(arr[0].x, arr[0].y);
		vertex(arr[2].x, arr[2].y);
		vertex(arr[1].x, arr[1].y);
		vertex(arr[3].x, arr[3].y);
		vertex(arr[0].x, arr[0].y);
		endShape();
	}
	this.back = function(arr) {
		beginShape();
		strokeWeight(2);
		fill(this.bc);
		vertex(arr[4].x, arr[4].y);
		vertex(arr[7].x, arr[7].y);
		vertex(arr[5].x, arr[5].y);
		vertex(arr[6].x, arr[6].y);
		vertex(arr[4].x, arr[4].y);
		endShape();
	}
	this.top = function(arr) {
		beginShape();
		strokeWeight(2);
		fill(this.tc);
		vertex(arr[0].x, arr[0].y);
		vertex(arr[3].x, arr[3].y);
		vertex(arr[7].x, arr[7].y);
		vertex(arr[4].x, arr[4].y);
		vertex(arr[0].x, arr[0].y);
		endShape();
	}
	this.bottom = function(arr) {
		beginShape();
		strokeWeight(2);
		fill(this.btc);
		vertex(arr[6].x, arr[6].y);
		vertex(arr[2].x, arr[2].y);
		vertex(arr[1].x, arr[1].y);
		vertex(arr[5].x, arr[5].y);
		vertex(arr[6].x, arr[6].y);
		endShape();
	}
	this.left = function(arr) {
		beginShape();
		strokeWeight(2);
		fill(this.lc);
		vertex(arr[6].x, arr[6].y);
		vertex(arr[2].x, arr[2].y);
		vertex(arr[0].x, arr[0].y);
		vertex(arr[4].x, arr[4].y);
		vertex(arr[6].x, arr[6].y);
		endShape();
	}
	this.right = function(arr) {
		beginShape();
		strokeWeight(2);
		fill(this.rc);
		vertex(arr[1].x, arr[1].y);
		vertex(arr[5].x, arr[5].y);
		vertex(arr[7].x, arr[7].y);
		vertex(arr[3].x, arr[3].y);
		vertex(arr[1].x, arr[1].y);
		endShape();
	}
	this.projection[0] = [1, 0, 0];
	this.projection[1] = [0, 1, 0];
	this.points[0] = [((x - 2*s)/100), ((y - 2*s)/100), ((z - 2*s)/100)];
	this.points[1] =	[(x/100), (y/100), ((z - 2*s)/100)];
	this.points[2] = [((x - 2*s)/100), (y/100), ((z - 2*s)/100)];
	this.points[3] =	[(x/100), ((y - 2*s)/100), ((z - 2*s)/100)];
	this.points[4] = [((x - 2*s)/100), ((y - 2*s)/100), (z/100)];
	this.points[5] =	[(x/100), (y/100), (z/100)];
	this.points[6] = [((x - 2*s)/100), (y/100), (z/100)];
	this.points[7] =	[(x/100), ((y - 2*s)/100), (z/100)];
	this.initxyz = function() {
		this.rX[0] = [1, 0, 0];
		this.rX[1] = [0, cos(this.angle), -sin(this.angle)];
		this.rX[2] = [0, sin(this.angle), cos(this.angle)];
		this.rY[0] = [cos(this.angle), 0, sin(this.angle)];
		this.rY[1] = [0, 1, 0];
		this.rY[2] = [-sin(this.angle), 0, cos(this.angle)];
		this.rZ[0] = [cos(this.angle), -sin(this.angle), 0];
		this.rZ[1] = [sin(this.angle), cos(this.angle), 0];
		this.rZ[2] = [0, 0, 1];
	}
	this.rotateX = function() {
		this.initxyz();
		let temp = [];
		let zbuf = [];
		this.points.forEach(p => {
			var rotated = vectormul(this.rX, p);
			zbuf.push(rotated[2][0]);
			var p2d = vectormul(this.projection, rotated);
			scalarmul(p2d, this.size);
			let a = {x : p2d[0], y : p2d[1]};
			temp.push(a)
		});
		this.join(temp, zbuf);
		this.angle += 0.05;
	}
	this.rotateY = function() {
		this.initxyz();
		let temp = [];
		let zbuf = [];
		this.points.forEach(p => {
			var rotated = vectormul(this.rY, p);
			zbuf.push(rotated[2][0]);
			var p2d = vectormul(this.projection, rotated);
			scalarmul(p2d, this.size);
			let a = {x : p2d[0], y : p2d[1]};
			temp.push(a)
		});
		this.join(temp, zbuf);
		this.angle += 0.05;
	}
	this.rotateZ = function() {
		this.initxyz();
		let temp = [];
		this.points.forEach(p => {
			var rotated = vectormul(this.rZ, p);
			var p2d = vectormul(this.projection, rotated);
			scalarmul(p2d, this.size);
			let a = {x : p2d[0], y : p2d[1]};
			temp.push(a);
		});
		this.join(temp);
		this.angle += 0.05;
	}
	this.display = function() {
		this.initxyz();
		let temp = [];
		let zbuf = [];
		this.points.forEach(p => {
			var rotated = vectormul(this.rY, p);
			rotated = vectormul(this.rX, rotated);
			zbuf.push(rotated[2][0]);
			var p2d = vectormul(this.projection, rotated);
			scalarmul(p2d, this.size);
			let a = {x : p2d[0], y : p2d[1]};
			temp.push(a)
		});
		this.join(temp, zbuf);
		this.angle += 0.05;
	}
	this.rotateTopBottomLeft = function() {
		let temp = this.fc;
		this.fc = this.rc;
		this.rc = this.bc;
		this.bc = this.lc;
		this.lc = temp;
	}
	this.rotateFrontBackRight = function() {
		let temp = this.rc;
		this.rc = this.tc;
		this.tc = this.lc;
		this.lc = this.btc;
		this.btc = temp;
	}
	this.rotateTopBottomRight = function() {
		let temp = this.rc;
		this.rc = this.fc;
		this.fc = this.lc;
		this.lc = this.bc;
		this.bc = temp;
	}
	this.rotateRightLeftUp = function() {
		let temp = this.tc;
		this.tc = this.fc;
		this.fc = this.btc;
		this.btc = this.bc;
		this.bc = temp;
	}
	this.rotateRightLeftDown = function() {
		let temp = this.fc;
		this.fc = this.tc;
		this.tc = this.bc;
		this.bc = this.btc;
		this.btc = temp;
	}
	this.rotateFrontBackLeft = function() {
		let temp = this.tc;
		this.tc = this.rc;
		this.rc = this.btc;
		this.btc = this.lc;
		this.lc = temp;
	}
	this.join = function(arr, zarr) {
		let min = zarr[0];
		let mindex = 0;
		for (let i = 0; i < zarr.length; i++) {
			if (zarr[i] < min) {
				min = zarr[i];
				mindex = i;
			}
		}
		switch (mindex) {
			case 0:	this.front(arr);
					if (this.tdisplay) {
						this.top(arr);
					}
					if (this.ldisplay) {
						this.left(arr);
					}
					break;
			case 1: this.front(arr);
					if (this.bdisplay) {
						this.bottom(arr);
					}
					if (this.rdisplay) {
						this.right(arr);
					}
					break;
			case 2: this.front(arr);
					if (this.bdisplay) {
						this.bottom(arr);
					}
					if (this.ldisplay) {
						this.left(arr);
					}
					break;
			case 3: this.front(arr);
					if (this.tdisplay) {
						this.top(arr);
					}
					if (this.rdisplay) {
						this.right(arr);
					}
					break;
		}
	}
}

function start() {
	let red = color(255, 0, 0);
	let green = color(0, 255, 0);
	let blue = color(0, 0, 255);
	let white = color(255, 255, 255);
	let yellow = color(255, 255, 0);
	let orange = color(255, 140, 0);
	let black = color(0, 0, 0);
	var c1 = new Cube(0, 200, 200, 50, red, orange, white, yellow, green, blue, true, false, true, true, true);
	var c2 = new Cube(100, 200, 200, 50, red, orange, white, yellow, green, blue, false, false, true, true, true);
	var c3 = new Cube(200, 200, 200, 50, red, orange, white, yellow, green, blue, false, true, true, true, true);
	cubes.push(c1);
	cubes.push(c2);
	cubes.push(c3);
	c1 = new Cube(0, 100, 200, 50, red, orange, white, yellow, green, blue, true, false, true, false, true);
	c2 = new Cube(100, 100, 200, 50, red, orange, white, yellow, green, blue, false, false, true, false, true);
	c3 = new Cube(200, 100, 200, 50, red, orange, white, yellow, green, blue, false, true, true, false, true);
	cubes.push(c1);
	cubes.push(c2);
	cubes.push(c3);
	c1 = new Cube(0, 0, 200, 50, red, orange, white, yellow, green, blue, true, false, true, false, true);
	c2 = new Cube(100, 0, 200, 50, red, orange, white, yellow, green, blue, false, false, true, false, true);
	c3 = new Cube(200, 0, 200, 50, red, orange, white, yellow, green, blue, false, true, true, false, true);
	cubes.push(c1);
	cubes.push(c2);
	cubes.push(c3);
	c1 = new Cube(0, 200, 100, 50, red, orange, white, yellow, green, blue, true, false, false, true, false);
	c2 = new Cube(100, 200, 100, 50, red, orange, white, yellow, green, blue, false, false, false, true, false);
	c3 = new Cube(200, 200, 100, 50, red, orange, white, yellow, green, blue, false, true, false, true, false);
	cubes.push(c1);
	cubes.push(c2);
	cubes.push(c3);
	c1 = new Cube(0, 100, 100, 50, red, orange, white, yellow, green, blue, true, false, false, false, false);
	c2 = new Cube(100, 100, 100, 50, red, orange, white, yellow, green, blue, false, false, false, false, false);
	c3 = new Cube(200, 100, 100, 50, red, orange, white, yellow, green, blue, false, true, false, false, false);
	cubes.push(c1);
	cubes.push(c2);
	cubes.push(c3);
	c1 = new Cube(0, 0, 100, 50, red, orange, white, yellow, green, blue, true, false, true, false, false);
	c2 = new Cube(100, 0, 100, 50, red, orange, white, yellow, green, blue, false, false, true, false, false);
	c3 = new Cube(200, 0, 100, 50, red, orange, white, yellow, green, blue, false, true, true, false, false);
	cubes.push(c1);
	cubes.push(c2);
	cubes.push(c3);
	c1 = new Cube(0, 200, 0, 50, red, orange, white, yellow, green, blue, true, false, false, true, false);
	c2 = new Cube(100, 200, 0, 50, red, orange, white, yellow, green, blue, false, false, false, true, false);
	c3 = new Cube(200, 200, 0, 50, red, orange, white, yellow, green, blue, false, true, false, true, false);
	cubes.push(c1);
	cubes.push(c2);
	cubes.push(c3);
	c1 = new Cube(0, 100, 0, 50, red, orange, white, yellow, green, blue, true, false, false, false, false);
	c2 = new Cube(100, 100, 0, 50, red, orange, white, yellow, green, blue, false, false, false, false, false);
	c3 = new Cube(200, 100, 0, 50, red, orange, white, yellow, green, blue, false, true, false, false, false);
	cubes.push(c1);
	cubes.push(c2);
	cubes.push(c3);
	c1 = new Cube(0, 0, 0, 50, red, orange, white, yellow, green, blue, true, false, true, false, false);
	c2 = new Cube(100, 0, 0, 50, red, orange, white, yellow, green, blue, false, false, true, false, false);
	c3 = new Cube(200, 0, 0, 50, red, orange, white, yellow, green, blue, false, true, true, false, false);
	cubes.push(c1);
	cubes.push(c2);
	cubes.push(c3);
}

function scramble() {
	let i = floor(random(50, 100));
	for (let j = 0; j < i; j++) {
		let k = floor(random(1, 12));
		let t = floor(random(1, 3));
		switch (k) {
			case 1:	for (let  a = 0; a < t; a++) {
						R1();
					}
					break;
			case 2:	for (let  a = 0; a < t; a++) {
						R2();
					}
					break;
			case 3:	for (let  a = 0; a < t; a++) {
						R3();
					}
					break;
			case 4:	for (let  a = 0; a < t; a++) {
						R4();
					}
					break;
			case 5:	for (let  a = 0; a < t; a++) {
						R5();
					}
					break;
			case 6:	for (let  a = 0; a < t; a++) {
						R6();
					}
					break;
			case 7:	for (let  a = 0; a < t; a++) {
						R7();
					}
					break;
			case 8:	for (let  a = 0; a < t; a++) {
						R8();
					}
					break;
			case 9:	for (let  a = 0; a < t; a++) {
						R9();
					}
					break;
			case 10:for (let  a = 0; a < t; a++) {
						R10();
					}
					break;
			case 11:for (let  a = 0; a < t; a++) {
						R11();
					}
					break;
			case 12:for (let  a = 0; a < t; a++) {
						R12();
					}
					break;
		}
	}
}

function scalarmul(m1, s) {
	for (let i = 0; i < m1.length; i++) {
		m1[i] *= s;
	}
	return m1;
}

function vectormul(m1, m2) {
	if (m1[0].length != m2.length) {
		return "Invalid matrix multiplication"
	}
	else {
		var m3 = Array(m1.length);
		for (let i = 0; i < m3.length; i++) {
			m3[i] = Array(m2[0].length);
		}
		if (m2[0].length == undefined) {
			for (let i = 0; i < m3.length; i++) {
				for (let j = 0; j < m3[i].length; j++) {
					m3[i][j] = 0;
					for (let k = 0; k < m3.length; k++) {
						m3[i][j] += m1[i][k] * m2[k];
					}
				}
			}
		}
		else {
			for (let i = 0; i < m3.length; i++) {
				for (let j = 0; j < m3[i].length; j++) {
					m3[i][j] = 0;
					for (let k = 0; k < m3.length; k++) {
						m3[i][j] += m1[i][k] * m2[k][j];
					}
				}
			}
		}
		return m3;
	}
}

function R1() {
	for (let i = 0; i < 27; i++) {
		cubes[i].rotateTopBottomLeft();
		if (i == 2) {
			i += 7;
		}
		if (i == 11) {
			i += 6;
		}
		if (i > 19) {
			break;
		}
	}
}

function R2() {
	for (let i = 0; i < 27; i++) {
		cubes[i].rotateTopBottomRight();
		if (i == 2) {
			i += 7;
		}
		if (i == 11) {
			i += 6;
		}
		if (i > 19) {
			break;
		}
	}
}

function R3() {
	for (let i = 6; i < 27; i++) {
		cubes[i].rotateTopBottomLeft();
		if (i == 8 || i == 17) {
			i += 6;
		}
	}
}

function R4() {
	for (let i = 6; i < 27; i++) {
		cubes[i].rotateTopBottomRight();
		if (i == 8 || i == 17) {
			i += 6;
		}
	}
}

function R5() {
	for (let i = 0; i < 9; i++) {
		cubes[i].rotateFrontBackLeft();
	}
}

function R6() {
	for (let i = 0; i < 9; i++) {
		cubes[i].rotateFrontBackRight();
	}
}

function R7() {
	for (let i = cubes.length - 1; i > 18; i--) {
		cubes[i].rotateFrontBackLeft();
	}
}

function R8() {
	for (let i = cubes.length - 1; i > 18; i--) {
		cubes[i].rotateFrontBackRight();
	}
}

function R9() {
	for (let i = 0; i < 27; i+=3) {
		cubes[i].rotateRightLeftDown();
	}
}

function R10() {
	for (let i = 0; i < 27; i+=3) {
		cubes[i].rotateRightLeftUp();
	}
}

function R11() {
	for (let i = 2; i < 27; i+=3) {
		cubes[i].rotateRightLeftDown();
	}
}

function R12() {
	for (let i = 2; i < 27; i+=3) {
		cubes[i].rotateRightLeftUp();
	}
}
