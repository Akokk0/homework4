<template>
  <div class="home-container">
    <el-container>
      <el-header height="80px">
        <el-row :gutter="20">
          <el-col :span="4"><img src="@/assets/logo.png" class="logo"></el-col>
          <el-col :span="16"><h2>后台管理系统</h2></el-col>
          <el-col :span="4" class="col-btn"><el-button @click="loginOut">退出登录</el-button></el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
              active-text-color="#83d8eb"
              background-color="#FFB6C1"
              class="el-menu-vertical-demo"
              :default-active="$route.path"
              text-color="#fff"
              router
          >
            <el-menu-item :index="item.path" v-for="item in routerList" :key="item.name">
              <span>{{ item.meta.title }}</span>
            </el-menu-item>

          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
  import {useRouter} from "vue-router";

  const $router = useRouter()

  const routerList = $router.getRoutes().filter(r => r.meta.isShow)

  const loginOut = () => {
    localStorage.removeItem('token')
    $router.replace('/login')
  }
</script>

<style scoped lang="scss">
  .el-header {
    height: 80px;
    background-color: pink;
    .logo {
      height: 80px;
    }
    h2, .quit-login {
      text-align: center;
      height: 80px;
      line-height: 80px;
      color: white;
    }
    .col-btn {
      height: 80px;
      line-height: 80px;
    }
  }
  .el-aside {
    .el-menu {
      height: calc(100vh - 80px);
    }
  }
</style>
