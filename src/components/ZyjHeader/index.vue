<template>
    <div class="headerLeft">
        <div class="sz">
            <el-icon @click="isOpened">
                <Fold v-if="store.isCollapse" />
                <Expand v-else />
            </el-icon>
        </div>
        <div class="bread"><ZyjBread /></div>
    </div>
    <div class="headerRight">
        <el-dropdown>
            <span class="el-dropdown-link">
                root
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu @click="exitSys"><el-dropdown-item icon="SwitchButton">退出登录</el-dropdown-item></el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup>
import { useInfo } from "@store/index.js";
import ZyjBread from "@com/ZyjBread/index.vue";
import { useRouter} from "vue-router";
import { removeToken } from "@utils/auth";
const router = useRouter();
let store = useInfo();

let isOpened = () => {
    store.setIsCollapse();
};
let exitSys = () => {
    removeToken();
    sessionStorage.clear();
    store.loginOut();
    router.push('/login')
};
</script>

<style lang="scss" scoped>
    .headerLeft{
        display: flex;
        align-items: center;
        .sz {
            display: flex;
            align-items: center;
            font-size: 22px;
            cursor: pointer;
            margin-right: 15px;
        }
    }

</style>
