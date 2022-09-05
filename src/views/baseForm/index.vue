<template>
  <div class="form_wrapper">
    <Title />
    <div class="container">
      <div class="explain">基础表单，包含表单验证，点击提交可以添加到基础表格页面。</div>
      <div class="form_container">
        <el-form label-width="120px" ref="formRef" :model="form" :rules="rules">
          <el-form-item label="用户名" prop="name">
              <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="余额" prop="money">
              <el-input v-model.number="form.money"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
              <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-switch v-model="form.state" />
          </el-form-item>
          <el-form-item label="活动名称">
            <el-input v-model="form.aname"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type='primary' @click="submitForm(formRef)">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { sumbitFormData } from '@/api/api.js'
const formRef = ref()
const form = reactive({
  name: '',
  money: 0,
  address: '',
  state: false
})
const rules = reactive({
  name: [{ required: true, message: '请填写名字', trigger: 'blur' }],
  money: [{ required: true, message: '请填写金额', trigger: 'blur' }],
  address: [{ required: true, message: '请填写地址', trigger: 'blur' }]
})
const submitForm = async (formRef) => {
  if (!formRef) {
    return null
  }
  await formRef.validate((valid, fields) => {
    if (valid) {
      sumbitData()
    } else {
      ElMessage.error('提交失败！')
      console.log('提交失败！', fields)
    }
  })
}

const sumbitData = async () => {
  try {
    const data = form
    const res = await sumbitFormData(data)
    if (res.success) {
      ElMessage.success('提交成功！')
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="stylus" scoped>
.form_wrapper
  width 100%
  .form_container
    width 30%
    // margin 0 auto
</style>
