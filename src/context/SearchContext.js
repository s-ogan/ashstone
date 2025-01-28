import React, { createContext, useState, useEffect } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    // Fetch posts data
    const fetchPosts = async () => {
      const response = await fetch('https://cloud.codesupply.co/endpoint/react/data.json'); // Replace with your API endpoint
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes((searchQuery.toLowerCase())) ||
      post.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, filteredPosts }}>
      {children}
    </SearchContext.Provider>
  );
};