import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

function Breadcrumb({ open, menus }) {
  const navigate = useNavigate();

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

  const handleOverDue = () => {
    navigate('/OverDue')

  };

  const handleTodayCallBack = () => {
    navigate('/TodaysCallback')
  };

  const handleFetureCallback = () => {
    navigate('/FetureCallBack')
  };
  const  handleHistory = () => {
    navigate('/History')
  };
  
  return (
    <div className="m-2">
      <div className="mx-4 bg-white rounded-lg px-2 text-black duration-500 my-5 py-4 flex md:justify-around flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center font-semibold">
        <button className="bg-green-600 text-white px-4 py-2 sm:text-sm rounded" onClick={handleOverDue}>
          OverDue
        </button>
        <button className="bg-green-600 text-white px-4 py-2 sm:text-sm rounded" onClick={handleFetureCallback}>
          FutureCallback
        </button>
        <button className="bg-green-600 text-white px-4 py-2 sm:text-sm rounded" onClick={handleTodayCallBack}>
          TodaysCallback
        </button>
        <button className="bg-green-600 text-white px-4 py-2 sm:text-sm rounded" onClick={handleHistory}>
          History
        </button>
      </div>
    </div>
  );
}

export default Breadcrumb;
