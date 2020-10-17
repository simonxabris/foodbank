import * as React from "react";
import "../styles/globals.css";
import { Amplify } from "aws-amplify";
import { CacheProvider } from "@emotion/core";
import { cache } from "emotion";

import { Nav } from "../src/components";
import awsExports from "../src/aws-exports";

Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {
  return (
    <CacheProvider value={cache}>
      <Nav />
      <Component {...pageProps} />
    </CacheProvider>
  );
}

export default MyApp;
