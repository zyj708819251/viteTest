<template>
    <el-dialog
        :modelValue="dialogVisible"
        :title="dialogTitle"
        :close-on-click-modal="false"
        :append-to-body="false"
        :fullscreen="fullscreen"
        :draggable="dialogDraggable"
        :align-center="dialogAlignCenter"
        :width="dialogWidth"
        @close="dialogClose"
    >
        <template #header>
            <div class="dialogHeader">
                <p class="el-dialog__title">{{dialogTitle}}</p>
                <el-icon v-if="!dialogFullscreen" class="el-dialog__headerbtn fullscreen" @click="fullscreen=!fullscreen">
                    <CopyDocument v-if="fullscreen" />
                    <FullScreen v-else />
                </el-icon>
            </div>
        </template>
        <slot name="body"></slot>
        <template #footer>
            <slot name="footer"></slot>
        </template>
    </el-dialog>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    const props = defineProps({
        dialogVisible: {
            type: Boolean,
            default: false,
        },
        dialogTitle: {
            type: String,
            default: '标题',
        },
        dialogCenter: {
            type: Boolean,
            default: false,
        },
        dialogDraggable: {
            type: Boolean,
            default: false,
        },
        dialogFullscreen: {
            type: Boolean,
            default: false,
        },
        dialogAlignCenter: {
            type: Boolean,
            default: false,
        },
        dialogWidth: {
            type: [String, Number],
            default: '50%',
        },
    });

    const emit = defineEmits(['update:modelValue', 'dialogClose']);

    const fullscreen = ref(false);
    const dialogClose = () => {
        emit('update:modelValue', false);
        emit('dialogClose');
    };
    onMounted(() => {
        fullscreen.value = props.dialogFullscreen;
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
