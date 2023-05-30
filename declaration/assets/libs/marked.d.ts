/**
 * marked - a markdown parser
 * Copyright (c) 2011-2018, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */
export declare const marked: {
    (src: any, opt: any, callback: any): any;
    /**
     * Options
     */
    options: (opt: any) => any;
    setOptions(opt: any): any;
    getDefaults(): {
        baseUrl: any;
        breaks: boolean;
        gfm: boolean;
        headerIds: boolean;
        headerPrefix: string;
        highlight: any;
        langPrefix: string;
        mangle: boolean;
        pedantic: boolean;
        renderer: any;
        sanitize: boolean;
        sanitizer: any;
        silent: boolean;
        smartLists: boolean;
        smartypants: boolean;
        xhtml: boolean;
    };
    defaults: {
        baseUrl: any;
        breaks: boolean;
        gfm: boolean;
        headerIds: boolean;
        headerPrefix: string;
        highlight: any;
        langPrefix: string;
        mangle: boolean;
        pedantic: boolean;
        renderer: any;
        sanitize: boolean;
        sanitizer: any;
        silent: boolean;
        smartLists: boolean;
        smartypants: boolean;
        xhtml: boolean;
    };
    /**
     * Expose
     */
    Parser: {
        (options: any): void;
        /**
         * Static Parse Method
         */
        parse(src: any, options: any): any;
    };
    parser: (src: any, options: any) => any;
    Renderer: (options: any) => void;
    TextRenderer: () => void;
    Lexer: {
        (options: any): void;
        /**
         * Expose Block Rules
         */
        rules: {
            newline: RegExp;
            code: RegExp;
            fences: RegExp;
            hr: RegExp;
            heading: RegExp;
            blockquote: RegExp;
            list: RegExp;
            html: string;
            def: RegExp;
            nptable: {
                (): void;
                exec: any;
            };
            table: {
                (): void;
                exec: any;
            };
            lheading: RegExp;
            _paragraph: RegExp;
            text: RegExp;
        };
        /**
         * Static Lex Method
         */
        lex(src: any, options: any): any;
    };
    lexer: (src: any, options: any) => any;
    InlineLexer: {
        (links: any, options: any): void;
        /**
         * Expose Inline Rules
         */
        rules: {
            escape: RegExp;
            autolink: RegExp;
            url: {
                (): void;
                exec: any;
            };
            tag: string;
            link: RegExp;
            reflink: RegExp;
            nolink: RegExp;
            strong: RegExp;
            em: RegExp;
            code: RegExp;
            br: RegExp;
            del: {
                (): void;
                exec: any;
            };
            text: RegExp;
        };
        /**
         * Static Lexing/Compiling Method
         */
        output(src: any, links: any, options: any): any;
        escapes(text: any): any;
    };
    inlineLexer: (src: any, links: any, options: any) => any;
    Slugger: () => void;
    parse: any;
};
