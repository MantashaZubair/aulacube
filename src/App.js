
import React, { useState, useEffect } from 'react';
import axios from "axios"
import './App.css';

const App = () => {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const getAllData = async()=>{
    const data= await axios.get('https://jsonplaceholder.typicode.com/comments')
        setComments(data.data);
        setFilteredComments(data.data);
    
  }

  useEffect(() => {
  getAllData()
  }, []);

  const handleFilterChange = (e) => {
    const postId = e.target.value;
    if(postId==="") return setFilteredComments(comments)
    setFilteredComments(
      comments.filter((comment) => comment.postId === Number(postId))
    );
  };

  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
  };

  return (
    <div className="App">
    {/* left side */}
      <div className="left-panel">
        <h2>Posts</h2>
        <select onChange={handleFilterChange}>
          <option value="">All Posts</option>
          {Array.from(new Set(comments.map((comment) => comment.postId))).map(
            (postId) => (
              <option key={postId} value={postId}>
                Post #{postId}
              </option>
            )
          )}
        </select>
        <ul>
          {filteredComments.map((comment) => (
            <li
              key={comment.id}
              onClick={() => handlePostClick(comment.postId)}
              className={selectedPostId === comment.postId ? 'active' : ''}
            >
              {comment.name}
            </li>
          ))}
        </ul>
      </div>
      {/* right side */}
      <div className="right-panel">
        <h2>Comments</h2>
        {selectedPostId ? (
          <ul>
            {comments
              .filter((comment) => comment.postId === selectedPostId)
              .map((comment) => (
                <li key={comment.id}>{comment.body}</li>
              ))}
          </ul>
        ) : (
          <p>Select a post to view comments</p>
        )}
      </div>
    </div>
  );
};

export default App;
