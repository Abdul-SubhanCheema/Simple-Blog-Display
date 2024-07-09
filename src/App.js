import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [postsData, setPostsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('/blog.json')
      .then(response => response.json())
      .then(data => setPostsData(data))
      .catch(error => console.error('Error fetching the posts data:', error));
  }, []);

  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postsData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Blog Posts</h1>
        <div className="blog-posts">
          {postsData.length === 0 ? (
            <p>No posts available.</p>
          ) : (
            currentPosts.map(post => (
              <div key={post.id} className="blog-post">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            ))
          )}
          {postsData.length > 0 && (
            <div className="pagination">
              <button
                className="previous-button"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastPost >= postsData.length}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
