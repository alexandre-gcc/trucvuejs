<template>
    <section>
        <p>Products</p>
        <ProductComponent v-for="product in products" :key="product.id" :data="{ ...product, cartView: false }" />
    </section>
</template>

<script setup lang="ts">
import ProductComponent from "../components/ProductComponent.vue";
import productsJson from "../assets/products.json";
const products = productsJson;
</script>

<style lang="css"></style>
