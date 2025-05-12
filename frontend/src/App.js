import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from './main/Navbar';
import Hsec from './components/Hsec';

function App() {
  return (
    <Router>
      <Routes>
      {/* <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/" element={<Dform />} />
      <Route path="/nform" element={<Nform />} />
      <Route path="/rform" element={<Rform/>}/> */}
      {/* <Route path="/" element={<Navbar />} /> */}
      <Route path="/" element={< Hsec/>}/>
      
      </Routes>
    </Router>
  );
}

export default App;