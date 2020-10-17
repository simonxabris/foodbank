import * as React from 'react';
import "../styles/globals.css";
import { Amplify } from "aws-amplify";
import { Nav } from "../src/components";

import awsExports from "../src/aws-exports";

Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Nav/>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp;
