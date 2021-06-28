// keep track of what scene you're on by MrCioffiBSSS https://editor.p5js.org/MrCioffiBSSS/sketches/AjaeTa9cE
var currentScene;
let mouseState = "waiting"
let bezierStartY = 0
let bezierStartX = 0
let bezierEndY = 0
let bezierEndX = 0
    // checks if you clicked on the mouse (for resetting the scene)
var mouse = false;


let a;
let b;

let delta;

let osc, playing, freq, amp;

let mode = "";

let angle = 0.1,
    w = 24,
    ma,
    maxD;


//perlin
let t = 0;
let t1 = 0;
let sel1 = 0,
    sel2 = 0;

//Particle movers
let c = {
    "width": 400,
    "height": 400
}
let cx = c.width / 2,
    cy = c.height / 2
let movers = []
let moverCount = 50

let timer;
let counter = 0;

var buttonPressed = 0;

function setup() {

    // setupPiano();
    // setupChords();
    // setupSynth();
    setupDrums();

    // env = new p5.Envelope();
    // env.setADSR(0.05,0.1, 0.5,1)
    // env.setRange(1.2,0)
    // wave = new p5.Oscillator();
    // wave.setType('sine')
    // wave.start();
    // wave.freq(500)
    // wave.amp(env)


    // draw the first scene at the start
    //drawScene4();

    // let's you see what scene you're on with the "Console" (below)

    if (debug == "on") {
        console.log("Scene #" + currentScene);
    }
    //setup font
    font = loadFont('fonts/Roboto-Medium.ttf');
    if (mode == "") {
        let cnv = createCanvas(400, 400, P2D);
        //cnv.mousePressed(playOscillator);
        //cnv.mousePressed(playADSR)
    } else {
        //angleMode(DEGREES)
        let cnv = createCanvas(400, 400, WEBGL);
        //cnv.mousePressed(playOscillator);
    }


    //osc = new p5.Oscillator('sine');

    a = 5;
    b = 2;
    delta = 0;

    detailX = createSlider(-401, 400, 1);
    detailX.position(width + 50, 125);
    detailX.style('width', '80px');
    detailP = createP(detailX.value());

    scoreP = createP("test").addClass("score")

    synth = new p5.Oscillator('sine');

    let angle = 0;
    //Sliders
    sizeSlider = createSlider(1, 1440, 1440);
    widthSlider = createSlider(1, 30, 1, .1);
    angleSlider = createSlider(1, 65, 1, .1);
    sizeSlider.position(20, 20);
    widthSlider.position(20, 50);
    angleSlider.position(20, 80);

    ma = atan(1);
    maxD = dist(0, 0, 200, 200);


    angleMode(DEGREES)
    for (let i = 0; i < moverCount; i++) {
        movers.push(new Mover)
    }

    timer = createP('timer');
    timer1 = createP('timer1');
    timer2 = createP('timer2');

    //stop/start scene switching
    closuredTimer(timer1, 1000)
        //    closuredTimer(timer2, 2000)

    button = createButton("start");
    button.mousePressed(startTimer)

    if (debug == "off") {
        detailX.hide()
        sizeSlider.hide()
        widthSlider.hide()
        angleSlider.hide()
        timer.hide()
        timer1.hide()
        timer2.hide()
        button.hide()
        scoreP.hide()
        detailP.hide()
    }


    //setupDrums()

}

function closuredTimer(enl, wait) {
    var count = 0;
    setInterval(timeIt, wait)

    sceneTime = createSlider(1, 5, 1);
    sceneTime.position(width + 50, 35);
    sceneTime.style('width', '80px');
    // sceneTimeValue = createP("sceneTime.value()");

    sceneTime1 = createSlider(1, 5, 2);
    sceneTime1.position(width + 50, 65);
    sceneTime1.style('width', '80px');
    // sceneTimeValue1 = createP("sceneTime1.value()");

    sceneTime2 = createSlider(1, 5, 3);
    sceneTime2.position(width + 50, 95);
    sceneTime2.style('width', '80px');
    // sceneTimeValue2 = createP("sceneTime1.value()");

    if (debug = "off") {
        sceneTime.hide()
        sceneTime1.hide()
        sceneTime2.hide()
    }

    function timeIt() {
        enl.html(count);
        count++;
        // sceneTimeValue.html(sceneTime.value())
        // sceneTimeValue1.html(sceneTime1.value())
        // sceneTimeValue2.html(sceneTime2.value())
        currentTime = timeline.getCurrentTime()
            //console.log(options.end)
        if (currentTime >= options.end) {
            //console.log("reached end")
            timeline.setCurrentTime(options.start)
        }
        //update duration for each item
        for (i = 1; i <= items.length; i++) {
            items.update({ id: i, duration: (items.get(i).end - items.get(i).start) / 1000 })
                //1 get current time

            //2 check if current item is the one which should play
            if (items.get(i).start <= currentTime && items.get(i).end >= currentTime) {
                //console.log("within time" + items.get(i).id)
                //3 check if correct one plays
                if (currentScene != items.get(i).id) {
                    //4 switch to correct one
                    currentScene = items.get(i).id
                }

            }
        }
        //  var set1 = items.get(2).duration


        //   if (count <= set1){
        //     //switch to scene 2 after 5 seconds
        //       osc.start();
        //       playing = true;
        //       osc.freq(freq, 0.1);
        //       osc.amp(amp, 0.1);

        //   }        
        //   //console.log("set1 is " + set1)
        //   if (count > set1){
        //     //switch to scene 2 after 5 seconds
        //     if (currentScene === 1) {
        //       currentScene = 2;
        //       console.log("Auto Play Scene #" + currentScene);
        //       clear()

        //       //osc.start();
        //       playing = true;
        //       osc.freq(freq, 0.1);
        //       osc.amp(amp, 0.1);
        //     }
        //   }

        //   if (count > sceneTime1.value() && count <= sceneTime2.value()){
        //     //switch to scene 2 after 5 seconds
        //     if (currentScene === 2) {
        //       currentScene = 3;
        //       console.log("Auto Play Scene #" + currentScene);
        //       clear()

        //       //osc.start();
        //       playing = true;
        //       osc.freq(freq, 0.1);
        //       osc.amp(amp, 0.1);
        //     }
        //   }

        //   if (count > 15){
        //     //switch to scene 2 after 5 seconds

        //       currentScene = 1;
        //       console.log("Auto Play Scene #" + currentScene);
        //       //clear()

        //       //osc.start();
        //       playing = true;
        //       osc.freq(freq, 0.1);
        //       osc.amp(amp, 0.1);
        //       count = 0
        //   }

    }

}

function startTimer() {
    if (buttonPressed == 0) {
        button.html("stop timer")
        interval = setInterval(timeIt, 500)
        buttonPressed = 1


        // } else if (currentScene === 2) {
        //     currentScene = 3;
        //     clear()
        // } else if (currentScene === 3) {
        //     currentScene = 1;
        //     clear()
        // }

    } else {
        button.html("start timer")
        clearInterval(interval)
        timer.html("stopped")
        buttonPressed = 0
        interval = false
        counter = 0
    }

}

function timeIt() {
    timer.html(counter);
    counter++;
}

function draw() {


    //checks first if our currentScene is supposed to be 1
    if (currentScene === 1) {
        // this will only be true one time, immediatly after a mouseClick event happens
        if (mouse === true) {

            // sets the variable of mouse back to false so it only triggers once
            mouse = false;
        }

        // regardless, if the currentScene is "1", we will be drawing with the "drawScene1" function
        drawScene1();
    } else if (currentScene === 2) { // same thing as above, just with scene 2's stuff
        if (mouse === true) {

            mouse = false;
        }

        drawScene2();
    } else if (currentScene === 3) { // same thing as above, just with scene 2's stuff
        if (mouse === true) {

            mouse = false;
        }

        drawScene3();
    } else if (currentScene === 4) { // same thing as above, just with scene 2's stuff
        if (mouse === true) {

            mouse = false;
        }

        drawScene4();
    }

    // drawing the text on top of the image for what the current scene is
    fill(0, 0, 0);
    textSize(20);
    if (debug == "on") {
        text("Scene #" + currentScene, 0, 20);
    }


    //background(51);
    //translate(0, 0, detailX.value())

    //camera(mouseX, 0, 460, 0, 0, 0, 0, 1, 0);
    //translate(width / 2, height / 2, -100);
    //    stroke(255);
    //  noFill();
    //box(200);

    stroke(255, 100);

    // freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
    // amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);

    delta++;
    // translate(-200, -200)
    //radar();

    //    sinWave();

    //lifeGauge();
    //shape3D();

    //
    //cubewave();


    //circles();    //random color circles

    //Particle mouse
    // background("rgba(0, 0, 0, 0.05)")
    // for (let i=0; i<moverCount; i++) {
    //   movers[i].update()
    //   movers[i].checkEdges()
    //   movers[i].display()
    // }

    // push();
    // circle(freq, 100, 100);
    // document.getElementsByClassName("score")[0].innerHTML = freq;
    // pop();

    //fontHelpers();

    if (playing) {
        // smooth the transitions by 0.1 seconds
        //osc.freq(freq, 0.1);
        //osc.amp(amp, 0.1);
    }
}


var drawScene1 = function() {
    currentScene = 1;
    flower() //remove background for flower\
        //background(200, 175, 175);

};

var drawScene2 = function() {
    currentScene = 2;
    //    background(150, 150, 175);
    //background(51);
    archimedeanSpiral()


};
var drawScene3 = function() {
    currentScene = 3;
    //    background(150, 150, 175);
    background(51);
    perlin()


};

//adding sound sample scene
var drawScene4 = function() {
    currentScene = 4;
    //    background(150, 150, 175);
    background(51);
    //archimedeanSpiral();

    // push();
    // line(100,200,150,150)
    // line(150,150,200,170)
    // line(200,170,250,170)
    // line(250,170,250,200)
    // pop();

    // push();
    // noFill();
    // beginShape();
    // vertex(30, 20);
    // vertex(85, 20);
    // vertex(85, 75);
    // vertex(30, 75);
    // endShape();
    // pop();

    //  drawPiano();
    //drawChords()
    // drawSynth()
    drawDrums()
};

// function mouseClicked() {
//     mouse = true;

//     if (currentScene === 1) {
//         currentScene = 2;
//         clear()
//     } else if (currentScene === 2) {
//         currentScene = 3;
//         clear()
//     } else if (currentScene === 3) {
//         currentScene = 1;
//         clear()
//     }

//     console.log("Scene #" + currentScene);
// };

function playOscillator() {
    // starting an oscillator on a user gesture will enable audio
    // in browsers that have a strict autoplay policy.
    // See also: userStartAudio();
    osc.start();
    playing = true;
}



// function mouseReleased() {
//     // ramp amplitude to 0 over 0.5 seconds
//     osc.amp(0, 0.5);
//     playing = false;
// }


function playADSR() {

    env.play()
        //playing = true;
}