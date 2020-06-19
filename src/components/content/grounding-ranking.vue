<template>
  <div class="rightBottom-collapse">
    <div class="title">
      <i class="el-icon-medal"></i>
      新书热卖榜
    </div>
    <el-tabs v-model="activeShow" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in lists.goods"
                   :key="index"
                   :label="item.label"
      >
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item v-for="(value, key) in item.list" class="collapse-item"
                            :key="key"
                            :title="value.bookname" :name="key">
            <img :src="value.bookimg" alt>
            <span class="bookname">{{value.bookname}}</span>
            <span class="newPrice bookname">￥{{value.ddprice}}</span>
            <del class="oldPrice bookname">￥{{value.price}}</del>
            <span class="discuss bookname">{{value.pinnum}}条评论</span>

          </el-collapse-item>
        </el-collapse>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import data from '../../assets/dates/datas'
  export default {
    name: "grounding-ranking",
    data() {
      return {
        lists: data,
        activeShow: 0,
        activeName: null
      }
    },
    methods: {
      handleClick(tab, e) {
        console.log(e);
      }
    }
  }
</script>

<style scoped>
  .rightBottom-collapse{
    top: 146.5%;
    width: 17%;
    position: absolute;
    right: 7%;
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
    position: relative;
  }
  .collapse-item img{
    width: 108px;
    height: 108px;
  }
  .collapse-item .bookname{
    position: absolute;
    top: 30%;
    width: 100px;
    text-align: left;
  }
  .collapse-item .newPrice{
    color: #dd6192;
    top: 45%;
  }
  .collapse-item .oldPrice{
    color: #aaa;
    top: 58%;
  }
  .collapse-item  .discuss{
    color: #42b983;
    top: 68%;
  }
  .rankingNum{
    font-size: 20px;
    font-weight: bold;
    color: #dd6192;
    position: absolute;
    left: -23px;
    top: 8px;
    z-index: 99;
  }
  .collapse-item span{
    width: 30%;
    display: inline-block;
    text-align: center;
  }
</style>
