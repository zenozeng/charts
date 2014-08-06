var width = 600,
    height = 600;
var chart = d3.select("svg")
        .attr("width", width)
        .attr("height", height)
        .append('g')
        .attr("transform", "translate(" + width / 2 + ", " + height / 2 + ")");

var radius = 300;

chart.selectAll(".circle")
    .data([0, 0.2, 0.4, 0.6, 0.8, 1.0].reverse())
    .enter()
    .append("svg:circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("stroke", function(d, i) {
        return i % 2 == 0 ? "#56463E" : "#BDC2C3";
    })
    .attr("fill", "#f2f2f2")
    .attr("stroke-width", 1)
    .attr("r", function(d, i) {
        return d * radius;
    });

var points = [0.4, 0.6, 0.8, 0.7, 0.8];
points = points.map(function(d, index) {
    var angle = index / points.length * Math.PI * 2,
        r = radius * d,
        x = r * Math.sin(angle),
        y = - r * Math.cos(angle);
    return [x, y];
});

chart.append('path')
    .attr('fill', 'transparent')
    .attr('stroke', '#000')
    .attr('d', window.getBezierPath(points));
