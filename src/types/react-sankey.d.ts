declare module 'react-sankey' {
  import React from 'react';

  interface SankeyNode {
    name: string;
    color?: string;
    value?: number;
    fill?: string;
  }

  interface SankeyLink {
    source: number;
    target: number;
    value: number;
  }

  interface SankeyProps {
    nodes: SankeyNode[];
    links: SankeyLink[];
    width?: number;
    height?: number;
    nodeWidth?: number;
    nodePadding?: number;
    linkOpacity?: number;
    margin?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    };
    align?: 'justify' | 'left' | 'right' | 'center';
    nodeColor?: (node: SankeyNode) => string;
  }

  const Sankey: React.FC<SankeyProps>;
  export default Sankey;
}
