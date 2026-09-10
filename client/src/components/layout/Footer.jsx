//import styled from "styled-components";
import { Link } from 'react-router-dom'
import styles from "./Footer.module.css";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";

function Footer() {
  const date = new Date();

  return (
    <footer className={styles.footer}>
        <div className={styles.top}>
        
          <div>
            <h6>Explore</h6>
            <ul>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/insights">Insights</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h6>Legal</h6>
            <ul>
              <li><Link to="/terms">Terms</Link></li>
              <li><Link to="/privacy">Privacy policy</Link></li>
              <li><Link to="/cookies">Cookies</Link></li>
              <li><Link to="/termsOfSale">Terms of Sale</Link></li>
            </ul>
          </div> 

          <div className={styles.socialIcons}>
            <a
              href="https://www.linkedin.com/timbertop-united"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={24} />
            </a>

            <a
              href="https://www.instagram.com/timbertop-united"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </a>
          </div>

        </div>
        
        <div className={styles.bottom}>
          <img
            src="https://store.manutd.com/img/logo-trident.svg"
            alt="Timbertop United logo"
            className={styles.footerLogo}
          />
          
          <p> 
            © {date.getFullYear()} CLOTHES. All rights reserved
          </p>
        </div>
      </footer>
  );
}

export default Footer;