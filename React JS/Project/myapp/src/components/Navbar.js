import {Link} from "react-router-dom";

function Navbar(){
    return(
        <nav className="navbar">
        <h1 className="logo">Expense Tracker</h1>
        <ul>
            <li>
                <Link to={'/'}>Dashboard</Link>
            </li>
            <li>
                <Link to={'/transaction'}>Transaction</Link>
            </li>
            <li> 
                <Link to={'/report'}>Report</Link>
             </li>
             <li>   
                <Link to={'/'}>Get Quote</Link>
            </li>
            <li>
                <Link to={'/'}>Reset</Link>
            </li>
        </ul>
        </nav>
    )
}
export default Navbar