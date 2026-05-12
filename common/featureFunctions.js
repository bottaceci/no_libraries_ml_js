// functions to extract featureFunctions from the samples
if (typeof geometry === 'undefined') {
    geometry = require("../common/geometry.js");
}

const featureFunctions = {};

featureFunctions.getPathCount = (paths) => {
    return paths.length;
};

featureFunctions.getPointCount = (paths) => {
    const points = paths.flat();
    return points.length;
};

featureFunctions.getMaxHeight = (paths) => {
    const points = paths.flat();
    const heights = points.map((e) => e[1]); 
    return Math.max(...heights) - Math.min(...heights)
};

featureFunctions.getMaxWidth = (paths) => {
    const points = paths.flat();
    const widths = points.map((e) => e[0]); 
    return Math.max(...widths) - Math.min(...widths)
};

featureFunctions.getElongation = (paths) => {
    const points = paths.flat();
    const { width, height } = geometry.minimumBoundingBox({ points });
    return (Math.max(width, height)+1) / (Math.min(width, height)+1);
};

featureFunctions.getRoundness = (paths) => {
    const points = paths.flat();
    const { hull } = geometry.minimumBoundingBox({ points });
    return geometry.roundness(hull);
}

featureFunctions.inUse = [
    //{name: "Path Count", function: featureFunctions.getPathCount},
    //{name: "Point Count", function: featureFunctions.getPointCount},
    {name: "Width", function: featureFunctions.getMaxWidth},
    {name: "Height", function: featureFunctions.getMaxHeight},
    {name: "Elongation", function: featureFunctions.getElongation},
    {name: "Roundness", function: featureFunctions.getRoundness}
];

if (typeof module !== 'undefined') {
    module.exports = featureFunctions;
};