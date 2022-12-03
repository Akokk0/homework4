<template>
  <el-button type="primary" @click="addFormVisible = true">添加用户</el-button>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="Code" width="220">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.code }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Id" width="60">
      <template #default="scope">
        <el-tag>{{ scope.row.id }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="Name" width="100">
      <template #default="scope">
        <el-tag>{{ scope.row.name }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="Email" width="200">
      <template #default="scope">
        <el-tag>{{ scope.row.email }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="Password" width="150">
      <template #default="scope">
        <el-tag>{{ scope.row.password }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="Verify" width="80">
      <template #default="scope">
        <el-tag>{{ scope.row.verify }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
        >Edit</el-button
        >
        <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
        >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <!-- Form -->
  <el-dialog v-model="addFormVisible" title="AddUser">
    <el-form :model="addForm" ref="addFormRef" :rules="addRules">
      <el-form-item label="Email" prop="email" :label-width="120">
        <el-input v-model="addForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Account" prop="name" :label-width="120">
        <el-input v-model="addForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Password" prop="password" :label-width="120">
        <el-input v-model="addForm.password" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addFunc(addFormRef)">
          Add
        </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- Form -->
  <el-dialog v-model="editFormVisible" title="请输入您要修改的值">
    <el-form :model="editForm" ref="editFormRef" :rules="editRules">
      <el-form-item label="邮箱" prop="email" :label-width="120">
        <el-input v-model="editForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="账号" prop="name" :label-width="120">
        <el-input v-model="editForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="120">
        <el-input v-model="editForm.password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证" prop="verify" :label-width="120">
        <el-switch
            v-model="editForm.verify"
            class="ml-2"
            :active-value=1
            :inactive-value=0
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="editFunc(editFormRef)">
          Add
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { Timer } from '@element-plus/icons-vue'
  import {AddUser, EditUser, User} from "@/type/user";
  import {addUser, deleteUser, editUser, getAllUser} from "@/request/api";
  import {computed, reactive, ref} from "vue";
  import {ElMessage, FormInstance, FormRules} from "element-plus";

  let originData: User[] = []
  const tableData = ref<User[]>([])

  const addFormVisible = ref(false)
  const editFormVisible = ref(false)

  const addFormRef = ref<FormInstance>()
  const editFormRef = ref<FormInstance>()

  const addForm = reactive<AddUser>({
    email: "", name: "", password: ""
  })

  const editForm = reactive<EditUser>({
    id: -1, email: "", name: "", password: "", verify: 0
  })

  const addRules: FormRules = {
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

  const editRules: FormRules = {
    name: [
      { min: 3, max: 10, message: '账号的长度在3到10之间', trigger: 'blur' },
    ],
    password: [
      { min: 3, max: 10, message: '密码的长度在3到10之间', trigger: 'blur' },
    ],
    email: [
      { type: 'email', message: '邮箱格式错误', trigger: 'change' }
    ]
  }

  const initData = async () => {
    const {data: res} = await getAllUser()
    originData = res.data
    tableData.value = originData
  }
  initData()

  const handleEdit = (index: number, row: User) => {
    editForm.id = row.id
    editForm.password = row.password
    editForm.name = row.name
    editForm.email = row.email
    editForm.verify = row.verify
    editFormVisible.value = true
  }

  const editFunc = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        try {
          const {data: res} = await editUser(editForm)
          if (res.flag) {
            ElMessage({
              message: res.message,
              type: 'success'
            })
            initData()
            editFormVisible.value = false
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

  const handleDelete = async (index: number, row: User) => {
    ElMessage({
      message: '正在删除用户，请稍等！',
      type: 'info'
    })
    try {
      const {data: res} = await deleteUser(row.id)
      if (res.flag) {
        ElMessage({
          message: '删除用户成功！',
          type: 'success'
        })
        initData()
      } else {
        ElMessage({
          message: '删除用户失败！',
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

  const addFunc = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        ElMessage({
          message: '正在添加用户，请稍等！',
          type: "info"
        })
        try {
          const {data: res} = await addUser(addForm)
          if (res.flag) {
            ElMessage({
              message: res.message,
              type: 'success'
            })
            initData()
            addFormVisible.value = false
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
