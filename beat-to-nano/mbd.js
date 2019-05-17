const fs = require('fs')
const Speaker = require('speaker')
const AuroraAPI = require('nanoleaves');
const createMusicStream = require('create-music-stream') //read this https://github.com/chrvadala/create-music-stream#faq
const {MusicBeatDetector, MusicBeatScheduler, MusicGraph} = require('music-beat-detector')

// const token = '0MEUTuWLYdDuMoCJMKBYSQiFYynqyjhM';
// const ip = '192.168.0.183';
//

const token = 'OuBpPLEZQdfPGDfg7JsZLZSPnSYIfx6t';
const ip = '192.168.86.21';


// const panel1 = [{'id': 109, r: 0, g: 255, b:0, transition:0},{'id': 37, r: 0, g: 255, b:0, transition:0},{'id': 207, r: 0, g: 255, b:0, transition:0},{'id': 241, r: 0, g: 255, b:0, transition:0},{'id': 103, r: 255, g: 0, b:0, transition:0},{'id': 211, r: 255, g: 0, b:0, transition:0},{'id': 111, r: 255, g: 0, b:0, transition:0}];
// const panel2 = [{'id': 109, r: 255, g: 0, b:0, transition:0},{'id': 37, r: 255, g: 0, b:0, transition:0},{'id': 207, r: 255, g: 0, b:0, transition:0},{'id': 241, r: 255, g: 0, b:0, transition:0},{'id': 103, r: 0, g: 255, b:0, transition:0},{'id': 211, r: 0, g: 255, b:0, transition:0},{'id': 111, r: 0, g: 255, b:0, transition:0}];

// const panel1 = [{'id': 146, r: 255, g: 0, b:0, transition:0},{'id': 85, r: 0, g: 255, b:0, transition:0},{'id': 103, r: 0, g: 0, b:255, transition:0}];
// const panel2 = [{'id': 146, r: 0, g: 0, b:255, transition:0},{'id': 85, r: 0, g: 0, b:255, transition:0},{'id': 103, r: 255, g: 0, b:0, transition:0}];


var currentPanel = 0;
var panels = [
    {'id': 146, r: 255, g: 0, b:0, transition:0},
    {'id': 85, r: 255, g: 0, b:0, transition:0},
    {'id': 103, r: 255, g: 0, b:0, transition:0}
  ];

// const panel1 = [{'id': 146, r: 255, g: 0, b:0, transition:0}];
// const panel2 = [{'id': 146, r: 0, g: 0, b:255, transition:0}];

const musicPath = '/Users/boop/dev/aubio-scratch/music/'
const available = ['14 Beach Boys - Good Vibrations (Stanton Warriors Remix).mp3','2-02-Gorillaz-D-Sides-Feel Good Inc. (Stanton Warriors Remix).mp3','Cause _ Affect, Stanton Warriors - Never Let It Go feat. Janai (Nixon Remix).mp3','Stanton Warriors - Beat Goes On (Original Mix).mp3','Stanton Warriors - Hoping (Jay Robinson Remix).mp3','This Is America (Stanton Warriors VIP).mp3','basement jaxx - jump n shout 2005 stanton warriors remix.mp3','Archive UK - Slaps (Original).mp3'];

const choice = process.argv[2]
const aurora = new AuroraAPI({host: ip,token: token});
aurora.setStaticPanel(panels);

const musicGraph = new MusicGraph()
const musicSource = musicPath + available[choice];
var buck = [];//{ls: [0,0,0]};


var current = 1;
function setPanel(pos, bpm, left, right){
  // console.log(`peak-detected at ${pos}ms, detected bpm ${bpm}`, hh / 10)
  buck = [pos,bpm,left/10, right/10]
}

function schedule(){
  // if (current == 1){aurora.setStaticPanel(panel2); current = 2;}
  // else {aurora.setStaticPanel(panel1); current = 1;}
  // // console.log(buck);
  // console.log(aurora.info())
}

const musicBeatScheduler = new MusicBeatScheduler(pos => {

  // console.log(current);
  //
  // if (current == 1){aurora.setStaticPanel(panel2); current = 2;}
  // else {aurora.setStaticPanel(panel1); current = 1;}
  // aurora.setStaticPanel(panel2);
  if (panels[currentPanel].r == 255){
    panels[currentPanel].r = 0;
    panels[currentPanel].b = 255;
  } else {
    panels[currentPanel].r = 255;
    panels[currentPanel].b = 0;
  }
  aurora.setStaticPanel(panels);

  if (currentPanel == 0){currentPanel = 1;}
  else if(currentPanel == 1){currentPanel = 2;}
  else {currentPanel = 0;}

  console.log(buck);
  // aurora.brightness(0).then(() => aurora.brightness())
  // console.log(`peak at ${pos}ms`) // your music effect goes here
})

const musicBeatDetector = new MusicBeatDetector({
  plotter: musicGraph.getPlotter(),
  scheduler: musicBeatScheduler.getScheduler(),
  // debugFilter: true,
  minThreashold: 0.01
})

createMusicStream(musicSource)
  .pipe(musicBeatDetector.getAnalyzer())
  // .on('peak-detected', (pos, bpm, hh) => console.log(`peak-detected at ${pos}ms, detected bpm ${bpm}`, hh / 10))
  .on('peak-detected', (pos, bpm, left, right) => setPanel(pos, bpm, left, right))
  .on('end', () => {
    fs.writeFileSync('graph.svg', musicGraph.getSVG())
    console.log('end')
  })

  .pipe(new Speaker())
  .on('open', () => musicBeatScheduler.start())
