var width = 600,
    height = 600;
var chart = d3.select("svg")
        .attr("width", width)
        .attr("height", height)
        .append('g')
        .attr("transform", "translate(" + width / 2 + ", " + height / 2 + ")");


var config = window.config;
var radius = config.radius;

///////////////////////
//
// Draw background
//
///////////////////////

chart.selectAll(".circle")
    .data([0, 0.4, 0.6, 0.8, 1.0, 1.2].reverse())
    .enter()
    .append("svg:circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("stroke", config.stroke)
    .attr("fill", function(d, i) {
        return d == 1 ? config.background : "transparent";
    })
    .attr("stroke-width", 1)
    .attr("r", function(d, i) {
        return d * radius;
    })
    .style("opacity", function(d, i) {
        return d <= 1 ? config.backgroundOpacity : 1;
    });

////////////////////////
//
// Draw dimensions
//
////////////////////////

var dimensionPoints = config.dimensions.map(function(dimension, index, array) {
    var angle, x, y;
    angle = index / array.length * Math.PI * 2;
    x = radius * 1.2 * Math.sin(angle);
    y = radius * 1.2 * Math.cos(angle) * -1;
    return {x: x, y: y}
});

chart.selectAll(".dimension-point")
    .data(dimensionPoints)
    .enter()
    .append("svg:circle")
    .attr("cx", function(d, i) {
        return d.x;
    })
    .attr("cy", function(d, i) {
        return d.y;
    })
    .attr("stroke", config.stroke)
    .attr("fill", config.stroke)
    .attr("stroke-width", 1)
    .attr("r", 5);

chart.selectAll(".dimension-text")
    .data(config.dimensions)
    .enter()
    .append("svg:text")
    .attr("x", function(d, i) {
        return dimensionPoints[i].x * 1.2;
    })
    .attr("fill", config.stroke)
    .attr("text-anchor", "middle")
    .attr("y", function(d, i) {
        return dimensionPoints[i].y * 1.2;
    })
    .text(function(d, i) {
        return d.name;
    });

////////////////////////
//
// Draw data
//
////////////////////////

data = window.data;

chart.selectAll(".data")
    .data(data)
    .enter()
    .append("svg:path")
    .attr("d", function(d, i) {
        var points = config.dimensions.map(function(dimension, index, array) {
            var angle, x, y;
            angle = index / array.length * Math.PI * 2;
            x = d[dimension.name] * radius * dimension.scale * Math.sin(angle);
            y = d[dimension.name] * radius * dimension.scale * Math.cos(angle) * -1;
            return x + " " + y;
        });
        return "M" + points.join(" L");
    })
    .attr("fill", function(d, i) {
        return config.colors[i % config.colors.length];
    })
    .style("opacity", config.opacity)
    .attr("stroke-width", 0)

////////////////////////
//
// Draw dimension line
//
////////////////////////

chart.append("svg:circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("stroke", config.stroke)
    .attr("fill", config.stroke)
    .style("opacity", config.backgroundOpacity)
    .attr("stroke-width", 1)
    .attr("r", 5);

chart.selectAll(".dimension-line")
    .data(dimensionPoints)
    .enter()
    .append("svg:line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", function(d, i) {
        return d.x;
    })
    .attr("y2", function(d, i) {
        return d.y;
    })
    .attr("stroke", config.stroke)
    .attr("fill", config.stroke)
    .style("opacity", config.backgroundOpacity)
    .attr("stroke-width", 1)

