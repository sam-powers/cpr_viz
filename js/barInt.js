var mouseoverbar = function(d) {
    
    d3.select("#tooltip")
      .style("visibility","visible");
    
    d3.select("#tooltiptext").text(d.count);
    
 d3.select(this)
      .style("opacity", .5);  
    
    d3.selectAll(".text_label")
    .attr("x", x(d.year))
    //.attr("y", y(d.amount))
    .text(d3.format("$,.2r")(d.amount))
    .style("opacity", 1)
    
    
    
    
};


var mousemovebar = function(d) {
//   d3.select("#tooltip")
//      .style("left", d3.event.pageX + 10 + "px")
//      .style("top", d3.event.pageY - 10 + "px")
//    
    
  }

var mouseleavebar = function(d) {
    d3.selectAll(".text_label").style("opacity", 0);
      
 d3.select(this)
      .style("opacity", 1);  
    
  }

    // append bar labels
//        svg.selectAll(".bar_label")
//        .data(summed, year_key)
//        .enter()
//        .append("text")
//        .attr("class", "label_text")
//        .attr("x", function (d) {
//            return x(d.year);
//        })
//        .attr("y", function (d) {
//            return y(d.amount) - 10;
//        }).text((d) => ("Cases: " +  d.count));