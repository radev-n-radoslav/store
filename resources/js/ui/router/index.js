import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home';
import BlogCategory from '../views/BlogCategory';
import BlogArticle from '../views/BlogArticle';

const routes = [
	{
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/blog/category/:name',
        name: 'BlogCategory',
        component: BlogCategory,
    },
    {
        path: '/blog/article/:name',
        name: 'BlogArticle',
        component: BlogArticle,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;