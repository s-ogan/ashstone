import React, { useContext } from "react";
import PostCard from "./PostCard";
import { SearchContext } from "../context/SearchContext";

const PostList = ({ onPostClick }) => {
  const { filteredPosts } = useContext(SearchContext);
  return (
    <div className="container">
    <div className="post-list">
      {filteredPosts.map((p) => (
        <PostCard key={p.id} post={p} onClick={() => onPostClick(p)} />
      ))}
    </div>
    </div>
  );
};

export default PostList;
