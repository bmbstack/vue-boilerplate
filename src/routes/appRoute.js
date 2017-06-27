/*
 * https://github.com/vuejs/vue-router/blob/dev/docs/LANGS.md
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

import containers from '../components/containers';

Vue.use(VueRouter);

export const ROUTES = {
    ROOT: '/',
    EDITOR: '/editor',
    LOGIN: '/login',
    MAIL: '/mail/:id',
    MAILBOX: '/main/box',
};

const routes = [
    { path: ROUTES.ROOT, component: containers.welcome },
    { path: ROUTES.EDITOR, component: containers.editor },
    { path: ROUTES.LOGIN, component: containers.login },
    { path: ROUTES.MAILBOX, component: containers.mailbox },
    { path: ROUTES.MAIL, component: containers.mail },
];

const router = new VueRouter({
    routes
});

export default router;
