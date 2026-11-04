//useLocation: get/displays the invalid URL the user tried to access
import { Link, useLocation } from 'react-router-dom';
import styles from './NotFound.module.css'

function NotFound() {
  const location = useLocation();

  return (
    <div className={styles.notFound}>
      <h1>404 | Page Not Found</h1>
      <p>
        The page <code>{location.pathname}</code> could not be found.
      </p>
      <Link to="/shop">Continue shopping.</Link>
    </div>
  )
}

export default NotFound
