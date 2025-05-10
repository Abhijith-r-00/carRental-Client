import { FiSearch } from 'react-icons/fi';
import'./Header.css'
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate=useNavigate()
 const onBtnClick=()=>{
    navigate('/register')

  }
  return (
    <header className="glass-header">
      <div className="container">
        <div className="header-content">
          <div className="logo">LETRIDE</div>
          <nav className="main-nav">
            <a href="/">Home</a>
            <a href="#">Fleet</a>
            <a href="#">Services</a>
            <a href="#">About</a>
          </nav>
          <div className="header-actions">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input type="text" placeholder="Search..." />
            </div>
            <button onClick={onBtnClick} className="connect-btn">Registe/Login</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;