import 'react'

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'givebutter-widget': {
                id: string;
            };
        }
  }
}