<!--  -->
<template>
	<div>
		<formCustomization
			:formData="formData"
		>
		</formCustomization>
	</div>
</template>

<script setup>
	import { ref, reactive, provide, getCurrentInstance } from 'vue';
	import formCustomization from '@views/form/index.vue';
	let abc = ref('');

	let { proxy } = getCurrentInstance();
	let selectable=function (row,index) {
		if(row.f_equi_sbmc=='22'){
			return true
		}else{
			return false
		}
	}
	let formData = reactive({
		formId: '100095',
		isSelectable:selectable
	});
	// @resetSearchForm="resetSearchForm"
	let resetSearchForm = function () {
		formData.outParams.f_equi_ggxh = '';
	};
	let handleSelectionChange = function () {
		alert(1);
	};
	
	// provide('resetSearchForm', resetSearchForm)
</script>
<style scoped lang="scss"></style>
