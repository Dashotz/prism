import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: 'about', component: () => import('pages/AboutPage.vue') },
      { path: 'speakers', component: () => import('pages/SpeakersPage.vue') },
      { path: 'faqs', component: () => import('pages/FAQsPage.vue') },
      { path: 'contact', component: () => import('pages/ContactPage.vue') },
      { path: 'register', component: () => import('pages/RegistrationPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
