import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import LoginPage from "./pages/LoginPage.vue";
import RegisterPage from "./pages/RegisterPage.vue"
import CartPage from "./pages/CartPage.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "",
            component: HomePage
        },
        {
            path: "/login",
            component: LoginPage
        },
        {
            path: "/register",
            component: RegisterPage
        },
        {
            path: "/cart",
            component: CartPage
        }
    ]
});

export default router;
