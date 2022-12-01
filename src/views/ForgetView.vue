<template>
  <div>
    <el-form
        ref="signUpFormRef"
        :model="changeForm"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
    >
      <!--<span>或使用邮箱注册</span>-->
      <el-form-item label="账号：" prop="email">
        <el-input v-model="changeForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
            v-model="changeForm.password"
            type="password"
            autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changeFunc(changeFormRef)">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {ElMessage, FormInstance, FormRules} from "element-plus";
  import {ChangePwdDataInt} from "@/type/changePwd";
import {ref} from "vue";
import {signUp} from "@/request/api";

  const changeFormRef = ref<FormInstance>()

  const changeForm: ChangePwdDataInt = {
    email: '',
    password: ''
  }

  const rules: FormRules = {
    name: [
      { required: true, message: '请输入你的账号', trigger: 'blur' },
      { min: 3, max: 10, message: '账号的长度在3到10之间', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入你的密码', trigger: 'blur' },
      { min: 3, max: 10, message: '密码的长度在3到10之间', trigger: 'blur' },
    ],
    email: [
      { required: true, message: '请输入你的邮箱', trigger: 'blur' },
      { type: 'email', message: '邮箱格式错误', trigger: 'change' }
    ]
  }

  const changeFunc = async (formEI: FormInstance) => {
    if (!formEI) return
    await formEI.validate(async (valid, fields) => {
      if (valid) {
        try {
          const {data: res} = await signUp(signUpForm)
          if (res.flag) {
            ElMessage({
              message: res.message,
              type: 'success'
            })
          } else {
            ElMessage({
              message: res.message,
              type: 'error'
            })
          }
        } catch (e) {
          ElMessage({
            message: '服务器正忙，请稍后重试！',
            type: 'error'
          })
        }
      }
    })
  }
</script>

<style scoped>

</style>
