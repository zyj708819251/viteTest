<template>
  <div>
     <formCustomization :formData="formData">
        
     </formCustomization>
  </div>
</template>

<script setup>
    import {ref, reactive ,provide} from "vue"
    import formCustomization from '@views/form/index.vue';
    let abc=ref("111")
   
    let formData=reactive({
        formId:"202219837",
        outParams:{}
    })
    let resetSearchForm = function () {
       alert(1)
    };
    // provide('resetSearchForm', resetSearchForm)
</script>
<style scoped lang="scss">
</style>
