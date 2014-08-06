var data = [
    {
        "吸引力": 0.05,
        "成交量": 0.10,
        "用户粘性": 0.03,
        "流失量": 0.05,
        "客流量": 0.04
    },
    {
        "吸引力": 0.10,
        "成交量": 0.40,
        "用户粘性": 0.08,
        "流失量": 0.02,
        "客流量": 0.05
    }
]

var config = {
    radius: 150,
    colors: ["#EA6760", "#66B9BC"],
    stroke: "#fff",
    background: "#fff",
    opacity: .7,
    backgroundOpacity: .3,
    dimensions: [
        {
            name: "吸引力",
            scale: 5,
            icon: ""
        },
        {
            name: "成交量",
            scale: 2,
            icon: ""
        },
        {
            name: "用户粘性",
            scale: 10,
            icon: ""
        },
        {
            name: "流失量",
            scale: 10,
            icon: ""
        },
        {
            name: "客流量",
            scale: 5,
            icon: ""
        }
    ]
}

