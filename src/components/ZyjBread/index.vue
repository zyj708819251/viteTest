<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item  to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index" :to="item.path">{{ item.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import { useRoute } from 'vue-router';
    const route = useRoute();
    const breadcrumbList = ref([]);
    const initBreadcrumbList = () => {
        breadcrumbList.value = route.matched.slice(1);
    };
    watch(
        route,
        () => {
            initBreadcrumbList();
        },
        { deep: true, immediate: true }
    );
</script>
<style lang="less" scoped></style>
