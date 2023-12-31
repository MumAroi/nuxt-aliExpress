<template>
  <div id="AddressPage" class="mt-4 max-w-[500px] mx-auto px-2">

    <div class="mx-auto bg-white rounded-lg p-3">

      <div class="text-xl text-bold mb-2">Address Details</div>

      <form @submit.prevent="submit()">
        <TextInput class="w-full" placeholder="Contact Name" v-model:input="contactName" inputType="text"
          :error="error && error.type == 'contactName' ? error.message : ''" />

        <TextInput class="w-full mt-2" placeholder="Address" v-model:input="address" inputType="text"
          :error="error && error.type == 'address' ? error.message : ''" />

        <TextInput class="w-full mt-2" placeholder="Zip Code" v-model:input="zipCode" inputType="text"
          :error="error && error.type == 'zipCode' ? error.message : ''" />

        <TextInput class="w-full mt-2" placeholder="City" v-model:input="city" inputType="text"
          :error="error && error.type == 'city' ? error.message : ''" />

        <TextInput class="w-full mt-2" placeholder="Country" v-model:input="country" inputType="text"
          :error="error && error.type == 'country' ? error.message : ''" />

        <button :disabled="isWorking" type="submit"
          class="mt-6 bg-gradient-to-r  from-[#FE630C]  to-[#FF3200] w-full  text-white  text-[21px]  font-semibold  p-1.5  rounded-full">
          <div v-if="!isWorking">Update Address</div>
          <Icon v-else name="eos-icons:loading" size="25" class="mr-2" />
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user';
import { Address } from '~/interfaces/address';

const userStore = useUserStore()
const user = useSupabaseUser()

let contactName = ref<string>("")
let address = ref<string>("")
let zipCode = ref<string>("")
let city = ref<string>("")
let country = ref<string>("")

let currentAddress = ref<Address | null>(null)
let isUpdate = ref<boolean>(false)
let isWorking = ref<boolean>(false)
let error = ref<{ type: string, message: string } | null>(null)

const { data } = await useFetch<Address>(`/api/prisma/get-address-by-user/${user.value?.id}`)
if (data.value) {
  currentAddress.value = data.value;
  contactName.value = data.value.name;
  address.value = data.value.address;
  zipCode.value = data.value.zipcode;
  city.value = data.value.city;
  country.value = data.value.country;
  isUpdate.value = true
}

watchEffect(async () => {
  setTimeout(() => userStore.isLoading = false, 1000)
})

const submit = async () => {
  isWorking.value = true
  error.value = null

  if (!contactName.value) {
    error.value = {
      type: 'contactName',
      message: 'A contact name is required'
    }
  } else if (!address.value) {
    error.value = {
      type: 'address',
      message: 'An address is required'
    }
  } else if (!zipCode.value) {
    error.value = {
      type: 'zipCode',
      message: 'A zip code is required'
    }
  } else if (!city.value) {
    error.value = {
      type: 'city',
      message: 'A city is required'
    }
  } else if (!country.value) {
    error.value = {
      type: 'country',
      message: 'A country is required'
    }
  }

  if (error.value) {
    isWorking.value = false
    return
  }
  if (isUpdate.value) {
    await useFetch(`/api/prisma/update-address/${currentAddress.value?.id}`, {
      method: 'PATCH',
      body: {
        userId: user.value?.id,
        name: contactName.value,
        address: address.value,
        zipCode: zipCode.value,
        city: city.value,
        country: country.value,
      }
    })
  }else{
    await useFetch(`/api/prisma/add-address/`, {
      method: 'POST',
      body: {
        userId: user.value?.id,
        name: contactName.value,
        address: address.value,
        zipCode: zipCode.value,
        city: city.value,
        country: country.value,
      }
    })
  }
  
  isWorking.value = false

  return navigateTo('/checkout')

}
</script>