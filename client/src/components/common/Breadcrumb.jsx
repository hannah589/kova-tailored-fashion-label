import { NavLink } from "react-router-dom"; 
import styles from "./Breadcrumb.module.css"; 

function Breadcrumb({ children }) { 
  return (
    <nav aria-label="Breadcrumb">
      <ul className={styles.breadcrumb}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li> 
        <li aria-current="page"> 
          {children} 
        </li> 
      </ul> 
    </nav>
  )
} 

export default Breadcrumb;
