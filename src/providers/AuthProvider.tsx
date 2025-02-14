import { supabase } from "@/lib/supabase";
import { Profile } from "@/types";
import { Session } from '@supabase/supabase-js';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

type AuthData = {
  session: Session | null;
  profile: Profile;
  sessionLoading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  profile: { id: 'undefined', group: 'USER' },
  sessionLoading: true,
  isAdmin: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {

  const [session, setSession] = useState<Session | null>(null);
  const [sessionLoading, setSessionLoading] = useState<boolean>(true);
  const [profile, setProfile] =
    useState<Profile>({ id: 'undefined', group: 'USER' });

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        // fetch profile
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(data || null);
      }

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
    <AuthContext.Provider value={{ session, sessionLoading, profile, isAdmin: profile?.group === 'ADMIN' }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);