import React from "react";
import css from "./style.module.css";

const PostItem = ({
  id,
  title,
  body,
  deletePost,
  editingPostId,
  setEditingPostId,
}) => {
  return (
    <>
      {editingPostId === id ? (
        <>
        <h2>test</h2>
        <button>Save</button>
        </>
      ): (
      
    
      <li className={css.post__item}>
        <h2>
          <span> {id} - </span>

          <span className={css.postTitle}>{title}</span>
        </h2>
        <p className={css.postText}>{body}</p>
        <div className={css.btnContainer}>
          <button
            type="button"
            className={css.deleteBtn}
            onClick={() => deletePost(id)}
          >
            {" "}
            Delete{" "}
          </button>
          <button type="button" className={css.updateBtn} onClick={ () => setEditingPostId(id)}>
            Update
          </button>
        </div>
      </li>
      )}
    </>
  );
};

export default PostItem;
