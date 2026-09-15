import Button from '../common/Button';
import styles from './HeroSection.module.css';

function HeroSection({ bgImage, title, subtitle }) {

  return (
    <>
      <div 
        className={styles.bg}
        style={{backgroundImage: `url(${bgImage})`}}
      >
        <div className={styles.content}>
          <span>{subtitle}</span>
          <h1>{title}</h1>
          <Button variant='secondary'>Shop Now</Button>
        </div>
      </div>
    </>
  );
}

export default HeroSection;