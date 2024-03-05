import {Session} from '@supabase/supabase-js';
import React, {useEffect, useState} from 'react';
import {supabase} from '../utils/supabase';

interface AppContextProps {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = React.createContext<AppContextProps>({
  session: null,
  setSession: () => {},
  isLoading: true,
  setIsLoading: () => {},
});

const AppProvider = ({children}: any) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
      setIsLoading(false);
    });

    // eslint-disable-next-line @typescript-eslint/no-shadow
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        session,
        setSession,
        isLoading,
        setIsLoading,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppProvider = () => {
  return React.useContext(AppContext);
};

export default AppProvider;
