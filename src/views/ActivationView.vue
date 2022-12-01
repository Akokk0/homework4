<template>
  <div class="main">
    <div class="inside" v-if="flag">
      <h1 style="color: white">激活成功！</h1>
      <p style="color: white">点击按钮跳转到登录页</p>
      <el-button id="btn" @click="toHomePage">登录</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {activation} from "@/request/api";
  import {useRoute, useRouter} from "vue-router";
  import {ref} from "vue";
  import {ElMessage} from "element-plus";

  const $route = useRoute()
  const $router = useRouter()
  const flag = ref(false)

  const code = $route.params.code

  async function active() {
    try {
      const {data: res} = await activation(code as string)
      flag.value = res.flag
      if (flag.value) {
        ElMessage({
          message: res.message,
          type: 'success'
        })
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
        $router.push("/login")
      }
    } catch (e) {
      ElMessage({
        message: '服务器正忙，请稍后重试！',
        type: 'error'
      })
    }
  }
  active()

  const toHomePage = () => {
    $router.push("/login")
  }

</script>

<style scoped>
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .inside {
    display: flex;
    width: 400px;
    height: 150px;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: pink;
    border-radius: 10px;
  }
</style>
