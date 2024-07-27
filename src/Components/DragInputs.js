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

const TextUpdaterNode = ({ data, onRemove, id }) => {
  const onChange = (evt) => {
    if (data.onChange) {
      data.onChange(id, evt.target.value);
    }
  };

  return (
    <div className=''>
      <button onClick={onRemove} className="text-gray-600 hover:text-red-800 text-3xl">
        <MdCancel />
      </button>
      <div className='bg-white rounded-3xl p-4 shadow-lg mt-5'>
        <div className='block bg-[#eae6df] p-2 rounded-xl relative bottom-19 w-full'>
          {/* Corrected string interpolation */}
          <Handle type="source" position={Position.Top} id={`button_id_${id}`} style={rfStyle} />
          <input
            id="text"
            name="text"
            onChange={onChange}
            className='rounded-2xl p-20 text-4xl w-full'
            placeholder='Enter the text1'
          />
        </div>
      </div>
    </div>
  );
};

const NodeContainer = ({ id, data }) => {
  console.log("note",data);
  const [inputBoxes, setInputBoxes] = useState([]);
  const [message, setMessage] = useState("");
  const { setNodes } = useReactFlow();
  const [show, setShow] = useState(false);

  const MAX_INPUT_BOXES = 3;

  const addInputBox = () => {
    const newId = inputBoxes.length+1;
    setInputBoxes((prevInputBoxes) => [
      ...prevInputBoxes,
      { id: newId, component: <TextUpdaterNode key={newId} id={newId} onRemove={() => removeInputBox(newId)} data={{ onChange: handleTextChange }} /> }
    ]);
  };

  const removeInputBox = (indexToRemove) => {
    setMessage('')
    setInputBoxes((prevInputBoxes) => prevInputBoxes.filter((inputBox) => inputBox.id !== indexToRemove));
  };

  const handleTextChange = (inputId, value) => {
    if (data.onChange) {
      data.onChange(id, 'button_'+inputId, value);
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
    <div className='relative bg-[white] rounded-[45px]  p-7 shadow-2xl hover:border-solid hover:border-[4px] hover:border-green-600' onMouseOver={shows} onMouseOut={leave}>
      {show && (
        <button
          onClick={() => setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id))}
          className="absolute  right-10 top-11 text-black  text-lg rounded-lg  lg p-14 bg-white shadow-2xl  hover:text-red-800">
          <RiDeleteBin5Line className='text-gray-600 hover:text-red-800' style={{ fontSize: 40 }} />
        </button>
      )}
      <div className='flex bg-[#def7ec] border-l-[20px] border-green-500 text-green-500 rounded-[20px] mt-1 mb-2 p-4 w-full'>
        <PiRadioButton className='mt-1 text-4xl' />
        <h3 className='text-center text-4xl mt-2 ml-4 '>Text Button</h3>
      </div>
      <div className='bg-[#eae6df] border-[3px] border-solid border-red-700 rounded-[25px] p-2 mt-5'>
        <Handle type="target" position={Position.Left} id={`${id}`}style={hfStyle} />
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
      <button
        onClick={addInputBox}
        className='bg-white text-black shadow-2xl mt-4 text-4xl p-7 rounded-lg px-5 mt-6 w-full'
        disabled={inputBoxes.length >= MAX_INPUT_BOXES}
      >
        <span className='mr-4'>+</span>Add Button
      </button>
    </div>
  );
};

export default NodeContainer;
