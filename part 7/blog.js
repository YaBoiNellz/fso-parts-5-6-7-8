
// Blog.js
import React from 'react';

const blog = ({ blog }) => {
  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <p>Likes: {blog.likes}</p>
      {/* Display comments here */}
    </div>
  );
};

const blog = ({ blog }) => {
    return (
      <div>
        {/* ... */}
        <h3>Comments</h3>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  const [comment, setComment] = useState('');

  const handleAddComment = () => {
    //  backend
    setComment('');
  };

  return (
    <div>
      {/* ... */}
      <h3>Comments</h3>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
