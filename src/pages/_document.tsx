/* eslint-disable react/jsx-props-no-spreading */

import NextDocument, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';
import { ServerStyleSheets } from '@material-ui/core/styles';

export default class Document extends NextDocument {
  static async getInitialProps(context: DocumentContext) {
    const sheet = new ServerStyleSheets();
    const originalRenderPage = context.renderPage;

    context.renderPage = () => originalRenderPage({
      enhanceApp: (App) => (props) => sheet.collect(<App {...props} />),
    });

    const initialProps = await NextDocument.getInitialProps(context);

    return {
      ...initialProps,

      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body style={{ display: 'block', margin: 0 }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
