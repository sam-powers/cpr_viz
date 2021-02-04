var money_type_input = "Total payment";
var crime_type_input = "All";
var country_type_input = "All";
var keep_codes;
var crime_codes;
var country_codes;


var data_filter;

function update_bars(data, money_type, crime_type, country_type) {

    // Set the "All" Cases

    // Crime
    if (crime_type == "All") {
        crime_codes = d3.map(data, (d) => d.crimeCode).keys();
    } else {
        crime_codes = [crime_type];
    }

    //Countries
    if (country_type == "All") {
        country_codes = d3.map(data, (d) => d.country).keys();
    } else {
        country_codes = [country_type];
    }

    //Concat the Keep Codes
    keep_codes = crime_codes.concat(country_codes);

    console.log(keep_codes);

    //Turn the Keep Code lists 
    for (i in data) {
        if (keep_codes.includes(data[i].crimeCode) && keep_codes.includes(data[i].country)) {
            data[i].keep = 1;
        } else {
            data[i].keep = 0;
        }
    }

    data_filter = data.filter((g) => g.money_type == money_type && g.keep == 1);

    // data manipulations
    var summed = d3.nest().key((d) => d.year).rollup(
        function (d) {
            return {
                sum: d3.sum(d, function (g) {
                    return g.amount;
                }),
                count: d.length,
            }

        }).entries(
        data_filter
    );

    summed.forEach(function (d) {
        d.year = d.key;
        d.amount = d.value.sum;
        d.count = d.value.count;
        d.avg = d.amount/d.count
    });


    var min_y = d3.max(summed, function (d) {
        return d.amount;
    })

    if (isNaN(min_y)) {
        var use_min_y = 1;
    } else {
        var use_min_y = min_y;
    }

    y.domain(
        [0, Math.max(use_min_y, 10000)]
    );

    console.log(Math.max(use_min_y, 10000))



    var svg = d3.select("#bar_g");

    //Select…
    var bars = svg.selectAll(".bar")
        .data(summed, year_key);


    //Enter…
    bars.enter()
        .append("rect")
        .attr("x", (d) => x(d.year))
        .attr("y", (d) => y(d.amount))
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return height - y(d.amount);
        })
        .attr("class", "bar")
        .on("mouseover", mouseoverbar)
        .on("mousemove", mousemovebar)
        .on("mouseleave", mouseleavebar)
        .merge(bars) //Update…
        .transition()
        .duration(500).attr("x", (d) => x(d.year))
        .attr("y", (d) => y(d.amount))
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return height - y(d.amount);
        });

    //Exit…
    bars.exit()
        .transition()
        .duration(500)
        .style("opacity", 0)
        .remove();

    svg.select(".yaxis")
        .transition()
        .duration(1000)
        .call(d3.axisLeft(y));
}




function draw_controls(data) {

    var money_type_list = d3.map(data, function (d) {
        return d.money_type;
    }).keys();


    var money_type_change = d3.select("#amount_change")
        .append("label")
        .attr("for", "moneychange")
        .text("Monetary Penalty")
        .append("select")
        .attr("id", "moneychange")
        .classed("form-control", true)
        //   .classed("yearjumpselect", true)
        .on("change", function () {
            money_type_input = this.value;
            update_bars(data, money_type_input, crime_type_input, country_type_input);
        });

    money_type_change.selectAll("option")
        .data(money_type_list)
        .enter()
        .append("option")
        .attr("value", (d) => d)
        .text((d) => d);


    //  crime filter
    var All = ["All"];
    var crime_type_list = d3.map(data, function (d) {
        return d.crimeCode;
    }).keys();
    var crime_type_list = All.concat(crime_type_list);

    var crime_type_change = d3.select("#crime_change")
        .append("label")
        .attr("for", "crimechange")
        .text("Crime")
        .append("select")
        .attr("id", "crimechange")
        .classed("form-control", true)
        //   .classed("yearjumpselect", true)
        .on("change", function () {
            crime_type_input = this.value;
            update_bars(data, money_type_input, crime_type_input, country_type_input);
        });

    crime_type_change.selectAll("option")
        .data(crime_type_list)
        .enter()
        .append("option")
        .attr("value", (d) => d)
        .text((d) => d);

    //  Country filter
    var All = ["All"];
    var country_type_list = d3.map(data, function (d) {
        return d.country;
    }).keys();
    var country_type_list = All.concat(country_type_list);

    var country_type_change = d3.select("#country_change")
        .append("label")
        .attr("for", "countrychange")
        .text("Country")
        .append("select")
        .attr("id", "countrychange")
        .classed("form-control", true)
        //   .classed("yearjumpselect", true)
        .on("change", function () {
            country_type_input = this.value;
            update_bars(data, money_type_input, crime_type_input, country_type_input);
        });

    country_type_change.selectAll("option")
        .data(country_type_list)
        .enter()
        .append("option")
        .attr("value", (d) => d)
        .text((d) => d);

}