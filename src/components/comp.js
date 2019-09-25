import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import teaCourse from "./teaCom/teaCourse.vue"
import teaInfo from "./teaCom/teaInfo.vue"
import teaVideo from "./teaCom/teaVideo.vue"
import teacher from "./teaCom/teacher.vue"

import HelloWorld from "./stuCom/HelloWorld.vue";
import studentCourse from "./stuCom/studentCourse.vue";
import studentInfo from "./stuCom/studentInfo.vue";
import student from "./stuCom/student.vue"
import login from "./login.vue"
// 用户
import user from "./User/user.vue"
// 国际运单管理
import wayBillToday from "./InternationalWaybillManagement/wayBillToday.vue";
import orderDetails from './InternationalWaybillManagement/orderDetails.vue';
import allWaybill from './InternationalWaybillManagement/allWaybill.vue';
// 仓库管理
import itemTable from './WarehouseManagement/itemTable.vue';
import submitItemInfo from './WarehouseManagement/submitItemInfo.vue';
import predictionTable from './WarehouseManagement/predictionTable.vue';
import toPayParcels from './WarehouseManagement/toPayParcels.vue';
import libraryBitmap from './WarehouseManagement/libraryBitmap.vue';
import specialPackage from './WarehouseManagement/specialPackage.vue';
import storageRecord from './WarehouseManagement/storageRecord.vue';
import problemPackage from './WarehouseManagement/problemPackage.vue';
//退换货管理
import historicalRecord from "./ReturnHandling/historicalRecord.vue"

//跨国支付管理
import rechargeTable from "./TransnationalPaymentServices/rechargeTable.vue"


//主号管理
import masterList from "./MasterManage/masterList.vue"
import addMaster from "./MasterManage/addMaster.vue"
import editMaster from "./MasterManage/editMaster.vue"

//好友管理
import friendsList from "./FriendsManage/friendsList.vue"
import addFriends from "./FriendsManage/addFriends.vue"
import editFriends from "./FriendsManage/editFriends.vue"

Vue.config.productionTip = false

var comp = new VueRouter({
  routes: [{
      path: '/',
      component: login,

    },
    {
      path: '/user',
      component: user,
      redirect: "/wayBillToday",
      children: [
        //1、国际运单管理
        {
          path: '/wayBillToday',
          component: wayBillToday
        },
        {
          path: '/orderDetails',
          name:'orderDetails',
          component: orderDetails
        },
        {
          path: '/allWaybill',
          component: allWaybill
        },
        //2、仓库管理
        {
          path: '/predictionTable',
          component: predictionTable
        },
        {
          path: '/submitItemInfo',
          component: submitItemInfo
        },

        {
          path: '/itemTable',
          component: itemTable
        },
        // 到付
        {
          path: '/toPayParcels',
          component: toPayParcels
        },
        { //库位
          path: '/libraryBitmap',
          component: libraryBitmap
        },
        { //特殊包裹
          path: '/specialPackage',
          component: specialPackage
        },
        { //入库记录
          path: '/storageRecord',
          component: storageRecord
        },
        { //问题包裹
          path: '/problemPackage',
          component: problemPackage
        },


        //3、退换货管理
        {
          path: '/historicalRecord',
          component: historicalRecord
        },
        //4、跨过支付管理
        {
          path: '/rechargeTable',
          component: rechargeTable
        },
        //好友管理
        {
          path: '/friendsList',
          component: friendsList
        },
        {
          path: '/addFriends',
          component: addFriends
        },
        {
          path: '/editFriends',
          component: editFriends
        },
      ]
    },

    //学生部分
    {
      path: '/student',
      component: student,
      redirect: "/course",
      children: [{
          path: '/hello',
          component: HelloWorld
        },
        {
          path: '/course',
          component: studentCourse
        },
        {
          path: '/info',
          component: studentInfo
        },
      ]
    },
    {
      path: '/teacher',
      component: teacher,
      redirect: "/teaCourse",
      children: [{
          path: '/teaCourse',
          component: teaCourse
        },
        {
          path: '/teaInfo',
          component: teaInfo
        },
        {
          path: '/teaVideo',
          component: teaVideo
        },
      ]
    },
  ]
})

export default comp