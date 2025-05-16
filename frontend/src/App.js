import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Rpage from './components/Rpage';
// import HomePage from './HomePage';
// import Dsec from './components/Dsec';
// import Docsec from './components/Docsec';
// import Dpage from './components/Dpage';

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
       {/* <Route path="/" element={<HomePage/>}/> */}
       {/* <Route path="/d" element={<Dsec/>} /> */}
       {/* <Route path="/d" element={<Docsec/>} /> */}
       {/* <Route path='/' element={< Dpage/>} /> */}
       <Route path='/' element={<Rpage/>}/>
      </Routes>
    </Router>
  );
}

export default App;