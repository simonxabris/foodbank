import Head from 'next/head'
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";

import styles from '../../styles/sign-up.module.css';

export default function SignUp() {
  return (
    <div>
      <Head>
        <title>Sign Up</title>
      </Head>
      <p>signed up</p>
      <AmplifyAuthenticator className={styles.container} usernameAlias="email"></AmplifyAuthenticator>
    </div>
  )
}