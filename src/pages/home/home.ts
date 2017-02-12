import { Component } from '@angular/core';

import { Platform } from 'ionic-angular';

import * as d3 from 'd3';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private platform: Platform) {

  }

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {

    var data = [10, 20, 50];

    var width = this.platform.width()-50,
      height = this.platform.height()-200,
      radius = Math.min(width, height) / 2;

    var color = d3.scaleOrdinal()
      .range(["#993300", "#996600", "#cc6600"]);

    var arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    var labelArc = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    var pie = d3.pie()
      .sort(null)
      .value(function (d) { return d; });

    var svg = d3.select(".chart")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", function (d) { return color(d.data); });

    g.append("text")
      .attr("transform", function (d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function (d) { return d.data; });
  }
}
