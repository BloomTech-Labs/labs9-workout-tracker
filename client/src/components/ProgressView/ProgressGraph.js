import React, { useEffect } from "react";
import styled from "styled-components";
import * as d3 from "d3";

const ProgressGraph = props => {
  const { metrics, type } = props;

  const d3Data = () => {
    let arr = [];

    metrics.forEach(m => {
      arr.push({
        date: dateParser(m.date),
        value: m[type]
      });
    });

    return arr;
  };

  const dateParser = date => {
    date = date.split("-");

    const newDate = date[0] + "/" + date[1] + "/" + date[2];

    return new Date(newDate).getTime();
  };

  const drawChart = () => {
    let data = d3Data();
    d3.select("path.line").remove();
    d3.select(".line").remove();
    let svgWidth = 600,
      svgHeight = 400;
    let margin = { top: 20, right: 20, bottom: 30, left: 50 };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;

    let svg = d3
      .select("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    let g = svg
      .append("g")
      .attr("class", "line")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    let x = d3.scaleTime().rangeRound([0, width]);

    let y = d3.scaleLinear().rangeRound([height, 0]);

    let line = d3
      .line()
      .x(d => x(d.date))
      .y(d => y(d.value));
    x.domain(d3.extent(data, d => d.date));
    y.domain(d3.extent(data, d => d.value));

    g.append("g")
      .attr("class", "line")
      .attr("class", "line")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .select(".domain")
      .remove();

    g.append("g")
      .attr("class", "line")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Weight");

    g.append("path")
      .attr("class", "line")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#FD8F25")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  };

  useEffect(
    () => {
      drawChart();
    },
    [type]
  );

  return (
    <div>
      {/* <svg width="600" height="400">
        <g transform={`translate(${50},${20})`}/>
      </svg> */}
      <svg />
    </div>
  );
};

export default ProgressGraph;
