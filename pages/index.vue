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

let products = ref<Product[] | null>(null)

onBeforeMount(async () => {
    const { data } = await useFetch<Product[]>('/api/prisma/get-all-products')
    if (data.value) {
        products.value = data.value;
        setTimeout(() => userStore.isLoading = false, 1000)
    }
})

</script>