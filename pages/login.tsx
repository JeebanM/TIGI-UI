import { useLogin, usePrivy } from "@privy-io/react-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from '../styles/login.module.css'

export default function LoginPage() {
  const { login } = useLogin();

  return (
    <>
      <Head>
        <title>Login · Folks Finance</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Folks Finance</h1>
          <p className={styles.subtitle}>
            Secure DeFi management for everyone
          </p>
          
          <div className={styles.spacer}></div>
          
          <button
            className={styles.loginButton}
            onClick={login}
          >
            Log in
          </button>
        </div>
      </main>
    </>
  );
}