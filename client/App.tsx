import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [message, setMessage] = useState('');

  const getHello = async () => {
    try {
      const req = await fetch('/api/hello');
      const res = await req.json();
      setMessage(res.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getHello();
  }, []);

  return <div>{message}</div>;
};

export default App;
