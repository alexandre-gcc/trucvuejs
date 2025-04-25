<template>
    <section class="cart-section">
        <p>Cart</p>

        <div v-if="cartItems.length === 0">
            <p>Your cart is empty.</p>
        </div>

        <div v-else>
            <div v-for="item in cartItems" :key="item.id">
                <ProductComponent :data="{ ...item, cartView: true }" />
            </div>

            <div class="cart-summary">
                <p>Total: ${{ cartTotal.toFixed(2) }}</p>
            </div>

            <ButtonComponent :data="checkoutButtonData" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "../stores/cartStore";
import ProductComponent from "../components/ProductComponent.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import type { ButtonInterface } from "../types/ButtonInterface";

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.getCartItems());
const cartTotal = computed(() =>
    cartStore.cart.reduce((total, item) => {
        const quantity = item.quantity ?? 1;
        return total + item.price * quantity;
    }, 0)
);

const checkoutButtonData: ButtonInterface = {
    id: "checkout",
    textContent: "Checkout",
    class: "checkout",
    type: "button",
};
</script>

<style scoped lang="css"></style>
