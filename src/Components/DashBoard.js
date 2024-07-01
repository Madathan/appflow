import React from "react";
//import { useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import DashChart2 from "./chatrts/DashChart2";
import DashChart3 from "./chatrts/DashChart3";
import DashChart4 from "./chatrts/DashChart4";
import { SlEnvolope } from "react-icons/sl";
import { FaEnvelopeOpen } from "react-icons/fa6";
import { GrSend } from "react-icons/gr";
//import DashTable from "./tables/DashTable";
import { IoIosCalendar } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
const DashBoard = ({ open, data }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 2000,
  };

  return (
    <div className="h-full overflow-y-auto">
      <div>
        <header>
          <h2 className="pb-3 text-3xl font-bold">
            Welcome back,{" "}
            <span className="text-[--second]">BookwithOffers</span>{" "}
            <span
              style={{ transitionDelay: ` 300ms` }}
              className={`${open && "rotate-90"}`}
            >
              👋
            </span>
          </h2>
          <p className="text-gray-500 text-xl">
            Get a quick overview of your campaign's current status below, or
            click into one of the sections for a more detailed breakdown.
          </p>
        </header>

        <main className="my-8 overflow-hidden">
          <div className="gap-x-10 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3">
            <div className="bg-white    border-gray-200 rounded-xl border-solid border group shadow-lg my-4 rounded-xl p-6">
              <div className="flex items-center gap-x-2">
                <div className="bg-white rounded-full p-3 inline-block  group-hover:ring-[--second]  ring-2 ring-[--primary]">
                  <SlEnvolope className="text-2xl  group-hover:text-[--second] text-[--primary]" />
                </div>
                <span className=" group-hover:text-[--second] text-[--primary] font-semibold">
                  WHATSAPP SENT
                </span>
              </div>

              <div className="my-6 flex flex-row md:items-center">
                <div className="text-5xl ml-6 font-bold mt-2 md:mt-0 md:mr-4">647</div>
                <div className="mt-15 ml-14 lg:ml-5">
                  <DashChart2 className="w-full" />
                </div>
              </div>
              <div className="flex items-center">
                <div className="my-4">
                  <div className="bg-[--second] group-hover:bg-[--primary] rounded-full p-3 inline-block animate-bounce duration:600">
                    <FaArrowTrendUp className="text-xl text-white" />
                  </div>
                </div>
                <div className="p-3 text-2xl group-hover:text-[--primary] font-black text-[--second]">
                  <span className="">+</span> Increasing
                </div>
              </div>
            </div>
            <div className="bg-white  group shadow-lg my-4 rounded-xl p-6">
              <div className="flex items-center gap-x-2">
                <div className="bg-white group-hover:ring-[--second]  rounded-full p-3 inline-block ring-2 ring-[--primary]">
                  <GrSend className="text-2xl group-hover:text-[--second] text-[--primary]" />
                </div>
                <span className="group-hover:text-[--second] text-[--primary] font-semibold">
                  WHATSAPP DELIVERED
                </span>
              </div>
              <div className="my-6 flex flex-row md:items-center">
                <div className="text-5xl ml-6 font-bold mt-2 md:mt-0 md:mr-4">583</div>
                <div className="mt-15 ml-14 lg:ml-5 ">
                  <DashChart3 className="w-full" />
                </div>
              </div>

              <div className="flex items-center">
                <div className="my-4">
                  <div className="bg-[--second] group-hover:bg-[--primary] rounded-full p-3 inline-block animate-bounce duration:600">
                    <FaArrowTrendUp className="text-xl text-white" />
                  </div>
                </div>
                <div className="p-3 text-2xl group-hover:text-[--primary] font-black text-[--second]">
                  <span className="">+</span> Increasing
                </div>
              </div>
            </div>
            <div className="bg-white group shadow-lg my-4 rounded-xl p-6">
              <div className="flex items-center gap-x-2">
                <div className="bg-white rounded-full  group-hover:ring-[--second] p-3 inline-block ring-2 ring-[--primary]">
                  <FaEnvelopeOpen className="text-2xl group-hover:text-[--second]  text-[--primary]" />
                </div>
                <span className="text-[--primary] group-hover:text-[--second]  font-semibold">
                  WHATSAPP READ
                </span>
              </div>

              <div className="my-6 flex flex-row md:items-center">
                <div className="text-5xl ml-6 font-bold mt-2 md:mt-0 md:mr-4 ">1265</div>
                <div className="mt-15 ml-14 lg:ml-5">
                  <DashChart4 className="w-full" />
                </div>
              </div>

              <div className="flex items-center ">
                <div className="my-4">
                  <div className="bg-[--second] group-hover:bg-[--primary]  rounded-full p-3 inline-block animate-bounce duration:600">
                    <FaArrowTrendUp className="text-xl text-white" />
                  </div>
                </div>
                <div className="p-3 text-2xl group-hover:text-[--primary]  font-black text-[--second]">
                  <span className="">+</span> Increasing
                </div>
              </div>
            </div>
          </div>
        </main>

        <body>

          <div style={{ overflowX: 'hidden' }} className="gap-x-10 grid  sm:grid-cols-1 lg:grid-cols-1">
            {/* <div className="sm:col-span-1 border border-black  lg:col-span-1 bg-white my-4 rounded-xl p-8">

            </div> */}
            <Slider {...settings}>
              {data.slice().reverse().map((item, index) => (
                <div key={index} className={` group text-lg  ${open ? 'bg-[--primary]' : 'bg-[--primary]'} text-white my-4 rounded-lg p-6`}>
                  <div className="m-2 flex justify-between">
                    <div className="flex items-center gap-x-3">
                      <div className="p-2 rounded-full  bg-[--second]">
                        <IoIosCalendar className="text-2xl" />
                      </div>
                      <h4>LAST CAMPAIGN</h4>
                    </div>
                    <div>
                      {item.id} / {data.length}
                    </div>
                  </div>
                  <div className="my-6 ml-3">
                    <div className="my-4">Date : {item.date}</div>
                    <div className="text-xl">
                      <div className={`text-gray-400`}>{item.campaignName} ,</div>
                      <div className="">Created by {item.ownerName}</div>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex items-center">
                      <div className={` rounded-full p-3 inline-block`}>
                        <div
                          className={`bg-[--second] ${open && 'bg-[--second]'}  rounded-full p-3 inline-block`}
                        >
                          <SlLocationPin className="text-xl text-[--white]" />
                        </div>
                      </div>
                      <div className="ml-2 text-xl">3
                        <div>This Campaign run for {item.contacts} Customers</div>
                        <div className={`text-gray-400`}>{item.send} messages send till now</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

          </div>
        </body>
      </div>
    </div>
  );
};

export default DashBoard;
