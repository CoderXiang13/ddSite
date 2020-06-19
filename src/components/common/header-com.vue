<template>
    <div class="header">
      <el-row type="flex" justify="center">
        <el-col :span="13">
          <ul class="left-nav">
            <li>您好！欢迎来到当当网</li>
            <li v-for="(item, index) in lists.left"
                :key="index"
                :class="{active: item.isActive}"
                @click="toggle(item)">
              <i class="el-icon-s-home" v-if="item.name === '首页'"></i>
              <router-link :to="item.path">{{ item.name }}</router-link>
            </li>
            <li>
              <el-input v-model="input" placeholder="请输入内容" size="small">
                <el-button icon="el-icon-search" slot="append"></el-button>
              </el-input>
            </li>
          </ul>
        </el-col>
        <el-col :span="5">
          <ul class="right-nav">
            <li v-for="(item, index) in lists.right"
                :key="index"
                :class="{active: item.isActive}"
                @click="toggle(item)">
              <i class="el-icon-shopping-cart-2" v-if="item.name === '购物车'"></i>
              <i class="el-icon-user-solid" v-if="item.name === '登录'"></i>
              <i class="el-icon-circle-plus" v-if="item.name === '注册'"></i>
              <router-link :to="item.path">{{ item.name }}</router-link>
            </li>
          </ul>
        </el-col>
      </el-row>
      <el-dialog title="用户登录" :visible.sync="dialogFormVisible" center width="25%">
        <login-page @closeLogin="closeLogin" @loginSuccess="successLogin"/>
      </el-dialog>
    </div>
</template>

<script>
  import loginPage from '@/components/login-page'
  export default {
    name: "header-com",
    components: { loginPage },
    data() {
      return {
        input: '',
        currentIndex: 0,
        dialogFormVisible: false,
        lists: {
          left: [
            {name: '首页', path: '/home', isActive: true},
            {name: '我的当当', path: '/home', isActive: false}
          ],
          right: [
            {name: '购物车',path: '/shopCart', isActive: false},
            {name: '登录',path: '/login111', isActive: false, type: 'unLogin'},
            {name: '注册',path: '/register', isActive: false},
          ]
        }
      }
    },
    // mounted:function () {
    //   let  _this=this;
    //   this.lists.left.map(function (item) {
    //     _this.$set(item, 'isActive', false);
    //   });
    //   this.lists.right.map(function (item) {
    //     _this.$set(item, 'isActive', false);
    //   })
    // },
    methods: {
      toggle(item) {
        if (item.name === '登录') {
          this.dialogFormVisible = true;
        } else if (item.type === 'login') {
          this.$confirm('确认退出登录？')
            .then(() => {
              let infos = JSON.parse(localStorage.getItem('infos'));
              infos.nowLogin = '现在所登录的';
              localStorage.setItem('infos', JSON.stringify(infos));
              this.toggle(this.lists.left[0]);
              this.find();
              this.$notify({
                title: '成功',
                message: '已经安全退出！',
                type: 'success'
              })
            })
        } else {
          this.lists.left.forEach(item => {
            item.isActive = false
          });
          this.lists.right.forEach(item => {
            item.isActive = false
          });
          item.isActive = true
        }
      },
      closeLogin() {
        this.dialogFormVisible = false;
        this.toggle(this.lists.right[2])
      },
      successLogin() {
        this.dialogFormVisible = false;
        this.toggle(this.lists.left[0]);
        this.find()
      },
      find() {
        let infos = JSON.parse(localStorage.getItem('infos'));
        if (infos.nowLogin !== '现在所登录的') {
          this.lists.right[1].name = infos.nowLogin.username;
          this.lists.right[1].type = 'login';
          this.$message.success('登录成功！')
        } else {
          this.lists.right[1].name = '登录';
          this.lists.right[1].type = 'unLogin';
        }
      }
    }
  }
</script>

<style scoped>
  .header{
    border-bottom: .5px solid #e3e3e3;
  }
ul{
  margin: 0;
  padding: 0;
}
li{
  list-style: none;
  display: inline-block;
  padding: 0 15px;
  line-height: 49px;
}
a{
   text-decoration-line: none;
   color: black;
 }
.right-nav{
  float: right;
}
.active{
  color: #13ce66;
  border-bottom: 2px solid #13ce66;
}
.active a{
  color: #13ce66;
}
</style>
