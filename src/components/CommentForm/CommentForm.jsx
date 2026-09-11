import { useState } from "react";

import styles from "./CommentForm.module.css";

function CommentForm({ onAddComment }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    body: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.body.trim()
    ) {
      return;
    }

    try {
      await onAddComment(formData);

      setFormData({
        name: "",
        email: "",
        body: "",
      });
    } catch (error) {
      // Error is handled inside the hook
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <h2>Add New Comment</h2>

      <div className={styles.field}>
        <label htmlFor="name">Name</label>

        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email</label>

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="body">Comment</label>

        <textarea
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder="Write your comment..."
          rows="5"
        />
      </div>

      <button
        type="submit"
        className={styles.button}
      >
        Add Comment
      </button>
    </form>
  );
}

export default CommentForm;