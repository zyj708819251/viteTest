<!-- <template>
    <button @click="dialogVisible=true">打开</button>
    <ZyjDialog :dialogTitle="dialogTitle" v-model="dialogVisible" :dialogCenter="true" :dialogAlignCenter="true" dialogWidth="30%">
        <template v-slot:body>
          <p>1</p>
        </template>
        <template v-slot:footer>
            <el-button type="primary" @click="close">提交</el-button>
        </template>
    </ZyjDialog>
</template>

<script setup>
    import ZyjDialog from '@com/ZyjDialog/index.vue';
    import { ref } from 'vue';
    let dialogTitle = ref('我的弹窗');
    let dialogVisible = ref(false);

    let close = () => {
       dialogVisible.value=false
    };
</script>
<style scoped lang="scss"></style>
 -->

<template>
	<el-dialog
		v-bind="$attrs"
		:modelValue="dialogVisible"
		:title="dialogTitle"
		:close-on-click-modal="false"
		:close-on-press-escape="false"
		:append-to-body="false"
		:fullscreen="dialogFullscreen"
		:draggable="dialogDraggable"
		:align-center="dialogAlignCenter"
		:width="dialogWidth"
		@close="dialogClose"
	>
		<template #header>
			<div class="dialogHeader" @dblclick="dialogFullscreen=!dialogFullscreen">
				<p class="el-dialog__title">{{dialogTitle}}</p>
				<el-icon
					v-if="dialogFullscreenBtn"
					class="el-dialog__headerbtn fullscreen"
					@click.stop="dialogFullscreen=!dialogFullscreen"
				>
					<CopyDocument v-if="dialogFullscreen" />
					<FullScreen v-else />
				</el-icon>
			</div>
		</template>
		<slot name="body"></slot>
		<template #footer v-if="proxy.$slots.footer">
			<slot name="footer"></slot>
		</template>
	</el-dialog>
</template>

<script setup>
	import { onMounted, onBeforeMount, ref, getCurrentInstance } from 'vue';
	let props = defineProps({
		dialogVisible: {
			type: Boolean,
			default: false,
		},
		dialogTitle: {
			type: String,
			default: '弹窗标题',
		},
		dialogCenter: {
			type: Boolean,
			default: false,
		},
		dialogDraggable: {
			type: Boolean,
			default: false,
		},
		// 全屏按钮
		dialogFullscreenBtn: {
			type: Boolean,
			default: false,
		},
		// 默认全屏
		dialogDeafultFullscreen: {
			type: Boolean,
			default: false,
		},
		dialogAlignCenter: {
			type: Boolean,
			default: false,
		},
		dialogWidth: {
			type: [String, Number],
			default: '30%',
		},
	});
	let { proxy } = getCurrentInstance();
	let emit = defineEmits(['update:modelValue', 'dialogClose']);

	let dialogFullscreen = ref(false);
	let dialogClose = () => {
		emit('update:modelValue', false);
		emit('dialogClose');
		dialogFullscreen.value = props.dialogDeafultFullscreen;
	};

	onMounted(() => {
		dialogFullscreen.value = props.dialogDeafultFullscreen;
	});
</script>
<style lang="scss" scoped>
	.dialogHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.fullscreen {
			width: auto;
			right: 54px;
			color: var(--el-color-info);
			&:focus,
			&:hover {
				color: var(--el-color-primary);
			}
		}
	}
</style>
