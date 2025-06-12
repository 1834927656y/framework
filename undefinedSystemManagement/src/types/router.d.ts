import { LocationQuery, RouteRecordRaw } from 'vue-router';
declare module 'vue-router' {
    interface RouteRecordRaw {
        hidden?: boolean;
        permissions?: string[];
    }
    interface RouteRecordSingleViewWithChildren {
        hidden?: boolean;
        permissions?: string[];
    }
}