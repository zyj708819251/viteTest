<template>
    <div class="login">
        <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="auto">
            <el-form-item label="用户名" prop="username"><el-input placeholder="请输入用户名" v-model="loginForm.username" suffix-icon="Avatar"></el-input></el-form-item>
            <el-form-item label="密码" prop="password"><el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password /></el-form-item>
            <el-form-item class="tip">
                <el-checkbox v-model="rememberPass">记住密码</el-checkbox>
                <el-button type="primary" link @click="goPage">忘记密码？</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="resetLoginForm(loginFormRef)">重置</el-button>
                <el-button type="primary" @click="submitLoginForm(loginFormRef)">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter} from "vue-router";
import { ElMessage } from "element-plus";
import { login } from "@api/login.js";
import Cookies from "js-cookie";
import { setToken, setExpiresIn } from "@utils/auth";

import { encrypt, decrypt } from "@/utils/jsencrypt";

let loginFormRef = ref();

let loginForm = reactive({
    username: "",
    password: ""
});
let rememberPass = ref(false);

let rules = reactive({
    username: [{ required: true, message: "用户名不能为空！", trigger: "blur" }],
    password: [{ required: true, message: "密码不能为空！", trigger: "blur" }]
});

let router = useRouter();
onMounted(() => {
    // 获取cookie
    getCookie();
});

let getCookie = () => {
    let username = Cookies.get("username");
    let password = Cookies.get("password");
    let rememberMe = Cookies.get("rememberMe");
    loginForm.username = username === undefined ? loginForm.username : username;
    loginForm.password = password === undefined ? loginForm.password : decrypt(password);
    rememberPass.value = rememberMe === undefined ? false : Boolean(rememberMe);
};

// 登录
let submitLoginForm = formEl => {
    if (!formEl) return;
    formEl.validate((valid, fields) => {
        if (valid) {
            if (rememberPass.value) {
                Cookies.set("username", loginForm.username, { expires: 30 });
                Cookies.set("password", encrypt(loginForm.password), { expires: 30 });
                Cookies.set("rememberMe", rememberPass.value, { expires: 30 });
            } else {
                Cookies.remove("username");
                Cookies.remove("password");
                Cookies.remove("rememberMe");
            }

            login(loginForm).then(res => {
                if (res.code == 200) {
                    let data = res.data;
                    setToken(data.access_token);
                    setExpiresIn(data.expires_in);
                    ElMessage({
                        message: "登录成功",
                        type: "success"
                    });
                    router.push("/");
                } else {
                    ElMessage({
                        message: res.msg,
                        type: "error"
                    });
                }
            });

            console.log("submit!");
        } else {
            console.log("error submit!", fields);
        }
    });
};
let resetLoginForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
};
let goPage = () => {};
</script>

<style lang="scss" scoped>
.login {
    width: 20vw;
    margin: auto;
    padding: 18px 18px 0;
    border: 1px solid #ccc;
    @include flex;
    justify-content: center;
    .tip {
        :deep(.el-form-item__content) {
            @include flex;
            justify-content: space-between;
        }
    }
}
</style>
