import { DiagramDocument, DiagramNode, DiagramEdge } from "@/types/diagram";

/**
 * Generate standalone SVG string representation of the diagram
 */
export function exportToSvg(diagram: DiagramDocument): string {
  const padding = 60;
  const nodes = diagram.nodes;

  if (nodes.length === 0) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="100%" height="100%" fill="#0c0a09"/><text x="50%" y="50%" fill="#78716c" text-anchor="middle" font-family="sans-serif">Empty Diagram</text></svg>`;
  }

  const minX = Math.min(...nodes.map((n) => n.x)) - padding;
  const minY = Math.min(...nodes.map((n) => n.y)) - padding;
  const maxX = Math.max(...nodes.map((n) => n.x + n.width)) + padding;
  const maxY = Math.max(...nodes.map((n) => n.y + n.height)) + padding;

  const width = Math.max(maxX - minX, 600);
  const height = Math.max(maxY - minY, 400);

  // Colors map
  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    indigo: { bg: "#1e1b4b", border: "#6366f1", text: "#e0e7ff" },
    violet: { bg: "#2e1065", border: "#8b5cf6", text: "#ede9fe" },
    blue: { bg: "#172554", border: "#3b82f6", text: "#dbeafe" },
    cyan: { bg: "#083344", border: "#06b6d4", text: "#cffafe" },
    emerald: { bg: "#022c22", border: "#10b981", text: "#d1fae5" },
    amber: { bg: "#451a03", border: "#f59e0b", text: "#fef3c7" },
    rose: { bg: "#4c0519", border: "#f43f5e", text: "#ffe4e6" },
    slate: { bg: "#1e293b", border: "#64748b", text: "#f1f5f9" },
  };

  // Node SVG generator
  const nodesSvg = nodes
    .map((n) => {
      const c = colorMap[n.color] || colorMap.indigo;
      const rx = n.type === "circle" ? n.width / 2 : n.type === "rounded" ? 14 : 6;

      let extraContent = "";
      if (n.technology) {
        extraContent = `<text x="${n.x + 16}" y="${n.y + 70}" fill="#a6a09b" font-size="11" font-family="monospace">${n.technology}</text>`;
      }

      return `
        <g id="node-${n.id}">
          <rect x="${n.x}" y="${n.y}" width="${n.width}" height="${n.height}" rx="${rx}" fill="${c.bg}" stroke="${c.border}" stroke-width="1.5" />
          <text x="${n.x + 16}" y="${n.y + 32}" fill="#fafaf9" font-size="14" font-weight="600" font-family="sans-serif">${n.title}</text>
          <text x="${n.x + 16}" y="${n.y + 50}" fill="#a6a09b" font-size="11" font-family="sans-serif">${n.subtitle || ""}</text>
          ${extraContent}
        </g>
      `;
    })
    .join("\n");

  // Edges SVG generator
  const edgesSvg = diagram.edges
    .map((e) => {
      const src = nodes.find((n) => n.id === e.source);
      const tgt = nodes.find((n) => n.id === e.target);
      if (!src || !tgt) return "";

      const startX = src.x + src.width;
      const startY = src.y + src.height / 2;
      const endX = tgt.x;
      const endY = tgt.y + tgt.height / 2;

      const deltaX = Math.abs(endX - startX) * 0.5;
      const pathD = `M ${startX} ${startY} C ${startX + deltaX} ${startY}, ${endX - deltaX} ${endY}, ${endX} ${endY}`;
      const color = e.color || "#818cf8";
      const dash = e.style === "dashed" ? 'stroke-dasharray="6,4"' : "";

      let labelSvg = "";
      if (e.label) {
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2 - 8;
        labelSvg = `<text x="${midX}" y="${midY}" fill="#d4d4d8" font-size="10" font-family="sans-serif" text-anchor="middle" background="#000">${e.label}</text>`;
      }

      return `
        <g id="edge-${e.id}">
          <path d="${pathD}" fill="none" stroke="${color}" stroke-width="2" ${dash} marker-end="url(#arrowhead)" />
          ${labelSvg}
        </g>
      `;
    })
    .join("\n");

  // Groups SVG generator
  const groupsSvg = diagram.groups
    .map((g) => {
      return `
        <g id="group-${g.id}">
          <rect x="${g.x}" y="${g.y}" width="${g.width}" height="${g.height}" rx="16" fill="rgba(255,255,255,0.02)" stroke="#292524" stroke-width="1.5" stroke-dasharray="4,4" />
          <text x="${g.x + 18}" y="${g.y + 24}" fill="#78716c" font-size="12" font-weight="600" font-family="sans-serif" text-transform="uppercase">${g.title}</text>
        </g>
      `;
    })
    .join("\n");

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${minX} ${minY} ${width} ${height}">
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill="#818cf8" />
        </marker>
        <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#292524" />
        </pattern>
      </defs>
      <rect x="${minX}" y="${minY}" width="${width}" height="${height}" fill="#0c0a09" />
      <rect x="${minX}" y="${minY}" width="${width}" height="${height}" fill="url(#grid)" />
      ${groupsSvg}
      ${edgesSvg}
      ${nodesSvg}
    </svg>
  `;
}

/**
 * Download SVG file to client machine
 */
export function downloadSvg(diagram: DiagramDocument) {
  const svgString = exportToSvg(diagram);
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${diagram.title.toLowerCase().replace(/[^a-z0-9]/g, "-") || "diagram"}.svg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Download PNG image by rendering the SVG onto an HTML5 Canvas
 */
export async function downloadPng(diagram: DiagramDocument) {
  const svgString = exportToSvg(diagram);
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width * 2; // 2x high resolution
    canvas.height = img.height * 2;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(2, 2);
    ctx.drawImage(img, 0, 0);

    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = `${diagram.title.toLowerCase().replace(/[^a-z0-9]/g, "-") || "diagram"}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  img.src = url;
}

/**
 * Generate formatted HTML printable document (for PDF export / browser print)
 */
export function downloadPdf(diagram: DiagramDocument) {
  const svgString = exportToSvg(diagram);
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${diagram.title} - AI Diagram Studio Architecture Report</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0c0a09; color: #fafaf9; margin: 40px; }
          .header { border-bottom: 1px solid #292524; padding-bottom: 20px; margin-bottom: 30px; }
          h1 { margin: 0 0 8px 0; font-size: 24px; }
          p { margin: 0; color: #a6a09b; font-size: 14px; }
          .diagram-box { background: #141210; border: 1px solid #292524; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 30px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid #292524; font-size: 13px; }
          th { color: #a6a09b; font-weight: 600; text-transform: uppercase; font-size: 11px; }
          .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-family: monospace; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${diagram.title}</h1>
          <p>${diagram.description} · Generated via Nexio AI Diagram Studio · Version ${diagram.version}</p>
        </div>
        <div class="diagram-box">
          ${svgString}
        </div>
        <h3>System Component Inventory (${diagram.nodes.length} Components)</h3>
        <table>
          <thead>
            <tr>
              <th>Component</th>
              <th>Category</th>
              <th>Technology / Runtime</th>
              <th>Role &amp; Responsibility</th>
            </tr>
          </thead>
          <tbody>
            ${diagram.nodes
              .map(
                (n) => `
              <tr>
                <td><strong>${n.title}</strong></td>
                <td><span class="badge" style="background: rgba(99,102,241,0.1); color: #818cf8;">${n.category}</span></td>
                <td><code>${n.technology || "Standard"}</code></td>
                <td>${n.subtitle || "-"}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}

/**
 * Export JSON source
 */
export function exportToJson(diagram: DiagramDocument): string {
  return JSON.stringify(diagram, null, 2);
}

export function downloadJson(diagram: DiagramDocument) {
  const json = exportToJson(diagram);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${diagram.title.toLowerCase().replace(/[^a-z0-9]/g, "-") || "diagram"}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Convert Diagram to Mermaid DSL definition
 */
export function exportToMermaid(diagram: DiagramDocument): string {
  let dsl = "graph LR\n";

  // Nodes
  diagram.nodes.forEach((n) => {
    const cleanTitle = n.title.replace(/[\[\]\(\)]/g, "");
    dsl += `  ${n.id}["${cleanTitle}"]\n`;
  });

  // Edges
  diagram.edges.forEach((e) => {
    const label = e.label ? `|${e.label}|` : "";
    dsl += `  ${e.source} -->${label} ${e.target}\n`;
  });

  return dsl;
}

export function downloadMermaid(diagram: DiagramDocument) {
  const dsl = exportToMermaid(diagram);
  const blob = new Blob([dsl], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${diagram.title.toLowerCase().replace(/[^a-z0-9]/g, "-") || "diagram"}.mmd`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generate shareable link
 */
export function generateShareLink(diagramId: string, permission: "view" | "edit" = "view"): string {
  if (typeof window === "undefined") return `https://nexio.dev/diagram-studio?id=${diagramId}&mode=${permission}`;
  const origin = window.location.origin;
  return `${origin}/diagram-studio?id=${diagramId}&mode=${permission}`;
}

