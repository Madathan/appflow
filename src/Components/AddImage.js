import React, { useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { MdCancel } from "react-icons/md";
import { IoImagesOutline } from "react-icons/io5";
import { FaImage } from 'react-icons/fa6';
import { RiDeleteBin5Line } from "react-icons/ri";
import 'reactflow/dist/style.css';

const rfStyle = {
  backgroundColor: 'white',
  left: 490,
  padding: 8,
  borderStyle: 'solid',
  borderColor: 'green',
  borderWidth: 5,
};

const hfStyle = {
  backgroundColor: 'white',
  top: 8,
  padding: 10 ,
  borderStyle: 'solid',
  borderColor: 'green',
  borderWidth: 5,
};

function TextUpdaterNode({ data, onRemove, id }) {
  const onChange = (evt) => {
    if (data.onChange) {
      data.onChange(id, evt.target.value);
    }
  };

  return (
    <>
      <button onClick={onRemove} className="text-gray-600 hover:text-red-800 text-4xl mt-5">
        <MdCancel />
      </button>
      <div className='bg-white rounded-3xl p-4 shadow-lg mt-5'>
        <div className='block bg-[#eae6df] p-2 rounded-xl relative bottom-19 w-full'>
          <Handle type="source" position={Position.Top} id={`AddImage_Handle-${id}`} style={rfStyle} />
          <input id="text" name="text" onChange={onChange} className='rounded-2xl p-10 text-3xl h-[130px] w-full' placeholder='Enter the text' />
        </div>
      </div>
    </>
  );
}

function AddImage({ id, data }) {
  const [inputBoxes, setInputBoxes] = useState([]);
  const [addButtonDisabled, setAddButtonDisabled] = useState(false);
  const { setNodes } = useReactFlow();
  const [keyword, setKeyword] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [show, setShow] = useState(false);

  const fileInputRef = React.useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const addInputBox = () => {
    const newId = inputBoxes.length;
    setInputBoxes((prevInputBoxes) => [
      ...prevInputBoxes,
      { id: newId, component: <TextUpdaterNode key={newId} id={newId} onRemove={() => removeInputBox(newId)} data={{ onChange: handleTextChange }} /> }
    ]);

    if (inputBoxes.length === 2) {
      setAddButtonDisabled(true);
    }
  };

  const removeInputBox = (idToRemove) => {
    setInputBoxes((prevInputBoxes) => prevInputBoxes.filter(({ id }) => id !== idToRemove));
    setAddButtonDisabled(false);
  };

  const handleTextChange = (inputId, value) => {
    if (data.onChange) {
      data.onChange(id, inputId, value);
    }
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
    if (data.onChange) {
      data.onChange(id, 'AddImage_keyword', event.target.value);
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    if (data.onChange) {
      data.onChange(id, 'AddImage_message', event.target.value);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      if (data.onChange) {
        data.onChange(id, 'AddImage_file', base64String);
      }
    };
    reader.readAsDataURL(file);
  };

  const showTooltip = () => {
    setShow(true);
  };

  const hideTooltip = () => {
    setShow(false);
  };

  return (
    <div className='bg-[#ffffff] rounded-[50px] p-7 shadow-2xl hover:border-solid border-[4px] border-green-600' onMouseOver={showTooltip} onMouseOut={hideTooltip}>
      <Handle type="target" position={Position.Left} id="1" className='ml[20px]' style={hfStyle} />

      {show && (
        <button
          onClick={() => setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id))}
          className="absolute right-10 top-11 text-black-600 hover:text-red-800 mt-5 mr-5"
        >
          <RiDeleteBin5Line className='text-gray-600 hover:text-red-500' style={{ fontSize: 50 }} />
        </button>
      )}

      <div className='flex bg-[#def7ec] border-l-[20px] border-green-500 text-green-500 rounded-[20px] mt-1 mb-2 p-4 w-full'>
        <IoImagesOutline className='mt-5 text-4xl' />
        <h3 className='text-center text-[40px] mt-2 ml-4'> Image & Button</h3>
      </div>
      <div className='bg-[#eae6df] border-[4px] border-solid border-red-600 rounded-[25px] p-3 mt-5 shadow-2xl'>

        <div className='block bg-[#eae6df] p-2 rounded-xl relative bottom-19 w-full'>
          <input type='text' placeholder='Enter a Keyword' className='rounded-2xl p-10 text-3xl h-[150px] w-full' style={{ border: "none" }} value={keyword} onChange={handleKeywordChange} />
        </div>
        <div className='block bg-[#eae6df] p-2 rounded-xl w-full'>
          <textarea id="w3review" name="w3review" rows="4" cols="36" placeholder='Enter the caption' className='rounded-2xl border-green-600 border-3 text-3xl' style={{ border: "none" }} value={message} onChange={handleMessageChange}></textarea>
        </div>
        <div className='bg-white rounded-xl relative bottom-17 p-9 h-[250px] w-full'>
          <button className="icon-button ml-[230px] mb-3 mt-10" onClick={handleButtonClick}>
            <FaImage className="text-gray-600 text-6xl" />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <p className='ml-[170px] text-4xl'><span className='mr-3'>+</span>Add Image</p>
        </div>
        {inputBoxes.map(({ id, component }) => (
          <div key={id} style={{ marginBottom: '10px' }}>
            {component}
          </div>
        ))}
      </div>
      <button onClick={addInputBox} className='bg-green-500 text-4xl shadow-2xl p-7 rounded-[15px] px-5 mt-6 text-white w-full' disabled={addButtonDisabled}><span className='mr-2'>+</span>Add Button</button>
    </div>
  );
}

export default AddImage;
