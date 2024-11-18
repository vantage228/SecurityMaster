
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SecurityViewMaster from './components/SecurityViewMaster';
import FileUploader from './components/FileUploader';
import EquityLogTable from './components/EquityLogTable';
import BondLogTable from './components/BondLogTable';
import View from './components/View';
import Footer from './components/Footer';
import AuthForm from './components/AuthForm';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthForm />} />
      <Route path="/security-master" element={<SecurityViewMaster />} />
      <Route path="/file-upload" element={<FileUploader />} />
      <Route path="/equity-log" element={<EquityLogTable />} />
      <Route path="/bond-log" element={<BondLogTable />} />
      <Route path="/view-sp" element={<View/>} />
    </Routes>
    <Footer />
  </Router>
  );
}

export default App;
