import './App.css';

import  UpdateCard  from  './Components/ReactFlow/FlowUpdate'

import { Routes, Route } from 'react-router-dom';

import KeywordAutomation from './Components/ReactFlow/KeywordAutomation';


import FlowEdit from './Components/FlowEdit'


function App() {
  return (
    <div >
          <Routes>
 
  <Route path='/Keyword-Automation' element={<KeywordAutomation />} />
  {/*<Route path='/WooCommerce' element={<ProtectedRoute><WooCommerce  /></ProtectedRoute>} />*/}
  <Route path='/' element={<FlowEdit/>} />
  <Route path='/Edit-Keyword-Automation' element={ <UpdateCard />} />

 

</Routes>
          
    
    </div>
  );
}

export default App;
