import {useState}from 'react';
import { DatePicker, Space } from 'antd';
import Button from '@mui/material/Button';
import GenerateLicenseTable from './GenerateLicneceTable';
const GenerateLicense = () => {
  const [opens, setOpens] = useState(true);
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const handleToggleApiDetails =()=>
    {
      setOpens(!opens);

    };
 
  return (
    <>
    <Button
        variant="contained"
        style={{ backgroundColor: 'green', color: '#FFFFFF', marginBottom: '1rem' }}
        onClick={handleToggleApiDetails}
      >
       {opens ? "GenerateLicence" : "view All Licence"}
      </Button>
   {opens?<GenerateLicenseTable/>: <div className='mb-8 '>
      <div className='grid gap-16 grid-cols-1 lg:grid-cols-2'>
        <div className='lg:p-6 px-3 py-2 rounded-[15px] border border-gray-200 border shadow-xl'>
          <h1 className={`text-center  lg:py-3 pb-4 font-semibold text-black text-[35px] `}>Generate  <span className=''>New</span>  <span className='text-[--second]'>License</span> </h1>
          <form className='p-4 uppercase'>

            <div className='mb-8'>
              <label htmlFor="client_username" className="block mb-2 text-sm  font-bold dark-text-black">Client Username</label>
              <input type="text" id="client_username" name="client_username" className="border border-2 border-[--second] text-gray-900 text-sm rounded-lg focus:ring-[--second] focus:border-[--second] block w-full p-2.5" placeholder="" required />

            </div>
            <div className='mb-8'>
              <label htmlFor="" className="block mb-2 text-sm text-gray-900 font-bold dark-text-black">Password</label>
              <input type="text" id="password" name="password" className="border border-[--second] border-2 text-gray-900 text-sm rounded-lg focus:ring-[--second] focus:border-[--second] block w-full p-2.5" placeholder="" required />
            </div>
            <div className="grid gap-6 mb-6 grid-cols-2">
              <div>
                <label htmlFor="phone_number" className="block mb-2 mt-2 font-bold text-sm  dark-text-black">Phone Number</label>
                <input type="text" id="phone_number" name="phone_number" className="border border-[--second] border-2  text-gray-900 text-sm rounded-lg focus:ring-[--second] focus:border-[--second] block w-full p-2.5" placeholder="+91" required />
              </div>
              <div className=''>
                <label htmlFor="phone_number" className="block mb-2  mt-2  text-sm font-[600] dark-text-black">Validity Period</label>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <DatePicker
                    style={{ padding: '10px', border: '2px solid var(--second', width: '100%' }}
                    onChange={onChange}
                    
                  />
                </Space>
              </div>
            </div>

            <div className='mt-10 mb-4 text-center'>
            <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: '#00a727', color: '#FFFFFF' }}
                
                
              >Generate New License</Button>
            </div>


          </form>
        </div>
        <div className='p-6 rounded-[15px] border border-2  shadow-xl border-gray-200'>
          <h1 className={`text-center py-3 pb-4 font-semibold text-black text-[35px] `}>Enter  <span className=''>Meta</span>  <span className='text-[--second]'>Credentials</span> </h1>
          <form className='p-4 uppercase'>

            <div className='mb-8'>
              <label htmlFor="phone_number_id" className="block mb-2 text-sm font-[600] dark-text-black">Phone Number ID</label>
              <input type="text" id="phone_number_id" name="phone_number_id" className="border border-[--second] border-2 text-gray-900 text-sm rounded-lg focus:ring-[--second] focus:border-[--second] block w-full p-2.5" placeholder="" required />
            </div>
            <div className='mb-10'>
              <label htmlFor="whatsapp_id" className="block mb-2 text-sm font-[600] text-gray-900 dark-text-black">Whatsapp Business Account ID</label>
              <input type="text" id="access_token" name="access_token" className="border border-[--second] border-2 text-gray-900 text-sm rounded-lg focus:ring-[--second] focus:border-[--second] block w-full p-2.5" placeholder="" required />
            </div>

            <div className='mb-1'>
              <label htmlFor="access_token" className="block mb-2 text-sm  font-[600] dark-text-black">Permanent Access Token</label>
              <input type="text" id="access_token" name="access_token" className="border border-[--second] border-2 text-gray-900 text-sm rounded-lg focus:ring-[--second] focus:border-[--second] block w-full p-2.5" placeholder="" required />
            </div>

            <div className='mt-10  text-center'>
            <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: '#00a727', color: '#FFFFFF' }}
                
                
              >Generate New License</Button>
            </div>
          </form>
        </div>
      </div>
      <div className='px-8 mt-16 pt-4 my-6  rounded-[15px] border border-2border-gray-200 shadow-xl'>
        <h1 className={` text-center py-3 font-semibold  text-[35px] `}>Unlock a  <span className='text-[--second]'>CRM</span>  </h1>

        <form className='uppercase'>
          <div className='mb-8'>
            <label htmlFor="client_username" className="block mb-4 text-sm font-bold   dark-text-black">CRM DB Name</label>
            <input type="text" id="CRM_PASS" name="phone_number" className="border border-[--second] border-2 text-gray-900 text-sm rounded-lg focus:ring-[--second] focus:border-[--second] block w-full p-2.5" placeholder="" required />
          </div>

          <div className="grid gap-6 mb-6 lg:grid-cols-2">
            <div>
              <label htmlFor="phone_number" className="block mb-4 text-sm font-bold text-gray-900  dark-text-black">CRM DB Username</label>
              <input type="text" id="CRM_PASS" name="phone_number" className="border border-[--second] border-2 text-gray-900 text-sm rounded-lg focus:ring-[--second] focus:border-[--second] block w-full p-2.5" placeholder="" required />
            </div>
            <div>
              <label htmlFor="phone_number" className="block mb-4 text-sm font-bold  dark-text-black">CRM DB Password</label>
              <input type="text" id="CRM_PASS" name="phone_number" className="border border-[--second] border-2 text-gray-900 text-sm rounded-lg focus:ring-[--second] focus:border-[--second] block w-full p-2.5" placeholder="" required />
            </div>
          </div>
          <div className='mt-10 mb-10 text-center'>
            <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: '#00a727', color: '#FFFFFF' }}
                
                
              >Generate New License</Button>
            </div>
        </form>
      </div>
    </div>}
    </>
  )
}

export default GenerateLicense
