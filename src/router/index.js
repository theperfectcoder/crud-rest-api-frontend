import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import AllUsers from "../views/AllUsers.vue";
import auth from "../middleware/auth";
import admin from "../middleware/admin";
import EditView from "../views/EditView.vue";
import EditProfile from "../views/EditProfile.vue";
import Payment from "../views/Payment.vue";

/**
 *
 * @type {Router}
 */
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                middleware: auth,
            },
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/all-users',
            name: 'allUsers',
            component: AllUsers,
            meta: {
                middleware: [auth, admin],
            },
        },
        {
            path: '/edit-profile',
            name: 'editProfile',
            component: EditProfile,
            meta: {
                middleware: [auth],
            },
        },
        {
            path: '/pay',
            name: 'Payment',
            component: Payment,
            meta: {
                middleware: [auth],
            },
        },
        {
            path: '/edit-user/:id',
            name: 'editUser',
            component: EditView,
            meta: {
                middleware: [auth, admin],
            },
        },
    ]
})

/**
 *
 * @param context
 * @param middleware
 * @param index
 * @returns {(function(...[*]): void)|*}
 */
function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    if (!subsequentMiddleware) return context.next;
    return (...parameters) => {
        // Run the default Vue Router `next()` callback first.
        context.next(...parameters);
        // Then run the subsequent Middleware with a new
        // nextMiddleware() callback.
        const nextMiddleware = nextFactory(context, middleware, index + 1);
        subsequentMiddleware({...context, next: nextMiddleware});
    };
}

/**
 *
 */
router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware)
            ? to.meta.middleware
            : [to.meta.middleware];

        const context = {
            from,
            next,
            router,
            to,
        };
        const nextMiddleware = nextFactory(context, middleware, 1);

        return middleware[0]({...context, next: nextMiddleware});
    }

    return next();
});

export default router