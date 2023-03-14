<template>
    <router-link v-for="item,index in oneMenu" :to="item.path" @click.native="menuClick(item,index)">{{item.meta.title}}</router-link>
</template>

<script setup>
    import { useInfo } from '@store/index.js';
    import { onMounted } from 'vue';
    let store = useInfo();

    let oneMenu = store.asyncRoute;
    let menuClick = (item, index) => {
        store.setLeftMenu(index);
    };
    import { getCurrentInstance } from 'vue';

    const { proxy } = getCurrentInstance();
    onMounted(() => {
        console.log(proxy.getNowTime());
    });
</script>
<style lang="scss" scoped></style>
