import React, { createContext, useContext, useState, useEffect } from 'react';
import { getConfiguration } from '../tmdb/tmdb';

const TMDBConfigContext = createContext(null);

export const TMDBConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getConfiguration()
      .then(fetchedConfig => {
        if (isMounted) {
          setConfig(fetchedConfig);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Failed to load TMDB configuration:', err);
        if (isMounted) {
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return null; // Or a simple loader, but null is safe and clean
  }

  return (
    <TMDBConfigContext.Provider value={config}>
      {children}
    </TMDBConfigContext.Provider>
  );
};

export const useTMDBConfig = () => {
  const context = useContext(TMDBConfigContext);
  return context;
};

export const withTMDBConfig = (WrappedComponent) => {
  return function WithTMDBConfigWrapper(props) {
    const config = useTMDBConfig();
    return <WrappedComponent {...props} config={config} />;
  };
};
