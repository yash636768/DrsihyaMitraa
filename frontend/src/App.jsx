import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Gallery from './pages/Gallery';
import LabelFaces from './pages/LabelFaces';
import ChatInterface from './pages/ChatInterface';

function App() {
  return (
    <Router>
      <div className="dashboard-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/label" element={<LabelFaces />} />
            <Route path="/chat" element={<ChatInterface />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
