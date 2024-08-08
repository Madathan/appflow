import './App.css';
import { useState } from 'react';
import Sidebar from './views/Sidebar';
import Login from './LoginPage';
//import CrmTable from './Components/CrmTable';
import { SiPowervirtualagents } from "react-icons/si";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineContacts } from "react-icons/md";
import { TiFlowSwitch } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import { FaOpencart } from "react-icons/fa";
import { HiOutlineCreditCard } from "react-icons/hi2";
import  UpdateCard  from  './Components/ReactFlow/FlowUpdate'
import { CgProfile } from "react-icons/cg";
import Complain from './Components/RaiseComplaint'
import { VscDebugDisconnect } from "react-icons/vsc";

//menu icons
import Logout from './Logout';
import ProtectedRoute from './ProtectedRoute/Index';
import { MdLeaderboard } from "react-icons/md";
import { MdGroups3 } from "react-icons/md";
import { CgTemplate } from "react-icons/cg";
import { MdOutlineCampaign } from "react-icons/md";
import { MdAssignmentInd } from "react-icons/md";
import { SiFastapi } from "react-icons/si";
import { TbReportAnalytics } from "react-icons/tb";
// import Navbar from './views/Navbar';
 import BreadCrumbs from './views/BreadCrumbs';
import { Routes, Route } from 'react-router-dom';
import RestAPI from './Components/RestAPI';
import Orders from './Components/Orders';
import Groups from './Components/Groups';
import Contacts from './Components/Contacts';
import CustomizeTeam from './Components/CustomizeTeam';
import Campaigns from './Components/Campaign/Campaigns';
import AssignAgent from './Components/AssaignAgent/AssignAgent';
import ChatInbox from './Components/Chatinbox/ChatInbox';
import CrmLeads from './Components/CrmLeads';
import Templates from './Components/Templates/Templates';
import KeywordAutomation from './Components/ReactFlow/KeywordAutomation';
import DashBoard from './Components/DashBoard'
import Reports from './Components/Reports';
import CommerceSettings from './Components/CommerceSettings';
import WooCommerce from './Components/Woocommerse/WooCommerce';
import CampaignSelect from './Components/Campaign/CampaignSelect';
import ConnectAccount from './Components/ConnectAccount';
import GenerateLicense from './Components/GenerateLicense';
import { PiMicrosoftTeamsLogoBold } from "react-icons/pi";
import { MdConnectWithoutContact } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import Signup from './SignUp';
import Validation from './Valitation';
import FlowEdit from './Components/FlowEdit'
import LicenceThisMonth from './Components/GenerateThisMonthExpire'
import  FetureCallBack  from './InboxCem/FetureCallBack';
import History from './InboxCem/History'
import TodaysCallback from './InboxCem/TodaysCallback';
import OverDue from './InboxCem/OverDue';

function App() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const shouldShowBreadcrumbs = !location.pathname.includes("Keyword-Automation") && !location.pathname.includes("login") && !location.pathname.includes("Logout") ;
  const data = [
    { id: 1, campaignName: 'Campaign 1', date: '2024-04-12', ownerName: 'Owner 1', contacts: '2', send: 100, failed: 5 },
    { id: 2, campaignName: 'Campaign 2', date: '2024-04-13', ownerName: 'Owner 2', contacts: '3', send: 150, failed: 8 },
    { id: 3, campaignName: 'Campaign 3', date: '2024-04-14', ownerName: 'Owner 3', contacts: '4', send: 200, failed: 10 },
    { id: 4, campaignName: 'Campaign 4', date: '2024-04-15', ownerName: 'Owner 4', contacts: '5', send: 250, failed: 12 },
    { id: 5, campaignName: 'Campaign 5', date: '2024-04-16', ownerName: 'Owner 5', contacts: '6', send: 300, failed: 15 },
    { id: 6, campaignName: 'Campaign 6', date: '2024-04-17', ownerName: 'Owner 6', contacts: '7', send: 350, failed: 18 },
    { id: 7, campaignName: 'Campaign 7', date: '2024-04-18', ownerName: 'Owner 7', contacts: '8', send: 400, failed: 20 },
    { id: 8, campaignName: 'Campaign 8', date: '2024-04-19', ownerName: 'Owner 8', contacts: '9', send: 450, failed: 22 },
    { id: 9, campaignName: 'Campaign 9', date: '2024-04-20', ownerName: 'Owner 9', contacts: '10', send: 500, failed: 25 },
    { id: 10, campaignName: 'Campaign 10', date: '2024-04-21', ownerName: 'Owner 10', contacts: '11', send: 550, failed: 28 },
    { id: 11, campaignName: 'Campaign 11', date: '2024-04-22', ownerName: 'Owner 11', contacts: '12', send: 600, failed: 30 },
    { id: 12, campaignName: 'Campaign 12', date: '2024-04-23', ownerName: 'Owner 12', contacts: '13', send: 650, failed: 32 },
    { id: 13, campaignName: 'Campaign 13', date: '2024-04-24', ownerName: 'Owner 13', contacts: '14', send: 700, failed: 35 },
    { id: 14, campaignName: 'Campaign 14', date: '2024-04-25', ownerName: 'Owner 14', contacts: '15', send: 750, failed: 38 },
    { id: 15, campaignName: 'Campaign 15', date: '2024-04-26', ownerName: 'Owner 15', contacts: '16', send: 800, failed: 40 },
    { id: 16, campaignName: 'Campaign 16', date: '2024-04-27', ownerName: 'Owner 16', contacts: '17', send: 850, failed: 42 },
    { id: 17, campaignName: 'Campaign 17', date: '2024-04-28', ownerName: 'Owner 17', contacts: '18', send: 900, failed: 45 },
    { id: 18, campaignName: 'Campaign 18', date: '2024-04-29', ownerName: 'Owner 18', contacts: '19', send: 950, failed: 48 },
    { id: 19, campaignName: 'Campaign 19', date: '2024-04-30', ownerName: 'Owner 19', contacts: '20', send: 1000, failed: 50 },
    { id: 20, campaignName: 'Campaign 20', date: '2024-05-01', ownerName: 'Owner 20', contacts: '21', send: 1050, failed: 52 },
    { id: 21, campaignName: 'Campaign 21', date: '2024-05-02', ownerName: 'Owner 21', contacts: '22', send: 1100, failed: 55 },
    { id: 22, campaignName: 'Campaign 22', date: '2024-05-03', ownerName: 'Owner 22', contacts: '23', send: 1150, failed: 58 },
    { id: 23, campaignName: 'Campaign 23', date: '2024-05-04', ownerName: 'Owner 23', contacts: '24', send: 1200, failed: 60 },
    { id: 24, campaignName: 'Campaign 24', date: '2024-05-05', ownerName: 'Owner 24', contacts: '25', send: 1250, failed: 62 },
    { id: 25, campaignName: 'Campaign 25', date: '2024-05-06', ownerName: 'Owner 25', contacts: '26', send: 1300, failed: 65 },
    { id: 26, campaignName: 'Campaign 26', date: '2024-05-07', ownerName: 'Owner 26', contacts: '27', send: 1350, failed: 68 },
    { id: 27, campaignName: 'Campaign 27', date: '2024-05-08', ownerName: 'Owner 27', contacts: '28', send: 1400, failed: 70 },
    { id: 28, campaignName: 'Campaign 28', date: '2024-05-09', ownerName: 'Owner 28', contacts: '29', send: 1450, failed: 72 },
    { id: 29, campaignName: 'Campaign 29', date: '2024-05-10', ownerName: 'Owner 29', contacts: '30', send: 1500, failed: 75 },
    { id: 30, campaignName: 'Campaign 30', date: '2024-05-11', ownerName: 'Owner 30', contacts: '31', send: 1550, failed: 78 },
  ];
  const menus = [
    { id: 1, title: "MENU", name: "Dashboard", link: '/', icon: LuLayoutDashboard, nav: "/Dashboard" },
    { id: 2, bre: "MENU", name: 'Reports', link: '/', icon: TbReportAnalytics, nav: '/Reports', Margin: true },
    { id: 3, title: "ONBOARD CLIENTS", name: "REST API", link: '/', icon: SiFastapi, nav: "/REST-API" },
    { id: 4, bre: "ONBOARD CLIENTS", name: " License", link: '/', icon: HiOutlineCreditCard, nav: "/Generate-License", Margin: true },
    { id: 5, title: "WABA ACCOUNTS", name: " Account", link: '/', icon: MdConnectWithoutContact, nav: "/Connect-Account" , Margin: true },
    { id: 6, title: "WHATS COMMERCE", name: "Orders", link: '/', icon: FaOpencart, nav: "/Orders" , Margin: true },
    { id: 7, title: "TEAM MANAGMENT", name: " Teams", link: '/', icon: PiMicrosoftTeamsLogoBold, nav: "/Customize-Teams" },
    { id: 8, bre: "TEAM MANAGMENT", name: "Team Inbox", link: '/', icon: SiPowervirtualagents, nav: "/Team-Inbox", Margin: true  },
    { id: 9, title: "CONTACT MANAGEMENT", name: "Contacts", link: '/', icon: MdOutlineContacts, nav: "/Contacts" },
    { id: 10, bre: "CONTACT MANAGEMENT", name: "Groups", link: '/', icon: MdGroups3, nav: "/Groups", Margin: true  },
    { id: 11, title: "TEMPLATES AND CAMPAIGNS", name: "Templates", link: '/', icon: CgTemplate, nav: "/Templates" },
    { id: 12, bre: "TEMPLATES AND CAMPAIGNS", name: "Campaigns", link: '/', icon: MdOutlineCampaign, nav: "/Campaigns", Margin: true  },
    { id: 13, title: "CHATFLOW AUTOMATION", name: "Flow", link: '/', icon: TiFlowSwitch, nav: "/FlowEdit", Margin: true  },
    { id: 14, title: "WECRM INTEGRATION", name: " Leads", link: '/', icon: MdLeaderboard, nav: "/CRM-Leads" },
    { id: 15, bre: "WECRM INTEGRATION", name: " Agent", link: '/', icon: MdAssignmentInd, nav: "/Assign-Agent", Margin: true  },
    { id: 16, bre: "WECRM INTEGRATION", name: "Commerce", link: '/', icon: IoSettingsOutline, nav: "/Commercesettings" , Margin: true  },
    { id: 16, bre: "WECRM INTEGRATION", name: "Support", link: '/', icon: VscDebugDisconnect, nav: "/Complain" , Margin: true  },
   // { id: 17, bre: "WECRM INTEGRATION", name: "Woo", link: '/', icon: SiWoo, nav: "/WooCommerce" , Margin: true  },

      
  ];
  
  
  return (
    <div className={`${open ? 'bg-[--primary]' : 'bg-[--third]'}`}>
      <div className='App h-screen '>
        <Sidebar setOpen={setOpen} open={open} menus={menus} />
        <main className={`bg-[#f8f9fa]      content w-full overflow-y-auto custom-scrollbar`}>
          {shouldShowBreadcrumbs && <BreadCrumbs open={open} menus={menus} />}
          <div className='pl-10 pr-10'>
          <Routes>
  <Route path='/Dashboard' element={<ProtectedRoute><DashBoard open={open} data={data} /></ProtectedRoute>} />
  <Route path='/Reports' element={<ProtectedRoute><Reports open={open} data={data} /></ProtectedRoute>} />
  <Route path='/REST-API' element={<ProtectedRoute><RestAPI /></ProtectedRoute>} />
  <Route path='/Orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
  <Route path='/Contacts' element={<ProtectedRoute><Contacts/></ProtectedRoute>} />
  <Route path='/Groups' element={<ProtectedRoute><Groups /></ProtectedRoute>} />
  <Route path='/Connect-Account' element={<ProtectedRoute><ConnectAccount /></ProtectedRoute>} />
  <Route path='/Customize-Teams' element={<ProtectedRoute><CustomizeTeam /></ProtectedRoute>} />
  <Route path='/CRM-Leads' element={<ProtectedRoute><CrmLeads /></ProtectedRoute>} />
  <Route path="/Generate-License" element={<ProtectedRoute><GenerateLicense open={open} /></ProtectedRoute>} />
  <Route path='/Templates' element={<ProtectedRoute><Templates /></ProtectedRoute>} />
  <Route path='/Campaigns' element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
  <Route path='/Keyword-Automation' element={<ProtectedRoute><KeywordAutomation /></ProtectedRoute>} />
  <Route path='/Assign-Agent' element={<ProtectedRoute><AssignAgent open={open} /></ProtectedRoute>} />
  <Route path='/Commercesettings' element={<ProtectedRoute><CommerceSettings  /></ProtectedRoute>} />
  {/*<Route path='/WooCommerce' element={<ProtectedRoute><WooCommerce  /></ProtectedRoute>} />*/}
  <Route path='/FlowEdit' element={<ProtectedRoute><FlowEdit/></ProtectedRoute>} />

  <Route path='/Edit-Keyword-Automation' element={ <ProtectedRoute><UpdateCard /> </ProtectedRoute>} />
  <Route path='/Team-Inbox' element={<ProtectedRoute><ChatInbox/></ProtectedRoute> } />
  <Route path='/Team-Inbox' element={<ProtectedRoute><ChatInbox/></ProtectedRoute> } /> 
  <Route path='/campaignSelect' element={<ProtectedRoute><CampaignSelect/></ProtectedRoute> } />
  <Route path='/Logout' element={<ProtectedRoute><Logout/></ProtectedRoute> } />
  <Route path='/LicenceThisMonth' element={<ProtectedRoute><LicenceThisMonth/></ProtectedRoute> } />

  <Route path='/OverDue' element={<ProtectedRoute><OverDue/></ProtectedRoute> } />
  <Route path='/TodaysCallback' element={<ProtectedRoute><TodaysCallback/></ProtectedRoute> } />
  <Route path='/FetureCallBack' element={<ProtectedRoute><FetureCallBack/></ProtectedRoute> } />
  <Route path='/History' element={<ProtectedRoute><History/></ProtectedRoute> } />
  <Route path='/Complain' element={<ProtectedRoute><Complain/></ProtectedRoute> } />

  <Route exact path='/Login' element={<Login />} />
  <Route path='/signup' element={<Signup/>} />
  <Route path='/' element={<Validation/>} />

</Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
