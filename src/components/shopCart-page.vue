<template>
    <div>
      <el-row style="margin-top: 20px;">
        <el-col :span="18" :offset="3">
          <el-card class="box-card">
            <div slot="header">
              <span>根据你选的商品，当当为您推荐</span>
            </div>
            <el-row>
              <el-col :span="12">
                <el-table :header-cell-style="{'display': 'none'}"
                          :data="tableData" style="width:100%;margin-top: 0;"
                          :cell-style="cellStyle">
                  <el-table-column prop="productName" width="200%"></el-table-column>
                  <el-table-column prop="productNewPrice" :formatter="priceFormat"></el-table-column>
                  <el-table-column prop="productOldPrice" :formatter="priceFormat"></el-table-column>
                  <el-table-column align="center">
                    <template slot-scope="scope">
                      <el-button type="success"  icon="el-icon-shopping-cart-2" circle @click.native.prevent="buy(scope.$index, scope.row)"></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col :span="12">
                <template>
                  <el-table :header-cell-style="{'display': 'none'}"
                            :data="tableData2" style="width:100%;margin-top: 0;"
                            :cell-style="cellStyle">
                    <el-table-column prop="productName" width="200%"></el-table-column>
                    <el-table-column prop="productNewPrice" :formatter="priceFormat"></el-table-column>
                    <el-table-column prop="productOldPrice" :formatter="priceFormat"></el-table-column>
                    <el-table-column align="right">
                      <template slot-scope="scope">
                        <el-button type="success" icon="el-icon-shopping-cart-2" circle @click="buy(scope.$index, scope.row)"></el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-col>
            </el-row>
          </el-card>
          <el-divider></el-divider>
          <el-card class="box-card">
            <div slot="header">
              <span>您已经选购以下商品</span>
            </div>
            <el-table @selection-change=" handleSelectionChange"
                      :data="choosetableData" stripe
                      style="width: 100%">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="productName" label="书名" width="200%"></el-table-column>
              <el-table-column prop="productNewPrice" label="市场价" :formatter="priceFormat" align="center"></el-table-column>
              <el-table-column prop="productOldPrice" label="当当价" :formatter="priceFormat" align="center"></el-table-column>
              <el-table-column prop="integral" label="积分" align="center"></el-table-column>
              <el-table-column label="数量" align="center">
                <template slot-scope="scope">
                  <el-input-number size="mini" v-model="scope.row.num" @change="tongbu" :min="1" :max="99"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="right">
                <template slot-scope="scope">
                  <el-button type="danger" icon="el-icon-delete" circle @click.native.prevent="del(scope.$index, scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-divider></el-divider>
          <el-card class="box-card">
            <el-row style="text-align: left">
              <el-col :span="5">
                <el-button @click="clear" type="danger">清空购物车</el-button>
              </el-col>
              <el-col :span="6">
                可节省金额：
                <span> {{total[0] | priceFilter }}</span>
              </el-col>
              <el-col :span="6">
                可获得积分：
                <span> {{total[1]*10 }}</span>
              </el-col>
              <el-col :span="4">
                总计：
                <span> {{total[1] | priceFilter }}</span>
              </el-col>
              <el-col :span="3" style="text-align: right">
                <el-button type="danger" round @click="pay">
                  结算{{ checkList.length }}
                </el-button>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  export default {
    name: "shopCart-page",
    data() {
      return {
        totalMoney: 0,
        totalCount: 0,
        checkList: [], // 选中结算的商品
        tableData: [
          {productName: '《名侦探柯南》', productNewPrice: 32.80, productOldPrice: 18.80},
          {productName: '《复仇者联盟4-终极之战》', productNewPrice: 47.80, productOldPrice: 38.80},
          {productName: '《回村的诱惑》', productNewPrice: 52.80, productOldPrice: 38.80},
          {productName: '《活着》', productNewPrice: 28.80, productOldPrice: 18.80},
        ],
        tableData2: [
          {productName: '《中国地理杂志》', productNewPrice: 43.80, productOldPrice: 30.80},
          {productName: '《web前端入门到放弃》', productNewPrice: 66.80, productOldPrice: 56.80},
          {productName: '《SQL Server 删库跑路》', productNewPrice: 85.80, productOldPrice: 64.80},
          {productName: '《Java常见10000中bug》', productNewPrice: 79.80, productOldPrice: 68.80}
        ],
        choosetableData: [] // 已经加入的商品
      }
    },
    created() {  // 将用户历史购物车同步到页面
        if (this.islogined().islogin) {
        this.choosetableData = this.islogined().obj.shopCart;
          // console.log(this.islogined().obj.shopCart);
        }
    },
    updated() { // 页面挂载完之后
      this.tongbu()
    },
    methods: {
      cellStyle({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 1) {
          return 'color: #ccc;text-decoration: line-through'
        }
        if (columnIndex === 2) {
          return 'color: #13CE66;font-weight: bold'
        }
      },
      islogined() {  // 判断当前是否处于登录状态
        let infos = JSON.parse(localStorage.getItem('infos'));
        if (infos.nowLogin !== '现在所登录的') {
          return { islogin: true, obj: infos.nowLogin}
        } else {
          return { islogin: false}
        }
      },
      priceFormat(row,column,cellValue,index) {  // 格式化价格
        return '￥' + Number(cellValue).toFixed(2)
      },
      buy(index,row) { // 买它
        if (this.islogined().islogin) { // 先登录
          let isAdd = this.choosetableData.find(item => item.productName === row.productName); // 判断 当前书 与 添加购买的书 是否相同
          isAdd ? isAdd.num ++ : this.suc(row);  // 不相同 就再添加
          console.log(this.choosetableData);
        } else {
          this.$message.error('请先进行登录！')
        }
      },
      suc(row) {  // 添加新品书
        this.choosetableData.push({
          productName: row.productName,  // 书名
          productNewPrice: row.productNewPrice,  // 市场价
          productOldPrice: row.productOldPrice,  // 当当价
          integral: (row.productOldPrice)*10,  // 积分
          num : 1
        });
        this.$message({
          message: '加至购物车成功',
          showClose: true,
          type: 'success'
        })
      },
      del(index) {
        this.$confirm('确认删除改条商品？')
          .then(() => {
            try {
              this.choosetableData.splice(index, 1);
              this.$notify({
                  title: '成功',
                  message: '删除商品成功！',
                  type: 'success'
                })
                .catch(() => {

                })
            }
            catch (e) {

            }
          })
      },
      handleSelectionChange(value) {// 勾选
        this.checkList = value;
      },
      clear() {
        if (this.choosetableData.length > 0) {
          this.$confirm('确认删除所有商品？')
            .then(_ => {
              this.choosetableData = [];
              this.$notify({
                title: '成功',
                message: '删除所有商品成功',
                type: 'success'
              })
            })
            .catch(_ => {})
        }
      },
      tongbu() {
        let infos = JSON.parse(localStorage.getItem('infos'));
        infos.nowLogin.shopCart = this.choosetableData;
        infos.users.forEach(item => {
          if (item.email === infos.nowLogin.email) {
            item.shopCart = infos.nowLogin.shopCart;
            // console.log(item.shopCart);
          }
        });
        localStorage.setItem('infos', JSON.stringify(infos))
      },
      pay(){
        const h=this.$createElement;
        this.$msgbox({
          title:"结账信息",
          message:h('p',null,[
            h('span',null,''),
            h('i',{style:'color:teal'},`本次消费共${this.total[1]}元，确定结账吗？`),
          ]),
          showCancelButton:true,
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          beforeClose:(action,instance,done)=>{
            if (action === 'confirm'){
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = "结账中.....";
              setTimeout(()=>{
                done();
                setTimeout(()=>{
                  instance.confirmButtonLoading = false;
                },300);
              },3000);
            }else{
              done();
            }
          }
        }).then(action=>{
          this.$message({
            type:"info",
            message:"已支付，谢谢惠顾，欢迎下次光临"
          });
          this.choosetableData = [];
        });
      },
    },
    computed: {
      total() {
        let save = 0;
        let AllPrice = 0;
        this.checkList.forEach(item => {
          save += (item.productNewPrice - item.productOldPrice) * item.num;
          AllPrice += item.productOldPrice * item.num;
        });
        return [Number(save).toFixed(2), Number(AllPrice).toFixed(2)]
      }
    },
    filters: {
      priceFilter(str) {
        return '￥' + str
      }
    }
  }
</script>

<style scoped>

</style>







