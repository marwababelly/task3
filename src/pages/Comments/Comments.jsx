import CommentForm from "../../components/CommentForm/CommentForm";
import CommentsList from "../../components/CommentsList/CommentsList";

import useComments from "../../hooks/useComments";

import styles from "./Comments.module.css";

function Comments() {
  const {
    comments,
    loading,
    error,
    addComment,
    editComment,
    removeComment,
  } = useComments();

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Comments Manager</h1>

        <p>
          Manage comments using React, Axios and
          JSONPlaceholder API.
        </p>
      </header>

      <CommentForm
        onAddComment={addComment}
      />

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {loading ? (
        <div className={styles.loading}>
          Loading comments...
        </div>
      ) : comments.length === 0 ? (
        <div className={styles.empty}>
          No comments available.
        </div>
      ) : (
        <CommentsList
          comments={comments}
          onEditComment={editComment}
          onDeleteComment={removeComment}
        />
      )}
    </main>
  );
}

export default Comments;