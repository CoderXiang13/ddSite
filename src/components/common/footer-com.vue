<template>
    <div class="footer">
      <el-row type="flex" justify="center">
          <ul>
            <li v-for="(item, index) in lists" :key="index">
              <el-link href="#">{{item}}</el-link>
            </li>
          </ul>
      </el-row>
      <el-row type="flex" justify="center">
        <p>
          Copyright (C) 当当网 2004-2017，All Rights Reserved
          <img src="../../assets/copyright.gif" alt>
          京ICP证041189好出版物经营许可证 心出发京批字第直0673号
        </p>

      </el-row>
    </div>
</template>

<script>
  export default {
    name: "footer-com",
    data() {
      return {
        lists: ['公司简介', '诚聘英才', '网站联盟', '当当招商', '机构销售', '手机当当', '官方Blog', '热词搜索']
      }
    }
  }
</script>

<style scoped>
.footer{
  position: relative;
  left: 0;
  right: 0;
  bottom: 0
}
ul{
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  width: 50%;
}
  li{
    width: 32%;
    line-height: 39px;
    flex: 1;
    text-align: center;
  }
  a{
    text-decoration-line: none;
  }
</style>
