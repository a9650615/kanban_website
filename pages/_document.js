/**
 * See: https://github.com/zeit/next.js/#custom-document
 */

import React from "react";
import Document, { Head, Main, NextScript } from "next/document"; // eslint-disable-line no-shadow
import { injectGlobal, ServerStyleSheet } from "styled-components";

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  @import 'https://fonts.googleapis.com/css?family=Roboto:300,400,500';
  @import 'https://fonts.googleapis.com/earlyaccess/notosanstc.css';
  body {
    background-color: white;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  a:visited * {
    color: #2F2F2F;
  }
`;

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="zh">
        <Head>
          <meta charSet="utf-8" />
          <title>Koa + Next.js</title>
          {this.props.styleTags}
        </Head>
        <Main />
        <NextScript />
      </html>
    );
  }
}
