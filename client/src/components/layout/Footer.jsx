import { useState } from "react"
import { Link } from 'react-router-dom'
import Button from '../common/Button'
import styles from "./Footer.module.css";

function Footer() {

  const [email, setEmail] = useState("");

  async function handleSignUp(e) {
      e.preventDefault();
    }

  const date = new Date();

  return (
    <>
      {/*
      <div className={styles.banner}>
        <div className={styles.label}>
          <p>Free Shipping on Order over $100</p>
        </div>
        <div className={styles.label}>
          <p>Delivery and Click & Collect Options</p>
        </div>
        <div className={styles.label}>
          <p>14 Days Return</p>
        </div>
      </div>
      */}

      <footer className={styles.footer}>
        <div className={styles.main}>
          <div>
            <h6>Customer Care</h6>
            <ul>
              <li><Link to="/">Help Center</Link></li>
              <li><Link to="/">Shipping</Link></li>
              <li><Link to="/returns">Returns Policy</Link></li>
              <li><Link to="/">Garment Care</Link></li>
              <li><Link to="/contact">Gift Card</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h6>About Us</h6>
            <ul>
              <li><Link to="/">Careers</Link></li>
              <li><Link to="/">Our Stores</Link></li>
              <li><Link to="/">About Us</Link></li>
              <li><Link to="/">Suppliers</Link></li>
              <li><Link to="/contact">Business Practices</Link></li>
              <li><Link to="/contact">Community</Link></li>
            </ul>
          </div> 

          <div>
            <h6>Connect</h6>
            <div className={styles.socials}>
              <a
              href="https://www.facebook.com/clothes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              >
                Facebook
              </a>

              <a
              href="https://www.pinterest.com/clothes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              >
                Pinterest
              </a>

              <a
              href="https://www.instagram.com/clothes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              >
                Instagram
              </a>

              <a
              href="https://www.tiktok.com/clothes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              >
                TikTok
              </a>
            </div>
          </div>

          <div className={styles.subscribe}>
            <h6>Join Us</h6>
            <p>New subscribers receive 15% off their first purchase.</p>
            <form onSubmit={handleSignUp}>
              <div className="input-group">
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required 
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button variant="secondary" size="sm" type="submit">
                  Subscribe
                </Button>
              </div>
            </form>
          </div> 
        </div>
        
        <div className={styles.bottom}>
          <div className={styles.policies}>
            <Link to="/terms">Terms and conditions</Link>
            <Link to="/privacy">Privacy policy</Link>
            <Link to="/sitemap">Sitemap</Link>
            <Link to="/cookies">Cookies preferences</Link>
          </div>
          
          <p className={styles.copyright}> 
            © {date.getFullYear()} AURA
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;