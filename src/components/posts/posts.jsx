import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './posts.css';

const Posts = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { userId, postId } = location.state || {};

  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');

  // Fetch post details on component mount
  useEffect(() => {
    if (postId) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
          setEditedTitle(post.title);
          setEditedBody(post.body);
        });
    }
  }, [postId]);


  // Handle submit 
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: postId,
        title: editedTitle,
        body: editedBody,
        userId: userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => {
        alert('Post updated successfully');
        navigate('/details', { state: userId });
      });
  };
  return (
    <div className='post-card-container'>
      <div className=' p-card'>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
          />
          <button type="submit" className="save-button">Save</button>
        </form>
      </div>
    </div>
  )
}

export default Posts
