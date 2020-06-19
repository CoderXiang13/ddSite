<template>
  <div class="block">
    <el-carousel height="279px" direction="vertical">
      <el-carousel-item v-for="(item,index) in lists.imglist" :key="index">
        <img :src="item" alt>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  import data from '../../assets/dates/datas'
  export default {
    name: "middleTop-carouse",
    data() {
      return {
        lists: data
      }
    }
  }
</script>

<style scoped>
.block{
  width: 50%;
  position: absolute;
  left: 25%;
  top: 39.5%;
}
img{
  width: 100%;
  height: 100%;
}
</style>
