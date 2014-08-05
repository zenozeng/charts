var path = document.querySelector('svg path');
var points = [[100, 100],
              [300, 100],
              [700, 400],
              [100, 500]];
var getCenterPoint = function(points) {
    return points.reduce(function(prevVal, elem, index, array) {
        prevVal[0] += elem[0];
        prevVal[1] += elem[1];
        if(index == (array.length - 1)) {
            prevVal[0] /= array.length;
            prevVal[1] /= array.length;
        }
        return prevVal;
    }, [0, 0]);
}
var centerPoint = getCenterPoint(points);
var d = points.map(function(point, index) {
    var nextPoint  = points[(index + 1) % points.length];
    console.log((index + 1) % points.length);
    console.log(nextPoint);
    var distance = Math.sqrt(Math.pow(point[0] - nextPoint[0], 2),
                             Math.pow(point[1] - nextPoint[1], 2));
    var controlPoints = [];
    // centerPoint weight: 3
    controlPoints.push(getCenterPoint([point, nextPoint, centerPoint, centerPoint, centerPoint]));
    controlPoints.push(nextPoint);
    controlPoints = controlPoints.map(function(point) {
        return point.join(" ");
    }).join(",");
    return "M" + point.join(" ") + " Q" + controlPoints;
});
path.setAttribute('d', d.join(" "));
