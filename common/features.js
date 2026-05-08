// functions to extract features from the samples
const features = {};

features.getPathCount = (paths) => {
    return paths.length;
}

features.getPointCount = (paths) => {
    const points = paths.flat();
    return points.length;
}

features.getMaxHeight = (paths) => {
    const points = paths.flat();
    const heights = points.map((e) => e[1]); 
    return Math.min(Math.max(...heights) - Math.min(...heights), 450)
}

features.getMaxWidth = (paths) => {
    const points = paths.flat();
    const widths = points.map((e) => e[0]); 
    return Math.min(Math.max(...widths) - Math.min(...widths), 450)
}

if (typeof module !== 'undefined') {
    module.exports = features;
};