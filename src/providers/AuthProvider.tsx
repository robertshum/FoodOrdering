import { supabase } from "@/lib/supabase";
import { Session } from '@supabase/supabase-js';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

type AuthData = {
  session: Session | null,
  sessionLoading: boolean,
};

const AuthContext = createContext<AuthData>({
  session: null,
  sessionLoading: true,
});

export default function AuthProvider({ children }: PropsWithChildren) {

  const [session, setSession] = useState<Session | null>(null);
  const [sessionLoading, setSessionLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setSessionLoading(false);
    };

    fetchSession();

    // on app mount, subscribe once to supabase changes to session.
    // when an auth state changes, set the session
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, sessionLoading }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);