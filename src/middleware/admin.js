export default function admin({ next, router }) {
    if (!JSON.parse(localStorage.getItem('user')).is_admin) {
        return router.push({ name: 'login' });
    }

    return next();
}