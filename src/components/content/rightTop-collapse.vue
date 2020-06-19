<template>
  <div class="right-collapse">
    <div class="title">
      <i class="el-icon-notebook-1"></i>
      书讯快递
    </div>
    <el-collapse accordion>
      <el-collapse-item v-for="(item,index) in lists" :key="index" :title="item.name" class="collapse-item">
        <span v-for="(value, key) in item.listsItem" :key="key">{{value}}</span>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  export default {
    name: "rightTop-collapse",
    data() {
      return {
        lists: [
          {name: '2019年孩子最喜欢的书',listsItem: ["童书","文艺","经管励志","科技","教育"]},
          {name: '计算机新书畅销书75折抢购',listsItem: ["青春文学","动漫/幽默"]},
          {name: '弗洛伊德作品瑾选集59折',listsItem: ["艺术的故事"]},
          {name: '权威订本四大名著',listsItem: ["红楼梦","三国演义","水浒传","西游记"]},
          {name: '2010年法律硕士联考大纲75...',listsItem: ["人生哲学","心灵与修养","性格与习惯","智商/智谋","情商/情绪管理"]}
        ]
      }
    }
  }
</script>

<style scoped>
.right-collapse{
  width: 16%;
  position: absolute;
  right: 8%;
  top: 39.5%;
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
