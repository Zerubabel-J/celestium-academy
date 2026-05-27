export const TREE_EDGE_COLOR = "var(--color-genealogy-accent)";
export const TREE_EDGE_WIDTH = 2;
export const TREE_SNAP_GRID: [number, number] = [10, 10];
export const TREE_PANEL_BUTTON =
  "bg-genealogy-surface border-border/40 hover:bg-accent/20";
export const TREE_GRID_COLOR = "var(--color-genealogy-surface)";
export const TREE_LINEAR_VIEWPORT = { x: 400, y: 150, zoom: 1.1 } as const;
export const TREE_BINARY_VIEWPORT = { x: 295, y: 200, zoom: 0.8 } as const;

export const TREE_DEFAULT_EDGE = {
  style: { stroke: TREE_EDGE_COLOR, strokeWidth: TREE_EDGE_WIDTH },
  type: "step" as const,
};
