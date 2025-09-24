import { useState } from 'react';

const Blog = ({ blog }) => {
  const [isShowDetails, setIsShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2,
  };

  const toggleShowDetails = () => {
    setIsShowDetails(!isShowDetails);
  };

  return (
    <div style={blogStyle}>
      <p>
        {blog.title}{' '}
        <button onClick={toggleShowDetails}>
          {isShowDetails ? 'hide' : 'view'}
        </button>
      </p>
      {isShowDetails && (
        <>
          <p>{blog.url}</p>
          <p>
            {blog.likes} <button>like</button>
          </p>
          <p>{blog.author}</p>
        </>
      )}
    </div>
  );
};

export default Blog;
