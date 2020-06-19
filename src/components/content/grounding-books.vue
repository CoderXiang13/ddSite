<template>
  <div class="grounding-books">
    <div class="title">
      <i class="el-icon-notebook-2"></i>
      新书上架
    </div>
    <div class="block">
      <el-carousel height="550px" indicator-position="outside">
        <el-carousel-item v-for="(item,index) in lists.carous" :key="index">
          <ul>
            <li v-for="(value,key) in item.list" :key="key">
              <img :src="value.bookimg" alt>
              <p>{{value.bookname}}</p>
              <p>{{value.author}}</p>
              <span class="newPrice">￥{{value.price}}</span>
              <del>￥{{value.ddprice}}</del>
            </li>
          </ul>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  import data from '../../assets/dates/datas'
  export default {
    name: "grounding-books",
    data() {
      return {
        lists: data
      }
    }
  }
</script>

<style scoped>
.grounding-books{
  width: 65.5%;
  height: 620px;
  position: relative;
  left: 9%;
  border: 1px solid #e8e8e8;
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
ul{
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}
li{
  width: 159px;
  height: 205px;
  margin:10px;
}
li img{
  width: 100%;
}
.newPrice{
  color: red;
}
del{
  color: #aaa;
}
</style>
