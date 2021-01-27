import React, { useEffect, useState } from 'react';
import LoadingPage from './components/pages/LoadingPage';
import TagConstructorPage from './components/pages/TagConstructorPage';
import './styles/App.css';
import './styles/input.css';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return <>{loading ? <LoadingPage /> : <TagConstructorPage />}</>;
}
