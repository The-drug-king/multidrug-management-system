import React, { useState } from "react";

function CommentSection({ comments }) {
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState(comments);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() === "") {
      return; // 댓글 내용이 비어있으면 아무것도 하지 않음
    }

    // 실제로는 여기서 서버에 댓글을 저장하는 API 호출이 이루어져야 합니다.
    // 이 예시에서는 댓글 목록을 갱신하기 위해 useState를 사용합니다.
    const newCommentItem = {
      id: commentList.length + 1,
      text: newComment,
    };

    setCommentList([...commentList, newCommentItem]);
    setNewComment(""); // 댓글 작성 후 입력 필드를 비웁니다.
  };

  return (
    <div>
      <h2>댓글</h2>
      <ul>
        {commentList.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
      <textarea
        placeholder="댓글을 작성하세요"
        value={newComment}
        onChange={handleCommentChange}
      ></textarea>
      <button onClick={handleCommentSubmit}>댓글 작성</button>
    </div>
  );
}

export default CommentSection;
