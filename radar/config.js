var data = [
    {
        "吸引力": 5,
        "成交量": 10,
        "用户粘性": 3,
        "流失量": 5,
        "客流量": 4
    },
    {
        "吸引力": 10,
        "成交量": 40,
        "用户粘性": 8,
        "流失量": 2,
        "客流量": 5
    }
]

var config = {
    radius: 150,
    colors: ["#EA6760", "#66B9BC"],
    stroke: "#fff",
    background: "rgba(255, 255, 255, .3)",
    dimensions: [
        {
            name: "吸引力",
            scale: 0.2,
            icon: ""
        },
        {
            name: "成交量",
            scale: 0.5,
            icon: ""
        },
        {
            name: "用户粘性",
            scale: 0.1,
            icon: ""
        },
        {
            name: "流失量",
            scale: 0.1,
            icon: ""
        },
        {
            name: "客流量",
            scale: 0.2,
            icon: ""
        }
    ]
}

