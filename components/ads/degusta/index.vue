<template>
  <a href="https://www.awin1.com/cread.php?awinmid=12261&awinaffid=667291&clickref=ProvSoup&p=%5B%5Bhttps%253A%252F%252Fwww.degustabox.com%252F%5D%5D" target="_blank" rel="noopener" aria-label="">
    <div style="background: #fff" class="flex h-screen overflow-auto">
      <div class="absolute right-0 m-4 w-10 flex-1">
        <svg id="happyD" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 358"><title>{{ name }}</title><circle cx="48.5" cy="131.5" r="48.5" style="fill:#a8de00"/><circle cx="48.5" cy="309.5" r="48.5" style="fill:#a8de00"/><path d="M815,235c-42-49-110-52-110-52H553V533H697s68-1,113-46,48-107,48-107V332S857,284,815,235ZM776,376.27a53.66,53.66,0,0,1-3.08,18c-4.07,11.44-12.71,30.1-28.92,43.71-2.5,2.1-5,4-7.56,5.75A100.1,100.1,0,0,1,679.7,461H635V256h42.59a112.09,112.09,0,0,1,53.34,13.21A82.47,82.47,0,0,1,750,283c14.37,14.37,21.51,38.55,24.4,51a63,63,0,0,1,1.6,14.08Z" transform="translate(-398 -183)" style="fill:#a8de00"/></svg>
      </div>
      <div class="absolute self-center py-32 w-screen flex" style="background: #006f69;">
        <div class="flex-1 bg-red-500 self-center text-center">
        </div>
        <div class="flex-1 py-20"></div>
        <div class="flex-1 bg-blue-500 self-center text-center items-center">
        </div>
      </div>
      <div class="absolute bottom-0 ml-2 mb-2 text-center flex-1">
        <p :title="name" class="font-body text-green-700">Get £5.00 off your first Degusta Box, as well as free delivery!<br>
        Pay around 60% less than you would in the shops</p>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  data() {
    return {
      name: 'Degusta - Your monthly suprise food box'
    }
  }
}
</script>