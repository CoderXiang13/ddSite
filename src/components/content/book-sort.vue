<template>
    <div class="book-sort">
      <el-tabs type="border-card">
        <el-tab-pane v-for="(item,index) in lists.tabs"
                     :label="item.label"
                     :key="index">
          <ul class="tabs-item">
            <li v-for="(value, key) in item.list" :key="key">
              <img :src="value.bookimg" alt>
              <p>{{value.productName}}</p>
              <p>{{value.author}}</p>
              <span class="newPrice">￥{{value.productNewPrice}}</span>
              <del>￥{{value.productOldPrice}}</del>
              <el-button type="success" icon="el-icon-plus" circle class="btn"></el-button>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import data from '../../assets/dates/datas'
  export default {
    name: "book-sort",
    data() {
      return {
        lists: data,
      }
    }

  }
</script>

<style scoped>
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
  }
  li{
    width: 179px;
    height: 225px;
    margin: 15px 10px;
  }
  li img{
    width: 100%;
  }
.book-sort{
  width: 50%;
  position: absolute;
  left: 25%;
  top: 69%;
}
  .newPrice{
    color: red;
  }
  del{
    color: #aaa;
  }
  .btn{
    position: relative;
    left: 46px;
    top: -12px;
  }
</style>
