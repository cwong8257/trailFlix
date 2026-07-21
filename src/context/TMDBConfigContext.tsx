import React, { createContext, useContext, useState, useEffect } from 'react';
import { getConfiguration } from '../tmdb/tmdb';
import { TMDBConfig } from '../types/tmdb';

const TMDBConfigContext = createContext<TMDBConfig | null>(null);

export const TMDBConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<TMDBConfig | null>(null);
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

export const withTMDBConfig = <P extends object>(
  WrappedComponent: React.ComponentType<P & { config: TMDBConfig | null }>
) => {
  return function WithTMDBConfigWrapper(props: Omit<P, 'config'>) {
    const config = useTMDBConfig();
    return <WrappedComponent {...(props as P)} config={config} />;
  };
};
