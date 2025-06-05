// src/pages/ContactForm.jsx
import { useState } from "react";
import "./ContactForm.css";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-form-section">
        <h2>Get in Touch</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <textarea
            name="message"
            placeholder="Enter Message"
            rows="6"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>

          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="text"
            name="subject"
            placeholder="Enter Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />

          <button type="submit">SEND</button>
        </form>
      </div>

      <div className="contact-map-section">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.9024295193853!2d-118.07816038478243!3d34.074595922752404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2dcce4c77cc4d%3A0x1c2a06bba2cbbc44!2sRosemead%2C%20CA%2091770%2C%20USA!5e0!3m2!1sen!2sin!4v1685963857067!5m2!1sen!2sin"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className="contact-info">
          <p><strong>🏠 Buttonwood, California.</strong><br />Rosemead, CA 91770</p>
          <p><strong>📞 +1 253 565 2365</strong><br />Mon to Fri 9am to 6pm</p>
          <p><strong>✉️ support@colorlib.com</strong><br />Send us your query anytime!</p>
        </div>
      </div>
    </div>
  );
}
