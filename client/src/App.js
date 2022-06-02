import logo from './logo.svg';
import './App.css';
import AppNavbar from './components/AppNavbar';
import Dashboard from "./components/pages/Dashboard"
import{Routes,Route} from "react-router-dom"
import Home from "./components/pages/Home"

function App() {
  return (
    <div className="App">
     <AppNavbar/>
     <Routes>
       <Route path="/" element={<Home />}/>
       <Route path="/daschboard" element={<Dashboard />} />
     </Routes>
    </div>
  );
}

export default App;
