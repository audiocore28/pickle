<template>
  <div class="relative w-full cursor-pointer pointer-events-none transition my-auto mb-1">
    <div class="w-full cursor-default pointer-events-auto dark:bg-gray-800 relative mx-auto max-w-md">
      
      <!-- Header -->
      <div class="bg-stone-800 pl-4 pb-4 pt-5 rounded-t-xl">
        <slot name="header"></slot>
      </div>
      <div aria-hidden="true" class="border-b dark:border-gray-700 px-2"></div>
      <!-- / Header -->
      
      <!-- Content -->
      <div class="bg-stone-800 mx-auto max-w-md h-[470px] lg:h-[620px] overflow-y-scroll">
        <slot name="content"></slot>
        <div class="h-3"></div>
      </div>
      <!-- / Content -->
    
      <!-- Footer -->
      <div class="bg-stone-800 space-y-2 pb-2">
        <div aria-hidden="true" class="border-t dark:border-gray-700 px-2"></div>
        <div class="px-6 py-2">
          <slot name="footer"></slot>
        </div>
      </div>
      <!-- Footer -->

    </div>
  </div>
</template>