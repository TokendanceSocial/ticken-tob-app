import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {typeof window === 'undefined' && (
          <style
            id='holderStyle'
            dangerouslySetInnerHTML={{
              __html: `
              *, *::before, *::after {
                transition: none!important;
              }`,
            }}
          />
        )}
        <title>Ticken</title>
      </Head>

      <body>
        <div className='g-glossy' />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
