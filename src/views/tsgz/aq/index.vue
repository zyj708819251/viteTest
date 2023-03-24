<!--  -->
<template>
    <button @click="dialogVisible=true">打开</button>
    <ZyjDialog :dialogTitle="dialogTitle" v-model="dialogVisible" :dialogCenter="true" :dialogAlignCenter="true" dialogWidth="30%">
        <template v-slot:body>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
          <p>13</p>
          <p>14</p>
          <p>15</p>
          <p>16</p>
          <p>17</p>
        </template>
        <template v-slot:footer>
            <el-button type="primary" @click="close">提交</el-button>
        </template>
    </ZyjDialog>
</template>

<script setup>
    import ZyjDialog from '@com/ZyjDialog/index.vue';
    import { ref } from 'vue';
    const dialogTitle = ref('我的弹窗');
    const dialogVisible = ref(false);

    const close = () => {
       dialogVisible.value=false
    };
</script>
<style scoped lang="scss"></style>
