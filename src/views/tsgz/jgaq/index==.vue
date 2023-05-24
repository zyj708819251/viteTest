<!-- 签字 -->
<template>
	<div>
		<vue-esign
			class="esign"
			ref="esign"
			:width="800"
			:height="300"
			:isCrop="esignParams.isCrop"
			:lineWidth="esignParams.lineWidth"
			:lineColor="esignParams.lineColor"
			v-model:bgColor="esignParams.bgColor"
		/>

		<el-button type="primary" @click="handleReset">清空画板</el-button>
		<el-button type="success" @click="handleGenerate">生成图片</el-button>
	</div>
</template>

<script setup>
	import { ref, reactive } from 'vue';

	let esign = ref(null);

	let esignParams = reactive({
		lineWidth: 6,
		lineColor: '#ff0000',
		bgColor: '',
		resultImg: '',
		isCrop: false,
	});
	const handleReset = () => {
		esign.value.reset();
	};

	const handleGenerate = () => {
		esign.value
			.generate()
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				alert(err); // 画布没有签字时会执行这里 'Not Signned'
			});
	};
</script>
<style scoped lang="scss">
	.esign {
		border: 1px solid #ccc;
	}
</style>
