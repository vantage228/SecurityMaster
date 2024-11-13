
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SecurityViewMaster from './components/SecurityViewMaster';
import FileUploader from './components/FileUploader';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/security-master" element={<SecurityViewMaster />} />
      <Route path="/file-upload" element={<FileUploader />} />
    </Routes>
  </Router>
  );
}

export default App;
