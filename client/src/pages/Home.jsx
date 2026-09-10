import styles from "./Home.module.css"
//import Button from "../components/Button"

function Home() {
  return (
    <>
      <section id="hero" className={styles.heroContainer}>
      
        <div className="left" id="hero-content">
              <h1>Home</h1>
              <p>text</p>

{/*
              <Button variant='secondary' >
                  CTA
              </Button>
          */}
        </div>   

        <div className="right" id="heroimage-container">
          <img className="hero-image" src="" alt="image"/>
        </div>
      </section>
    </>
  )
}

export default Home