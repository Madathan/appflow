import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ open, setOpen, menus }) => {
  const user = {
    name: 'Bava Rohith MB'
  };

  return (
    <section className='flex flex-col text-white text-sm h-full'>
      {/* Scrollable menu */}
      <div
        className={`transition-all duration-500 ease-in-out ${!open ? 'bg-[--third]' : 'bg-[--primary]'} h-full p-3 ${open ? 'w-60' : 'w-16'} px-2 custom-scrollbar`}
        style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}
        onMouseOver={() => setOpen(true)}
        onMouseOut={() => setOpen(false)}
      >
        {menus?.map((menu) => (
          <React.Fragment key={menu.id}>
            {open ? (
              <h1 className={`text-sm text-gray-200 font-medium py-1 transition-all duration-500 ease-in-out`}>{menu.title}</h1>
            ) : (
              <h1 className={`text-sm text-white font-medium py-1 transition-all duration-500 ease-in-out`} style={{ width: "10px", textAlign: "center" }}></h1>
            )}
            <NavLink
              to={menu.nav}
              className={`flex items-center p-2 rounded-full transition-all duration-500 ease-in-out  ${open ? 'hover:bg-[#00a727]' : ''} ${!open ? 'text-white' : ''} ${menu.nav === window.location.pathname ? 'bg-[#00a727] text-white' : ''}`}
              onClick={() => setOpen(true)}
            >
              <div className={`${open ? 'pl-2' : 'pl-1'} transform ${!open ? 'duration-500' : ''}`}>
                {React.createElement(menu.icon, { size: '18' })}
              </div>
              <h2
                className={`whitespace-pre uppercase text-white text-[13px]  font-sans transition-all duration-500 ease-in-out p-3 font-semibold ${!open ? ' opacity-0 overflow-hidden' : '-'}`}
              >
                {menu.name}
              </h2>
            </NavLink>
          </React.Fragment>
        ))}
      </div>

      {/* Fixed bottom user account section */}
      <div className='flex items-center p-3 bg-[--primary] w-full transition-all duration-500 ease-in-out'>
        <div className='border rounded-full bg-white border-black border-2 h-12 text-black text-center text-xl -ml-2 w-12 flex items-center justify-center'>
          {user.name.charAt(0)}
        </div>
        {open && (
          <div className='ml-2'>
            <h3 className='text-white'>{user.name}</h3>
            <p className='text-gray-300 italic'>{`@${user.name.replace(/\s/g, '')}`}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Sidebar;
