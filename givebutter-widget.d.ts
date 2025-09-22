import 'react'

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'givebutter-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                id: string;
            };
        }
    }
}