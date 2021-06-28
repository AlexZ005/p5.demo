function shape3D() {

    rotateX(60)
    push();
    translate(width / 2, height / 2)
    for (var i = 0; i < 40; i++) {

        var r = map(sin(frameCount / 21), -1, 1, 100, 200);
        var g = map(i, 0, 50, 100, 200);
        var b = map(cos(frameCount), -1, 1, 100, 200);

        stroke(r, g, b)

        rotate(frameCount / 20)

        beginShape()
        for (var j = 0; j < 360; j += 60) {
            var rad = i * 3;
            var x = rad * cos(j)
            var y = rad * sin(j); //sin(frameCount + i * 10)
            var z = sin(frameCount + i * 10) * 50
            vertex(x, y, z)
        }

        endShape(CLOSE)
    }
    pop();

}

//Archimedean Spiral (js)
//Nathan https://codepen.io/Twinbee/pen/gvMNJY
function archimedeanSpiral() {
    let angle = 0;
    let oldX = width / 2;
    let oldY = height / 2;
    size = sizeSlider.value();
    spiralWidth = widthSlider.value();
    angle = angleSlider.value();

    oldX = width / 2;
    oldY = height / 2;

    for (let i = 0; i < size; i++) {
        newAngle = (angle / 10) * i;
        x = (width / 2) + (spiralWidth * newAngle) * Math.sin(newAngle);
        y = (height / 2) + (spiralWidth * newAngle) * Math.cos(newAngle);

        // stroke(randomColor()); // Random Color for each line segment
        // strokeWeight(randomWeight()); // Random Weight (1-5)

        line(oldX, oldY, x, y);
        oldX = x;
        oldY = y;
    }

}

// Tutorial From: The Coding Train
// https://www.youtube.com/watch?v=H81Tdrmz2LA&index=122&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH
function cubewave() {
    ortho(-450, 450, -450, 450, 0, 2000);
    ambientLight(50, 50, 50, 0, -1, 0);
    directionalLight(250, 250, 250, 100, 0, 1);
    // pointLight(250, 250, 250, 100, 10, 500);

    translate(0, 0, -50);
    rotateX(-QUARTER_PI);
    rotateY(ma);

    let offset = 0;
    for (let z = 0; z < height; z += w) {

        for (let x = 0; x < width; x += w) {
            push();

            let d = dist(x, z, width / 2, height / 2);
            let offset = map(d, 0, maxD, -PI, PI);
            let a = angle + offset;
            let h = floor(map(sin(a), -1, 1, 100, 300));

            ambientMaterial(50, 150, 220);

            translate(x - (width / 2), 0, z - (height / 2));

            box(w - 2, h, w - 2);
            pop();
        }
        offset += .1;
    }

    angle -= 0.1;
}


//Perlin noise sample by Filippo Guida
//https://codepen.io/filippoguida/pen/oOrRWP
function perlin() {
    //clear();
    //noFill();
    for (let i = 1; i < 80; i++) {
        strokeWeight(noise(t));



        if (mouseState == "waiting") {
            bezier(
                0, [height / 2, i * 8, 0, random(8)][sel1 % 4],
                noise(t) * width,
                noise(t * 2) * height,
                noise(t * 3) * width,
                noise(t + i * 8) * height,
                width, [height / 2, i * 8, height, random(8)][sel2 % 4]
            )
        } else if (mouseState == "X") {
            //clear()
            bezierStartX = mouseX
            bezierStartY = mouseY
            bezier(
                bezierStartX,
                bezierStartY, //[height/2, i*8, 0, random(8)][sel1%4],
                noise(t) * width,
                noise(t * 2) * height,
                noise(t * 3) * width,
                noise(t + i * 8) * height,
                width, [height / 2, i * 8, height, random(8)][sel2 % 4]
            )
        } else if (mouseState == "Y") {
            //clear()
            bezierEndX = mouseX
            bezierEndY = mouseY
            bezier(
                bezierStartX,
                bezierStartY, //[height/2, i*8, 0, random(8)][sel1%4],
                noise(t) * width,
                noise(t * 2) * height,
                noise(t * 3) * width,
                noise(t + i * 8) * height,
                bezierEndX, bezierEndY
            )
        }



    }

    t += 0.02;
    t1 += 0.08;

    if (frameCount % 200 == 0)
        sel1++;

    if (frameCount % 300 == 0)
        sel2++;

}

function mousePressed() {
    if (mouseState == "waiting") {
        console.log("waiting")
        mouseState = "X"
    } else if (mouseState == "X") {
        console.log("okX")
        mouseState = "Y"
    } else if (mouseState == "Y") {
        console.log("okY")
        mouseState = "waiting"
    }


}

//Chasers by Nathan
//https://codepen.io/Twinbee/pen/qBrWooB
class Mover {
    constructor() {
        this.location = createVector(random(width), random(height))
        this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)
        this.topSpeed = 5
    }

    update() {
        let mouse = createVector(mouseX, mouseY)

        let direction = mouse.sub(this.location)

        direction.normalize()

        direction.mult(Math.random() / 3)

        this.acceleration = direction

        this.velocity.add(this.acceleration)
        this.velocity.limit(this.topSpeed)
        this.location.add(this.velocity)
    }

    display() {
        noStroke()
        let blue = map(this.location.y, 400, 0, 0, 255)
        fill(0, blue, 255)
        rect(this.location.x, this.location.y, 2, 2)
    }

    checkEdges() {
        if (this.location.x > width) this.location.x = 0
        if (this.location.x < 0) this.location.x = width
        if (this.location.y > height) this.location.y = 0
        if (this.location.y < 0) this.location.y = height
    }
}

function circles() {

    translate(5, 5)
    for (x = 0; x <= mouseX; x += 7) {
        for (y = 0; y <= mouseY; y += 7) {

            fill(color(random(255), random(255), random(255)))
            ellipse(x, y, 5, 5);
        }

    }
}

function flower() {
    push();
    background(100, 2);

    translate(width / 2, height / 2);
    strokeWeight(10);
    stroke(255, 10);
    for (x = 1; x < 20; x++) {
        //  let v = createVector(random(-100,100),random(-100,100));
        v = p5.Vector.random2D();
        v.mult(random(0, 100));
        line(0, x, v.x, v.y);
    }
    pop();
}

function lifeGauge() {

    var lifeGauge;
    var maxLifeGauge = 140;

    push();
    //https://graphicbeats.net/data/script.js
    translate(100, 100)
    fill(255);
    var lifeSpacer = 270;
    noStroke();
    textSize(8);
    text('L I F E', -maxLifeGauge / 1.3, lifeSpacer + 5);
    rect(-80, lifeSpacer - 5, 1, 16);
    rect(80, lifeSpacer - 5, 1, 16);
    rect(-maxLifeGauge / 2, lifeSpacer, lifeGauge, 6);
    stroke(255);
    strokeWeight(1);
    noFill();
    rect(-maxLifeGauge / 2, lifeSpacer, maxLifeGauge, 6);
    pop();

}

function sinWave() {
    angleMode(RADIANS)
    let a = 0.0;
    let inc = TWO_PI / 25.0;
    for (let i = 0; i < 50; i++) {
        line(i * 4, 50, i * 4, 50 + sin(a) * 40.0 * amp);
        a = a + inc;
    }
}

function fontHelpers() {

    stroke(255);
    fill('red');
    textSize(6);
    textFont(font);

    push();
    translate(width - 180, height - 150);
    scale(3);
    text('tap to play', 20, 20);
    pop();

    push();

    // translate(width - 180, height - 180);
    // scale(3);
    // text('freq: ' + freq, 20, 40);
    // pop();

    // push();
    // translate(width - 180, height - 210);
    // scale(3);
    // text('amp: ' + amp, 20, 60);
    // pop();

}


function radar() {
    push();
    translate(30, 20);
    line(0, 0, 30, 30);
    line(0, 30, 30, 0);
    pop();

    push();
    translate(45, 35);
    rotate(delta / 100);
    line(0, 0, 20, 0);
    rotate(PI / 3);
    line(0, 0, -20, 0);
    rotate(PI / 3);
    line(0, 0, 20, 0);
    pop();

    translate(15, 5);
    noFill();
    circle(30, 30, 20);
    circle(30, 30, 30);
    circle(30, 30, 40);
}