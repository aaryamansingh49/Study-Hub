import React from "react";
import "../styles/Contact.css";

function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-card">

        <h1>
          Contact <span>Us</span>
        </h1>

        <p className="contact-sub">
          Have questions or suggestions? We'd love to hear from you.
        </p>

        <form className="contact-form">

          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Enter your name" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea rows="5" placeholder="Write your message..."></textarea>
          </div>

          <button type="submit">Send Message</button>

        </form>

      </div>
    </div>
  );
}

export default Contact;