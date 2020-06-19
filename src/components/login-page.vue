<template>
    <div class="login">
      <el-form label-position="right" :model="ruleForm" label-width="60px" :rules="rules" ref="ruleForm">
        <el-form-item label="登录名" prop="email">
          <el-input v-model="ruleForm.email" clearable="" placeholder="邮箱/昵称"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" clearable placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          没有账号？
          <span @click="closeLogin">
            <router-link to="/register">注册</router-link>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('ruleForm')">登录</el-button>
          <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  export default {
    name: "login-page",
    data() {
      // 验证邮箱定义的规则
      let validateEmail = (rule, value, callback) => {
        let regEmail = /^[1-9]\d{4,9}@qq\.com$/;
        if (regEmail.test(value) === false) {
          callback(new Error('邮箱格式不正确'))
        } else {
          callback()
        }
      };
      // 验证密码定义的规则
      let validatePassWord = (rule, value, callback) => {
        let regName = /^[0-9a-zA-Z]{6,20}$/;
        if (regName.test(value) === false) {
          callback(new Error('密码格式是4-20位数字或字母'))
        } else {
          if (this.ruleForm.checkPassword !== '') {
            this.$refs.ruleForm.validateField('checkPassword');
          }
          callback()
        }
      };
      return {
        ruleForm: {
          email: '',
          password: '',
        },
        rules: {
          // 调用邮箱验证规则
          email: [
            {validator: validateEmail, trigger: 'change'}
          ],
          // 调用密码
          password: [
            {validator: validatePassWord, trigger: 'change'}
          ]
        },
      }
    },
    methods: {
      closeLogin() {
        this.$emit('closeLogin');
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      login(formName) {
        let infos = JSON.parse(localStorage.getItem('infos'));
        let finded = false;
        console.log(infos);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            infos.users.forEach(item => {
              if (item.email === this.ruleForm.email  && item.password === this.ruleForm.password) {
                infos.nowLogin = item;
                localStorage.setItem('infos', JSON.stringify(infos));
                this.$emit('loginSuccess');
                finded = true;  // 用户存在
                this.resetForm('ruleForm')
              } else if (item.email === this.ruleForm.email && item.password !== this.ruleForm.password) {
                this.$message.error('密码或用户名错误，请重新输入！');
                finded = true
              }
            });
            if (finded === false) {
              this.$message.error('用户名不存在！');
              return false;
            }
          } else {
            this.$message.error('表单未完成，请检查后提交');
            return false;
          }
        })
      }
    }
  }
</script>

<style scoped>
.login{
  width: 80%;
}
</style>
