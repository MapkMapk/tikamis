<template>
    <component
      :is="props.tag"
      class="flex items-center text-green-500 bg-white justify-center text-lg font-semibold pt-5 pb-5 pl-6 pr-6 cursor-pointer"
      style="border: 2px solid #87C23E;"
    >
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13 3C7.47715 3 3 7.47715 3 13C3 18.5228 7.47715 23 13 23C18.5228 23 23 18.5228 23 13C23 7.47715 18.5228 3 13 3ZM0.5 13C0.5 6.09644 6.09644 0.5 13 0.5C19.9036 0.5 25.5 6.09644 25.5 13C25.5 19.9036 19.9036 25.5 13 25.5C6.09644 25.5 0.5 19.9036 0.5 13ZM14.25 9.25C14.25 8.55964 13.6904 8 13 8C12.3096 8 11.75 8.55964 11.75 9.25V11.75H9.25C8.55964 11.75 8 12.3096 8 13C8 13.6904 8.55964 14.25 9.25 14.25H11.75V16.75C11.75 17.4404 12.3096 18 13 18C13.6904 18 14.25 17.4404 14.25 16.75V14.25H16.75C17.4404 14.25 18 13.6904 18 13C18 12.3096 17.4404 11.75 16.75 11.75H14.25V9.25Z" fill="#87C23E"/>
    </svg>
      <p style="color: #87C23E;"><slot /></p>
    </component>
  </template>
  <script setup>
  let props = defineProps({
    tag: {
      default: 'button',
      type: String
    }
  });
  </script>
  