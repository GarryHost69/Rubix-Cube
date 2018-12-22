
function setup() {
	createCanvas(windowWidth, windowHeight)
	width = windowWidth;
	height = windowHeight;
	start();
	scramble();
}

function draw() {
	background(255);
	strokeWeight(2);
	translate(width / 2, height / 2);
	cubes.forEach(c => {
		c.display();
	});
}
