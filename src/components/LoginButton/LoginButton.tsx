import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";
import { User } from "@supabase/supabase-js";
import styles from "./loginbutton.module.css";
import googleIcon from "../../assets/google-icon-logo-svgrepo-com.svg";

export const LoginButton = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 1. Verifica se já existe uma sessão ativa ao carregar a página
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // 2. Escuta mudanças na autenticação (login/logout) automaticamente
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    console.log("funcionou:", data);

    if (error) console.error("Erro no login:", error.message);
  }

  async function singOut() {
    await supabase.auth.signOut();
  }

  return (
    <nav>
      {user ? (
        <div>
          <strong className={styles.welcome}>
            Olá, {user.user_metadata.full_name}
          </strong>
          <button onClick={singOut} className={styles.singOut}>
            Sair
          </button>
        </div>
      ) : (
        <button onClick={signInWithGoogle} className={styles.singInWithGoogle}>
          <img
            src={googleIcon}
            alt="Google Icon"
            className={styles.googleIcon}
          />
          <span>Entrar com o Google</span>
        </button>
      )}
    </nav>
  );
};
