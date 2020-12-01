import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <title>nextjs-app</title>
          <meta name="viewport" content="width=device-width,initial-scale=1.0, user-scalabled=no, maximum-scale=1.0, minimun-sacle=1.0" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
