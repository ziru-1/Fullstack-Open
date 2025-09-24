import { useState } from 'react';

const Togglable = ({ buttonName, children }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisiblity = () => {
    setVisible(!visible);
  };

  return (
    <div>
      {visible && children}
      <button onClick={toggleVisiblity}>
        {visible ? 'cancel' : buttonName}
      </button>
    </div>
  );
};

export default Togglable;
