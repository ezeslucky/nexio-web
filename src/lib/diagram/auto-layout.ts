import { DiagramNode, DiagramEdge, DiagramGroup } from "@/types/diagram";

interface LayoutOptions {
  direction?: "LR" | "TB";
  nodeSpacingX?: number;
  nodeSpacingY?: number;
  startX?: number;
  startY?: number;
}

/**
 * Intelligent hierarchical layout engine for diagram nodes and edges
 */
export function applyAutoLayout(
  nodes: DiagramNode[],
  edges: DiagramEdge[],
  groups: DiagramGroup[] = [],
  options: LayoutOptions = {}
): { nodes: DiagramNode[]; groups: DiagramGroup[] } {
  if (nodes.length === 0) return { nodes: [], groups };

  const {
    direction = "LR",
    nodeSpacingX = 120,
    nodeSpacingY = 80,
    startX = 100,
    startY = 100,
  } = options;

  // 1. Build adjacency graph & in-degrees
  const inDegree: Record<string, number> = {};
  const adj: Record<string, string[]> = {};
  const nodeMap = new Map<string, DiagramNode>();

  nodes.forEach((n) => {
    inDegree[n.id] = 0;
    adj[n.id] = [];
    nodeMap.set(n.id, { ...n });
  });

  edges.forEach((e) => {
    if (inDegree[e.target] !== undefined) {
      inDegree[e.target] += 1;
    }
    if (adj[e.source]) {
      adj[e.source].push(e.target);
    }
  });

  // 2. Assign tiers using topological ranking
  const ranks: Record<string, number> = {};
  const queue: string[] = [];

  // Root nodes (0 in-degree)
  nodes.forEach((n) => {
    if (inDegree[n.id] === 0) {
      ranks[n.id] = 0;
      queue.push(n.id);
    }
  });

  // If cyclic or no 0-in-degree roots, pick first node
  if (queue.length === 0 && nodes.length > 0) {
    ranks[nodes[0].id] = 0;
    queue.push(nodes[0].id);
  }

  // BFS / Longest path tier assignment
  const visited = new Set<string>();
  while (queue.length > 0) {
    const curr = queue.shift()!;
    visited.add(curr);
    const currRank = ranks[curr] ?? 0;

    const neighbors = adj[curr] || [];
    for (const nxt of neighbors) {
      const nextRank = Math.max(ranks[nxt] ?? 0, currRank + 1);
      ranks[nxt] = nextRank;
      if (!visited.has(nxt)) {
        queue.push(nxt);
      }
    }
  }

  // Any unranked nodes get assigned tier based on their category
  nodes.forEach((n) => {
    if (ranks[n.id] === undefined) {
      if (n.category === "client") ranks[n.id] = 0;
      else if (n.category === "gateway" || n.category === "security") ranks[n.id] = 1;
      else if (n.category === "compute" || n.category === "service" || n.category === "ai") ranks[n.id] = 2;
      else if (n.category === "messaging") ranks[n.id] = 3;
      else if (n.category === "database" || n.category === "storage") ranks[n.id] = 4;
      else ranks[n.id] = 2;
    }
  });

  // 3. Group nodes by rank
  const rankGroups: Record<number, string[]> = {};
  Object.entries(ranks).forEach(([nodeId, rank]) => {
    if (!rankGroups[rank]) rankGroups[rank] = [];
    rankGroups[rank].push(nodeId);
  });

  const sortedRanks = Object.keys(rankGroups)
    .map(Number)
    .sort((a, b) => a - b);

  // 4. Calculate positions
  const updatedNodes: DiagramNode[] = [];
  let currentMainCoord = direction === "LR" ? startX : startY;

  sortedRanks.forEach((rank) => {
    const nodeIdsInRank = rankGroups[rank];
    const totalCount = nodeIdsInRank.length;

    // Determine max dimension in this tier
    let maxThickness = 0;
    nodeIdsInRank.forEach((id) => {
      const n = nodeMap.get(id)!;
      const thickness = direction === "LR" ? n.width : n.height;
      if (thickness > maxThickness) maxThickness = thickness;
    });

    // Calculate cross dimension positions
    let currentCrossCoord = direction === "LR" ? startY : startX;

    nodeIdsInRank.forEach((id, idx) => {
      const n = nodeMap.get(id)!;
      let newX = n.x;
      let newY = n.y;

      if (direction === "LR") {
        newX = currentMainCoord;
        newY = currentCrossCoord + idx * (n.height + nodeSpacingY);
      } else {
        newX = currentCrossCoord + idx * (n.width + nodeSpacingX);
        newY = currentMainCoord;
      }

      const updated = {
        ...n,
        x: Math.round(newX),
        y: Math.round(newY),
      };
      nodeMap.set(id, updated);
      updatedNodes.push(updated);
    });

    currentMainCoord += maxThickness + (direction === "LR" ? nodeSpacingX : nodeSpacingY);
  });

  // 5. Update groups to enclose their child nodes
  const updatedGroups = groups.map((g) => {
    const children = updatedNodes.filter((n) => g.childrenNodeIds.includes(n.id));
    if (children.length === 0) return g;

    const padding = 36;
    const minX = Math.min(...children.map((c) => c.x)) - padding;
    const minY = Math.min(...children.map((c) => c.y)) - padding;
    const maxX = Math.max(...children.map((c) => c.x + c.width)) + padding;
    const maxY = Math.max(...children.map((c) => c.y + c.height)) + padding;

    return {
      ...g,
      x: minX,
      y: minY,
      width: Math.max(maxX - minX, 220),
      height: Math.max(maxY - minY, 140),
    };
  });

  return {
    nodes: updatedNodes,
    groups: updatedGroups,
  };
}

