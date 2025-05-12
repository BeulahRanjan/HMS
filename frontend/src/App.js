import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dform from './components/Dform';
import Nform from './components/Nform';

function App() {
  return (
    <Router>
      <Routes>
      {/* <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} /> */}
      <Route path="/" element={<Dform />} />
      <Route path="/nform" element={<Nform />} />
      </Routes>
    </Router>
  );
}

export default App;