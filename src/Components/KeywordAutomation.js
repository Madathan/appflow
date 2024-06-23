import { useCallback, useState, useRef } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, MiniMap, Controls, Background,BackgroundVariant } from 'reactflow';
import AddImage from './AddImage';
import 'reactflow/dist/style.css';
import AddPdf from './AddPdf';
import NodeContainer from './DragInputs';
import { GiClick } from 'react-icons/gi';
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import { GrDocumentPdf } from "react-icons/gr";
import CustomEdge from './CustomEdge';
import ConnectionLine from './ConnectLine';
import { FaListUl } from "react-icons/fa";
import ListDrag from './ListDrag';
import { useNavigate } from 'react-router-dom';


const rfStyle = {
  backgroundColor: 'white',
 padding:10,
 color:"balck",
};

const initialNodes = []; // Initialize with an empty array

const nodeTypes = { nodeContainer: NodeContainer, addImage: AddImage, addPdf: AddPdf, listDrag: ListDrag};
const edgeTypes = {
  customEdge: CustomEdge, // Match the type here with the one you're using in addEdge
};

function Flow() {
  const [nodes, setNodes] = useState(initialNodes); // Start with an empty nodes array
  const [edges, setEdges] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [inputpdf, setInputpdf] = useState({});
  const [inputButton, setInputButton] = useState({});
  const [list, setInputList] = useState({});

  const [draggingEnabled, setDraggingEnabled] = useState(true);
  const sidebarRef = useRef(null);

     const nav= (useNavigate)

  const extractConnectionData = () => {
    return edges.map((edge) => ({
      sourceNodeId: edge.source,
      sourceHandleId: edge.sourceHandle,
      targetNodeId: edge.target,
      targetHandleId: edge.targetHandle,
    }));
  };
  
  const connectionData = extractConnectionData();

  const combinedArray = [
    { Type: 'Image_&_button', data: inputValues  },
    { Type: 'Document_&_button', data: inputpdf },
    { Type: 'Text_&_button', data: inputButton},
    { Type: 'List_&_button', data: list  },
    { Type: 'Connection', data: connectionData  },
  ];
  
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge({ ...connection, type: 'customEdge', animated: true }, eds)),
    [setEdges]
  );

  const handleSidebarItemClick = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: 'nodeContainer',
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { onChange: handletextButtons },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const handleAddCustomNode = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: 'addImage',
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { onChange: handleInputChange }, // Pass handleInputChange
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const handleSidebarImgDocument = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: 'addPdf',
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { onChange: handleimageChange },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const handleSidebarList = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: 'listDrag',
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { onChange: handleListDrag },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const toggleDraggingEnabled = () => {
    setDraggingEnabled(!draggingEnabled);
  };

  const handleInputChange = (nodeId, inputType, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [nodeId]: {
        ...prevValues[nodeId],
        [inputType]: value,
      },
    }));
  };

  const handleimageChange = (nodeId, inputType, value) => {
    setInputpdf((prevValues) => ({
      ...prevValues,
      [nodeId]: {
        ...prevValues[nodeId],
        [inputType]: value,
      },
    }));
  };

  const handleListDrag = (nodeId, inputType, value) => {
    setInputList((prevValues) => ({
      ...prevValues,
      [nodeId]: {
        ...prevValues[nodeId],
        [inputType]: value, 
      },
    }));
  };

  const handletextButtons = (nodeId, inputType, value) => {
    setInputButton((prevValues) => ({
      ...prevValues,
      [nodeId]: {
        ...prevValues[nodeId],
        [inputType]: value,
      },
    }));
  };

  
  const handleSubmit = () => {
    
    console.log('Image_&_button:', JSON.stringify(combinedArray, null, 2));
    
    
  };
   
  return (
    
    <div className="flex h-screen w-full bg-white">



      <div
        ref={sidebarRef}
        className="bg-white p-4 flex flex-col rounded-lg"
        style={{
          width: draggingEnabled ? '120px' : '10px',
          height: draggingEnabled ? '90%' : '90%',
         
          transition: 'width 0.5s ease-in-out',
        }}
      >
        <div className="flex items-center mb-4 rounded-2xl">
          <button
            onClick={toggleDraggingEnabled}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            {draggingEnabled ? (
              <MdOutlineKeyboardDoubleArrowLeft className="ml-10 text-black text-4xl" />
            ) : (
              <MdOutlineKeyboardDoubleArrowRight className="relative right-2 bottom-1 right-7 text-4xl rounded-xl text-black" />
            )}
          </button>
        </div>
        <div
          className={`flex-grow overflow-y-auto ${draggingEnabled ? 'opacity-100' : 'opacity-0'} transition-opacity`}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-2 mt-3 ml-2 cursor-pointer border-solid border-2 border-green-500"
            onClick={handleSidebarItemClick}
          >
            <GiClick className="text-center ml-5 text-green-700 mx-20" />
            <p className="text-center text-sm mt-1 text-gray-600">Text</p>
            <p className="text-center ml-1 text-gray-600">Button</p>
          </div>
          <div
            className="bg-white rounded-lg shadow-lg p-2 mt-3 ml-2 cursor-pointer border-solid border-2 border-green-500"
            onClick={handleAddCustomNode}
          >
            <FaImage className="text-center ml-5 text-green-700" />
            <p className="text-center text-sm mt-1 text-gray-600">Image</p>
            <p className="text-center ml-1 text-gray-600">Button</p>
          </div>
          <div
            className="bg-white rounded-lg shadow-lg p-2 mt-3 ml-2 cursor-pointer border-solid border-2 border-green-500"
            onClick={handleSidebarImgDocument}
          >
            <GrDocumentPdf className="text-center ml-5 text-green-700" />
            <p className="text-center text-sm mt-1 text-gray-600">Document</p>
            <p className="text-center ml-1 text-gray-600">Button</p>
          </div>
          <div
            className="bg-white rounded-lg shadow-lg p-2 mt-3 ml-2 cursor-pointer border-solid border-2 border-green-500"
            onClick={handleSidebarList}
          >
            <FaListUl className="text-center ml-5 text-green-700" />
            <p className="text-center text-sm mt-1 text-gray-600">List</p>
            <p className=" text-center ml-1 text-gray-600">Button</p>
          </div>
          <div>
           
        </div>
        </div>
      </div>
      
      <div className="flex-grow  w-full " style={{height:"87%"}}>
   <div className='flex  w-full h-14 bg-white border-dashed border-b border-gray-400'>
   <div className='mb-2'>
          <input type="text" className='  border-2 border-green-500 border-solid mt-2 rounded-lg' placeholder='name the Flow'/>
      </div>
      <div className='ml-16'>
            <button
                onClick={handleSubmit}
                className=" mt-2   bg-green-500 text-white p-2 rounded-xl   text-sm"
              >
                save changes
              </button>
              </div>
            <div className='ml-30'>
                <button
             
                  className="text-right mt-2  ml-20 bg-green-500 text-white p-2 rounded-xl   text-sm"
                >
                   Flow Detail
                </button>
            </div>
     
     
  </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          animated={true}
         
          minZoom={0}
          fitView
          fitViewOptions={{
            padding: 2.5,
            
          }}
          connectionLineComponent={ConnectionLine}
       
        >
          <MiniMap />
          <Controls />
          <Background size={3} gap={30}style={rfStyle} variant={BackgroundVariant.Dots }  />
        </ReactFlow>
       
      </div>
    </div>
 
  );
}

export default Flow;