import { useCallback, useMemo } from "react";
import {
  useNodesState,
  useEdgesState,
  type Edge,
  type Node,
} from "@xyflow/react";
import type { GenealogyNodeData } from "../types/genealogy-node";
import type { GenealogyView } from "../types/common";

type GenealogyNode = Node<GenealogyNodeData>;

const collectDescendants = (
  nodeId: string,
  nodes: GenealogyNode[]
): string[] => {
  const directChildren = nodes
    .filter((node) => node.data.parentId === nodeId)
    .map((node) => node.id);
  return directChildren.reduce<string[]>(
    (acc, childId) => acc.concat(childId, collectDescendants(childId, nodes)),
    []
  );
};

export function useGenealogyTree(
  initialNodes: Node[],
  initialEdges: Edge[],
  view: GenealogyView
) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const toggleNodeExpansion = useCallback(
    (nodeId: string) => {
      setNodes((current) => {
        const typedCurrent = current as GenealogyNode[];
        const toggledNodes = typedCurrent.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                data: { ...node.data, isExpanded: !node.data.isExpanded },
              }
            : node
        );

        const referenceNode = toggledNodes.find((node) => node.id === nodeId);
        const isExpanded = referenceNode?.data.isExpanded;
        const descendants = collectDescendants(nodeId, toggledNodes);

        const nextNodes = toggledNodes.map((node) => {
          if (node.data.parentId === nodeId) {
            return { ...node, hidden: !isExpanded };
          }
          if (!isExpanded && descendants.includes(node.id)) {
            return {
              ...node,
              hidden: true,
              data: { ...node.data, isExpanded: false },
            };
          }
          return node;
        });

        setEdges((currentEdges) =>
          currentEdges.map((edge) => {
            const sourceNode = nextNodes.find(
              (node) => node.id === edge.source
            );
            const targetNode = nextNodes.find(
              (node) => node.id === edge.target
            );
            return {
              ...edge,
              hidden: sourceNode?.hidden || targetNode?.hidden,
            };
          })
        );

        return nextNodes;
      });
    },
    [setNodes, setEdges]
  );

  const toggleNodeVariant = useCallback(
    (nodeId: string, key: "heart" | "favorite") => {
      setNodes((current) => {
        const typedNodes = current as GenealogyNode[];
        return typedNodes.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                data: {
                  ...node.data,
                  variant: node.data.variant === key ? "default" : key,
                },
              }
            : node
        );
      });
    },
    [setNodes]
  );

  const nodesWithHandlers = useMemo(() => {
    const typedNodes = nodes as GenealogyNode[];
    return typedNodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        viewType: view,
        hasChildren: typedNodes.some(
          (candidate) => candidate.data.parentId === node.id
        ),
        onToggleExpand: () => toggleNodeExpansion(node.id),
        onToggleFavorite: () => toggleNodeVariant(node.id, "favorite"),
        onToggleHeart: () => toggleNodeVariant(node.id, "heart"),
      },
    }));
  }, [nodes, toggleNodeExpansion, toggleNodeVariant, view]);

  return {
    nodes: nodesWithHandlers,
    edges,
    onNodesChange,
    onEdgesChange,
  };
}
