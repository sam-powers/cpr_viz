var mouseoverbar = function(d) {
       
 d3.select(this)
      .style("opacity", .5);  
    
 d3.selectAll("#amount")
    .text( d3.format("$,.2r")(d.amount))
    .style("opacity", 1)
    
d3.selectAll("#cases")
    .text( d.count)
    .style("opacity", 1)
    
    
d3.selectAll("#settle")
    .text( d3.format("$,.2r")(d.avg))
    .style("opacity", 1) 
    
};


var mousemovebar = function(d) {  }

var mouseleavebar = function(d) {
    d3.selectAll("#amount").style("opacity", 0);
    d3.selectAll("#cases").style("opacity", 0);
    d3.selectAll("#settle").style("opacity", 0);


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