import React, { useEffect, useState } from 'react';
import Loading from './Components/loading/Loading';
import TagConstructor from './Components/tag-constructor/TagConstructor';
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

  return <>{loading ? <Loading /> : <TagConstructor />}</>;
}
