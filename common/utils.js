const utils = {};

utils.flaggedUsers = [1663882102141, 1663900040545, 1664485938220];

utils.styles = {
    car:{color:'gray', text:'🚗'},
    fish:{color:'red', text:'🐠'},
    house:{color:'yellow', text:'🏠'},
    tree:{color:'green', text:'🌳'},
    bicycle:{color:'cyan', text:'🚲'},
    guitar:{color:'blue', text:'🎸'},
    pencil:{color:'magenta', text:'✏️'},
    clock:{color:'lightgray', text:'🕒'}   
};

utils.formatPercent = (n) => {
    return (n*100).toFixed(2) + '%';
}

utils.printProgress = (count, max) => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    const percent = utils.formatPercent(
        count/max
    );
    process.stdout.write(
        count + '/' + max + ' (' + percent + ')'
    );
}

utils.groupBy = (objArray, key) => {
    const groups = {};
    for (let obj of objArray) {
        const val = obj[key];
        if (groups[val]==null) {
            groups[val] = [];
        }
        groups[val].push(obj);
    }
    return groups;
}

utils.distance=(p1,p2)=>{
   return Math.sqrt(
      (p1[0]-p2[0])**2+
      (p1[1]-p2[1])**2
   );
}

utils.getNearest=(loc,points)=>{
   let minDist=Number.MAX_SAFE_INTEGER;
   let nearestIndex=0;

   for(let i=0;i<points.length;i++){
      const point=points[i];
      const d=utils.distance(loc,point);

      if(d<minDist){
         minDist=d;
         nearestIndex=i;
      }
   }
   return nearestIndex;
}

utils.invLerp = (min,max,v) => {
    return (v-min)/(max-min)
}

utils.normalizePoints = (points, minMax) => {
    let min, max;
    const dimensions = points[0].length;
    if (minMax) {
        min = minMax.min;
        max = minMax.max;
    } else {
        min = [...points[0]];
        max = [...points[0]];
        for (let i=1; i<points.length; i++) {
            for (let j=0; j<dimensions; j++) {
                min[j] = Math.min(min[j], points[i][j]);
                max[j] = Math.max(max[j], points[i][j]);
            }
        }
    }

    for (let i=0; i<points.length; i++) {
        for (let j=0; j<dimensions; j++) {
            points[i][j] = utils.invLerp(min[j], max[j], points[i][j]);
        }
    }
    return {min,max};
}

utils.standardizePoints = (points, avgDev) => {
    let avg, dev;
    const dimensions = points[0].length;
    if (avgDev) {
        avg = avgDev.avg;
        dev = avgDev.dev;
    } else {
        const feat0 = points.map((e) => e[0]); 
        const feat1 = points.map((e) => e[1]); 
        avg = [
            feat0.reduce((a, b) => a + b) / feat0.length,
            feat1.reduce((a, b) => a + b) / feat1.length,
        ];
        dev = [
            Math.sqrt(feat0.reduce((a, b) => a + (avg[0] - b)**2, 0) / feat0.length),
            Math.sqrt(feat1.reduce((a, b) => a + (avg[1] - b)**2, 0) / feat1.length)
        ]
    }

    for (let i=0; i<points.length; i++) {
        for (let j=0; j<dimensions; j++) {
            points[i][j] = (points[i][j] - avg[j])/dev[j];
        }
    }
    return {avg,dev}
}

if (typeof module !== 'undefined') {
    module.exports = utils;
};