// src/App.js
import React, { useState, useEffect } from 'react';
import DisplayCount from './DisplayCount';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Component did mount or update');
    return () => {
      console.log('Component will unmount');
    };
  }, [count]);

  const increment = () => {
    console.log('Increment button clicked');
    setCount(prevCount => {
      console.log('Updating state:', prevCount + 1);
      return prevCount + 1;
    });
  };

  return (
    <div>
      <DisplayCount count={count} />
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default App;
