import React, { useState, useEffect } from 'react';

const ComponentWithTimeout = ({ timeout, children }) => {
  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChildren(true);
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout]);

  return showChildren ? children : null;
};

const MyComponent = () => {
  return (
    <div>
      <ComponentWithTimeout timeout={3000}>
        <p>This component will appear after 3 seconds.</p>
      </ComponentWithTimeout>
    </div>
  );
};
