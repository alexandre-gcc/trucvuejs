<template>
    <form v-bind="$attrs">
        <section>
            <FieldComponent v-for="(field, index) in data.fields" :key="index" :data="field" />
        </section>
        <section>
            <ButtonComponent v-for="(button, index) in data.buttons" :key="index" :data="button" />
        </section>
    </form>
</template>

<script setup lang="ts">
import type FormInterface from "../interfaces/FormInterface";
import FieldComponent from "./FieldComponent.vue";
import ButtonComponent from "./ButtonComponent.vue";

interface FormComponentProperties {
    data: FormInterface;
}

defineProps<FormComponentProperties>();
</script>

<style scoped lang="css">
form {
    display: flex;
    justify-content: center;
    flex-direction: column;
}
</style>
