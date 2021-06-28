// Add a snare drum sound
// Play a kick/snare/snare/snare pattern

// PATTERN
var totalBeats = 0;
var currentStep = 0;
let wD = 80;
let slider;
// Change these lines to change your pattern. 
// 1 is ON; 0 is OFF
// for convenience, let's combine the following two patterns into one array 
// var snarePattern = [0, 1, 0, 1];
// var kickPattern = [1, 0, 1, 0]; 

var cells = [
    [1, 1, 0, 1, 0, 1, 0, 1], //cells[0] holds the snare pattern
    [0, 0, 1, 0, 0, 0, 1, 0], //cells[1] holds the kick pattern
    [1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 1, 0, 1, 1],

]


// SOUNDS

// Create a Players object and load the "kick.mp3" and "snare.mp3" files
var kit = new Tone.Players({
    "snare": "samples/drums/505/snare2.mp3",
    "kick": "samples/drums/505/kick2.mp3",
    "808": "samples/drums/505/808.mp3",
    "clap": "samples/drums/505/clap.mp3",
    "clap2": "samples/drums/505/clap2.mp3",
    "snare3": "samples/drums/505/snare3.mp3"


});

// Connect the player output to the computer's audio output
kit.toMaster();

// Create a loop: call playBeat every half a second
// Try other durations, like "1s" and "0.25s"
Tone.Transport.scheduleRepeat(playBeat, "0.25s");

// Once all audio files have been loaded, start the Tone playhead
Tone.Buffer.on('load', play);

function play() {
    Tone.Transport.start();
}

// Audio playback loop
function playBeat(time) {
    // Make sure the sound files have been completely loaded
    if (kit.loaded) {
        currentStep = totalBeats % 8;

        if (cells[0][currentStep] == 1) {
            kit.get("kick").start(time);
        }
        if (cells[1][currentStep] == 1) {
            kit.get("snare3").start(time);
        }
        if (cells[2][currentStep] == 1) {
            kit.get("808").start(time);
        }
        if (cells[3][currentStep] == 1) {
            kit.get("clap").start(time);
        }
        if (cells[4][currentStep] == 1) {
            kit.get("clap2").start(time);
        }



        totalBeats++;
    }
}

// GRAPHICS

function setupDrums() {
    //    createCanvas(640, 480);
    slider = createSlider(0, 255, 120);
    slider.position(50, 430);
    slider.style('width', '520px');

    if (debug == "off") {
        slider.hide()
    }
}

function drawDrums() {
    background(178, 255, 102);
    let val = slider.value();
    console.log(val);
    Tone.Transport.bpm.value = val;

    fill(0);
    noStroke();
    for (var step = 0; step < 8; step++) { // we have 4 steps
        for (var track = 0; track < 5; track++) { //we have 4 tracks
            if (cells[track][step] == 1) {
                rect(step * wD, track * wD, wD, wD);
            }
        }
    }

    fill(153, 255, 255, 70);
    rect(currentStep * wD, 0, wD, w * 5);

}

// function mousePressed() {
//     let step = floor(mouseX / wD);
//     let track = floor(mouseY / wD);

//     //   if(cells[track][step] == 1){
//     //     cells[track][step] = 0;
//     //   }
//     //   else{
//     //     cells[track][step] = 1;
//     //   }

//     cells[track][step] = !cells[track][step];

//     console.log(track, step, cells[track][step]);
// }