/// <reference types="@/vite-env" />
export declare const routes: ({
    path: string;
    component: () => Promise<typeof import("*.vue")>;
    category?: undefined;
} | {
    category: string;
    path: string;
    component: () => Promise<{
        default: typeof import("./demo/DemoDirective");
    }>;
} | {
    category: string;
    path: string;
    component: () => Promise<typeof import("*.vue")>;
})[];
export declare const router: import("vue-router").Router;
