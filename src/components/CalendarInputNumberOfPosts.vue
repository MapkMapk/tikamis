<template>
    <div class="flex flex-col items-center bg-white mb-[30px] w-[520px] ">
        <div class="base-input text-2xl w-[160px] h-[60px] p-0">
            <div @click="minus()" class="CINOP flex items-center justify-center cursor-pointer select-none">-</div>
            <div class="CINOP-num flex items-center justify-center cursor-pointer select-none">{{ numberValue }}</div>
            <div @click="plus()" class="CINOP flex items-center justify-center cursor-pointer select-none" >+</div>
        </div>      
    </div>
</template>
<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
    PNumber: Number,
    MaxNumber: Number
});

const emit = defineEmits(['updateCount','updatePNumber']);
const numberValue = ref(props.PNumber);
emit('updatePNumber', numberValue.value);
watch(
  () => numberValue,
  (newValue) => {
    console.log("&&&==========CINOP=========&&&");
    console.log(`props.PNumber: ${props.PNumber} ==> numberValue: ${numberValue.value} ==> newValue: ${newValue}`);
    console.log("&&&==========CINOP=========&&&");
    numberValue.value = newValue;
    
  }
);
const postLim = ref(props.MaxNumber);
function plus() {
  if(numberValue.value<postLim.value){ 
    console.log("//+++++++++++++++++CINOP+++++++++++++++++++++\\");
    console.log(`fun plus: ${numberValue.value} => ${numberValue.value+1}`);
    console.log("\\+++++++++++++++++CINOP+++++++++++++++++++++//");
  numberValue.value++;}
  else{
    console.log("//+++++++++++++++++CINOP+++++++++++++++++++++\\");
    console.log(`fun plus: ${numberValue.value} => ${numberValue.value}`);
    console.log("\\+++++++++++++++++CINOP+++++++++++++++++++++//");}
  emit('updatePNumber', numberValue.value);
   // Emit new event to update PNumber in higher-level parent
}

function minus() {
  if(numberValue.value>0){  
    console.log("//------------CINOP---------------\\");
    console.log(`fun minus: ${numberValue.value} => ${numberValue.value-1}`);
    console.log("\\------------CINOP---------------//");
  numberValue.value--;}
  else{

    console.log("//------------CINOP---------------\\");
    console.log(`fun minus: ${numberValue.value}!`);
    console.log("\\------------CINOP---------------//");}

  emit('updatePNumber', numberValue.value);
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