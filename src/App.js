import React from 'react';
import { SearchProvider } from './context/SearchContext';
import Header from './components/Header';
import PostList from './components/PostList';
import "../src/assets/styles/App.css";

const App = () => {
  return (
    <SearchProvider>
      <Header />
      <PostList />
    </SearchProvider>
  );
};

export default App;