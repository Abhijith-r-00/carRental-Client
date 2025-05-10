import './Footer.css'
const Footer = () => {
  return (
    <footer className="neon-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>LETRIDE</h3>
            <p>The future of car rentals starts here</p>
            <div className="social-links">
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
              <a href="#">Discord</a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>Services</h4>
            <a href="#">Short Term</a>
            <a href="#">Long Term</a>
            <a href="#">Corporate</a>
          </div>
          
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
          </div>
          
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Policy</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2023 LETRIDE Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;