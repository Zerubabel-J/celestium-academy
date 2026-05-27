"use client";

import { useState } from "react";
import {
  ReactFlow,
  Background,
  Panel,
  type ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { GenealogyNode } from "@/app/genealogy/widgets/genealogy-node/GenealogyNode";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGenealogyTree } from "@/app/genealogy/hooks/useGenealogyTree";
import type { GenealogyView } from "@/app/genealogy/types/common";
import {
  TREE_DEFAULT_EDGE,
  TREE_SNAP_GRID,
  TREE_PANEL_BUTTON,
  TREE_GRID_COLOR,
  TREE_LINEAR_VIEWPORT,
  TREE_BINARY_VIEWPORT,
} from "@/app/genealogy/constants/genealogy-tree";
import {
  binaryEdges,
  binaryNodes,
  initialEdges,
  initialNodes,
} from "../data/genealogy-data";

const nodeTypes = {
  genealogy: GenealogyNode,
};

type FlowInstance = ReactFlowInstance<any, any>;

interface GenealogyTreePageProps {
  view: GenealogyView;
}

export default function GenealogyTreePage({ view }: GenealogyTreePageProps) {
  const linear = useGenealogyTree(initialNodes, initialEdges, "linear");
  const binary = useGenealogyTree(binaryNodes, binaryEdges, "binary");

  const [linearInstance, setLinearInstance] = useState<FlowInstance | null>(
    null
  );
  const [binaryInstance, setBinaryInstance] = useState<FlowInstance | null>(
    null
  );

  return (
    <div className="h-screen w-full bg-genealogy-background text-foreground">
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="flex-1 relative">
          <div
            className={cn(
              "relative h-full",
              view === "linear" ? "block" : "hidden"
            )}
          >
            <ReactFlow
              nodes={linear.nodes}
              edges={linear.edges}
              onNodesChange={linear.onNodesChange}
              onEdgesChange={linear.onEdgesChange}
              onInit={(instance) => {
                setLinearInstance(instance as FlowInstance);
              }}
              nodeTypes={nodeTypes}
              className="h-[calc(100vh+400px)] bg-genealogy-background"
              defaultEdgeOptions={TREE_DEFAULT_EDGE}
              nodesDraggable
              defaultViewport={TREE_LINEAR_VIEWPORT}
              nodesConnectable={false}
              elementsSelectable
              snapToGrid
              snapGrid={TREE_SNAP_GRID}
            >
              <Background color={TREE_GRID_COLOR} gap={16} />
              <Panel position="top-right" className="m-4 flex flex-col gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => linearInstance?.zoomIn()}
                  className={TREE_PANEL_BUTTON}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => linearInstance?.zoomOut()}
                  className={TREE_PANEL_BUTTON}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </Panel>
            </ReactFlow>
          </div>

          {/* Binary View */}
          <div
            className={cn(
              "absolute inset-0",
              view === "binary" ? "block" : "hidden"
            )}
          >
            <ReactFlow
              nodes={binary.nodes}
              edges={binary.edges}
              onNodesChange={binary.onNodesChange}
              onEdgesChange={binary.onEdgesChange}
              onInit={(instance) => {
                setBinaryInstance(instance as FlowInstance);
              }}
              nodeTypes={nodeTypes}
              className="bg-genealogy-background"
              defaultEdgeOptions={TREE_DEFAULT_EDGE}
              nodesDraggable
              nodesConnectable={false}
              elementsSelectable
              snapToGrid
              snapGrid={TREE_SNAP_GRID}
              defaultViewport={TREE_BINARY_VIEWPORT}
            >
              <Background color={TREE_GRID_COLOR} gap={16} />
              <Panel position="top-right" className="m-4 flex flex-col gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => binaryInstance?.zoomIn()}
                  className={TREE_PANEL_BUTTON}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => binaryInstance?.zoomOut()}
                  className={TREE_PANEL_BUTTON}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </Panel>
            </ReactFlow>
          </div>
        </div>
      </div>
    </div>
  );
}
