<template>
    <template v-for="item in list">
        <el-sub-menu v-if="item?.children?.length > 0" :index="item.path">
            <template #title>
                <el-icon><Setting /></el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <ChildrenMenu :list="item.children"></ChildrenMenu>
        </el-sub-menu>
        <el-menu-item v-else :index="item.path">
            <template #title>
                <el-icon><Setting /></el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
        </el-menu-item>
    </template>
</template>

<script setup>
defineProps(["list"]);
</script>

<style></style>
