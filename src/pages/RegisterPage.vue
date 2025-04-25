<template>
    <section>
        <FormComponent :data="formData" @submit.prevent="onSubmit" />
        <small>
            Already registered? <RouterLink to="/login">Login now</RouterLink>
        </small>
    </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import FormComponent from "../components/FormComponent.vue";
import type FormInterface from "../interfaces/FormInterface";

const router = useRouter();
const userStore = useUserStore();

const formData = reactive<FormInterface>({
    fields: [
        { id: "first-name", type: "text", required: true, placeholder: "John", labelTextContent: "First name" },
        { id: "last-name", type: "text", required: true, placeholder: "Doe", labelTextContent: "Last name" },
        { id: "email", type: "email", required: true, placeholder: "john.doe@gmail.com", labelTextContent: "Email" },
        { id: "password", type: "password", required: true, placeholder: "Not 1234", labelTextContent: "Password" }
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

    for (const input of inputs) {
        if (input.id) {
            formValues[input.id] = input.value;
        }
    }

    const user = {
        firstName: formValues["first-name"],
        lastName: formValues["last-name"],
        email: formValues["email"],
        password: formValues["password"]
    };

    try {
        userStore.register(user);
        router.push("/login");
    } catch (error) {
        alert((error as Error).message);
    }
}
</script>

<style lang="css"></style>
