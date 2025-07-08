// App.jsx
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./features/Navbar";
// import AlfonPage from "./pages/AlfonPage";
import LoginPage from "./pages/General/LoginPage";
import MenuPage from "./pages/General/MenuPage";
// import CommitmentPage from "./pages/commitmentPage";
import UserDetailsPage from "./pages/Alfon/UserDetailsPage";
// import CommitmentDetailsPage from "./pages/CommitmentDetailsPage";
import CampainPage from "./pages/Campaign/CampainPage";
import CampainsPage from "./pages/Campaign/CampainsPage";
import MemorialBoard from "./pages/MemorialDays/MemorialBoard";
// import PeopleInCampain from "./pages/peopleInCampain";
// import CampaignCommitments from "./pages/CampaignCommitments";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DynamicTitle from "./components/General/DynamicTitle";
import ProtectedRoute from "./components/General/ProtectedRoute";
import { AuthProvider } from "./components/StateManegment/AuthProvider";
import AddPersonPage from "./pages/Alfon/AddPersonPage";
import AlfonPage2 from "./pages/Alfon/AlfonPage2";
import EditCampaignPage from "./pages/Campaign/EditCampaignPage";
import PeopleInCampain2 from "./pages/Campaign/PeopleInCampain2";
import CommitmentDetailsPage2 from "./pages/Commitments/CommitmentDetailsPage2";
import CommitmentPage2 from "./pages/Commitments/CommitmentPage2";
import ForgotPassword from "./pages/General/ForgotPassword";
import PettyCash from "./pages/General/PettyCash";
import ResetPassword from "./pages/General/ResetPassword";
import AddMemorialDayToPerson from "./pages/MemorialDays/AddMemorialDayToPerson";
import MemorialDay2 from "./pages/MemorialDays/MemorialDay2";
import MemorialDayDetails from "./pages/MemorialDays/MemorialDayDetails";
import PaymentsWithoutCommitment from "./pages/Payments/PaymentsWithoutCommitment";
import UserProfile from "./pages/Profile/UserProfile";
import ReportCommitments from "./pages/Reports/ReportCommitments";
import ReportNavigation from "./pages/Reports/ReportNavigation";
import ReportPayments from "./pages/Reports/ReportPayments";

// Modal.setAppElement("#root");

// Custom component to handle showing Navbar conditionally
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/login", "/forgot-password", "/reset-password"]; // Define routes where you want to hide the navbar

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      {children}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <>
        <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={true}  // Important for Hebrew
      />
          <DynamicTitle />
          <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
              
                


                <Route element={<ProtectedRoute />}>
                  {/* <Route path="/alfon" element={<AlfonPage />} /> */}
                  <Route path="/alfon" element={<AlfonPage2 />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/commitments/:campainName?" element={<CommitmentPage2 />} />
                  <Route
                    path="/user-details/:AnashIdentifier"
                    element={<UserDetailsPage />}
                  />
                  <Route
                    path="/commitment-details/:commitmentId"
                    element={<CommitmentDetailsPage2 />}
                  />
                  <Route path="/campains" element={<CampainsPage />} />
                  <Route path="/memorial-Board" element={<MemorialBoard />} />
                  <Route path="/campain/:campainId" element={<CampainPage />} />
                  <Route
                    path="/PeopleInCampain/:campainName"
                    element={<PeopleInCampain2 />}
                  />
                  <Route path="/add-person" element={<AddPersonPage />} />
                  <Route path="/memorial-day-2" element={<MemorialDay2 />} />
                  <Route
                    path="/memorial-day-details"
                    element={<MemorialDayDetails />}
                  />
                  <Route
                    path="/add-memorial-day-to-person"
                    element={<AddMemorialDayToPerson />}
                  />
                  <Route
                    path="/edit-campaign/:campainName"
                    element={<EditCampaignPage />}
                  />
                  <Route path="/petty-cash" element={<PettyCash />} />

                  <Route path="/user-profile" element={<UserProfile />} />
                  <Route path="edit-campain/:campainName" element={<EditCampaignPage />} />
                  <Route path="/payments-without-commitment" element={<PaymentsWithoutCommitment />} />
                  <Route path="/report-navigation" element={<ReportNavigation />} />
                  <Route path="/report-commitments/:campainName?" element={<ReportCommitments />} />
                  <Route path="/report-payments" element={<ReportPayments />} />
                </Route>
              </Routes>
          </Layout>
        </>
      </Router>
    </AuthProvider>
  );
};

export default App;
