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
  onNodeClick?: (nodeName: string) => void;
}

const SankeyDiagram: React.FC<SankeyDiagramProps> = ({ 
  data, 
  width = 800, 
  height = 400,
  onNodeClick
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

    // Enhanced node values with better styling - now showing info icons
    node
      .append("text")
      .attr("x", (d: any) => d.x0 < innerWidth / 2 ? d.x1 + 12 : d.x0 - 12)
      .attr("y", (d: any) => (d.y1 + d.y0) / 2 + 8)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d: any) => d.x0 < innerWidth / 2 ? "start" : "end")
      .style("font-size", "16px")
      .style("font-weight", "600")
      .style("font-family", "Manrope, sans-serif")
      .style("fill", "#22c55e")
      .style("text-shadow", "0 1px 2px rgba(255, 255, 255, 0.8)")
      .style("cursor", "pointer")
      .text("ℹ️")
      .on("click", function(event, d: any) {
        event.stopPropagation();
        if (onNodeClick) {
          onNodeClick(d.name);
        }
      })
      .on("mouseover", function() {
        select(this)
          .style("transform", "scale(1.2)")
          .style("fill", "#16a34a");
      })
      .on("mouseout", function() {
        select(this)
          .style("transform", "scale(1)")
          .style("fill", "#22c55e");
      });

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
    <div className="relative">
      {/* Enhanced container with gradient background */}
      <div className="neo-card p-8 bg-gradient-to-br from-white via-green-50 to-green-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 border-2 border-green-200 dark:border-green-700">
        {/* Header with enhanced styling */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-300 mb-2">
              Financial Flow Analysis
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
              Interactive visualization showing revenue flows and expense breakdown
            </p>
          </div>
          {/* Status indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-green-600 dark:text-green-400">LIVE DATA</span>
          </div>
        </div>
        
        {/* Chart container with enhanced styling */}
        <div className="relative">
          <div className="w-full overflow-x-auto rounded-xl bg-gradient-to-br from-white/80 to-green-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-sm border border-green-200/50 dark:border-green-700/50 p-4">
            <svg ref={svgRef} className="w-full h-auto min-w-[800px] drop-shadow-lg"></svg>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-green-400 rounded-full opacity-60 animate-ping"></div>
          <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-green-500 rounded-full opacity-40 animate-ping animation-delay-1000"></div>
        </div>
        
        {/* Enhanced footer with metrics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700">
            <div className="text-lg font-bold text-green-700 dark:text-green-300">$2.0M</div>
            <div className="text-xs text-green-600 dark:text-green-400 font-medium">Total Revenue</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700">
            <div className="text-lg font-bold text-blue-700 dark:text-blue-300">$900k</div>
            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">Total Costs</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700">
            <div className="text-lg font-bold text-purple-700 dark:text-purple-300">$280k</div>
            <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">Net Profit</div>
          </div>
        </div>
        
        {/* Interactive legend */}
        <div className="mt-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Interaction Guide</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Hover over flows to see detailed amounts</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Hover over nodes for enhanced visual effects</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SankeyDiagram;