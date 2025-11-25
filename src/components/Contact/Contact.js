import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Sending...");

    const formData = new FormData(e.target);

    const res = await fetch("/api/contact.php", {
      method: "POST",
      body: formData,
    });

    const text = await res.text();
    setStatus(text);
  }

  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-title">CONTACT</h2>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" required />

        <label>Email</label>
        <input type="email" name="email" required />

        <label>Message</label>
        <textarea name="message" rows="5" required />

        <button className="contact-button" type="submit">
          SEND MESSAGE
        </button>

        <p className="status">{status}</p>
      </form>
    </section>
  );
}

export default Contact;
