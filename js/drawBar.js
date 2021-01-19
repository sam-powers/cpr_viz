var x;
var y;
var year_key = function (d) {
    return d.year;
};

// set the dimensions and margins of the graph
var margin = {
        top: 120,
        right: 20,
        bottom: 30,
        left: 140
    },
    width = 1500 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var usewidth = width + margin.left + margin.right;
var useheight = height + margin.top + margin.bottom;


function drawBar(data) {
var data_filter = data.filter(g => g.money_type == "Total payment");


// data manipulations
var summed = d3.nest().key((d) => d.year).rollup(
    function (d) { return {
        sum: d3.sum(d, function (g) { return g.amount; }),
        count: d.length,      
    }

    }).entries(
    data_filter
);

    summed.forEach(function (d) {
        d.year = d.key;
        d.amount = d.value.sum;
        d.count = d.value.count
    });


    var svg = d3.select("#svg_container").append("svg").attr("id", "bar_svg")
        .attr("viewBox", "0 0 " + usewidth + " " + useheight)
        //        .attr("width", width + margin.left + margin.right)
        //        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")").attr("id", "bar_g");


    // set the ranges
     x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);

     y = d3.scaleLinear()
        .range([height, 0]);


    var domainyears = d3.map(summed.filter(g => g.amount > 0), function (d) {
        return d.year;
    }).keys();

    var yearLength = d3.max(domainyears) - 1992 + 1;

    x.domain(Array.from({
        length: yearLength
    }, (x, i) => i + 1992));

    y.domain([0, d3.max(summed, function (d) {
        return d.amount;
    })]);
    
    // append the rectangles for the bar chart   
     svg.selectAll(".bar")
        .data(summed, year_key)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.year);
        })
        .attr("width", x.bandwidth())
        .attr("y", function (d) {
            return y(d.amount);
        })
        .attr("height", function (d) {
            return height - y(d.amount);
        })
        .on("mouseover", mouseoverbar)
        .on("mousemove", mousemovebar)
        .on("mouseleave", mouseleavebar);
    
    // Set label up
    svg.append("text").attr("class", "text_label").text("sample");
    

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y)).classed("yaxis", true);


};
