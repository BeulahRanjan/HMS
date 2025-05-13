import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import Dsec from './components/Dsec';

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
      {/* <Route path="/h" element={< Hsec/>}/> */}
      {/* <Route path="/a" element={<Abtus/>} />  */}
       {/* <Route path="/" element={<Dsec />}/> */}
       <Route path="/" element={<HomePage/>}/>
       <Route path="/d" element={<Dsec/>} />
      </Routes>
    </Router>
  );
}

export default App;