import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from './pages/RegisterPage';
import FindDonor from './pages/FindDonor';
import LoginPage from './pages/LoginPage';
import ForgetPasswordPage from './pages/ForgetPassword';
import BloodBankPage from './pages/BloodBankPage';
import AboutUsPage from './pages/AboutUsPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<FindDonor/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/about' element={<AboutUsPage/>}/>
        <Route path='/blood-bank' element={<BloodBankPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/forgot-password' element={<ForgetPasswordPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;