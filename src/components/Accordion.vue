<template>
  <ul class="mt-1 max-w-2xl mx-auto px-4 divide-y rounded-xl">
    <li class="">
      <details class="group">
        <summary class="flex items-center justify-start font-medium hover:cursor-pointer py-4 border-b border-gray-600">
          
          <svg class="w-4 h-4 text-gray-300 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
            width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
          </svg>
          
          <slot name="header"></slot>
          
        </summary>
        
        <article class="pt-4">
          
          <slot name="content"></slot>
          
        </article>
      </details>
    </li>
  </ul>
</template>