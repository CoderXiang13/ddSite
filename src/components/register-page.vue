<template>
  <div class="register">
    <el-row>
      <el-col :span="18" :offset="3">
        <el-card style="background-color: #fefaee;">
          <el-steps :active="active" simple finish-status="success">
            <el-step title="填写注册信息" icon="el-icon-edit"></el-step>
            <el-step title="邮箱注册" icon="el-icon-message"></el-step>
            <el-step title="完成注册" icon="el-icon-check"></el-step>
          </el-steps>
        </el-card>
        <div>
          <el-row style="margin-top: 30px;">
            <el-col :span="18" :offset="3">
              <el-card>
                <div slot="header">
                  <h3>HI,欢迎注册当当网！尽享多重优惠服务</h3>
                  <p style="margin-top: 15px;color: palegreen">您的资料不会作为其他用途，敬请放心填写</p>
                </div>
                <div v-if="active === 0">
                  <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-width="100px" label-position="right">
                    <el-form-item label="Email地 址：" prop="email">
                      <el-input placeholder="请输入邮箱" v-model="ruleForm.email" style="width: 40%;" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="设 置 昵 称：" prop="username">
                      <el-input placeholder="请输入昵称" v-model="ruleForm.username" style="width: 40%;" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="设 置 密 码：" prop="email">
                      <el-input placeholder="请输入密码" v-model="ruleForm.password" style="width: 40%;" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="确 认 密 码：" prop="checkPassword">
                      <el-input placeholder="请再次输入密码" v-model="ruleForm.checkPassword" style="width: 40%;" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="性 别：">
                      <el-radio-group v-model="ruleForm.sex">
                        <el-radio-button label="男"></el-radio-button>
                        <el-radio-button label="女"></el-radio-button>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="所 在 地 区：">
                      <el-cascader v-model="value" :options="options" placeholder="请选择地区"></el-cascader>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="submitForm('ruleForm')">提交注册</el-button>
                      <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                  </el-form>
                </div>
                <div v-if="active === 1">
                  <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-width="100px" label-position="right">
                    <el-form-item label="您 的 邮 箱：">
                      <el-input v-model="ruleForm.email" :disable="true" style="width: 40%;" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="填写验证码：" prop="email">
                      <el-input placeholder="请输入验证码" v-model="ins" style="width: 45%;" clearable>
                        <el-button :disabled="status" size="small" slot="append" @click="getCode">
                          <span v-show="code === ''">获取验证码</span>
                          <span v-show="code !== ''">重新获取</span>
                          <span v-show="code !== '' && codeTime !== 0" style="color: red">{{ codeTime }}</span>
                        </el-button>
                      </el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="success" @click="next" :disabled="ins === ''">下一步</el-button>
                    </el-form-item>
                  </el-form>
                </div>
                <div v-if="active === 2">
                  注册成功！{{ linkTime }} 秒后跳至
                  <router-link to="/home">首页</router-link>(快速跳转)
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import data from '../assets/dates/country-data'
export default {
  name: "register-page",
  data() {
    // 邮箱规则
    let validateEmail = (rule, value, callback)  =>   {
      let regEmail = /^[1-9]\d{4,9}@qq\.com$/;
      if (regEmail.test(value) === false) {
        callback(new Error('邮箱格式不正确！'))
      } else{
        callback()
      }
    };
    let validateName = (rule, value, callback)  =>   {
      let regName = /^[0-9\w]{4,20}$/;
      if (regName.test(value) === false) {
        callback(new Error('昵称必须是4-20位数字或字母！'))
      } else{
        callback()
      }
    };
    let validatePassword = (rule, value, callback)  =>   {
      let regPwd = /^[0-9a-zA-Z]{6,20}$/;
      if (regPwd.test(value) === false) {
        callback(new Error('密码格式是4-20位数字或字母！'))
      } else{
        if (this.ruleForm.checkPassword !== '') {
          this.$refs.ruleForm.validateField('checkPassword')
        }
        callback()
      }
    };
    let validateCheckPassword = (rule, value, callback)  =>   {
      if (value === '') {
        callback(new Error('请再次输入密码！'))
      } else if (value !== this.ruleForm.password){
        callback(new Error('两次密码输入不正确！'))
      } else {
        callback()
      }
    };
    return {
      active: 0,
      ins: '',
      status: false,
      code: '',
      codeTime: 60,
      linkTime: 5,
      ruleForm: {
        email: '',
        username: '',
        password: '',
        checkPassword: '',
        sex: '男'
      },
      rules: { // 调用规则
       email: [{validator: validateEmail, trigger: 'change'}],
       username: [{validator: validateName, trigger: 'change'}],
       password: [{validator: validatePassword, trigger: 'change'}],
       checkPassword: [{validator: validateCheckPassword, trigger: 'change'}]
      },
      value: [],
      options: data
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let infos = JSON.parse(localStorage.getItem('infos'));
          let have = infos.users.find(item => item.email === this.ruleForm.email);
          if (have) {
            this.$message.error('邮箱已经被注册！');
            return false
          } else {
            if (this.active ++ > 2) this.active = 0;
            let userInfo = {
              email: this.ruleForm.email,
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              sex: this.ruleForm.sex,
              shopCart: []
            };
            infos.users.push(userInfo);
            // console.log(infos.users);
            localStorage.setItem('infos', JSON.stringify(infos))
          }
        } else {
          this.$message.error('表单未完成，请检查后在提交！！！');
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getCode() {
      this.codeTime = 60;
      this.code = Math.random().toFixed(6).slice(-6);
      this.$notify.info({
        title: '你有一条新消息',
        dangerouslyUseHTMLString: true,
        message: `【当当】你的注册验证码为${ this.code }，请勿泄露注册验证码。`,
        duration: 10000
      });
      setInterval(() => {
        this.codeTime = this.codeTime ? this.codeTime -1 : 0;
        this.status = this.codeTime === 0 ? false : true
      },1000)
    },
    next() {
      if (this.ins === this.code && this.ins !== '') {
        if (this.active ++ > 2) this.active = 0;
        let time = setInterval(() => {
          this.linkTime --;
          if (this.linkTime === 0) {
            try {
              this.router.push({path: '/home'});
              clearInterval(time)
            } catch (e) {
              // console.log(e);
            }

          }
        },1000)
      } else {
        this.$message.error('验证码有误！')
      }
    }
  },
  destroyed() {
    clearInterval(this.time)
  }

}
</script>

<style scoped>


</style>
