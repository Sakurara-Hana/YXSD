<template>
  <div id="stu">
    <header>
      <div class="logo">UUCH管理</div>
      <div class="header_content">
        <div class="hnav_wrap">
          <el-menu
            default-active="wayBillToday"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            text-color="#8C8E8E"
            active-text-color="#fff"
            router="true"
          >
            <!-- background-color="#4194cd" 导航背景色-->
            <el-submenu index="1">
              <template slot="title">国际运单管理</template>
              <el-menu-item index="wayBillToday">今日运单</el-menu-item>
              <el-menu-item index="allWaybill">所有运单</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
                <el-menu-item index="1-4-2">选项2</el-menu-item>
                <el-menu-item index="1-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2" @click="getStudentList">上门取件管理</el-menu-item>
            <el-submenu index="3">
              <template slot="title">仓库管理</template>
              <el-menu-item index="submitItemInfo">提交物品信息</el-menu-item>
              <el-menu-item index="toPayParcels">到付包裹查询</el-menu-item>
              <el-menu-item index="libraryBitmap">库位图</el-menu-item>
              <el-menu-item index="predictionTable">所有预报</el-menu-item>
              <el-menu-item index="specialPackage">特殊包裹</el-menu-item>
              <el-menu-item index="storageRecord">入库记录</el-menu-item>
              <el-menu-item index="problemPackage">问题包裹</el-menu-item>
              <el-submenu index="3-4">
                <template slot="title">选项4</template>
                <el-menu-item index="3-4-1">选项1</el-menu-item>
                <el-menu-item index="3-4-2">选项2</el-menu-item>
                <el-menu-item index="3-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="historicalRecord">退换货管理</el-menu-item>
            <el-menu-item index="rechargeTable">跨国支付服务</el-menu-item>
            <el-menu-item index="6" @click="getTeacherList">会员管理</el-menu-item>
            <el-menu-item index="7" @click="getAdminList">代购管理</el-menu-item>
            <el-menu-item index="8" @click="getAdminList">个人管理</el-menu-item>
            <el-menu-item index="9" @click="getAdminList">活动管理</el-menu-item>
            <el-menu-item index="10" @click="getAdminList">系统设置</el-menu-item>
          </el-menu>
        </div>
        <div class="hnav_right">
          <ul>
            <li>姓名</li>
            <li>|</li>
            <li>个人设置</li>
            <li>|</li>
            <li>退出管理</li>
          </ul>
        </div>
      </div>
    </header>
    <section class="se_wrap">
      <nav>
        <!-- :default-openeds="['2']" -->
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <!-- :router="true"   -->
          <left-menu @getBarName="getBar" :leftMenus="userList"></left-menu>
        </el-menu>
      </nav>
      <article>
        <!-- 组件，表格部分 -->
        <router-view class="table_wrap"></router-view>
      </article>
    </section>
  </div>
</template>
<script>
import {setCookie,getCookie,delCookie} from '../../commit/Cookie.js'
import LeftMenu from "../leftComp/leftMenu";
export default {
  created() {
    console.log(getCookie()); 
    //var _this = this;
    // this.$post("/index.php/user/info/getUserInfoBySession")
    //   .then(function(response) {
    //     console.log(response);
    //     console.log('00000');
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
    /* eslint-disable */
    this.$axios({
      methods:'get',
      url:'http://192.168.50.198/index.php/user/info/getUserInfoBySession',
      headers:{
        'token':getCookie()
      }
    }).then((res)=>{
      console.log(res)
    });
  },
  mounted() {},
  data() {
    return {
      small_bar: [],
      currentSelectBtn: "course",
      course: "课表",
      activeIndex: "1",
      activeIndex2: "1",
      userList: [],
    };
  },
  name: "app",
  components: {
    LeftMenu
  },
  computed: {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getStudentList() {
      this.tableData = this.studentList;
    },
    getTeacherList() {
      this.tableData = this.teacherList;
    },
    getAdminList() {
      this.tableData = this.adminList;
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
html,
body {
  /* overflow-y: hidden; */
  height: 100vh;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  height: 100%;
  box-sizing: border-box;
}
/* 头部部分------------------------------------ */
header {
  width: 100%;
  display: flex;
  height: 64px;
  background-color: #4194cd;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 5px;
  align-items: center;
  color: aliceblue;
  border-bottom: 2px solid #155aa2;
  position: absolute;
}
/* LOGO区域 */
div.logo {
  width: 12%;
  font-size: 32px;
  color: #dde5ed;
}
header div.header_content {
  height: 35px;
  width: 86%;
  display: flex;
  justify-content: space-between;
  margin-bottom: -26px;
}
/* 头部导航和操作区域 */
header div.header_content div.hnav_wrap {
  height: 100%;
}
header div.header_content div.hnav_wrap ul {
  height: 100%;
}
header div.header_content div.hnav_wrap ul li.el-menu-item {
  padding: 0 10px;
  height: 100%;
  line-height: 35px;
  background-color: #eff5fb;
  /* margin: 0 5px; */
  /* border-left: 1px solid #000;
  border-right: 1px solid #000; */
}
header div.header_content div.hnav_wrap ul li.el-submenu {
  height: 35px;
  background-color: #eff5fb;
}
/* 头部操作区域*/
header div.header_content div.hnav_right ul {
  display: flex;
  padding-right: 10px;
  font-size: 14px;
}
header div.header_content div.hnav_right ul li {
  /* background-color: seagreen; */
  margin: 0 4px;
  cursor: pointer;
}

/* 头部区域结束-------------------------------------------*/
.se_wrap {
  top: 64px;
  height: calc(100vh - 64px);
  width: 100%;
  display: flex;
  position: absolute;
  padding: 0;
  margin: 0;
}
.se_wrap nav {
  width: 13%;
  height: 100%;
  bottom: 0;
  left: 0;
}
article {
  height: 100%;
  width: 86%;
  flex: 1;
  /* background-color:red; */
  padding: 4px;
  position: relative;
  overflow-x: hidden;
  /* overflow-y: hidden; */
  box-sizing: border-box;
}
a {
  text-decoration: none;
  font-size: 15px;
  color: #fff;
}
</style>
<style >
header div.header_content div.hnav_wrap ul li.el-submenu div.el-submenu__title {
  height: 35px;
  line-height: 35px;
}

header
  div.header_content
  div.hnav_wrap
  ul.el-menu--horizontal
  > .el-menu-item.is-active {
  background-color: #306eae;
  color: #fff;
}
/* 二级菜单导航选中样式 */
header  div.header_content div.hnav_wrap ul.el-menu--horizontal>.el-submenu.is-active,/* 二级菜单导航选中样式 */
 .el-menu--horizontal .el-menu .el-menu-item.is-active, /* 二级菜单导航中每一项的样式 */
 .el-menu--horizontal .el-menu .el-submenu.is-active .el-submenu__title /* 二级菜单中嵌套的二级菜单导航选中样式 */
 {
  background-color: #306eae;
}
</style>