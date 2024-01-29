import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './details.css';

function Details() {
  const location = useLocation();
  const data = location.state;
  const [state, setstate] = useState(null);
  const [commentsCount, setCommentsCount] = useState(0);
  const [todosCount, setTodosCount] = useState(0);
  const navigate = useNavigate();

  
  //Edit operation
  const handleEdit = (postId) => {
    navigate('/post', { state: { userId: data, postId } });
  };
  
  // Delete operation
  const handleDelete = (postId) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setstate(currentPosts => currentPosts.filter(post => post.id !== postId));
      }
    });
  };


  useEffect(() => {
    if (data) {
      //Fetch Posts
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${data}`)
        .then((response) => response.json())
        .then((datas) => {
          setstate(datas);
        });

      //Fetch Comments Counts
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${data}`)
        .then((response) => response.json())
        .then((data) => setCommentsCount(data.length));

      //Fetch Todos Counts
      fetch(`https://jsonplaceholder.typicode.com/todos?userId=${data}`)
        .then((response) => response.json())
        .then((data) => setTodosCount(data.length));
    }
  }, [data]);



  return (
    <div className='container'>
      <div className="user-summary">
        <div className="summary-item">
          <span>Posts: {state ? state.length : 0}</span>
        </div>
        <div className="summary-item">
          <span>Comments: {commentsCount}</span>
        </div>
        <div className="summary-item">
          <span>Todos: {todosCount}</span>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state?.map((detls) => (
            <tr key={detls.id}>
              <td>{detls.id}</td>
              <td>{detls.title}</td>
              <td>{detls.body}</td>
              <td>
                <button className='edit' onClick={() => handleEdit(detls.id)}>Edit</button>
                <button className='delete' onClick={() => handleDelete(detls.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Details;
