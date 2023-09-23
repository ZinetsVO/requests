import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import PostItem from "./PostItem";

const Request = () => {
  const [data, setData] = useState(null);

  const [editingPostId, setEditingPostId] = useState(null);

  const [editedPost, setEditedPost] = useState({
    id: null,
    title: "",
    body: "",
    userId: null,
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(data);

  async function deletePost(postId) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        const updatedData = data.filter((post) => post.id !== postId);
        setData(updatedData);
      } else {
        alert("Post was not deleted");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updatePost() {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${editedPost.id}`,
        {
          method: "PUT",
          body: JSON.stringify(editedPost),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  if (!data) {
    return (
      <div className={css.loaderContainer}>
        <span className={css.loader}></span>
      </div>
    );
  }

  return (
    <div>
      <h1>Posts</h1>

      <ul className={css.post__list}>
        {data.map((item) => (
          <PostItem key={item.id}
           {...item}
            deletePost={deletePost}
            editingPostId={editingPostId}
            setEditingPostId={setEditingPostId} />
        ))}
      </ul>
    </div>
  );
};

export default Request;
