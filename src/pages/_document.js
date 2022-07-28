// import { Children } from 'react';
// import Document, { Html, Head, Main, NextScript } from 'next/document';
// import createEmotionServer from '@emotion/server/create-instance';
// import { createEmotionCache } from '../utils/create-emotion-cache';

// class CustomDocument extends Document {
//   render() {
//     return (
//       <Html lang="en">
//         <Head>
//           <link
//             rel="preconnect"
//             href="https://fonts.googleapis.com"
//           />
//           <link
//             rel="preconnect"
//             href="https://fonts.gstatic.com"
//           />
//           <link
//             rel="stylesheet"
//             href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
//           />
//           <link
//             rel="stylesheet"
//             href="https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto+Slab|Roboto:300,400,500,700&display=optional"
//           />
//           <link
//             rel="apple-touch-icon"
//             sizes="180x180"
//             href="/apple-touch-icon.png"
//           />
//           <link
//             rel="icon"
//             href="/favicon.ico"
//           />
//           <link
//             rel="icon"
//             type="image/png"
//             sizes="32x32"
//             href="/favicon-32x32.png"
//           />
//           <link
//             rel="icon"
//             type="image/png"
//             sizes="16x16"
//             href="/favicon-16x16.png"
//           />
//           <meta
//             name="theme-color"
//             content="#111827"
//           />
//         </Head>
//         <body>
//         <Main />
//         <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

// CustomDocument.getInitialProps = async (ctx) => {
//   const originalRenderPage = ctx.renderPage;
//   const cache = createEmotionCache();
//   const { extractCriticalToChunks } = createEmotionServer(cache);

//   ctx.renderPage = () => originalRenderPage({
//     enhanceApp: (App) => (props) => (
//       <App
//         emotionCache={cache}
//         {...props}
//       />
//     )
//   });

//   const initialProps = await Document.getInitialProps(ctx);
//   const emotionStyles = extractCriticalToChunks(initialProps.html);
//   const emotionStyleTags = emotionStyles.styles.map((style) => (
//     <style
//       data-emotion={`${style.key} ${style.ids.join(' ')}`}
//       key={style.key}
//       // eslint-disable-next-line react/no-danger
//       dangerouslySetInnerHTML={{ __html: style.css }}
//     />
//   ));

//   return {
//     ...initialProps,
//     styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags]
//   };
// };

// export default CustomDocument;


/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Document, {
  Html, Main, NextScript, Head
} from 'next/document';
import { ServerStyleSheets } from '@mui/styles';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
          <Head>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="/logo.ico"/>
          
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
  });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};