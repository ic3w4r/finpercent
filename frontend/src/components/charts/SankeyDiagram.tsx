import React, { useEffect, useRef } from 'react';
import { select, scaleOrdinal, schemeCategory10 } from 'd3';
import { sankey, sankeyLinkHorizontal, SankeyNode, SankeyLink } from 'd3-sankey';

interface SankeyData {
  nodes: Array<{ name: string; value: number }>;
  links: Array<{ source: number; target: number; value: number }>;
}

interface SankeyDiagramProps {
  data: SankeyData;
  width?: number;
  height?: number;
}

const SankeyDiagram: React.FC<SankeyDiagramProps> = ({ 
  data, 
  width = 800, 
  height = 400 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data) return;

    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const container = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create sankey generator
    const sankeyGenerator = sankey<{}, {}>()
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 5], [innerWidth - 1, innerHeight - 5]]);

    // Process data
    const { nodes, links } = sankeyGenerator({
      nodes: data.nodes.map(d => ({ ...d })),
      links: data.links.map(d => ({ ...d }))
    });

    // Color scale
    const colorScale = scaleOrdinal(schemeCategory10);

    // Draw links
    const link = container
      .append("g")
      .selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", sankeyLinkHorizontal())
      .style("stroke", (d: any) => colorScale(d.source.name))
      .style("stroke-opacity", 0.5)
      .style("stroke-width", (d: any) => Math.max(1, d.width))
      .style("fill", "none");

    // Add link hover effects
    link
      .on("mouseover", function(event, d: any) {
        select(this).style("stroke-opacity", 0.8);
        
        // Show tooltip
        const tooltip = container
          .append("g")
          .attr("class", "tooltip")
          .attr("transform", `translate(${event.layerX}, ${event.layerY})`);
        
        const rect = tooltip
          .append("rect")
          .attr("x", -50)
          .attr("y", -30)
          .attr("width", 100)
          .attr("height", 25)
          .attr("rx", 5)
          .style("fill", "rgba(0, 0, 0, 0.8)")
          .style("stroke", "#22c55e")
          .style("stroke-width", 1);
        
        tooltip
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dy", -10)
          .style("fill", "white")
          .style("font-size", "12px")
          .text(`$${d.value.toLocaleString()}`);
      })
      .on("mouseout", function() {
        select(this).style("stroke-opacity", 0.5);
        container.select(".tooltip").remove();
      });

    // Draw nodes
    const node = container
      .append("g")
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node");

    // Node rectangles
    node
      .append("rect")
      .attr("x", (d: any) => d.x0)
      .attr("y", (d: any) => d.y0)
      .attr("height", (d: any) => d.y1 - d.y0)
      .attr("width", (d: any) => d.x1 - d.x0)
      .style("fill", (d: any) => colorScale(d.name))
      .style("stroke", "#fff")
      .style("stroke-width", 2)
      .style("rx", 3);

    // Node labels
    node
      .append("text")
      .attr("x", (d: any) => d.x0 < innerWidth / 2 ? d.x1 + 6 : d.x0 - 6)
      .attr("y", (d: any) => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d: any) => d.x0 < innerWidth / 2 ? "start" : "end")
      .style("font-size", "12px")
      .style("font-weight", "600")
      .style("fill", "#374151")
      .text((d: any) => d.name);

    // Node values
    node
      .append("text")
      .attr("x", (d: any) => d.x0 < innerWidth / 2 ? d.x1 + 6 : d.x0 - 6)
      .attr("y", (d: any) => (d.y1 + d.y0) / 2 + 15)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d: any) => d.x0 < innerWidth / 2 ? "start" : "end")
      .style("font-size", "10px")
      .style("fill", "#6b7280")
      .text((d: any) => `$${d.value.toLocaleString()}`);

  }, [data, width, height]);

  return (
    <div className="neo-card p-6">
      <h3 className="text-lg font-semibold mb-4 text-primary-900 dark:text-primary-100">
        Financial Flow Analysis
      </h3>
      <div className="w-full overflow-x-auto">
        <svg ref={svgRef} className="w-full h-auto min-w-[800px]"></svg>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        Interactive visualization showing revenue flows and expense breakdown
      </p>
    </div>
  );
};

export default SankeyDiagram;