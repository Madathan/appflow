import React from 'react';
import { BsCheck2 } from "react-icons/bs";
import { BsCheck2All } from "react-icons/bs";

const ChatContect = ({ last_message, name, time,status }) => {
  // Ensure that name is defined and not empty before accessing its first character
  const firstLetter = name && name.charAt(0).toUpperCase();

  // Generate a random color code
  const randomColor = () => {
    return '#' + Math.floor(Math.random() * 215).toString(16);
  };

  // Function to truncate the last message to the first two words
  const truncateMessage = (message) => {
    if (message) {
      const letters = message.split('');
      if (letters.length > 20) {
        return letters.slice(0, 10).join(''); // Return the first 10 letters
      }
      return message;
    }
    return ''; // Return empty string if message is null
};
  return (
    <div className='p-4 '>
      <div className='flex items-center justify-between '>
        <div className='flex items-center'>
          {/* Displaying the first letter as the avatar with a random background color */}
          <p
            className='  bg-gray-700 rounded-full h-12 w-12 flex items-center justify-center text-center text-3xl'
            style={{ color: 'white' }}
          >
            {firstLetter}
          </p>
          <div className='pl-4'>
            <p className='font-semibold  font-sans'>{name}</p>
            <p className='text-sm text-gray-600 '>{truncateMessage(last_message)}</p>
          </div>
        </div>
        <div >
        <p className='text-[10px] text-gray-400'>{time}</p>
        <p className='texte-lg text-green-600'>{status==="read" ?<BsCheck2All />:<BsCheck2 />
        }</p>
        </div>
      </div>
    </div>
  );
};

export default ChatContect;
