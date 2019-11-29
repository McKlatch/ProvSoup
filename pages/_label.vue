<template>
  <div class="absolute inset-0 flex items-center justify-center">
    <div class="max-w-sm rounded overflow-hidden">
      <div>{{$route.params.label}}</div>
    </div>
  </div>
</template>
<script>
  export default {
  validate ({ params }) {
    // Must be a number
    return /^[A-Z].*/.test(params.label)
  }
}
</script>