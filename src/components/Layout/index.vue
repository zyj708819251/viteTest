<template>
    <el-container class="wrap">
        <el-aside class="aside" :width="store.isCollapse?'200px':'63px'"><ZyjMenu></ZyjMenu></el-aside>
        <el-container>
            <el-header class="header"><ZyjHeader></ZyjHeader></el-header>
            <el-main><router-view class="h100"/></el-main>
        </el-container>
    </el-container>
</template>
<script setup>
import ZyjMenu from "@com/ZyjMenu/index.vue";
import ZyjHeader from "@com/ZyjHeader/index.vue";
import { useInfo } from "@store/index.js";
let store = useInfo();
</script>

<style lang="scss" scoped>
.wrap {
    height: 100vh;
    .aside{
        transition: all .3s;
        border-right: solid 1px var(--el-menu-border-color);
        overflow: hidden;
    }
    .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: solid 1px var(--el-menu-border-color);
    }
	.mainWrap{
		height: 100%;
	}
}
</style>
