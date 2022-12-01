<template>
<!--  <div class="login-box">
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
    >
      <h2>后台管理系统</h2>
      <el-form-item label="账号：" prop="username">
        <el-input v-model="ruleForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="ruleForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)" class="login-btn"
        >登录</el-button
        >
        <el-button @click="resetForm(ruleFormRef)" class="login-btn">重置</el-button>
      </el-form-item>
    </el-form>
  </div>-->
  <div class="body">
    <div class="dowebok" id="dowebok">
      <div class="form-container sign-up-container">
        <el-form
            ref="signUpFormRef"
            :model="signUpForm"
            status-icon
            :rules="rules"
            class="demo-ruleForm"
        >
          <h1>注册</h1>
          <!--<span>或使用邮箱注册</span>-->
          <el-form-item label="账号：" prop="name">
            <el-input v-model="signUpForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input
                v-model="signUpForm.password"
                type="password"
                autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="signUpForm.email" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="signUpFunc(signUpFormRef)" class="login-btn">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-container sign-in-container">
        <el-form
            ref="loginFormRef"
            :model="loginForm"
            status-icon
            :rules="rules"
            class="demo-ruleForm"
        >
          <h1>登录</h1>
          <!--<span>或使用您的帐号</span>-->
          <el-form-item label="账号：" prop="name">
            <el-input v-model="loginForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input
                v-model="loginForm.password"
                type="password"
                autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loginFunc(loginFormRef)">登录</el-button>
            <el-button type="primary" @click="dialogFormVisible = true">忘记密码</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>已有帐号？</h1>
            <p>请使用您的帐号进行登录</p>
            <button class="ghost" id="signIn" @click="signIn">登录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>没有帐号？</h1>
            <p>立即注册</p>
            <button class="ghost" id="signUp" @click="signup">注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Form -->
  <el-dialog v-model="dialogFormVisible" title="请输入您的邮箱">
    <el-form :model="forgetForm" ref="forgetFormRef" :rules="rules">
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="forgetForm.email" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="forgetFunc(forgetFormRef)">
          发送
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import type {FormInstance, FormRules} from "element-plus";
  import {ElMessage} from "element-plus";
  import {useRouter} from "vue-router";
  import {reactive, ref} from "vue";
  import {login, retrievePwd, signUp} from "@/request/api";
  import {LoginDataInt} from "@/type/login";
  import {SignupDataInt} from "@/type/signup";

  const $router = useRouter()
  const dialogFormVisible = ref(false)
  const formLabelWidth = '120px'
  const signUpFormRef = ref<FormInstance>()
  const loginFormRef = ref<FormInstance>()
  const forgetFormRef = ref<FormInstance>()

  const signUpForm = reactive<SignupDataInt>({
    name: '',
    password: '',
    email: ''
  })

  const loginForm = reactive<LoginDataInt>({
    name: '',
    password: ''
  })

  const forgetForm = reactive({
    email: ''
  })

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

  const signUpFunc = async (formEI: FormInstance | undefined) => {
    ElMessage('正在注册账号，请稍等！')
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

  const loginFunc = async (formEI: FormInstance | undefined) => {
    if (!formEI) return
    await formEI.validate(async (valid, fields) => {
      if (valid) {
        try {
          const {data: res} = await login(loginForm)
          console.log(res.data)
          localStorage.setItem('token', res.data)
          $router.push('/')
        } catch (e) {
          ElMessage({
            message: '服务器正忙，请稍后重试！',
            type: 'error'
          })
        }
      } else {
        console.log('error submit！', fields)
      }
    })
  }

  const forgetFunc = async (formEl: FormInstance | undefined) => {
    dialogFormVisible.value = false
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        try {
          const {data: res} = await retrievePwd(forgetForm.email)
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
    forgetFormRef
  }

  /*const resetForm = (formEI: FormInstance | undefined) => {
    if (!formEI) return
    formEI.resetFields()
  }*/

  const signup = () => {
    let container = document.getElementById('dowebok')
    container!.classList.add('right-panel-active')
  }

  const signIn = () => {
    let container = document.getElementById('dowebok')
    container!.classList.remove('right-panel-active')
  }

</script>

<style scoped>
* {
  box-sizing: border-box;
}

.body {
  background: #f6f5f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: -20px 0 50px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

p {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: .5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

.dowebok {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container form {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding:  0 50px;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #ddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

.social-container a:hover {
  background-color: #eee;
}

.form-container input {
  background: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  outline: none;
}

button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background: #ff4b2b;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
}

button:active {
  transform: scale(.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background: transparent;
  border-color: #fff;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all .6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  width: 50%;
  z-index: 1;
  opacity: 0;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform .6s ease-in-out;
  z-index: 100;
}

.overlay {
  background: #ff416c;
  background: linear-gradient(to right, #ff4b2b, #ff416c) no-repeat 0 0 / cover;
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateY(0);
  transition: transform .6s ease-in-out;
}

.overlay-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  height: 100%;
  width: 50%;
  text-align: center;
  transform: translateY(0);
  transition: transform .6s ease-in-out;
}

.overlay-right {
  right: 0;
  transform: translateY(0);
}

.overlay-left {
  transform: translateY(-20%);
}

/* Move signin to right */
.dowebok.right-panel-active .sign-in-container {
  transform: translateY(100%);
}

/* Move overlay to left */
.dowebok.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

/* Bring signup over signin */
.dowebok.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
}

/* Move overlay back to right */
.dowebok.right-panel-active .overlay {
  transform: translateX(50%);
}

/* Bring back the text to center */
.dowebok.right-panel-active .overlay-left {
  transform: translateY(0);
}

/* Same effect for right */
.dowebok.right-panel-active .overlay-right {
  transform: translateY(20%);
}

.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
