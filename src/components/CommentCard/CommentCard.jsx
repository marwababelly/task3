import { useState } from "react";

import styles from "./CommentCard.module.css";

function CommentCard({
  comment,
  onEditComment,
  onDeleteComment,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    name: comment.name,
    email: comment.email,
    body: comment.body,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setEditData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await onEditComment(comment.id, editData);

      setIsEditing(false);
    } catch (error) {
      // Error is handled inside the hook
    }
  };

  const handleCancel = () => {
    setEditData({
      name: comment.name,
      email: comment.email,
      body: comment.body,
    });

    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      await onDeleteComment(comment.id);
    } catch (error) {
      // Error is handled inside the hook
    }
  };

  return (
    <article className={styles.card}>
      {isEditing ? (
        <>
          <div className={styles.editField}>
            <label>Name</label>

            <input
              name="name"
              value={editData.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.editField}>
            <label>Email</label>

            <input
              name="email"
              type="email"
              value={editData.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.editField}>
            <label>Comment</label>

            <textarea
              name="body"
              value={editData.body}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className={styles.actions}>
            <button
              onClick={handleSave}
              className={styles.saveButton}
            >
              Save
            </button>

            <button
              onClick={handleCancel}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.header}>
            <div>
              <h3>{comment.name}</h3>
              <p>{comment.email}</p>
            </div>

            <span className={styles.id}>
              #{comment.id}
            </span>
          </div>

          <p className={styles.body}>
            {comment.body}
          </p>

          <div className={styles.actions}>
            <button
              onClick={() => setIsEditing(true)}
              className={styles.editButton}
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </article>
  );
}

export default CommentCard;