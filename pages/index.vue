<template>
    <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
        <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
            <div v-if="products" v-for="product in products" :key="product.id">
                <ProductComponent :product="product" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user';
import { Product } from '~/interfaces/product';
const userStore = useUserStore()

// let products = ref<Product[]|null>(null)
let products = ref<Product[]>([
    { id: 1, title: 'Product 1', description: "p01", price: 9000, url: 'https://picsum.photos/id/212/200/200' },
    { id: 2, title: 'Product 2', description: "p02", price: 10000, url: 'https://picsum.photos/id/213/200/200' },
    { id: 3, title: 'Product 3', description: "p03", price: 11000, url: 'https://picsum.photos/id/214/200/200' },
    { id: 4, title: 'Product 4', description: "p04", price: 12000, url: 'https://picsum.photos/id/215/200/200' },
    { id: 5, title: 'Product 5', description: "p05", price: 13000, url: 'https://picsum.photos/id/216/200/200' },
    { id: 6, title: 'Product 6', description: "p06", price: 14000, url: 'https://picsum.photos/id/211/200/200' },
    { id: 7, title: 'Product 7', description: "p07", price: 15000, url: 'https://picsum.photos/id/219/200/200' },
])
</script>