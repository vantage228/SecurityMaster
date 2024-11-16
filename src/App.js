
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SecurityViewMaster from './components/SecurityViewMaster';
import FileUploader from './components/FileUploader';
import EquityLogTable from './components/EquityLogTable';
import BondLogTable from './components/BondLogTable';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/security-master" element={<SecurityViewMaster />} />
      <Route path="/file-upload" element={<FileUploader />} />
      <Route path="/equity-log" element={<EquityLogTable />} />
      <Route path="/bond-log" element={<BondLogTable />} />
    </Routes>
  </Router>
  );
}

export default App;
