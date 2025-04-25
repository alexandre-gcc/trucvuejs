<template>
    <article class="card">
        <div class="image-wrapper">
            <img class="image" :src="data.image" :alt="data.name" />
        </div>
        <div class="details">
            <h2 class="name">{{ data.name }}</h2>
            <p class="price">${{ data.price.toFixed(2) }}</p>
            <p class="description">{{ data.description }}</p>
            <p class="category">Category: {{ data.category }}</p>

            <div v-if="data.cartView" class="actions">
                <ButtonComponent :data="decreaseButtonData" @click="decreaseQuantity" />
                <span>{{ quantity }}</span>
                <ButtonComponent :data="increaseButtonData" @click="increaseQuantity" />
            </div>
            <div v-else-if="userStore.isAuthenticated" class="actions">
                <FieldComponent :data="quantityFieldData" @field-change="updateQuantity" />
                <ButtonComponent :data="addButtonData" @click="onAddToCart" />
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useCartStore } from "../stores/cartStore";
import { useUserStore } from "../stores/userStore";
import type { ProductInterface } from "../interfaces/ProductInterface";
import type { ButtonInterface } from "../types/ButtonInterface";
import type { FieldInterface } from "../types/FieldInterface";
import ButtonComponent from "./ButtonComponent.vue";
import FieldComponent from "./FieldComponent.vue";

const props = defineProps<{ data: ProductInterface }>();

const cartStore = useCartStore();
const userStore = useUserStore();
const quantity = ref(1);

const addButtonData = computed<ButtonInterface>(() => ({
    id: props.data.id,
    class: "add-to-cart",
    type: "button",
    textContent: "Add to Cart",
}));

const decreaseButtonData = computed<ButtonInterface>(() => ({
    id: `${props.data.id}-decrease`,
    class: "quantity-button",
    type: "button",
    textContent: "-",
}));

const increaseButtonData = computed<ButtonInterface>(() => ({
    id: `${props.data.id}-increase`,
    class: "quantity-button",
    type: "button",
    textContent: "+",
}));

const quantityFieldData = computed<FieldInterface>(() => ({
    id: "quantity",
    type: "number",
    label: "Quantity",
    placeholder: "Enter quantity",
    class: "quantity-input",
    value: quantity.value.toString(),
}));

const isInCart = computed(() => {
    const cartItem = cartStore.cartItems.find(item => item.id === props.data.id);
    if (cartItem) {
        quantity.value = cartItem.quantity;
    }
    return cartItem !== undefined;
});

const updateQuantity = ({ value }: { value: string }) => {
    quantity.value = parseInt(value);
    updateCart();
};

const increaseQuantity = () => {
    quantity.value++;
    updateCart();
};

const decreaseQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--;
        updateCart();
    }
};

const updateCart = () => {
    cartStore.updateQuantity(props.data.id, quantity.value);
};

const onAddToCart = () => {
    if (quantity.value < 1) return;
    cartStore.addToCart(props.data, quantity.value);
};
</script>

<style scoped lang="css">
span {
    color: black;
}

.card {
    display: flex;
    gap: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    align-items: flex-start;
    max-width: 800px;
    margin: 20px auto;
}

.image-wrapper {
    flex: 0 0 200px;
}

.image {
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
}

.details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.name {
    font-size: 1.5em;
    margin: 0;
    color: #333;
}

.price {
    font-weight: bold;
    color: #28a745;
}

.description {
    color: #555;
    font-size: 14px;
}

.category {
    font-size: 13px;
    color: #888;
}

.actions {
    margin-top: 15px;
    display: flex;
    gap: 10px;
    align-items: center;
}

.quantity-input {
    width: 50px;
    text-align: center;
}
</style>
