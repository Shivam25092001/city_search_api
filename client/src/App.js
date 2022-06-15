import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/cities" element={<Home/>} /> 
        <Route exact path="/cities/:keyword" element={<Home/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
