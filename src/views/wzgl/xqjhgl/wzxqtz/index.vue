<template>
	<div class="tz">
		<formCustomization class="myTable" ref="myTable" :formData="formData">
			<template v-slot:tableSearch="scope">
				<el-form-item label="部门">
					<el-select
						v-model="formData.outParams.dept_id"
						placeholder="请选择部门"
						size="mini"
					>
						<el-option
							v-for="(items, indexs) in construction_unit"
							:key="indexs"
							:label="items.deptName"
							:value="items.deptId"
						></el-option>
					</el-select>
				</el-form-item>
			</template>
		</formCustomization>
	</div>
</template>

<script setup>
	import formCustomization from '@views/form/index.vue';
	import { onMounted, reactive } from 'vue';
	import { useRoute } from 'vue-router';
	let route = useRoute();
	let formData = reactive({
		formName: '物资需求台账',
		formId: '',
		outParams: {
			dept_id: '',
		},
		hideSelection: true,
	});
	let wzxqtz = reactive({
		construction_unit: [],
		iframeSrc: '',
		previewDown: {},
		dataLength: 0,
		row: {},
	});
	import { getDept } from './api/index.js';
	// export default {
	//     name: 'scfa',
	//     components: {
	//         formCustomization: () => import('@/views/form/form.vue'),
	//     },
	//     props: {},
	//     data() {
	//         return {
	//             dialogData: {
	//                 formName:'物资需求台账',
	//                 formId: '',
	//                 outParams:{
	//                     dept_id:''
	//                 }
	//             },
	//             construction_unit:[],
	//             iframeSrc: '',
	//             previewDown: {},
	//             dataLength: 0,
	//             row: {},
	//         };
	//     },
	//     mounted() {
	//         this.dialogData.formId = this.$route.query.data;

	//         this.getDept();
	//     },
	//     methods: {
	//         ,
	//         resetForm(){
	//              this.dialogData.outParams.dept_id=this.construction_unit[0].deptId;
	//         }
	//     },

	// };
	onMounted(() => {
		formData.formId = route.query.data;
		getDeptData();
	});

	let getDeptData = function () {
		getDept().then((res) => {
			if (res.code == 200) {
				wzxqtz.construction_unit = res.data;
				formData.outParams.dept_id = wzxqtz.construction_unit[0].deptId;
			}
		});
	};
</script>

<style lang="scss" scoped>
	.tz {
		height: 100%;
	}
</style>
