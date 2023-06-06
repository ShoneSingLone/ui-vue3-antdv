/// <reference types="@/vite-env.js" />
export declare const routes: ({
    path: string;
    component: () => Promise<typeof import("*.vue")>;
    category?: undefined;
} | {
    category: string;
    path: string;
    component: () => Promise<typeof import("*.vue")>;
})[];
export declare const router: import("vue-router").Router;
