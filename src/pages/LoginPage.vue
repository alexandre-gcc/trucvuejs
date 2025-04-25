<template>
    <section>
        <FormComponent :data="formData" @submit.prevent="onSubmit" />
        <small>
            Not registered yet? <RouterLink to="/register">Register now</RouterLink>
        </small>
    </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import type FormInterface from "../interfaces/FormInterface";
import FormComponent from "../components/FormComponent.vue";

const router = useRouter();
const userStore = useUserStore();

const formData = reactive<FormInterface>({
    fields: [
        { id: "email", type: "email", required: true, placeholder: "Enter your email", labelTextContent: "Email" },
        { id: "password", type: "password", required: true, placeholder: "Enter your password", labelTextContent: "Password" }
    ],
    buttons: [
        { id: "submit-button", type: "submit", textContent: "Submit" },
        { id: "reset-button", type: "reset", textContent: "Reset" }
    ]
});

const onSubmit = async (event: Event) => {
    const form = event.target as HTMLFormElement;
    const inputs = form.querySelectorAll("input");
    const formValues: Record<string, string> = {};

    inputs.forEach((input) => {
        if (input.id) {
            formValues[input.id] = input.value;
        }
    });

    try {
        userStore.login({
            email: formValues["email"],
            password: formValues["password"],
        });

        router.push("/");
    } catch (error) {
        alert("Invalid credentials. Please try again.");
    }
}
</script>

<style lang="css"></style>
