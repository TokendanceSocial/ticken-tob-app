import { readFileSync } from 'fs';
import { join } from 'path';
import { Html, Head, Main, NextScript } from 'next/document';

class InlineStylesHead extends Head {
  getCssLinks(files: any) {
    return this.__getInlineStyles(files);
  }

  __getInlineStyles(files: any) {
    const { assetPrefix } = this.context || {};
    if (!files || files.allFiles.length === 0) return null;

    const cssFiles = files.allFiles.filter((file: any) => /\.css$/.test(file));
    return cssFiles.map((file: any) => (
      <style
        key={file}
        data-href={`${assetPrefix}/_next/${file}`}
        dangerouslySetInnerHTML={{
          __html: readFileSync(join(process.cwd(), '.next', file), 'utf-8'),
        }}
      />
    ));
  }
}

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
      </Head>

      <body>
        <div className='g-glossy' />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
