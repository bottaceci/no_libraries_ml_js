// functions to extract features from the samples
const features = {};

features.getPathCount = (paths) => {
    return paths.length;
}

features.getPointCount = (paths) => {
    const points = paths.flat();
    return points.length;
}

if (typeof module !== 'undefined') {
    module.exports = features;
};