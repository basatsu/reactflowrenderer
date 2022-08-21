import { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  addEdge,
  FitViewOptions,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection
} from 'react-flow-renderer';



import { DragEvent } from 'react';
import {
  ReactFlowProvider,
  Controls,
  ReactFlowInstance,
  useNodesState,
  useEdgesState
} from 'react-flow-renderer';

import Sidebar from './Sidebar';

import './dnd.css';

import React from 'react';
import { useReactFlow } from 'react-flow-renderer';

//import Controls from './Controls';

const initialNodes: Node[] = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 } },
];

/*
const initialNodes: Node[] = [
  { id: '1', type: 'input', data: { label: 'input node' }, position: { x: 250, y: 5 } }];
*/

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
];

const fitViewOptions: FitViewOptions = {
  padding: 0.2
}


const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

let id = 0;
const getId = () => `dndnode_${id++}`;

//Add
const getNodeId = () => `randomnode_${+new Date()}`;

//--------------

function Flow() {
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  //const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds));

  const onInit = (rfi: ReactFlowInstance) => setReactFlowInstance(rfi);

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    if (reactFlowInstance) {
      const type = event.dataTransfer.getData('application/reactflow');
      const position = reactFlowInstance.project({ x: event.clientX, y: event.clientY - 40 });
      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    }
  };


  //Saverestore
  //const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  //const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  //const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  //Saverestore---------------

  // Add
  const onAdd = useCallback(() => {
    const newNode = {
      id: `random_node-${getNodeId()}`,
      data: { label: 'Added node' },
      position: { x: Math.random() * window.innerWidth - 100, y: Math.random() * window.innerHeight },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);


  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" style={{ width: 1080, height: 500 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onNodesChange={onNodesChange}
            onConnect={onConnect}
            onInit={onInit}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );

}
export default Flow;