import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Pform from './components/Pform';
// import Rpage from './components/Rpage';
import { UserProvider } from './hooks/UserProvider';
import Signup from './Signup';
import Login from './Login';
 import HomePage from './HomePage';
 import Dform from './components/Dform';
 import Nform from './components/Nform';
 import Rform from './components/Rform';
// import Dsec from './components/Dsec';
// import Docsec from './components/Docsec';
 import Dpage from './components/Dpage';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/signup" element={<Signup />} />
        <Route
            path="/login"
            element={
                <UserProvider>
                    <Login />
                </UserProvider>
            }
            />
      <Route path="/addDoctor" element={<Dform />} />
      <Route path="/nurseform" element={<Nform />} />
      <Route path="/receptionistform" element={<Rform/>}/>
      {/* <Route path='/' element={<Pform/>} /> */}
      {/* <Route path="/" element={<Navbar />} /> */}
      {/* <Route path="/h" element={< Hsec/>}/> */}
      {/* <Route path="/a" element={<Abtus/>} />  */}
       {/* <Route path="/" element={<Dsec />}/> */}

       <Route path="/" element={
         <UserProvider>
                    <HomePage />
                </UserProvider>}/>
       {/* <Route path="/d" element={<Dsec/>} /> */}
       {/* <Route path="/d" element={<Docsec/>} /> */}
       <Route path='/doctor' element={< Dpage/>} />
       {/* <Route path='/' element={<Rpage/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;