import  {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Layout from './components/Layout';
import BookingPage from './pages/BookingPage';
import Logout from './pages/Logout';
import ApplyDoctor from './pages/ApplyDoctor';
import Profile from './pages/doctor/Profile';
import NotificationPage from './pages/NotificationPage';
import Doctor from './pages/admin/Doctor';
import Users from './pages/admin/Users';
import Appointments from './pages/Appointments';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import AdminProfile from './pages/admin/AdminProfile';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <>  
  <BrowserRouter>
    <Routes>
      <Route path ="/" element={<Layout />}>
      <Route index element={
         <ProtectedRoute>
          <Home/>
          </ProtectedRoute> }/>

        <Route path="doctor/book-appointment/:doctorId" element={  
          <ProtectedRoute> 
            <BookingPage  />
          </ProtectedRoute>
          } />


          <Route
          path="/admin/doctors" element={
            <ProtectedRoute> 
            <Doctor />
          </ProtectedRoute>          } 
          />

          <Route
          path="/admin/users" element={
            <ProtectedRoute> 
            <Users />
          </ProtectedRoute>
          } 
          />


<Route path="doctor/profile/:id" element={  
          <ProtectedRoute> 
            <Profile buttonName="Update" />
          </ProtectedRoute>
          } />

<Route path="admin/profile" element={  
          <ProtectedRoute> 
            <AdminProfile />
          </ProtectedRoute>
          } />


<Route path="profile" element={  
          <ProtectedRoute> 
            <UserProfile />
          </ProtectedRoute>
          } />

<Route path="appointments" element={  
          <ProtectedRoute> 
            <Appointments />
          </ProtectedRoute>
          } />

<Route path="doctor/appointments" element={  
          <ProtectedRoute> 
            <DoctorAppointments />
          </ProtectedRoute>
          } />


<Route path="notification" element={  
          <ProtectedRoute> 
            <NotificationPage />
          </ProtectedRoute>
          } />
          
<Route path="apply-doctor" element={  
          <ProtectedRoute> 
            <ApplyDoctor buttonName="Apply" />
          </ProtectedRoute>
          } />
          </Route>

      <Route path="/login" element={
        <PublicRoute>
          <Login buttonName="Login" />
        </PublicRoute>
           }/>

      <Route path="/register" element={
        <PublicRoute>
            <Register buttonName="Register" />
            </PublicRoute>
           } />

      <Route path="/logout" element={<Logout />} />
    </Routes>
  </BrowserRouter>
    </>
  );

}

export default App;
