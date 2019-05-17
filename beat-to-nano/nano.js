const token = 'OuBpPLEZQdfPGDfg7JsZLZSPnSYIfx6t';
const ip = '192.168.86.21';

const AuroraAPI = require('nanoleaves');
const aurora = new AuroraAPI({host: ip,token: token});

try {
  aurora.setStaticPanel([
    {'id': 146, r: 255, g: 0, b: 0},
    {'id': 85, r: 0, g: 255, b: 0},
    {'id': 103, r: 0, g: 0, b: 255}
  ]);
} catch (e){
  console.log(error, e);
}


//
// const flip = process.argv[2];
// if (flip == "on"){
//   aurora.setStaticPanel([
//     {'id': 109, r: 0, g: 255, b:0},
//     {'id': 37, r: 0, g: 255, b:0},
//     {'id': 207, r: 0, g: 255, b:0},
//     {'id': 241, r: 0, g: 255, b:0},
//
//     {'id': 103, r: 255, g: 0, b:0},
//     {'id': 211, r: 255, g: 0, b:0},
//     {'id': 111, r: 255, g: 0, b:0}
//   ]);
// } else {
//   aurora.setStaticPanel([
//     {'id': 109, r: 255, g: 0, b:0},
//     {'id': 37, r: 255, g: 0, b:0},
//     {'id': 207, r: 255, g: 0, b:0},
//     {'id': 241, r: 255, g: 0, b:0},
//
//     {'id': 103, r: 0, g: 255, b:0},
//     {'id': 211, r: 0, g: 255, b:0},
//     {'id': 111, r: 0, g: 255, b:0}
//   ]);
// }
//
// //109,37,207,241
//
// // 103, 211, 111
