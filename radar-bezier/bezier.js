window.getBezierPath = function(points) {
    // weights should be something like [1, 1, 3]
    var getCenterPoint = function(points, weights) {
        points = points.concat();
        if(weights) {
            var tmp = points.concat();
            points = [];
            tmp.forEach(function(point, index) {
                for(var i = 0; i < weights[index]; i++) {
                    points.push(point);
                }
            });
        }
        console.log(JSON.stringify(points));
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
        var controlPoints = [];
        controlPoints.push(getCenterPoint([point, nextPoint, centerPoint],
                                          [1, 1, 3]));
        controlPoints.push(nextPoint);
        controlPoints = controlPoints.map(function(point) {
            return point.join(" ");
        }).join(",");
        return "M" + point.join(" ") + " Q" + controlPoints;
    });
    return d.join(" ");
}
