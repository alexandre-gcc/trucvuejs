import { defineStore } from "pinia";
import { ref } from "vue";
import type UserInterface from "../interfaces/UserInterface";

export const useUserStore = defineStore("user", () => {
    const usersList = ref<UserInterface[]>([]);
    const isAuthenticated = ref(false);
    const user = ref<UserInterface | null>(null);

    const register = (newUser: UserInterface) => {
        const userExists = usersList.value.some(user => user.email === newUser.email);

        if (userExists) {
            throw new Error("User already exists");
        }

        usersList.value.push(newUser);
    }

    const login = (userData: { email: string; password: string }) => {
        const foundUser = usersList.value.find(user => user.email === userData.email);

        if (foundUser && foundUser.password === userData.password) {
            user.value = foundUser;
            isAuthenticated.value = true;
        } else {
            throw new Error("Invalid credentials");
        }
    };

    const logout = () => {
        user.value = null;
        isAuthenticated.value = false;
    };

    return {
        usersList,
        isAuthenticated,
        user,
        register,
        login,
        logout
    };
});
