import React from 'react';

import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, {
  Html,
  Main,
  NextScript,
} from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
