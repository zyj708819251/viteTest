<template>
    <el-menu class="menu" :collapse="!store.isCollapse" :default-active="$route.path" :router="true" :unique-opened="true"><ChildrenMenu :list="store.leftMenu"></ChildrenMenu></el-menu>
</template>
<script setup>
import ChildrenMenu from "@com/ZyjMenu/ChildrenMenu.vue";
import { useInfo } from "@store/index.js";
import {  useRoute } from "vue-router";
let store = useInfo();
let $route = useRoute();
</script>
<style lang="scss" scoped>
    .menu{
        height: 100%;
        border-right: none;
    }
    
    
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
</style>
