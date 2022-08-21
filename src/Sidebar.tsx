import { DragEvent } from 'react';
import { useState, useCallback, useRef } from 'react';

import { useNodesState, useReactFlow, Edge, Node, ReactFlowJsonObject } from 'react-flow-renderer';


const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
};







const Sidebar = () => {




    return (
        <aside>

            <div className="description">各ノードを左の枠へドラッグアンドドロップ</div>


            <div className="react-flow__node-input" onDragStart={(event: DragEvent) => onDragStart(event, '入力')} draggable>
                入力 Node
            </div>

            <div className="react-flow__node-default" onDragStart={(event: DragEvent) => onDragStart(event, 'デフォルト')} draggable>
                デフォルト Node
            </div>

            <div className="react-flow__node-output" onDragStart={(event: DragEvent) => onDragStart(event, '出力')} draggable>
                出力 Node
            </div>

        </aside>
    );
};

export default Sidebar;