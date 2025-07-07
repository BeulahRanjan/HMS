import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pform from './components/Pform';
import Rpage from './components/Rpage';
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
import Aform from './components/Aform';

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
      <Route path="/addRecep" element={<Rform/>}/>
      <Route path='/addPatient' element={<Pform/>} />
      <Route path='/addAppt' element={<Rpage />} />
      <Route path='/getAllPat' element={<Rpage />} />
      <Route path='/upAppt/:id' element={<Aform />} />
      <Route path='/getPatByName/:name' element={<Aform />} />
      <Route path='/getDocByName/:name' element={<Aform />} />
      <Route path='/getDepByName/:name' element={<Aform />} />
      <Route path='/addAppt/' element={<Aform />} />
      



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
       <Route path='/recep' element={<Rpage/>}/>
      </Routes>
    </Router>
  );
}

export default App;