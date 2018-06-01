import { Component, OnInit } from '@angular/core';
import { SunburstService } from './sunburst.service';

import * as d3 from "d3";
import d3Tip from 'd3-tip'; // d3-tip@0.7.0 (with a d3@^4 dependency)


@Component({
  selector: 'app-sunburst',
  templateUrl: './sunburst.component.html',
  styleUrls: ['./sunburst.component.css'],
  providers: [SunburstService]
})
export class SunburstComponent implements OnInit {

	private json = {};

  constructor(private sunburstService: SunburstService) { }

  ngOnInit() {

    this.sunburstService.getJson().subscribe(result => {
      this.json = result;

    	var width = 500,
      height = 500,
      radius = Math.min(width, height) / 2,
      innerRadius = 0.3 * radius;

      var pie = d3.pie()
          .sort(null)
          .value(function(d) { return d.width; });


      var tip = d3Tip()
        .attr('class', 'd3-tip')
        .offset([0, 0])
        .html(function(d) {
          return "<div class='tooltip'>" + d.data.label + ": <span>" + d.data.score + "%" + "</span>" + "</div>";
        });

      var arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(function (d) { 
          return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius; 
        });

      var outlineArc = d3.arc()
              .innerRadius(innerRadius)
              .outerRadius(radius);

      var svg = d3.select("svg.sunburst")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      svg.call(tip);

      var data:any = this.json;

        data.forEach(function(d) {
          d.id     =  d.id;
          d.weight = +d.weight;
          d.score  = +Math.round(d.score);
          d.width  = +d.weight;
          d.label  =  d.label;
        });
        // for (var i = 0; i < data.score; i++) { console.log(data[i].id) }
        var outerPath = svg.selectAll(".outlineArc")
            .data(pie(data))
          .enter().append("path")
            .attr("fill", "none")
            .attr("stroke", "#daeaf3")
            .attr("class", "outlineArc")
            .attr("d", outlineArc);  
            
        var path = svg.selectAll(".solidArc")
            .data(pie(data))
          .enter().append("path")
            .attr("fill", function(d) { return "#68a9d1"; })
            .attr("class", "solidArc")
            .attr("stroke", "#daeaf3")
            .attr("d", arc)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        


        // calculate the weighted mean score
        var score = 
          data.reduce(function(a, b) {
            //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
            return a + (b.score * b.weight); 
          }, 0) / 
          data.reduce(function(a, b) { 
            return a + b.weight; 
          }, 0);

        svg.append("svg.sunburst:text")
          .attr("class", "aster-score")
          .attr("dy", ".35em")
          .attr("text-anchor", "middle") // text-align: right
          .text(Math.round(score)+"%");

      });
  }

}
