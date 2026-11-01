export type DiagramType =
  | "system-architecture"
  | "cloud-architecture"
  | "flowchart"
  | "sequence"
  | "erd"
  | "uml-class"
  | "bpmn"
  | "network"
  | "data-flow"
  | "infrastructure"
  | "mind-map"
  | "user-journey";

export type NodeShape =
  | "rectangle"
  | "rounded"
  | "database"
  | "cloud"
  | "diamond"
  | "queue"
  | "circle"
  | "hexagon"
  | "group";

export type NodeCategory =
  | "compute"
  | "database"
  | "storage"
  | "networking"
  | "messaging"
  | "security"
  | "client"
  | "ai"
  | "decision"
  | "service"
  | "gateway"
  | "generic";

export type PortPosition = "top" | "right" | "bottom" | "left";

export interface NodePort {
  id: string;
  position: PortPosition;
  label?: string;
}

export interface ERDAttribute {
  name: string;
  type: string;
  isPk?: boolean;
  isFk?: boolean;
  isNullable?: boolean;
}

export interface UMLMember {
  name: string;
  type?: string;
  visibility: "+" | "-" | "#";
  isMethod?: boolean;
}

export interface NodeMetrics {
  latency?: string;
  throughput?: string;
  errorRate?: string;
  health?: "healthy" | "warning" | "degraded";
  port?: number | string;
}

export interface DiagramNode {
  id: string;
  type: NodeShape;
  category: NodeCategory;
  title: string;
  subtitle?: string;
  technology?: string;
  icon?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string; // "indigo" | "emerald" | "amber" | "cyan" | "rose" | "violet" | "slate" | "blue"
  groupId?: string;
  locked?: boolean;
  hidden?: boolean;
  erdAttributes?: ERDAttribute[];
  umlMembers?: UMLMember[];
  metrics?: NodeMetrics;
  customData?: Record<string, any>;
}

export interface DiagramEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: PortPosition;
  targetHandle?: PortPosition;
  label?: string;
  subLabel?: string;
  style?: "solid" | "dashed" | "dotted";
  curve?: "bezier" | "orthogonal" | "straight";
  color?: string;
  animated?: boolean;
  markerEnd?: "arrow" | "circle" | "crowfoot" | "none";
  protocol?: string; // "REST" | "gRPC" | "Kafka" | "Postgres" | "TCP" | "WebSocket"
}

export interface DiagramGroup {
  id: string;
  title: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  childrenNodeIds: string[];
  collapsed?: boolean;
}

export interface DiagramHistoryEntry {
  id: string;
  timestamp: string;
  message: string;
  nodesSnapshot: DiagramNode[];
  edgesSnapshot: DiagramEdge[];
  groupsSnapshot?: DiagramGroup[];
}

export interface DiagramDocument {
  id: string;
  title: string;
  description: string;
  diagramType: DiagramType;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  groups: DiagramGroup[];
  createdAt: string;
  updatedAt: string;
  version: number;
  tags: string[];
  history: DiagramHistoryEntry[];
  codeSource?: string;
  codeFormat?: "json" | "eraser-dsl" | "mermaid";
  theme?: "dark" | "light" | "cyberpunk" | "emerald";
  isPublic?: boolean;
  permissions?: "view" | "edit";
}

export interface AIChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  suggestedAction?: {
    type: "add_nodes" | "remove_nodes" | "connect" | "modify" | "re-layout" | "blast_radius";
    payload: any;
  };
  changesApplied?: string[];
  architecturalIssues?: ArchitecturalIssue[];
}

export interface ArchitecturalIssue {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  affectedNodes: string[];
  recommendation: string;
}

export interface DiagramTemplate {
  id: string;
  title: string;
  category: DiagramType;
  description: string;
  complexity: "Beginner" | "Intermediate" | "Advanced";
  nodeCount: number;
  tags: string[];
  badgeColor: string;
  data: Omit<DiagramDocument, "id" | "createdAt" | "updatedAt" | "version" | "history">;
}

