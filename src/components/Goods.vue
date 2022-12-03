<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="selectData.title" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="selectData.introduce" placeholder="请输入关键字"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="showList" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="introduce" label="详情" />
    </el-table>
    <el-pagination layout="prev, pager, next" :total="selectData.count"
                   @current-change="currentChange" @size-change="sizeChange" />
  </div>
</template>

<script lang="ts" setup>
  import {getGoodsList} from "@/request/api";
  import {computed, reactive, ref, watch} from "vue";
  import {GoodsListInt, SelectDataInt} from "@/type/goods";

  const showList = computed(() => {
    return goodsList.value.slice((selectData.page - 1) * selectData.pageSize,
        selectData.page * selectData.pageSize)
  })

  const selectData = reactive<SelectDataInt>({
    count: 0, introduce: "", page: 1, pageSize: 10, title: ""
  })

  let originList: GoodsListInt[] = []
  const goodsList = ref<GoodsListInt[]>([])

  const initGoodsList = async () => {
    const {data: res} = await getGoodsList()
    originList = res
    goodsList.value = originList
    selectData.count = res.length
  }

  const onSubmit = () => {
    let queryList: GoodsListInt[] = []
    if (!selectData.title && !selectData.introduce) {
      queryList = originList
    } else {
      if (selectData.title) {
        queryList = originList.filter((value) => {
          return value.title.indexOf(selectData.title) !== -1
        })
      }
      if (selectData.introduce) {
        queryList = (selectData.title ? queryList : originList).filter((value) => {
          return value.introduce.indexOf(selectData.introduce) !== -1
        })
      }
    }
    goodsList.value = queryList
    selectData.count = queryList.length
  }

  const currentChange = (page: number) => {
    selectData.page = page
  }

  const sizeChange = (pageSize: number) => {
    selectData.pageSize = pageSize
  }

  watch([() => selectData.title, () => selectData.introduce], () => {
    if (!selectData.title && !selectData.introduce) initGoodsList()
  })

  //生命周期 beforeCreated Created
  initGoodsList()

</script>

<style scoped>

</style>
