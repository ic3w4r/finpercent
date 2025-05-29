import React, { useEffect } from 'react';
import { Sankey } from 'recharts';
import { motion, useAnimation } from 'framer-motion';

interface SankeyNode {
  name: string;
  value?: number;
}

interface SankeyLink {
  source: number;
  target: number;
  value: number;
}

interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

interface SankeyDiagramProps {
  data: SankeyData;
  width?: number;
  height?: number;
}

const SankeyDiagram: React.FC<SankeyDiagramProps> = ({
  data,
  width = 1000,
  height = 500
}) => {
  // Calculate total value for percentages
  const totalValue = data.links
    .filter(link => link.target === 2) // Links going to Total Revenue
    .reduce((sum, link) => sum + link.value, 0);

  // Get node color based on type
  const getNodeColor = (name: string): string => {
    const colorMap: Record<string, string> = {
      'Products': '#3b82f6',
      'Services': '#6366f1',
      'Total Revenue': '#2563eb',
      'Product Cost': '#ef4444',
      'Service Cost': '#f59e0b',
      'Cost of Revenue': '#dc2626',
      'Gross Profit': '#22c55e',
      'Operating Expenses': '#f97316',
      'R&D': '#f97316',
      'SG&A': '#f97316',
      'Other': '#f97316',
      'Operating Profit': '#10b981',
      'Tax': '#8b5cf6',
      'Net Profit': '#059669'
    };
    return colorMap[name] || '#94a3b8';
  };

  // Calculate node values from links
  const nodesWithValues = data.nodes.map((node, index) => {
    const incoming = data.links.filter(link => link.target === index);
    const outgoing = data.links.filter(link => link.source === index);
    const value = incoming.reduce((sum, link) => sum + link.value, 0) || 
                 outgoing.reduce((sum, link) => sum + link.value, 0);
    return {
      ...node,
      value,
      fill: getNodeColor(node.name),
      color: getNodeColor(node.name)
    };
  });

  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const linkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 0.8,
      transition: {
        pathLength: { 
          delay: i * 0.1, 
          duration: 1.5, 
          ease: "easeInOut" 
        },
        opacity: { 
          delay: i * 0.1, 
          duration: 0.5 
        }
      }
    })
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    })
  };

  return (
    <div className="neo-card p-6 bg-opacity-80 bg-white dark:bg-gray-800/80 backdrop-blur-sm">
      <motion.h2 
        className="text-xl font-semibold mb-4 text-[#2563eb]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-[#3b82f6]">///</span> FINANCIAL FLOW ANALYSIS <span className="text-[#3b82f6]">///</span>
      </motion.h2>
      <div className="overflow-x-auto">
        <Sankey
          width={width}
          height={height}
          data={{
            nodes: nodesWithValues,
            links: data.links
          }}
          node={(nodeProps) => (
            <g>
              <motion.rect
                x={nodeProps.x}
                y={nodeProps.y}
                width={nodeProps.width}
                height={nodeProps.height}
                fill={nodeProps.payload?.fill || '#94a3b8'}
                stroke="#fff"
                strokeWidth={1}
                strokeDasharray="4 2"
                variants={nodeVariants}
                custom={nodeProps.index}
                initial="hidden"
                animate={controls}
                whileHover={{
                  scale: 1.05,
                  strokeWidth: 2,
                  stroke: "#fff",
                  filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))"
                }}
              />
              <text
                x={nodeProps.x < 500 ? nodeProps.x + nodeProps.width + 10 : nodeProps.x - 10}
                y={nodeProps.y + nodeProps.height / 2}
                textAnchor={nodeProps.x < 500 ? 'start' : 'end'}
                fill="#1a202c"
                fontSize={12}
                fontWeight="bold"
              >
                {nodeProps.payload?.name}
              </text>
              <text
                x={nodeProps.x < 500 ? nodeProps.x + nodeProps.width + 10 : nodeProps.x - 10}
                y={nodeProps.y + nodeProps.height / 2 + 15}
                textAnchor={nodeProps.x < 500 ? 'start' : 'end'}
                fill="#4a5568"
                fontSize={11}
              >
                ${nodeProps.payload?.value?.toLocaleString()}
              </text>
              <text
                x={nodeProps.x < 500 ? nodeProps.x + nodeProps.width + 10 : nodeProps.x - 10}
                y={nodeProps.y + nodeProps.height / 2 + 30}
                textAnchor={nodeProps.x < 500 ? 'start' : 'end'}
                fill="#64748b"
                fontSize={10}
                fontStyle="italic"
              >
                ({totalValue > 0 ? Math.round((nodeProps.payload?.value || 0) / totalValue * 100) : 0}% of total)
              </text>
            </g>
          )}
          nodePadding={40}
          margin={{ top: 30, right: 120, bottom: 30, left: 120 }}
          nodeWidth={24}
          link={(linkProps) => (
            <motion.path
              d={`
                M${linkProps.sourceX},${linkProps.sourceY}
                C${linkProps.sourceControlX},${linkProps.sourceY} 
                ${linkProps.targetControlX},${linkProps.targetY} 
                ${linkProps.targetX},${linkProps.targetY}
              `}
              fill="none"
              stroke={linkProps.payload?.source?.fill || '#94a3b8'}
              strokeWidth={linkProps.linkWidth}
              strokeOpacity={0.8}
              variants={linkVariants}
              custom={linkProps.index}
              initial="hidden"
              animate={controls}
              whileHover={{
                strokeWidth: linkProps.linkWidth * 1.5,
                strokeOpacity: 1,
                filter: "drop-shadow(0 0 5px rgba(59, 130, 246, 0.5))"
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default SankeyDiagram;
