<template>
    <div class="left-collapse">
      <div class="title">
        <i class="el-icon-notebook-2"></i>
        图书分类
      </div>
      <el-collapse accordion>
        <el-collapse-item v-for="(item,index) in lists.navs" :key="index" :title="item.title" class="collapse-item">
          <span v-for="(value, key) in item.list" :key="key">{{value}}</span>
        </el-collapse-item>
      </el-collapse>
    </div>
</template>

<script>
  import data from '../../assets/dates/datas'
  export default {
    name: "left-collapse",
    data() {
      return {
        lists: data
      }
    }
  }
</script>

<style scoped>
.left-collapse{
  width: 15%;
  position: relative;
  left: 9%;
  top: 10px;
  border-left: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;

}
.title{
  background: rgb(72,122,111);
  color: white;
  line-height: 45px;
  padding-left: 15px;
  box-sizing: border-box;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  overflow: hidden;
}
.collapse-item{
  padding-left: 15px;
}
.collapse-item span{
  width: 30%;
  display: inline-block;
  text-align: center;
}
</style>
