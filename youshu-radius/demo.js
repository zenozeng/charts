var config = {
    radius: 200,
    innerRadius: 50,
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

var offset = 0.03; // 为空隙准备的


var radius = config.radius;
var chart = d3.select("svg")
        .attr("width", radius * 2)
        .attr("height", radius * 2)
        .append("g")
        .attr("transform", "translate(" + radius + ", " + radius + ")")
        .style("box-shadow", "0 0 8px #777")
        .append("g")
        .style("transition", "2s");

chart.selectAll(".arc")
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
        arc.outerRadius((config.radius - config.innerRadius) * Math.sqrt(d.score) + config.innerRadius);
        arc.startAngle(getStartAngle(i) + offset);
        arc.endAngle(getEndAngle(i) - offset);
        return arc();
    })
    .attr("data-index", function(d, i) {
        return i;
    });


var currentIndex = 0;
var currentRotateAngle = 0;
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
    chart.style("transform", "rotate(" + currentRotateAngle + "rad)");
}

var targets = document.querySelectorAll('svg path');
for(var i = 0; i < targets.length; i++) {
    targets[i].addEventListener("click", function() {
        var index = this.dataset.index;
        switchTo(index);
    });
}
