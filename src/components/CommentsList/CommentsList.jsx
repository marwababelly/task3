import CommentCard from "../CommentCard/CommentCard";

import styles from "./CommentsList.module.css";

function CommentsList({
  comments,
  onEditComment,
  onDeleteComment,
}) {
  return (
    <section className={styles.section}>
      <h2>Comments</h2>

      <div>
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onEditComment={onEditComment}
            onDeleteComment={onDeleteComment}
          />
        ))}
      </div>
    </section>
  );
}

export default CommentsList;