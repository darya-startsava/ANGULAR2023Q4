import { Routes } from "@angular/router";

import { NotFoundPageComponent } from "./core/pages/not-found-page/not-found-page.component";

export const routes: Routes = [
    { path: "", redirectTo: "/auth", pathMatch: "full" },
    {
        path: "auth",
        loadChildren: () =>
            import("./auth/auth.module").then((m) => m.AuthModule)
    },
    {
        path: "main",
        loadChildren: () =>
            import("./youtube/youtube.module").then((m) => m.YoutubeModule)
    },
    {
        path: "admin",
        loadChildren: () =>
            import("./admin/admin.module").then((m) => m.AdminModule)
    },

    { path: "**", component: NotFoundPageComponent }
];
