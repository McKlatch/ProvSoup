<template>
  <a href="https://www.vultr.com/?ref=8189154" target="_blank" rel="noopener" aria-label="">
    <div style="background:linear-gradient(90deg,#021048,#1e38a3)" class="flex h-screen overflow-auto">
      <div class="absolute right-0 m-4 w-10 flex-1">
        <svg id="sygnet__on-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 36.4"><defs><style>.cls-1{fill:#007bfc;}.cls-2{fill:#51b9ff;}.cls-3{fill:#fff;}</style></defs><title>{{ name }}</title><path class="cls-1" d="M14.63,4a2.09,2.09,0,0,0-1.77-1H2.1A2.1,2.1,0,0,0,0,5.1,2.12,2.12,0,0,0,.32,6.22l2.21,3.5L16.84,7.48Z" transform="translate(0 -3)"/><path class="cls-2" d="M16.84,7.48a2.1,2.1,0,0,0-1.78-1H4.31a2.1,2.1,0,0,0-2.1,2.1,2,2,0,0,0,.32,1.12l3.09,4.9,14.31-2.24Z" transform="translate(0 -3)"/><path class="cls-3" d="M5.62,14.62A2,2,0,0,1,5.3,13.5a2.1,2.1,0,0,1,2.1-2.1H18.15a2.1,2.1,0,0,1,1.78,1l9.62,15.27a2,2,0,0,1,.33,1.12,2.07,2.07,0,0,1-.33,1.12l-5.37,8.53a2.11,2.11,0,0,1-3.56,0Z" transform="translate(0 -3)"/><path class="cls-3" d="M32.74,19.19a2.11,2.11,0,0,0,3.56,0l1.85-2.93,3.53-5.6A2.12,2.12,0,0,0,42,9.54a2.15,2.15,0,0,0-.32-1.12L38.88,4A2.11,2.11,0,0,0,37.1,3H26.34a2.1,2.1,0,0,0-2.1,2.1,2,2,0,0,0,.33,1.12Z" transform="translate(0 -3)"/></svg>
      </div>
      <div class="absolute bottom-0 ml-2 mb-2 text-center flex-1">
        <p :title="name" class="font-body text-blue-100">High Performance SSD Storage 16 Locations <br>
        Starting from $2.50/mo $0.004/hr</p>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  data() {
    return {
      name: 'Vultr - The Infrastructure Cloud'
    }
  }
}
</script>