'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  api,
  AUTH_CHANGED_EVENT,
} from '@/lib/api-client';

type AuthContextValue = {
  authenticated: boolean;
};

const AuthContext = createContext<AuthContextValue>({
  authenticated: false,
});

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState(
    api.hasAccessToken(),
  );

  useEffect(() => {
    const sync = () => {
      setAuthenticated(api.hasAccessToken());
    };

    sync();

    window.addEventListener(
      AUTH_CHANGED_EVENT,
      sync,
    );

    return () => {
      window.removeEventListener(
        AUTH_CHANGED_EVENT,
        sync,
      );
    };
  }, []);

  const value = useMemo(
    () => ({
      authenticated,
    }),
    [authenticated],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
