import React, { useEffect, useRef } from 'react';
import { select } from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';

interface SankeyData {
  nodes: Array<{ name: string; value?: number }>;
  links: Array<{ source: number; target: number; value: number }>;
}

interface SankeyDiagramProps {
  data: SankeyData;
  width?: number;
  height?: number;
  onNodeClick?: (nodeName: string) => void;
}

const SankeyDiagram: React.FC<SankeyDiagramProps> = ({ 
  data, 
  width = 800, 
  height = 320,
  onNodeClick
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data || !data.nodes || !data.links) return;

    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 20, left: 30 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Define gradients
    const defs = svg.append("defs");
    
    // Minimalist color palette
    const nodeColors = [
      '#10b981', // Emerald
      '#3b82f6', // Blue
      '#059669', // Dark Emerald
      '#6366f1', // Indigo
      '#f59e0b', // Amber
      '#ef4444', // Red
      '#14b8a6', // Teal
      '#f97316'  // Orange
    ];

    nodeColors.forEach((col, idx) => {
      const gradient = defs.append("linearGradient")
        .attr("id", `nodeGrad-${idx}`)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", "0%").attr("y1", "0%")
        .attr("x2", "0%").attr("y2", "100%");
      
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", col)
        .attr("stop-opacity", 0.9);
      
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", col)
        .attr("stop-opacity", 0.7);
    });

    const container = svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create sankey generator
    const sankeyGenerator = sankey<{}, {}>()
      .nodeWidth(14)
      .nodePadding(18)
      .extent([[1, 5], [innerWidth - 1, innerHeight - 5]]);

    // Process data
    const { nodes, links } = sankeyGenerator({
      nodes: data.nodes.map(d => ({ ...d })),
      links: data.links.map(d => ({ ...d }))
    });

    // Draw links
    const linkGroup = container.append("g").attr("class", "links");
    
    const link = linkGroup
      .selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", sankeyLinkHorizontal())
      .style("fill", "none")
      .style("stroke-width", (d: any) => Math.max(2, d.width))
      .style("stroke", (d: any) => {
        const sourceColor = nodeColors[d.source.index % nodeColors.length];
        const targetColor = nodeColors[d.target.index % nodeColors.length];
        
        const gradientId = `linkGrad-${d.source.index}-${d.target.index}`;
        const gradient = defs.append("linearGradient")
          .attr("id", gradientId)
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", d.source.x1).attr("y1", (d.source.y0 + d.source.y1) / 2)
          .attr("x2", d.target.x0).attr("y2", (d.target.y0 + d.target.y1) / 2);
        
        gradient.append("stop")
          .attr("offset", "0%")
          .attr("stop-color", sourceColor)
          .attr("stop-opacity", 0.45);
        
        gradient.append("stop")
          .attr("offset", "100%")
          .attr("stop-color", targetColor)
          .attr("stop-opacity", 0.25);
        
        return `url(#${gradientId})`;
      })
      .style("stroke-opacity", 0.8)
      .style("transition", "all 0.2s ease");

    // Link hover tooltip & glow
    link
      .on("mouseover", function(event, d: any) {
        select(this)
          .style("stroke-opacity", 1)
          .style("stroke-width", Math.max(3, d.width + 1.5));
        
        const [mouseX, mouseY] = [event.layerX || 0, event.layerY || 0];
        const tooltip = container
          .append("g")
          .attr("class", "sankey-tooltip")
          .attr("transform", `translate(${mouseX}, ${mouseY - 30})`);
        
        tooltip
          .append("rect")
          .attr("x", -70)
          .attr("y", -24)
          .attr("width", 140)
          .attr("height", 36)
          .attr("rx", 8)
          .style("fill", "#111111")
          .style("stroke", "#333333")
          .style("stroke-width", 1)
          .style("opacity", 0.95);
        
        tooltip
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dy", -10)
          .style("fill", "#ffffff")
          .style("font-size", "11px")
          .style("font-weight", "bold")
          .style("font-family", "monospace")
          .text(`₹${(d.value / 100000).toFixed(1)} Lakhs`);
        
        tooltip
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dy", 4)
          .style("fill", "#aaaaaa")
          .style("font-size", "9px")
          .style("font-family", "sans-serif")
          .text(`${d.source.name} → ${d.target.name}`);
      })
      .on("mouseout", function() {
        select(this)
          .style("stroke-opacity", 0.8)
          .style("stroke-width", (d: any) => Math.max(2, d.width));
        container.selectAll(".sankey-tooltip").remove();
      });

    // Draw nodes
    const node = container
      .append("g")
      .attr("class", "nodes")
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node");

    // Node bars
    node
      .append("rect")
      .attr("x", (d: any) => d.x0)
      .attr("y", (d: any) => d.y0)
      .attr("height", (d: any) => Math.max(4, d.y1 - d.y0))
      .attr("width", (d: any) => d.x1 - d.x0)
      .attr("rx", 3)
      .attr("ry", 3)
      .style("fill", (_: any, i: number) => `url(#nodeGrad-${i % nodeColors.length})`)
      .style("cursor", "pointer")
      .style("transition", "all 0.2s ease")
      .on("click", function(_: any, d: any) {
        if (onNodeClick) onNodeClick(d.name);
      })
      .on("mouseover", function() {
        select(this).style("opacity", 0.85);
      })
      .on("mouseout", function() {
        select(this).style("opacity", 1);
      });

    // Node title text
    node
      .append("text")
      .attr("x", (d: any) => d.x0 < innerWidth / 2 ? d.x1 + 8 : d.x0 - 8)
      .attr("y", (d: any) => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d: any) => d.x0 < innerWidth / 2 ? "start" : "end")
      .style("font-size", "11px")
      .style("font-weight", "600")
      .style("font-family", "sans-serif")
      .style("fill", "#333333")
      .text((d: any) => d.name);

  }, [data, width, height, onNodeClick]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg 
        ref={svgRef} 
        className="w-full h-full max-h-72 select-none"
      />
    </div>
  );
};

export default SankeyDiagram;