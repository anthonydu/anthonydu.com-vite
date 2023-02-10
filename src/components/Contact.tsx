import { useState, useRef } from "react";
import "./contact.scss";
import { Row, Col } from "./grid";
import FloatingLabel from "./FloatingLabel";
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [btnState, setBtnState] = useState("Submit");
  const [token, setToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setBtnState("Running Captcha...");
    if (token === null) {
      recaptchaRef.current!.execute();
    }
  }

  const handleChange = (token: string | null) => {
    setToken(token);
    if (token === null) {
      setBtnState("Submit");
    } else {
      setBtnState("Submitting...");
      const templateParams = {
        "first-name": fname,
        "last-name": lname,
        "email": email,
        "phone": phone,
        "message": message,
        "time": new Date().toUTCString(),
        "g-recaptcha-response": token
      }; 
      emailjs.send('zoho', 'default_template', templateParams, 'guRHXdfHUTXd64TTc')
        .then((result) => console.log(result.text), (error) => console.log(error.text));
      setBtnState("Submitted!");
    }
  }

  const handleClick = () => {
    if (btnState === "Submitted!") {
      setBtnState("Please try again later");
    }
  }

  return (
    <section className="Contact" id="Contact">
      <div id="contact-content">
        <h1>Contact Me</h1>

        <form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col span={6}>
              <FloatingLabel
                label="First Name*"
                type="text" 
                name="first-name" 
                placeholder="First Name" 
                value={fname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFname(e.target.value)}
                required 
              />
            </Col>

            <Col span={6}>
              <FloatingLabel 
                label="Last Name*"
                type="text" 
                name="last-name" 
                placeholder="Last Name" 
                value={lname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLname(e.target.value)}
                required 
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col span={6}>
              <FloatingLabel 
                label="Email*"
                type="email" 
                name="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required 
              />
            </Col>

            <Col span={6}>
              <FloatingLabel 
                label="Phone"
                type="tel" 
                name="phone" 
                placeholder="Phone Number" 
                value={phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col span={12}>
              <FloatingLabel 
                label="Message*"
                as="textarea" 
                style={{ height: "7.5rem", resize: "none" }} 
                name="message" 
                placeholder="Message" 
                value={message}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                required
              />
            </Col>
          </Row>

          <Row>
            <Col span={12} className="d-grid" onClick={handleClick}>
              <button
                className="btn btn-lg"
                type="submit" 
                name="submit"
                disabled={btnState !== "Submit" && btnState !== "Running Captcha..."}
              >
                {btnState}
              </button>
              <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey="6LdcQJ8jAAAAAOvPEHbiNARU5YjZzqdDPUDUb6XV"
                onChange={handleChange}
              />
            </Col>
          </Row>
        </form>
      </div>
    </section>
  );
}

export default Contact;