var config = {
    radius: 220,
    innerRadius: 90,
    data: [
        {
            name: "浏览",
            weight: 0.3,
            score: 0.8
        },
        {
            name: "粘性",
            weight: 0.1,
            score: 0.2
        },
        {
            name: "客流量",
            weight: 0.1,
            score: 0.3
        },
        {
            name: "流失率",
            weight: 0.2,
            score: 0.25
        },
        {
            name: "导购",
            weight: 0.3,
            score: 0.4
        }
    ]
}

var width = config.radius * 2 * 1.5;
var height = config.radius * 2 * 1.2;

var bg = "#f2f2f2";
var colors = ["#ffbd00", "#bdd100", "#ff7d00", "#ed1a00", "#74c2c0"];
var darkColors = ["#e1a300", "#9fb700", "#e16300", "#850000", "#1f7887"];

var getStartAngle = function(index) {
    while(index < 0) {
        index += config.data.length;
    }
    var weight = 0;
    for(var i = 0; i < index; i++) {
        weight += config.data[i].weight;
    }
    return Math.PI * 2 * weight;
}

var getEndAngle = function(index) {
    return Math.PI * 2 * config.data[index].weight + getStartAngle(index);
}

var offset = 0.06; // 为空隙准备的

var radius = config.radius;
var svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);
var defs = svg.append("defs");
var dropShadow = defs.append("svg:filter")
        .attr("id", "drop-shadow")
        .attr("x", "-20%")
        .attr("y", "-20%")
        .attr("width", "140%")
        .attr("height", "140%");
dropShadow.append("svg:feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("result", "blur-out")
    .attr("stdDeviation", 8);

dropShadow.append("svg:feOffset")
    .attr("in", "blur-out")
    .attr("result", "the-shadow")
    .attr("dx", 0)
    .attr("dy", 5);

dropShadow.append("svg:feColorMatrix")
    .attr("in", "the-shadow")
    .attr("result", "color-out")
    .attr("type", "matrix")
    .attr("values", "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .3 0");

dropShadow.append("svg:feBlend")
    .attr("in", "SourceGraphic")
    .attr("in2", "color-out")
    .attr("mode", "normal");

var chart = svg.append("g")
        .attr("transform", "translate(" + width / 2 + ", " + height / 2 + ")");

var calcRadius = function(score) {
    return (config.radius - config.innerRadius) * Math.sqrt(score) + config.innerRadius;
}

chart.selectAll(".circle")
    .data([0, 0.2, 0.4, 0.6, 0.8, 1.0].reverse())
    .enter()
    .append("svg:circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("stroke", function(d, i) {
        return i % 2 == 0 ? "#56463E" : "#BDC2C3";
    })
    .attr("fill", bg)
    .attr("stroke-width", 1)
    .attr("r", function(d, i) {
        return calcRadius(d);
    });

chart.selectAll(".text")
    .data([0, 0.2, 0.4, 0.6, 0.8, 1.0])
    .enter()
    .append("svg:text")
    .attr("text-anchor", "middle")
    .attr("y", function(d, i) {
        return (calcRadius(d) + 3) * -1;
    })
    .attr("font-size", "12px")
    .attr("fill", "#777")
    .text(function(d, i) {
        return d * 100;
    });

var fg = chart.append("g")
        .style("transition", "all 1.5s");

var labels = chart.append("g")
        .style("transition", "all 1s");

labels.selectAll(".label")
    .data(config.data)
    .enter()
    .append("svg:text")
    .attr("class", "label")
    .attr("font-size", "16px")
    .attr("fill", "#56463E")
    .attr("text-anchor", "middle")
    .text(function(d, i) {
        return d.name;
    });

fg.selectAll(".arc")
    .data(config.data)
    .enter()
    .append("svg:path")
    .attr("class", "arc")
    .attr("d", function(d, i) {
        var arc = d3.svg.arc();
        arc.innerRadius(config.innerRadius);
        arc.outerRadius(config.innerRadius);
        arc.startAngle(getStartAngle(i) + offset);
        arc.endAngle(getEndAngle(i) - offset);
        return arc();
    })
    .style("fill", function(d, i) {
        return colors[i % colors.length];
    })
    .transition()
    .duration(1000)
    .attr("d", function(d, i) {
        var arc = d3.svg.arc();
        // 近似用单位面积表示 score
        arc.innerRadius(config.innerRadius);
        arc.outerRadius(calcRadius(d.score));
        arc.startAngle(getStartAngle(i) + offset);
        arc.endAngle(getEndAngle(i) - offset);
        return arc();
    })
    .attr("data-index", function(d, i) {
        return i;
    })
    .style("filter", "url(#drop-shadow)");

var points = [
    [width / 2 + 30, height / 4],
    [width / 1.6, height / 10],
    [width / 1 - 10, height / 10]
]

var line = svg.append('g');
line.append("polyline")
    .attr("fill", "none")
    .attr("stroke", "#624D3E")
    .attr("stroke-width", 2)
    .attr("stroke-miterlimit", "10")
    .attr("points", points.map(function(arr) {return arr.join(",")}).join(" "));
line.append("circle").attr("fill", "#624D3E").attr("cx", points[0][0]).attr("cy", points[0][1]).attr("r", 8.536 * 2);
line.append("circle").attr("fill", "#FFFFFF").attr("cx", points[0][0]).attr("cy", points[0][1]).attr("r", 3.841 * 2);
line.append("circle").attr("fill", "#624D3E").attr("cx", points[2][0]).attr("cy", points[2][1]).attr("r", 3.415 * 2);

var score = 30,
    scoreText = "粘性分数为负数。还是需要努力地呢。还是需要努力地呢。还是需要努力地呢。";


var scoreBox = document.createElement('div');
scoreBox.style.display = "inline-block";
scoreBox.style.verticalAlign = "top";
scoreBox.style.marginTop = height / 10 - 20 + "px";
scoreBox.style.marginLeft = 30 + "px";
scoreBox.innerHTML = "<div class='youshu-radius-score' style='font-size:32px'>30</div>";
scoreBox.innerHTML += "<div class='youshu-radius-score-text' style='font-size:16px; width: 200px;'>" + scoreText + "</div>";
document.body.appendChild(scoreBox);


var currentIndex = 0;
var currentRotateAngle = 0;
var updateLabels = function(angleOffset) {
    labels.style("opacity", 0);
    setTimeout(function() {
        labels.selectAll(".label")
            .data(config.data)
            .attr("x", function(d, i) {
                var angle = (getStartAngle(i) + getEndAngle(i)) / 2 + angleOffset;
                return config.radius * 1.15 * Math.sin(angle);
            })
            .attr("y", function(d, i) {
                var angle = (getStartAngle(i) + getEndAngle(i)) / 2 + angleOffset;
                return config.radius * 1.15 * Math.cos(angle) * -1;
            });
        labels.style("opacity", 1);
    }, 1000);
}

var switchTo = function(index) {
    index = index % config.data.length;
    var rotateAngleOffset = 0;
    var i;
    if(index > currentIndex) {
        // 要倒着转咯
        for(i = currentIndex; i < index; i++) {
            rotateAngleOffset -= config.data[i].weight * Math.PI * 2;
        }
    } else {
        // 要正着来
        for(i = currentIndex - 1; i >= index; i--) {
            rotateAngleOffset += config.data[i].weight * Math.PI * 2;
        }
    }
    // 就近滚动
    if(rotateAngleOffset > Math.PI) {
        rotateAngleOffset = rotateAngleOffset - Math.PI * 2;
    }
    if(rotateAngleOffset < - Math.PI) {
        rotateAngleOffset = rotateAngleOffset + Math.PI * 2;
    }
    // apply
    currentRotateAngle += rotateAngleOffset;
    currentIndex = index;
    fg.style("transform", "rotate(" + currentRotateAngle + "rad)");
    fg.selectAll(".label").style("transform", "rotate(" + -1 * currentRotateAngle + "rad)");
    updateLabels(currentRotateAngle);
}

switchTo(0);

var targets = document.querySelectorAll('svg path');
for(var i = 0; i < targets.length; i++) {
    targets[i].addEventListener("click", function() {
        var index = this.dataset.index;
        switchTo(index);
    });
}
