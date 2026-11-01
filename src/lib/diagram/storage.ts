import { DiagramDocument, DiagramHistoryEntry } from "@/types/diagram";
import { DIAGRAM_TEMPLATES } from "./templates";

const STORAGE_KEY = "nexio_diagram_studio_documents";
const ACTIVE_DIAGRAM_KEY = "nexio_diagram_studio_active_id";

/**
 * Initialize default diagrams if none exist in localStorage
 */
function getInitialDiagrams(): DiagramDocument[] {
  const initialDocs: DiagramDocument[] = DIAGRAM_TEMPLATES.map((tpl, idx) => ({
    ...tpl.data,
    id: `doc-${tpl.id}`,
    createdAt: new Date(Date.now() - (idx + 1) * 3600 * 1000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - idx * 3600 * 1000 * 6).toISOString(),
    version: 1,
    history: [
      {
        id: `rev-init-${idx}`,
        timestamp: new Date().toISOString(),
        message: "Initial template creation",
        nodesSnapshot: tpl.data.nodes,
        edgesSnapshot: tpl.data.edges,
        groupsSnapshot: tpl.data.groups,
      },
    ],
  }));

  return initialDocs;
}

/**
 * Load all stored diagrams
 */
export function loadAllDiagrams(): DiagramDocument[] {
  if (typeof window === "undefined") {
    return getInitialDiagrams();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getInitialDiagrams();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const initial = getInitialDiagrams();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return parsed;
  } catch (e) {
    console.error("Failed to load diagrams from localStorage:", e);
    return getInitialDiagrams();
  }
}

/**
 * Save all diagrams to localStorage
 */
export function saveAllDiagrams(diagrams: DiagramDocument[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(diagrams));
  } catch (e) {
    console.error("Failed to save diagrams to localStorage:", e);
  }
}

/**
 * Save or update a single diagram
 */
export function saveDiagram(diagram: DiagramDocument): DiagramDocument {
  const all = loadAllDiagrams();
  const existingIndex = all.findIndex((d) => d.id === diagram.id);

  const updatedDiagram: DiagramDocument = {
    ...diagram,
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    all[existingIndex] = updatedDiagram;
  } else {
    all.unshift(updatedDiagram);
  }

  saveAllDiagrams(all);
  return updatedDiagram;
}

/**
 * Delete a diagram
 */
export function deleteDiagram(diagramId: string): DiagramDocument[] {
  const all = loadAllDiagrams();
  const filtered = all.filter((d) => d.id !== diagramId);
  saveAllDiagrams(filtered);
  return filtered;
}

/**
 * Duplicate a diagram
 */
export function duplicateDiagram(diagramId: string): DiagramDocument | null {
  const all = loadAllDiagrams();
  const target = all.find((d) => d.id === diagramId);
  if (!target) return null;

  const duplicated: DiagramDocument = {
    ...target,
    id: `doc-${Date.now()}`,
    title: `${target.title} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: 1,
    history: [
      {
        id: `rev-${Date.now()}`,
        timestamp: new Date().toISOString(),
        message: "Duplicated from " + target.title,
        nodesSnapshot: target.nodes,
        edgesSnapshot: target.edges,
        groupsSnapshot: target.groups,
      },
    ],
  };

  all.unshift(duplicated);
  saveAllDiagrams(all);
  return duplicated;
}

/**
 * Create a snapshot history entry
 */
export function commitDiagramVersion(
  diagram: DiagramDocument,
  commitMessage: string
): DiagramDocument {
  const entry: DiagramHistoryEntry = {
    id: `rev-${Date.now()}`,
    timestamp: new Date().toISOString(),
    message: commitMessage,
    nodesSnapshot: JSON.parse(JSON.stringify(diagram.nodes)),
    edgesSnapshot: JSON.parse(JSON.stringify(diagram.edges)),
    groupsSnapshot: JSON.parse(JSON.stringify(diagram.groups)),
  };

  const updated: DiagramDocument = {
    ...diagram,
    version: diagram.version + 1,
    updatedAt: new Date().toISOString(),
    history: [entry, ...(diagram.history || [])],
  };

  return saveDiagram(updated);
}

