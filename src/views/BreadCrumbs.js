import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

function Breadcrumb({ open, menus }) {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((x) => x);
  const [breadCrumbPath, setBreadCrumbPath] = useState("");
  
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)'
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      let newPath = "";
      pathnames.forEach((name, index) => {
        newPath += `/${name}`;
        if (index === pathnames.length - 1) {
          setBreadCrumbPath(newPath);
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [pathnames]);

  // const currentPageName = pathnames[pathnames.length - 1];

  return (
    <div className='m-2'>
    <div>
      <div className={`mx-4 flex justify-between  bg-white rounded-lg px-2 text-[--second] text-black duration-500 my-5 py-4 flex space-x-4  sm:gap-x-0 flex gap-x-2 items-center font-[600]`}>
        <div className='capitalize  text-2xl'>
        {pathnames.map((name, index) => {
            const isLast = index === pathnames.length - 1;
            const cleanName = name.replace(/[^\w\s]/gi, ' '); // Remove special characters
            const menu = menus.find((menu) => menu.name === cleanName);
            if (menu) {
              return isLast ? (
                <span key={index} className="uppercase"> {`${menu.name}`} </span>
              ) : (
                <span key={index}>
                  <Link to={menu.nav}>{` ${menu.title || 'Admin'} / ${menu.name} `}</Link>
                </span>
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className={`mx-4 ${isMobile && open ? 'hidden' : ''} text-[15px]  sm:gap-x-0 flex gap-x-2 items-center font-[600]`}>
          {pathnames.map((name, index) => {
            const isLast = index === pathnames.length - 1;
            const cleanName = name.replace(/[^\w\s]/gi, ' '); // Remove special characters
            const menu = menus.find((menu) => menu.name === cleanName);
            if (menu) {
              return isLast ? (
                <span key={index} className="uppercase"> {` ${menu.title || menu.bre } / ${menu.name} `} </span>
              ) : (
                <span key={index}>
                  <Link to={menu.nav}>{` ${menu.title || menu.bre} / ${menu.name} `}</Link>
                </span>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  </div>
  
  
  );
}

export default Breadcrumb;
