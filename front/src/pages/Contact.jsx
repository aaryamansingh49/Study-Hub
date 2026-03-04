import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "../styles/Contact.css";

function Contact() {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_lnx6fem",     // yaha apna Service ID daalo
        "template_fyvkalm",    // yaha apna Template ID daalo
        form.current,
        "v4ZjeWzZXrs7V8sqV"   // yaha apni Public Key daalo
      )
      .then(
        (result) => {
          alert("Message Sent Successfully!");
          form.current.reset();
        },
        (error) => {
          alert("Failed to send message. Try again.");
        }
      );
  };

  return (
    <div className="contact-page">
      <div className="contact-card">

        <h1>
          Contact <span>Us</span>
        </h1>

        <p className="contact-sub">
          Have questions or suggestions? We'd love to hear from you.
        </p>

        <form ref={form} onSubmit={sendEmail} className="contact-form">

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              rows="5"
              placeholder="Write your message..."
              required
            ></textarea>
          </div>

          <button type="submit">Send Message</button>

        </form>

      </div>
    </div>
  );
}

export default Contact;