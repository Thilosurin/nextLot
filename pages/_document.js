import Document, { Head, Main, NextScript } from 'next/document'

import { getSessionFromServer, getUserScript } from "../lib/auth";

// export default class extends Document {
//   render() {
//     /**
//     * Here we use _document.js to add a "lang" propery to the HTML object if
//     * one is set on the page.
//     **/
//     return (
//       <html lang={this.props.__NEXT_DATA__.props.pageProps.lang || 'en'}>
//         <Head>
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </html>
//     )
//   }
// }

class MyDocument extends Document {
  static getInitialProps = ctx => {
    const user = getSessionFromServer(ctx.req);

    const page = ctx.renderPage(Component => {
      const WrappedComponent = props => {
        return <Component {...props} />;
      };
      return WrappedComponent;
    });

    return {
      ...user,
      ...page
    };
  };

  render() {
    const { user = {} } = this.props;

    return (
      <html lang="en" dir="ltr">
        <Head/>
        <body>
          <Main />
          <script dangerouslySetInnerHTML={{ __html: getUserScript(user) }} />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
