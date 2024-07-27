import React, { useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { MdCancel } from "react-icons/md";
import 'reactflow/dist/style.css';
import { PiRadioButton } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";

const rfStyle = {
  backgroundColor: 'white',
  left: 660,
  padding: 8,
  borderStyle: 'solid',
  borderColor: "green",
  borderWidth: 5,
};

const hfStyle = {
  backgroundColor: 'white',
  top: 20,
  padding: 8,
  borderStyle: 'solid',
  borderColor: "green",
  borderWidth: 5,
};


const NodeContainer = ({ id, data }) => {
  const [inputBoxes, setInputBoxes] = useState([]);
  const [message, setMessage] = useState('');
  const { setNodes } = useReactFlow();
  const [show, setShow] = useState(false);

  

  

  const removeInputBox = (indexToRemove) => {
    setMessage(' ')
    setInputBoxes((prevInputBoxes) => prevInputBoxes.filter((inputBox) => inputBox.id !== indexToRemove));
  };

  const handleTextChange = (inputId, value) => {
    if (data.onChange) {
      data.onChange(id, inputId, value);
    }
  };

  const handleChanges = (event) => {
    setMessage(event.target.value);
    if (data.onChange) {
      data.onChange(id, 'message', event.target.value);
    }
  };

  const shows = () => { setShow(true) }
  const leave = () => { setShow(false) }

  return (
    <div className='bg-[white] rounded-[45px]  p-7 shadow-2xl hover:border-solid hover:border-[4px] hover:border-green-600' onMouseOver={shows} onMouseOut={leave}>
      {show && (
        <button
          onClick={() => setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id))}
          className="absolute left-[500px] text-black  bottom-[500-px] text-lg rounded-lg  lg p-14 bg-white shadow-2xl  hover:text-red-800">
          <RiDeleteBin5Line className='text-gray-600 hover:text-red-800' style={{ fontSize: 40 }} />
        </button>
      )}
      <div className='flex bg-[#def7ec] border-l-[20px] border-green-500 text-green-500 rounded-[20px] mt-1 mb-2 p-4 w-full'>
        <PiRadioButton className='mt-1 text-4xl' />
        <h3 className='text-center text-4xl mt-2 ml-4 '>Text Button</h3>
      </div>
      <div className='bg-[#eae6df] border-[3px] border-solid border-red-700 rounded-[25px] p-2 mt-5'>
        <Handle type="target" position={Position.Left} id="a" style={hfStyle} />
        <div className='block bg-gray-200 p-4 rounded-lg relative bottom-19 mt-1'>
          <textarea
            id="w3review"
            name="w3review"
            rows="6"
            cols="35"
            value={message}
            placeholder='message'
            className='rounded-2xl border-green-600 border-3 text-4xl'
            style={{ border: "none" }}
            onChange={handleChanges}
          ></textarea>
        </div>
        {inputBoxes.map((inputBox) => (
          <div key={inputBox.id} style={{ marginBottom: '15px' }}>
            {inputBox.component}
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default NodeContainer;
