const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 600;
var max = { 
            x: 780, 
            y: 650
          };
class ShotD3Component extends D3Component {
  initialize(node, props) {
    const svg = (this.svg = d3.select(node).append('svg'));
    svg
      .attr("width", max.x)
      .attr("height", max.y)
      .attr("background-color", "#122737")
      .append("g")
      //.attr("id", "shotchart");


    var courtBGUrl = "{% static 'images/court.jpg' %}";
        svg.append("svg:defs")
        .append("svg:pattern")
        .attr("id", "bg")
        .attr('patternUnits', 'userSpaceOnUse')
        .attr("width", max.x)
        .attr("height", max.y)
        .append("svg:image")
        .attr("id","image-url")
        .attr("xlink:href", courtUrl)
        .attr("width", max.x)
        .attr("height", max.y);

        svg.append("rect")
        .attr("x", "0")
        .attr("y", "0")
        .attr("width", max.x)
        .attr("height", max.y)
        .attr("fill", "url(#bg)");

        var xScale = d3.scaleLinear()
        .domain([-250, 250])
        .range([0, 780]);

        var yScale = d3.scaleLinear()
        .domain([-1,0, -150])
        .range([590,589, 371]);

        var colorValue = function(d) {
            if(d[11] === 0) {
                return "#8b0000";
            }
            if(d[11] === 1) {
                return "#013220";
            }
        }

        var xValue = function(d) {
            return xScale(d[16]);
        }

        var yValue = function(d) {
            return (yScale(d[17]));
        }

        var classByShot = function(d) {
            if(d[11] === "Missed Shot") {
                return "dot missed";
            }
            if(d[11] === "Made Shot") {
                return "dot made";
            }
        }
        d3.csv("https://raw.githubusercontent.com/augustinexu/augustinexu.github.io/main/Stephen_curry_shooting.csv", function(error, data){
          console.log(data.columns);
          d3.selectAll('dot').remove();
          var node = svg.selectAll("dot").data(data)
          node.enter()
            .append("svg:circle")
            .attr("r", 4)
            .attr("cx", function(d) { return  xValue(d);})
            .attr("cy", function(d) { return yValue(d);})
            .attr("class", function(d) { return classByShot(d);})
            .style("fill", function(d) { return colorValue(d);});
        });
    }

}

module.exports = ShotD3Component;
