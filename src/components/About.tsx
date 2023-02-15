import "./about.scss";
import Container from "./Container";
import { Row, Col } from "./grid";

import ubc from '../images/ubc.jpg';
import ubcpsych from '../images/ubcpsych.jpg';
import ncsu from '../images/ncsu.png';
import nclib from '../images/nclib.png';
import ncssc from '../images/ncssc.jpg';

const About = () => {
  return (
    <section className="About" id="About">
      <Container 
        header="About Me" 
      >
        <h3>Education</h3>
        <Row>
          <Col span="m-6">
            <a href="https://www.linkedin.com/school/universityofbc/">
              <img src={ubc} alt="UBC Logo" />
              <h5 className="mb-0">University of<br/>British Columbia</h5>
            </a>
            <p><small>Computer Science BSc | 2022 - Present</small></p>
          </Col>
          <Col span="m-6">
            <a href="https://www.linkedin.com/school/north-carolina-state-university/">
              <img src={ncsu} alt="NCSU Logo" />
              <h5 className="mb-0">North Carolina<br/>State University</h5>
            </a>
            <p><small>Comp. Engr. | 3.927/4.0 | 2021 - 2022</small></p>
          </Col>
        </Row>

        <h3>Experience</h3>
        <Row>
          <Col span="m-6">
            <a href="https://www.linkedin.com/company/ubc-department-of-psychology/">
              <img src={ubcpsych} alt="UBCPsych Logo"/>
              <h5 className="mb-0">UBC Dept.<br/>of Psychology</h5>
            </a>
            <p><small>Jr. IT Support Analyst | Sep '22 - Feb '23</small></p>
          </Col>
          <Col span="m-6">
            <a href="https://www.linkedin.com/company/ncsu-libraries/">
              <img src={nclib} alt="NCSULib Logo" />
              <h5 className="mb-0">NC State<br/>University Libraries</h5>
            </a>
            <p><small>IT Student Technician | May '22 - Jul '22</small></p>
          </Col>
          <Col span="m-6">
            <a href="https://www.linkedin.com/company/nc-state-campus-enterprises/">
              <img src={ncssc} alt="NCSSC Logo" />
              <h5 className="mb-0">NC State<br/>Student Centers</h5>
            </a>
            <p><small>Operations Assistant | Oct '21 - Feb '22</small></p>
          </Col>
          <Col className="mb-3" span="m-6">
            <div className="w-100 h-100 d-flex justify-content-center align-items-center border border-white rounded">
              <h5 className="mb-0">What's next...</h5>
            </div>
          </Col>
        </Row>

        <Row className="pt-3 d-flex justify-content-center" style={{ borderTop: "1px solid white" }}>
          <Col span="m-auto" className="d-flex align-items-center">
            <h3>Skills</h3>
          </Col>
          <Col span="m-auto">
            <h5 id="skills">Computer Science & Engineering<br />Photography, Videography, & Editing</h5>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default About;