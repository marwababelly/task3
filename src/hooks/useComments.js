import { useEffect, useState } from "react";

import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../services/commentsApi";

function useComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET
  const fetchComments = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getComments();

      setComments(response.data);
    } catch (error) {
      setError("Failed to fetch comments.");
    } finally {
      setLoading(false);
    }
  };

  // POST
  const addComment = async (commentData) => {
    const temporaryComment = {
      ...commentData,
      id: Date.now(),
    };

    // Optimistic Update
    setComments((previousComments) => [
      temporaryComment,
      ...previousComments,
    ]);

    try {
      setError(null);

      const response = await createComment(commentData);

      // Replace temporary comment with API response
      setComments((previousComments) =>
        previousComments.map((comment) =>
          comment.id === temporaryComment.id
            ? response.data
            : comment
        )
      );

      return response.data;
    } catch (error) {
      // Rollback if request fails
      setComments((previousComments) =>
        previousComments.filter(
          (comment) => comment.id !== temporaryComment.id
        )
      );

      setError("Failed to add comment.");

      throw error;
    }
  };

  // PATCH
  const editComment = async (id, commentData) => {
    try {
      setError(null);

      const response = await updateComment(id, commentData);

      setComments((previousComments) =>
        previousComments.map((comment) =>
          comment.id === id
            ? response.data
            : comment
        )
      );

      return response.data;
    } catch (error) {
      setError("Failed to update comment.");

      throw error;
    }
  };

  // DELETE
  const removeComment = async (id) => {
    try {
      setError(null);

      await deleteComment(id);

      setComments((previousComments) =>
        previousComments.filter(
          (comment) => comment.id !== id
        )
      );
    } catch (error) {
      setError("Failed to delete comment.");

      throw error;
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return {
    comments,
    loading,
    error,
    addComment,
    editComment,
    removeComment,
  };
}

export default useComments;