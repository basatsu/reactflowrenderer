import React, { memo, useCallback, Dispatch, FC } from 'react';
import { useReactFlow, Edge, Node, ReactFlowJsonObject } from 'react-flow-renderer';


const getNodeId = () => `randomnode_${+new Date()}`;

type ControlsProps = {
    setNodes: Dispatch<React.SetStateAction<Node<any>[]>>;
    setEdges: Dispatch<React.SetStateAction<Edge<any>[]>>;
};

const Controls: FC<ControlsProps> = ({ setNodes, setEdges }) => {

    const onAdd = useCallback(() => {
        const newNode = {
            id: `random_node-${getNodeId()}`,
            data: { label: 'Added node' },
            position: { x: Math.random() * window.innerWidth - 100, y: Math.random() * window.innerHeight },
        };
        setNodes((nds) => nds.concat(newNode));
    }, [setNodes]);

    return (
        <div className="save__controls">
            <button onClick={onAdd}>add node</button>
        </div>
    );
};

export default memo(Controls);