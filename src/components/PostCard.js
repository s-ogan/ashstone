import React from "react";
import oval from "../assets/images/oval.svg";

const PostCard = ({ post }) => {
  return (
    <div className="post-card" key={post.id}>
      <img
        src={post.img}
        srcSet={`${post.img} 1x, ${post.img2x} 2x`}
        alt={post.title} 
        className="post-image"
      />
      <h5 className="tags">{post.tags}</h5>
      <h1 className="title">{post.title}</h1>
      <div className="author-row">
        <div className="autor">
          {post.autor}
        </div>
        <img className="oval" src={oval} alt="Oval" />
        <div className="date">
          {post.date}
        </div>
        <img src={oval} alt="Oval" className="date" />
        <div className="views">
          {post.views}
        </div>
      </div>
      <p className="text">{post.text}</p>
    </div>
  );
};

export default PostCard;