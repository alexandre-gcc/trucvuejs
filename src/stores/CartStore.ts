import { defineStore } from "pinia";
import { ref } from "vue";
import type ProductInterface from "../interfaces/ProductInterface";

export const useCartStore = defineStore("cart", () => {
    const cart = ref<ProductInterface[]>([]);

    const addToCart = (product: ProductInterface, quantity: number) => {
        const productInCart = cart.value.find(item => item.id === product.id);
        if (productInCart) {
            productInCart.quantity = (productInCart.quantity ?? 0) + quantity;
        } else {
            cart.value.push({ ...product, quantity: quantity || 1, cartView: true });
        }
    };

    const removeFromCart = (productId: string) => {
        cart.value = cart.value.filter(product => product.id !== productId);
    };

    const updateQuantity = (productId: string, quantity: number) => {
        const productInCart = cart.value.find(item => item.id === productId);
        if (productInCart) {
            productInCart.quantity = quantity;
        }
    };

    const getCartItems = () => {
        return cart.value;
    };

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartItems
    };
});
