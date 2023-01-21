import Vue from "vue";
import VueRouter, { Route, RouteConfig } from "vue-router";
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import { generateCustomValidity, EventType } from "./assets/utilities";
const AppMain = () => import(/* webpackPreload: true */ "./pages/main.vue");
const HomeIndex = () => import(/* webpackPrefetch: true */ "./pages/home/index.vue");

const homeAbout = () => import(/* webpackPrefetch: true */ "./pages/home/about.vue");

const AccountLogin = () => import(/* webpackPrefetch: true */ "./pages/account/login.vue");

const sharedReport = () => import(/* webpackPrefetch: true */ "./pages/shared/report.vue");

Vue.use(VueRouter);
Vue.prototype.$CaptionsLibrary = window.CaptionsLibrary;
Vue.prototype.$MessagesLibrary = window.MessagesLibrary;


const routes: RouteConfig[] = [
    { path: "/", component: HomeIndex },

    { path: "/home/about", component: homeAbout },
    
    { path: "/account/login", component: AccountLogin },

    { path: "*", component: HomeIndex },

    { path: "/shared/report", name: "report", component: sharedReport, props: true },

];

let router = new VueRouter({ mode: "history", routes: routes });

router.beforeResolve(async (to, from, next) => {

    if (to.fullPath == "/account/login") {
        next();
        return;
    }

    sessionExpired(to, from, next);

});

function sessionExpired(to: any, from: any, next: any) {
    window.app.$emit(EventType.StartWaiting);
    $.ajax({
        type: "POST",
        url: "/api/Account/SessionExpired",
        dataType: "json",
        success: result => {
            if (result) {
                sessionStorage.clear();
                router.push("/account/login");
                return;
            } else {
                next();
            }
        },
        complete: () => {
            window.app.$emit(EventType.EndWaiting);
        }
    });
}

function pad(num: number) {
    if (num < 10) {
        return '0' + num;
    }
    return num;
}

Date.prototype.toJSON = function () {
    return this.getFullYear() +
        '-' + pad(this.getMonth() + 1) +
        '-' + pad(this.getDate()) +
        'T' + pad(this.getHours()) +
        ':' + pad(this.getMinutes()) +
        ':' + pad(this.getSeconds()) +
        '.' + (this.getMilliseconds() / 1000).toFixed(3).slice(2, 5);
};

Vue.prototype.$UserInfo = {

};

window.app = new Vue({
    el: "#app-root",
    router,
    components: {
        "app-main": AppMain
    },
});

//@ts-ignore
window.minToHourMin = (input: any, zeroPadding: any, hourLength: any) => {
    var isMinus = input < 0;
    input = Math.abs(input);
    hourLength = hourLength || 3;
    var hour = Math.floor(input / 60);
    var min = Math.abs(input) % 60;
    var result = "";

    if (zeroPadding === true) {
        result = String("000" + hour).slice(-hourLength) + ":" + String("00" + min).slice(-2);
    } else {
        result = hour + ":" + String("00" + min).slice(-2);
    }

    if (isMinus) { result = "-" + result; }

    return result;
}

declare global {
    interface Window {
        app: any;
        CaptionsLibrary: any;
        MessagesLibrary: any;
        UserInfo: any;
        webViewTypes: any;
    }
}

declare module "vue/types/vue" {
    interface Vue {
        $CaptionsLibrary: { get: Function },
        $MessagesLibrary: { get: Function },
        $UserInfo: any,
    }
}

window.addEventListener("load", () => {
    if ('serviceWorker' in navigator) {
        const registration = runtime.register();
    }
});

function removeCustomValidity(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target) {
        target.setCustomValidity("");
        if (!target.checkValidity()) {
            const customValidity = generateCustomValidity(target);
            target.setCustomValidity(customValidity);
            target.addEventListener("input", removeCustomValidity, { once: true });
        }
    }
}

document.addEventListener('invalid', (() => (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target) {
        const customValidity = generateCustomValidity(target);
        target.setCustomValidity(customValidity);
        target.addEventListener("input", removeCustomValidity, { once: true });
    }
})(), true);

function checkAccess(to: any, from: any, next: any) {
    if (Vue.prototype.$UserInfo.AccessIds != undefined) {

        next();

    } else {
        router.push("/");
    }
}