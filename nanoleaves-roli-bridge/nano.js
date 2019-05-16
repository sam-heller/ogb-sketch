const maxApi = require("max-api");
const AuroraAPI = require('nanoleaves');
const aurora = new AuroraAPI({
  host: '192.168.0.103',
  token: 'GzBPdFwsTnXEe0quMPuFYBGf0ssfXtif'
})
var lastGroup = 0;
const groups = {0:[],1:[81],2:[29],3:[103,96],4:[115,27],5:[178],6:[],7:[]}

const handlers = {
  setcolor: (r, g, b) => {
    aurora.layout().then(panels => {
      list = [];
      for (let p of panels.panels){list.push({id: p.id, r: r, g: g, b: b, transition: 20})}
      aurora.setStaticPanel(list);
    })
  },
  brighter: () => {
    aurora.brightness().then(ogb => {
      if (ogb < 100){aurora.setBrightness(ogb + 10);}
    })
  },
  dimmer: () => {
    aurora.brightness().then(ogb => {
      if (ogb > 0) {aurora.setBrightness(ogb - 10)}
    })
  },
  flash: (group, r, g, b) => {
    if (group !== lastGroup){
      list = [];
      for (let id of groups[group]){list.push({id: id, r: r, g: g, b: b, transition: 20})}
      if (list.length > 0){aurora.setStaticPanel(list);}
      lastGroup = group;
    }
  }
}

maxApi.addHandlers(handlers)
