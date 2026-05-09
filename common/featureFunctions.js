// functions to extract featureFunctions from the samples
const featureFunctions = {};

featureFunctions.getPathCount = (paths) => {
    return paths.length;
}

featureFunctions.getPointCount = (paths) => {
    const points = paths.flat();
    return points.length;
}

featureFunctions.getMaxHeight = (paths) => {
    const points = paths.flat();
    const heights = points.map((e) => e[1]); 
    return Math.min(Math.max(...heights) - Math.min(...heights), 450)
}

featureFunctions.getMaxWidth = (paths) => {
    const points = paths.flat();
    const widths = points.map((e) => e[0]); 
    return Math.min(Math.max(...widths) - Math.min(...widths), 450)
}

featureFunctions.inUse = [
    //{name: "Path Count", function: featureFunctions.getPathCount},
    //{name: "Point Count", function: featureFunctions.getPointCount},
    {name: "Width", function: featureFunctions.getMaxWidth},
    {name: "Height", function: featureFunctions.getMaxHeight}
];

if (typeof module !== 'undefined') {
    module.exports = featureFunctions;
};