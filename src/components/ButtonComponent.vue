<template>
    <button :id="data.id" :type="data.type ? data.type : 'button'" :class="data.class ? data.class : ''">
        {{ data.textContent }}
    </button>
</template>

<script setup lang="ts">
import type ButtonInterface from "../interfaces/ButtonInterface";

interface ButtonComponentProperties {
    data: ButtonInterface;
}

defineProps<ButtonComponentProperties>();
</script>

<style scoped lang="css">
button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

button:hover {
    background-color: #0056b3;
}
</style>
