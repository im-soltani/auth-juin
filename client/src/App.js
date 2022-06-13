import './App.css';
import { useEffect } from 'react';
import AppNavbar from './components/AppNavbar';
import Dashboard from "./components/pages/Dashboard"
import{Routes,Route} from "react-router-dom"
import Home from "./components/pages/Home"
import{useDispatch, useSelector} from "react-redux"
import{Spinner} from "reactstrap"
import { getAuthUser } from './redux/actions/authActions';

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.authReducer);
  const getUser = () => dispatch(getAuthUser());

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spinner
          style={{ width: '3rem', height: '3rem', color: 'secondary' }}
          type="grow"
        />
      </div>
    );
  }
  
  return (
    <div className="App">
     <AppNavbar/>
     <Routes>
       <Route path="/" element={<Home />}/>
       <Route path="/dashboard" element={<Dashboard />} />
     </Routes>
    </div>
  );
}

export default App;
