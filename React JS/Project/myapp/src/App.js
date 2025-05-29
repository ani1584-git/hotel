
import './App.css';
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import Dashboard from './pages/dashboard';
import Transaction from './pages/transaction';
import Report from './pages/report';
import Navbar from './components/Navbar';

function App() {
  
  return (
    <BrowserRouter>
    <div>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/report" element={<Report/>}/>
      <Route path="/transaction" element={<Transaction/>}/>
    </Routes>
    <Link to={'/transaction'}>Navigate</Link>

    </div>
    </BrowserRouter>
  );
}

export default App;
