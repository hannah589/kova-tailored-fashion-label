import { Link } from 'react-router-dom';
import styles from './NotFound.module.css'

function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>404 | Page Not Found</h1>
      <p>The page you requested does not exist. <Link to="/shop">Continue shopping.</Link></p>
    </div>
  )
}

export default NotFound
