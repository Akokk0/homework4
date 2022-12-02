<template>
  <div v-loading="showForm">
    <div class="login-box">
      <el-form
          ref="changeFormRef"
          :model="changeForm"
          status-icon
          :rules="rules"
          class="demo-ruleForm"
      >
        <h2>请修改密码</h2>
        <el-form-item prop="password">
          <el-input
              v-model="changeForm.password"
              type="password"
              autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeFunc(changeFormRef)" class="login-btn"
          >修改</el-button
          >
          <el-button @click="resetForm(changeFormRef)" class="login-btn">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {ElMessage, FormInstance, FormRules} from "element-plus";
  import {ChangePwdDataInt} from "@/type/changePwd";
  import {reactive, ref} from "vue";
  import {changePwd, signUp, verifyCPCode} from "@/request/api";
  import {useRoute, useRouter} from "vue-router";
  import {VerifyCPCode} from "@/type/verifyCPCode";

  const $route = useRoute()
  const $router = useRouter()

  const changeFormRef = ref<FormInstance>()
  const showForm = ref(true)

  const email = $route.params.email as string
  const password = $route.params.code as string

  const changeForm = reactive({
    password: ''
  })

  const rules: FormRules = {
    password: [
      { required: true, message: '请输入你的密码', trigger: 'blur' },
      { min: 3, max: 10, message: '密码的长度在3到10之间', trigger: 'blur' },
    ]
  }

  async function verify() {
    try {
      const {data: res} = await verifyCPCode({email, password})
      if (res.flag) {
        showForm.value = !res.flag
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
        $router.push('/login')
      }
    } catch (e) {
      ElMessage({
        message: '服务器正忙，请稍后重试！',
        type: 'error'
      })
      $router.push('/login')
    }
  }
  verify()

  const changeFunc = async (formEI: FormInstance) => {
    if (!formEI) return
    await formEI.validate(async (valid, fields) => {
      if (valid) {
        try {
          const {data: res} = await changePwd({
            email,
            name: password,
            password: changeForm.password
          })
          if (res.flag) {
            ElMessage({
              message: res.message,
              type: 'success'
            })
            $router.push('/login')
          } else {
            ElMessage({
              message: res.message,
              type: 'error'
            })
            $router.push('/login')
          }
        } catch (e) {
          ElMessage({
            message: '服务器正忙，请稍后重试！',
            type: 'error'
          })
          $router.push('/login')
        }
      }
    })
  }

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }

</script>

<style lang="scss" scoped>
  .login-box {
    width: 100%;
    height: 100vh;
    background: url('@/assets/animeweb.png');
    padding: 1px;
    text-align: center;
    .demo-ruleForm {
      width: 500px;
      margin: 200px auto;
      background-color: #fff;
      padding: 40px;
      border-radius: 20px;
    }
    .login-btn {
      width: 48%;
    }
    h2 {
      margin-bottom: 10px;
    }
  }
</style>
