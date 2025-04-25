<template>
    <header>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <template v-if="userStore.isAuthenticated">
                <RouterLink to="/cart">Cart</RouterLink>
                <ButtonComponent :data="buttonLogoutData" @click="handleLogout" />
            </template>
            <template v-else>
                <ButtonComponent :data="buttonLoginData" @click="handleLogin" />
            </template>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/UserStore";
import ButtonComponent from "./ButtonComponent.vue";
import type HeaderInterface from "../interfaces/HeaderInterface";

const router = useRouter();
const userStore = useUserStore();

const buttonLoginData = {
    id: "login-btn",
    textContent: "Login",
    class: "login-button",
    type: "button",
};

const buttonLogoutData = {
    id: "logout-btn",
    textContent: "Logout",
    class: "logout-button",
    type: "button",
};

const handleLogout = () => {
    router.push("/");
    userStore.logout();
};

const handleLogin = () => {
    router.push("/login");
};
</script>

<style scoped lang="css">
header {
    background-color: #f8f8f8;
    padding: 10px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

nav a {
    text-decoration: none;
    color: #333;
    margin: 0 10px;
    font-size: 16px;
}

nav a:hover {
    color: #007bff;
}
</style>
