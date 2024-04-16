<template>
    <div class="flex flex-col items-center bg-white mb-[30px] w-[520px] ">
        <div class="base-input text-2xl w-[160px] h-[60px] p-0">
            <div @click="minus()" class="CINOP flex items-center justify-center cursor-pointer select-none">-</div>
            <div class="CINOP-num flex items-center justify-center cursor-pointer select-none">{{ PNumber }}</div>
            <div @click="plus()" class="CINOP flex items-center justify-center cursor-pointer select-none" >+</div>
        </div>      
    </div>
</template>
<script setup>
import { ref } from 'vue';
let PNumber = ref(1);
function plus(){
    PNumber.value++;
}
function minus(){
    PNumber.value--;
}
</script>
<style>
    .CINOP {
        /*width: calc(100%/3);*/
        width: 30%;
        height: 100%;
    }
    .CINOP-num {
        /*width: calc(100%/3);*/
        width: 40%;
        height: 100%;
        
    }
</style>