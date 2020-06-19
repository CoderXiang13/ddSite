<template>
  <div class="block">
    <el-carousel height="315px">
      <el-carousel-item v-for="(item,index) in lists.banner" :key="index">
        <img :src="item" alt>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  import data from '../../assets/dates/datas'
  export default {
    name: "banner-carousel",
    data() {
      return {
        lists: data
      }
    }
  }
</script>

<style scoped>
.block{
  width: 100%;
  margin-top: 10px;
}
img {
  width: 100%;
  height: 315px;
  background-size: cover;
}
</style>
