import "./home.scss";
import Bubbles from "./Bubbles";

const Home = () => {
  return (
    <section className="Home" id="Home"> 
      <Bubbles 
        font={"Iceberg"}
        words={["Fast Learner", "Team Player", "Observant", "Motivated", "Curious", "Creative", "Reliable", "Problem\nSolver", "Adaptable", "Critical\nThinker"]}
      />
    </section>
  );
}

export default Home;