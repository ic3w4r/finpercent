import React, { useEffect, useRef } from 'react';
import { select, scaleOrdinal, interpolate, color } from 'd3';
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

    const margin = { top: 30, right: 40, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Define gradients
    const defs = svg.append("defs");
    
    // Create gradient definitions for nodes
    const gradientColors = [
      { id: 'gradient1', colors: ['#22c55e', '#16a34a'] }, // Green
      { id: 'gradient2', colors: ['#3b82f6', '#1d4ed8'] }, // Blue
      { id: 'gradient3', colors: ['#8b5cf6', '#7c3aed'] }, // Purple
      { id: 'gradient4', colors: ['#f59e0b', '#d97706'] }, // Amber
      { id: 'gradient5', colors: ['#ef4444', '#dc2626'] }, // Red
      { id: 'gradient6', colors: ['#06b6d4', '#0891b2'] }, // Cyan
      { id: 'gradient7', colors: ['#84cc16', '#65a30d'] }, // Lime
      { id: 'gradient8', colors: ['#f97316', '#ea580c'] }, // Orange
      { id: 'gradient9', colors: ['#ec4899', '#db2777'] }, // Pink
      { id: 'gradient10', colors: ['#6366f1', '#4f46e5'] }, // Indigo
    ];

    gradientColors.forEach(grad => {
      const gradient = defs.append("linearGradient")
        .attr("id", grad.id)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", "0%").attr("y1", "0%")
        .attr("x2", "100%").attr("y2", "100%");
      
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", grad.colors[0])
        .attr("stop-opacity", 0.8);
      
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", grad.colors[1])
        .attr("stop-opacity", 0.9);
    });

    // Create shadow filter
    const filter = defs.append("filter")
      .attr("id", "shadow")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%");

    filter.append("feDropShadow")
      .attr("dx", 2)
      .attr("dy", 2)
      .attr("stdDeviation", 3)
      .attr("flood-color", "#22c55e")
      .attr("flood-opacity", 0.3);

    const container = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create sankey generator
    const sankeyGenerator = sankey<{}, {}>()
      .nodeWidth(20)
      .nodePadding(15)
      .extent([[1, 5], [innerWidth - 1, innerHeight - 5]]);

    // Process data
    const { nodes, links } = sankeyGenerator({
      nodes: data.nodes.map(d => ({ ...d })),
      links: data.links.map(d => ({ ...d }))
    });

    // Enhanced color scale with custom colors
    const nodeColors = [
      '#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444',
      '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
    ];

    // Draw enhanced links with gradients
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
        
        // Create unique gradient for each link
        const gradientId = `linkGradient${d.source.index}-${d.target.index}`;
        const gradient = defs.append("linearGradient")
          .attr("id", gradientId)
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", d.source.x1).attr("y1", (d.source.y0 + d.source.y1) / 2)
          .attr("x2", d.target.x0).attr("y2", (d.target.y0 + d.target.y1) / 2);
        
        gradient.append("stop")
          .attr("offset", "0%")
          .attr("stop-color", sourceColor)
          .attr("stop-opacity", 0.6);
        
        gradient.append("stop")
          .attr("offset", "100%")
          .attr("stop-color", targetColor)
          .attr("stop-opacity", 0.4);
        
        return `url(#${gradientId})`;
      })
      .style("stroke-opacity", 0.7)
      .style("transition", "all 0.3s ease");

    // Enhanced link hover effects
    link
      .on("mouseover", function(event, d: any) {
        select(this)
          .style("stroke-opacity", 1)
          .style("stroke-width", Math.max(3, d.width + 2))
          .style("filter", "drop-shadow(0 0 6px rgba(34, 197, 94, 0.6))");
        
        // Enhanced tooltip
        const [mouseX, mouseY] = [event.layerX || 0, event.layerY || 0];
        const tooltip = container
          .append("g")
          .attr("class", "tooltip")
          .attr("transform", `translate(${mouseX}, ${mouseY - 40})`);
        
        // Tooltip background with gradient
        const tooltipBg = tooltip
          .append("rect")
          .attr("x", -80)
          .attr("y", -35)
          .attr("width", 160)
          .attr("height", 50)
          .attr("rx", 12)
          .style("fill", "url(#gradient1)")
          .style("stroke", "#ffffff")
          .style("stroke-width", 2)
          .style("filter", "drop-shadow(0 4px 12px rgba(34, 197, 94, 0.3))")
          .style("opacity", 0.95);
        
        // Tooltip arrow
        tooltip
          .append("polygon")
          .attr("points", "-8,15 0,25 8,15")
          .style("fill", "#22c55e")
          .style("stroke", "#ffffff")
          .style("stroke-width", 1);
        
        // Tooltip text
        tooltip
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dy", -15)
          .style("fill", "white")
          .style("font-size", "14px")
          .style("font-weight", "bold")
          .style("font-family", "Manrope, sans-serif")
          .text(`$${d.value.toLocaleString()}`);
        
        tooltip
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dy", 0)
          .style("fill", "rgba(255, 255, 255, 0.8)")
          .style("font-size", "10px")
          .style("font-family", "Manrope, sans-serif")
          .text(`${d.source.name} → ${d.target.name}`);
      })
      .on("mouseout", function() {
        select(this)
          .style("stroke-opacity", 0.7)
          .style("stroke-width", (d: any) => Math.max(2, d.width))
          .style("filter", "none");
        container.select(".tooltip").remove();
      });

    // Draw enhanced nodes
    const node = container
      .append("g")
      .attr("class", "nodes")
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node");

    // Node rectangles with gradients and shadows
    node
      .append("rect")
      .attr("x", (d: any) => d.x0)
      .attr("y", (d: any) => d.y0)
      .attr("height", (d: any) => d.y1 - d.y0)
      .attr("width", (d: any) => d.x1 - d.x0)
      .attr("rx", 8)
      .attr("ry", 8)
      .style("fill", (d: any, i: number) => `url(#gradient${(i % 10) + 1})`)
      .style("stroke", "#ffffff")
      .style("stroke-width", 2)
      .style("filter", "url(#shadow)")
      .style("cursor", "pointer")
      .style("transition", "all 0.3s ease")
      .on("mouseover", function() {
        select(this)
          .style("transform", "scale(1.05)")
          .style("filter", "url(#shadow) drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))");
      })
      .on("mouseout", function() {
        select(this)
          .style("transform", "scale(1)")
          .style("filter", "url(#shadow)");
      });

    // Enhanced node labels
    node
      .append("text")
      .attr("x", (d: any) => d.x0 < innerWidth / 2 ? d.x1 + 12 : d.x0 - 12)
      .attr("y", (d: any) => (d.y1 + d.y0) / 2 - 8)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d: any) => d.x0 < innerWidth / 2 ? "start" : "end")
      .style("font-size", "14px")
      .style("font-weight", "700")
      .style("font-family", "Manrope, sans-serif")
      .style("fill", "#1f2937")
      .style("text-shadow", "0 1px 2px rgba(255, 255, 255, 0.8)")
      .text((d: any) => d.name);

    // Enhanced node values with better styling
    node
      .append("text")
      .attr("x", (d: any) => d.x0 < innerWidth / 2 ? d.x1 + 12 : d.x0 - 12)
      .attr("y", (d: any) => (d.y1 + d.y0) / 2 + 8)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d: any) => d.x0 < innerWidth / 2 ? "start" : "end")
      .style("font-size", "12px")
      .style("font-weight", "600")
      .style("font-family", "Manrope, sans-serif")
      .style("fill", "#22c55e")
      .style("text-shadow", "0 1px 2px rgba(255, 255, 255, 0.8)")
      .text((d: any) => `$${d.value.toLocaleString()}`);

    // Add animation on load
    link
      .style("stroke-dasharray", function(this: any) {
        const length = this.getTotalLength();
        return `${length} ${length}`;
      })
      .style("stroke-dashoffset", function(this: any) {
        return this.getTotalLength();
      })
      .transition()
      .duration(2000)
      .ease((t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t) // Custom easing
      .style("stroke-dashoffset", 0);

    node.selectAll("rect")
      .style("opacity", 0)
      .transition()
      .duration(1000)
      .delay((d: any, i: number) => i * 100)
      .style("opacity", 1);

    node.selectAll("text")
      .style("opacity", 0)
      .transition()
      .duration(800)
      .delay((d: any, i: number) => i * 100 + 500)
      .style("opacity", 1);

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