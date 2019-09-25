<template>
  <div class="login_wrap">
    <div id="login">
      <p class="top_wrap">优先速递</p>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="user">
          <el-input class="user" v-model="ruleForm.user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" @click="submitForm(ruleForm)">登录</el-button> -->
          <el-button type="primary" @click="getUserList(ruleForm)">登录</el-button>
          <el-button type="primary" @click="test">测试</el-button>
        </el-form-item>
      </el-form>
      <p class="bottom_wrap">
        <a href>忘记密码了?</a>
      </p>
    </div>
  </div>
</template>
<script>
import {setCookie,getCookie,delCookie} from '../commit/Cookie.js'
export default {
  data() {
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // baseUrl: "http://192.168.50.198",
      ruleForm: {
        pass: "",
        user: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        user: [{ validator: checkUser, trigger: "blur" }]
      }
    };
  },
  methods: {
    test() {
      var token=getCookie();
      console.log(token);
      // var _this = this;
      // this.$axios
      //   .post(this.baseUrl + "", {
          // id: 1,
          // title: "系统管理",
          // component: "shouYe",
          // path: "\/menu",
          // parent: 0,
          // grade: null,
          // sort: 1,
          // path:"Task"
          // permission: 1,
          // status: 1,
          // child: []
          // id:2,
          // title: "用户管理",
          // sort: 2,
          // component:null,
          // id: 17,
          // title: "机器列表",
          // sort: 1,
          // component: "machineList"
          //  id: 4,
          // title: "任务管理",
          //   sort: 4,
          // component: " ",
          //  id: 5,
          // title: "主号管理",
          //   sort: 5,
          // component: " ",
          //  id: 6,
          // title: "好友管理",
          //   sort: 6,
          // component: " ",
        // })
        // .then(function(response) {
        //   console.log(response);
        //   var data=response.data.data;
        //   setCookie(data.token);
        // })
        // .catch(function(error) {
        //   console.log(error);
        // });
    },
    getUserList(ruleForm) {
      delCookie();
      var _this = this;
      this.$post(
         "/index.php/user/login/submit",
          {
            username: ruleForm.user,
            password: ruleForm.pass
          }
        )
        .then(function(response) {
          console.log(response);
          var data=response.data.data;
          setCookie(data.token);
          _this.$router.push("libraryBitmap");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submitForm(formName) {
      if (formName.user == "学生") {
        this.$router.push("student");
      } else if (formName.user == "教师") {
        this.$router.push("teacher");
      } else {
        alert("用户名或密码错误!");
      }
    }
  }
};
</script>
<style scoped>
@import "//at.alicdn.com/t/font_1274766_o0pvcf7vswh.css";
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.login_wrap {
  height: 100vh;
  background-color: rgb(192, 187, 187);
}
#login {
  width: 400px;
  height: 300px;
  /* background-color: blue; */
  position: absolute;
  left: 48%;
  top: 43%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
}
#login .top_wrap {
  margin-bottom: 20px;
  font-size: 50px;
  padding-left: 150px;
  font-weight: 500;
  color: #4092cd;
}
#login form {
  width: 100%;
  height: 42%;
}
#login .el-form-item {
  margin-bottom: 15px;
}
#login div.el-form-item__content {
  width: 300px;
  margin-left: 0px !important;
}
#login .el-input {
  width: 100%;
}

#login label.el-form-item__label {
  /* width: 78px !important; */
  color: #fff !important;
}
#login button {
  width: 100%;
  padding: 10px 0;
  background-color: #4092cd;
}
p.bottom_wrap {
  width: 100%;
}
.bottom_wrap a {
  width: 100%;
  display: inline-block;
  color: #337ab7;
  text-align: right;
}

</style>
<style>
/* 登录input框中设置icon高度 */
.el-icon-loading,
.el-icon-circle-check
{
  line-height: 25px;
}

</style>
