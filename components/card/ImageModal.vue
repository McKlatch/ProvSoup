<template>
  <div v-if="show" @click="close" class="fixed inset-0 w-full h-screen flex items-center justify-center bg-black z-10">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    show: {
      required: true,
      type: Boolean
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>