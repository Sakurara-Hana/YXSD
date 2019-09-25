<template>
  <div class="details">
    <!-- 头部区域 -->
    <div class="header_wrap">
      <div class="header_top">
        <div class="top_btn">
          <el-button @click="goLast" type="primary" icon="el-icon-arrow-left">返回</el-button>
          <div class="a1">
            <ul>
              <li>问题包裹</li>
              <li>编辑发票</li>
              <li>修改后台状态</li>
              <li>修改前台状态</li>
              <li>内部备注</li>
              <li>包裹属性</li>
              <li>取消</li>
            </ul>
          </div>
          <div class="a2">
            <ul>
              <li>打印清单</li>
              <li>地址标签</li>
              <li>打印发票</li>
              <li>快递单</li>
            </ul>
          </div>
          <div class="a3">
            <ul>
              <li>打印清单-t</li>
              <li>地址标签-t</li>
              <li>快递单-t</li>
              <li>一键打印全部</li>
            </ul>
          </div>
        </div>
        <div class="top_details">
          <span>运单编号:{{info.yun}}</span>
          <span>|</span>
          <span>用户:{{info.userName}}</span>
          <span>|</span>
          <span>仓库号:{{info.ck_No}}</span>
          <span>|</span>
          <span>提交时间:{{info.sub_time}}</span>
          <span>|</span>
          <span>付款时间:{{info.fk_time}}</span>
        </div>
      </div>
      <div class="header_bottom">
        <el-progress :stroke-width="13" :percentage="percentage" color="#2FB053"></el-progress>
        <ul class="progress" style="position: absolute;width:100%;margin-top:-27px;display:flex;justify-content: space-around;font-size:12px;">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <ul style="display:flex;justify-content: space-around;font-size:12px;">
          <li>已受理</li>
          <li>已选择渠道</li>
          <li>已拣货</li>
          <li>待打包</li>
          <li>待确认渠道</li>
          <li>待交运</li>
          <li>待确入系统</li>
          <li>待确出转单</li>
          <li>待上网</li>
          <li>待签收</li>
        </ul>
        <div>
          <el-button-group>
            <el-button icon="el-icon-minus" @click="decrease"></el-button>
            <el-button icon="el-icon-plus" @click="increase"></el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <!-- 状态区域  -->
    <div class="status_wrap">
    <!-- 状态-头部区域 -->
      <div class="status_top">
        <div class="left">
          <div class="left_top">
            <i class="el-icon-back" />
            <span class="Btext">{{info.status}}</span>
            <span class="Stext">[前台状态:已经受理]</span>
          </div>
          <div class="left_bottom">
            <div class="bottom_left">
              <ul class="x">
                <li>运送方式:</li>
                <li>预付款:</li>
                <li>EORI/税号:</li>
                <li>特殊操作:</li>
              </ul>
              <ul class="y">
                <li>{{info.fangshi}}</li>
                <li style="color:red;">￥{{info.advanceCharge}}</li>
                <li>无</li>
                <li>
                  <i class="el-icon-check" />
                  去包装
                  <svg-icon icon-class="money" />
                </li>
              </ul>
            </div>
            <div class="bottom_right">
              <ul class="x">
                <li>物品净重:</li>
                <li>预付重量:</li>
                <li>申报价值:</li>
                <li>是否投保:</li>
              </ul>
              <ul class="y">
                <li>{{info.netWeight}}kg</li>
                <li>10.01kg(体积)</li>
                <li>$78.00</li>
                <li>未投保</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="right_top">
            <span class="Btext">状态栏:</span>
            <i class="el-icon-document" />
          </div>
          <div class="right_bottom">
            <div class="bottom_left">
            <ul class="x">
              <li>收件姓名:</li>
              <li>目的国家:</li>
              <li>邮政编码:</li>
              <li>详细地址:</li>
              <li>联系电话:</li>
            </ul>
            <ul class="y">
              <li>Amy Zhu</li>
              <li>{{info.destination}}</li>
              <li>95136</li>
              <li>187 William Manly st. Unit 3 San Jose CA</li>
              <li>15105202225</li>
            </ul>
            </div>
            <div class="bottom_right">
            </div>           
          </div>
        </div>
      </div>
      <!-- 状态-备注区域 -->
      <div class="status_bottom_addInfo">
        <span>备注:</span>
      </div>
    </div>
    <!-- 出库流程区域 -->
    <div class="process">
      <div class="process_top">
        <span>出库流程</span>
      </div>
      <div class="process_bottom">
        <div class="bottom_wrap">
          <div class="wrap_top">
            <div class="top_left">
                <i class="el-icon-check" />
                <span>已选择渠道</span>
            </div>
            <div class="top_right">
              <ul class="x">
                <li>渠道商选择:</li>
                <li>快递方式:</li>
              </ul>
              <ul class="y">
                <li>{{info.channel}}</li>
                <li>{{info.fangshi}}出口</li>
              </ul>
            </div>
          </div>
          <div class="wrap_center">
            <div class="center_left">
              <i class="el-icon-check" />
                <span>已拣货</span>
            </div>
            <div class="center_right">
              <div class="x">
                是否正常:
              </div>
              <div class="y">
                正常
              </div>
            </div>
          </div>
          <div class="wrap_bottom">
            <div class="bottom_left">
              <span style="display:inline-block;margin-top:40px;">待打包</span>
            </div>     
            <div class="bottom_right">
             <el-form class="Sform" :label-position="right" label-width="80px" :model="formLabelAlign">
                  <el-form-item  label="渠道单号">
                     <el-input v-model="info.channelNumber"></el-input>
                  </el-form-item>
                  <el-form-item label="包裹数量">
                    <el-input v-model="formLabelAlign.region"></el-input>
                  </el-form-item>    
                  <div class="cm" style="width:600px;display:flex;">
                      <el-form-item label="重量">
                     <el-input v-model="info.weight"></el-input>            
                  </el-form-item> 
                  <span style="display:inline-block;margin-top:5px;margin-left: 5px;">kg</span>
                  <div class="cm_wrap" style="width:360px;display:flex">
                    <el-form-item style="margin-right: 5px;margin-top: 0px;margin-left: 5px;width:70px" label="尺寸">      
                  </el-form-item> 
                  <el-input class="cm1" v-model="formLabelAlign.cm1"></el-input>  
                  <span>X</span> 
                   <el-input class="cm1" v-model="formLabelAlign.cm2"></el-input>   
                  <span>X</span> 
                   <el-input class="cm1" v-model="formLabelAlign.cm3"></el-input>  
                   <span>CM</span> 
                  </div>
                </div>         
                  <el-button style='margin-top:5px;margin-right:90px' size="mini" type="warning">设为已打包</el-button>
              </el-form>    
            </div>            
          </div>
        </div>
      </div>
    </div>
    <!-- 清单区域 -->
    <div class="detailedList">
      <div class="detailedList_top">
        <span>物品清单</span>
      </div>
      <div class="detailedList_bottom">
        <template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="no"
      label="物品编号"
      width="180">

    </el-table-column>
    <el-table-column
      prop="info"
      label="物品信息"
      width="180">
      <template scope="scope">
          <div style="display:flex;justify-content: space-between;">
            <el-image
              style="width: 30px; height: 40px"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              fit="cover"
            ></el-image>
            <span>
              <p
                style="font-size:2px;text-decoration:underline;color:#1136FD; cursor: pointer;"
              >{{scope.row.info.x}}</p>
              <p style="color:#989898;">属性:{{scope.row.info.y}}</p>
            </span>
          </div>
        </template>
    </el-table-column>
    <el-table-column
      prop="buss"
      label="快递公司">
    </el-table-column>
    <el-table-column
      prop="bussNo"
      label="快递号">
    </el-table-column>
    <el-table-column
      prop="from"
      label="来源">
    </el-table-column>
    <el-table-column
      prop="zhong"
      label="物品净重(kg)">
    </el-table-column>
    <el-table-column
      prop="tiji"
      label="预估体积(kg)">
    </el-table-column>
    <el-table-column
      prop="count"
      label="物品数量">
    </el-table-column>
    <el-table-column
      prop="address"
      label="所在库位">
    </el-table-column>
    <el-table-column
      prop="status"
      label="拣货状态">
       <template scope="scope">
          <p>内:{{scope.row.status.x}}</p>
          <p style="color:red">外:{{scope.row.status.y}}</p>
        </template>
    </el-table-column>
  </el-table>
</template>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name:"orderDetails",
  data() {
    return {
      ulList:0,
      percentage: 0,
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        info:{},
        tableData: [{
          no:'211650906611',
          info:{
            x:'代购',
            y:'正常'
          },
          buss:'顺丰',
          bussNo:'256274840116',
          from:'预报包裹',
          zhong:'5.61',
          tiji:'10.01',
          count:1,
          address:'AV-18',
          status: {
            x:'已拣货(内部)',
            y:'已出台(前台)'
          }
        }]
    };
  },
  created(){
    this.info=this.$route.params.details;

  },

  methods: {
    goLast(){
      this.$router.go(-1);
    },
    increase() {
      this.percentage += 10;
      if (this.percentage > 100) {
        this.percentage = 100;
      }
    },
    decrease() {
      this.percentage -= 10;
      if (this.percentage < 0) {
        this.percentage = 0;
      }
    }
  }
};
</script>

<style scoped>
div.details {
  height: 100%;
  width: 100%;
  /* background-color: #fafafa; */
  margin: 0;
  padding: 0;
}
/* 头部区域 */
div.details div.header_wrap {
  width: 100%;
  height: 20%;
  border-bottom: 1px solid #ccc;
  /* background-color: red; */
}
/* 头部区域的按钮部分,运单信息部分 */
div.details div.header_wrap div.header_top {
  height: 50%;
  width: 100%;
  background-color: #fafafa;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
}

div.details div.header_wrap div.header_top div.top_btn {
  height: 50%;
  display: flex;
  /* background-color: seagreen; */
}
div.details div.header_wrap div.header_top div.top_btn button.el-button {
  height: 30px;
  padding: 7px 7px;
}
div.details div.header_wrap div.header_top div.top_btn ul {
  font-size: 15px;
  display: flex;
  margin: 0 10px;
  margin-top: 5px;
}
div.details div.header_wrap div.header_top div.top_btn ul li {
  /* background-color: red; */
  margin: 0 0.5px;
  padding: 1px 4px;
  border: 1px solid #989898;
  background-color: #eaeaea;
  border-radius: 3px;
  cursor: pointer;
}
div.details div.header_wrap div.header_top div.top_details {
  height: 50%;
  display: flex;
}
div.details div.header_wrap div.header_top div.top_details span {
  margin-top: 7px;
  margin-left: 10px;
  font-size: 14px;
  color: #989898;
}
/* 头部的进度条部分 */
div.details div.header_wrap div.header_bottom {
  height: 50%;
  width: 100%;
  position: relative;
  
  
  /* background-color: rgb(96, 150, 108); */
}
div.details div.header_wrap div.header_bottom div.el-progress {
  height: 40%;
}
div.details div.header_wrap div.header_bottom div.el-progress div.el-progress-bar {
}
div.details div.header_wrap div.header_bottom div.el-progress div.el-progress-bar__outer {
}
ul.progress li{
  width:10px;
  height:10px;
  /* background-color:red; */
  border-radius: 50%;
  border: 2px solid #fff;
  cursor: pointer;
  /* box-sizing: border-box; */
}

/* 状态区域 */
div.details div.status_wrap {
  width: 100%;
  height: 30%;
  /* background-color: rgb(62, 209, 26); */
}
/* 状态区域顶部  状态区域*/
div.details div.status_wrap div.status_top {
  height: 85%;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
}
div.details div.status_wrap div.status_top div.left {
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  /* background-color: rgb(223, 219, 30); */
  border-right: 1px solid #ccc;
}
div.details div.status_wrap div.status_top div.left div.left_top,
div.details div.status_wrap div.status_top div.right div.right_top
{
  width: 100%;
  height: 20%;
  font-size: 35px;
  text-align: left;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  
}
div.details div.status_wrap div.status_top div.left div.left_top i.el-icon-back {
  border: 1px solid #d3d3d3;
  border-radius: 50%;
  transform: rotate(180deg);
  color: #d3d3d3;
  margin-left: 2px;
}
div.details div.status_wrap div.status_top div.left div.left_top span.Btext, 
div.details div.status_wrap div.status_top div.right div.right_top span.Btext 
{
  margin-left: 10px;
  font-size: 25px;
}
div.details div.status_wrap div.status_top div.left div.left_top span.Stext {
  font-size: 16px;
  color: #d3d3d3;
  margin-left: 15px;
}
div.details div.status_wrap div.status_top div.left div.left_bottom, 
div.details div.status_wrap div.status_top div.right div.right_bottom 
{
  display: flex;
  width: 100%;
  height: 80%;
  }
div.details div.status_wrap div.status_top div.left div.left_bottom div.bottom_left,
div.details div.status_wrap div.status_top div.left div.left_bottom div.bottom_right
{
  width: 50%;
  height: 100%;
  display: flex;
  font-size: 14px;
  color: #000;
  }
div.details div.status_wrap div.status_top div.left div.left_bottom div.bottom_left ul,
div.details div.status_wrap div.status_top div.left div.left_bottom div.bottom_right ul
{
     width: 50%;
     height: 100%;
    padding: 10px 0;
    box-sizing: border-box; 
  }
div.details div.status_wrap div.status_top div.left div.left_bottom div.bottom_left ul.x,
div.details div.status_wrap div.status_top div.left div.left_bottom div.bottom_right ul.x,
div.details div.status_wrap div.status_top div.right div.right_bottom div.bottom_left ul.x
  {
   text-align: right;
  }
div.details div.status_wrap div.status_top div.left div.left_bottom div.bottom_left ul.y,
div.details div.status_wrap div.status_top div.left div.left_bottom div.bottom_right ul.y,
div.details div.status_wrap div.status_top div.right div.right_bottom div.bottom_left ul.y 
  {
  text-align: left;
  padding-left: 10px;
  }
  div.details div.status_wrap div.status_top div.left div.left_bottom ul li,
  div.details div.status_wrap div.status_top div.right div.right_bottom ul li
  {
    padding: 3px 0;
  }
  div.details div.status_wrap div.status_top div.left div.left_bottom div.bottom_left ul.y li,
  div.details div.status_wrap div.status_top div.left div.left_bottom div.bottom_right ul.y li
  {
      padding-top: 4.5px;
  }
   div.details div.status_wrap div.status_top div.right div.right_bottom div.bottom_left ul.y li{
      padding-top: 5px;
   }
div.details div.status_wrap div.status_top div.left div.left_bottom div.bottom_right {
  background-color: #fff;
  }
ul.y li i.el-icon-check{
  color: rgb(7, 187, 31);
  font-size: 15px;
  border: 1px solid rgb(7, 187, 31);
  border-radius: 50%;
  
  }
ul.y li svg.svg-icon{
  box-sizing: border-box;
  background-color: #12B7F5;
  color: #fff;
  /* font-size: 12px; */
  border-radius: 50%;
  padding: 2px;
  }

div.details div.status_wrap div.status_top div.right {
  width: 50%;
  height: 100%;
  }
div.details div.status_wrap div.status_top div.right div.right_bottom div.bottom_left{
  width: 70%;
  height: 100%;
  display: flex;
  font-size: 14px;
  color: #000;
  }
div.details div.status_wrap div.status_top div.right div.right_bottom div.bottom_right{
  width: 30%;
  height: 100%;
 }
div.details div.status_wrap div.status_top div.right div.right_bottom div.bottom_left ul.x{
  height: 100%;
  width: 20%;
  }
div.details div.status_wrap div.status_top div.right div.right_bottom div.bottom_left ul.y{
  height: 100%;
  width: 80%;
  }
div.details div.status_wrap div.status_top div.right div.right_top i.el-icon-document{
  font-size: 20px;
}
/* 状态区域底部 备注区域 */
div.details div.status_wrap div.status_bottom_addInfo {
  height: 15%;
  width: 100%;
  text-align: left;
  color: #000;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  }
div.details div.status_wrap div.status_bottom_addInfo span{
  display: inline-block;
  margin-top: 5px;
  margin-left: 10px;
  }
/* 出库流程区域 */
div.details div.process {
  width: 100%;
  height: 30%;
  /* background-color: rgb(160, 209, 26); */
}
/* 出库流程-头部区域 */
div.details div.process div.process_top{
  width: 100%;
  height: 15%;
  /* background-color: rgb(230, 16, 16); */
  text-align: left;
}
div.details div.process div.process_top span{
  display: inline-block;
  margin-top: 9px;
  color: #000; 
}
/* 出库流程-底部-表格区域 */
div.details div.process div.process_bottom{
  width: 100%;
  height: 85%;
  /* background-color: rgb(51, 24, 204); */
}
div.details div.process div.process_bottom div.bottom_wrap{
  width: 95%;
  height: 98%;
  /* background-color: #fff; */
  margin: auto;
  box-sizing: border-box;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
/* 出库流程表格-顶部 */
div.details div.process div.process_bottom div.bottom_wrap div.wrap_top{
  width: 100%;
  height: 25%;
  /* background-color: rgb(59, 221, 18); */
  display: flex;
}

div.details div.process div.process_bottom div.bottom_wrap div.wrap_top div.top_left,
div.details div.process div.process_bottom div.bottom_wrap div.wrap_center div.center_left,
div.details div.process div.process_bottom div.bottom_wrap div.wrap_bottom div.bottom_left
{
  width: 25%;
  height: 100%;
  box-sizing: border-box;
  font-size: 15px;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

div.details div.process div.process_bottom div.bottom_wrap div.wrap_top div.top_left{
 padding-top: 10px;
}
div.details div.process div.process_bottom div.bottom_wrap div.wrap_top div.top_left i.el-icon-check,
div.details div.process div.process_bottom div.bottom_wrap div.wrap_center div.center_left i.el-icon-check
{
  color: rgb(7, 187, 31);
  border: 1px solid rgb(7, 187, 31);
  border-radius: 50%;
  
  }
div.details div.process div.process_bottom div.bottom_wrap div.wrap_top div.top_right,
div.details div.process div.process_bottom div.bottom_wrap div.wrap_center div.center_right,
div.details div.process div.process_bottom div.bottom_wrap div.wrap_bottom div.bottom_right
{
  width: 75%;
  height: 100%;
  /* background-color: rgb(30, 99, 226); */
  display: flex;
  font-size: 15px;
  color: #000;
    box-sizing: border-box;
  border-bottom: 1px solid #ccc;
}
div.details div.process div.process_bottom div.bottom_wrap div.wrap_top div.top_right ul,
div.details div.process div.process_bottom div.bottom_wrap div.wrap_top div.top_right div
{
  height: 100%;
  box-sizing: border-box;
}
div.details div.process div.process_bottom div.bottom_wrap div.wrap_top div.top_right ul.x,
div.details div.process div.process_bottom div.bottom_wrap div.wrap_center div.center_right div.x
{
  width: 20%;
  /* background-color: rgb(25, 211, 96); */
  text-align: right;
}
div.details div.process div.process_bottom div.bottom_wrap div.wrap_top div.top_right ul.y,
div.details div.process div.process_bottom div.bottom_wrap div.wrap_center div.center_right div.y
{
  width: 80%;
  /* background-color: rgb(211, 25, 171); */
  text-align: left;
  padding-left: 10px;
  box-sizing: border-box;
}
/* 出库流程表格-中部 */
div.details div.process div.process_bottom div.bottom_wrap div.wrap_center{
  width: 100%;
  height: 15%;
  /* background-color: rgb(218, 27, 27); */
  display: flex;
}
div.details div.process div.process_bottom div.bottom_wrap div.wrap_center div.center_left{
   /* background-color: rgb(159, 212, 14); */
}
div.details div.process div.process_bottom div.bottom_wrap div.wrap_center div.center_right{

}
/* 出库流程表格-顶部 */
div.details div.process div.process_bottom div.bottom_wrap div.wrap_bottom{
  height: 60%;
  width: 100%;
  /* background-color: rgb(28, 184, 111); */
  display: flex;
}
div.details div.process div.process_bottom div.bottom_wrap div.wrap_bottom div.bottom_right{

}
from.el-form div.el-form-item{
  height: 20px;
  margin-bottom: 0px;
}

/* 物品清单区域 */
div.details div.detailedList {
  width: 100%;
  height: 20%;
  box-sizing: border-box;
  /* background-color: rgb(209, 26, 179); */
}
div.details div.detailedList div.detailedList_top{
  width: 100%;
  height: 20%;
  /* background-color: rgb(42, 231, 121); */
  text-align: left;
  color: #000;
  box-sizing: border-box;
  padding-top: 5px;
  
}
div.details div.detailedList div.detailedList_bottom{
  padding-top: 20px;
  width: 100%;
  height: 80%;
  box-sizing: border-box;
  /* background-color: rgb(230, 19, 19); */
}
</style>
<style>
.el-form-item{
  margin-top: 5px;
  margin-left: 78px;
  margin-bottom: 0px;
}
.el-form-item__label{
  line-height: 20px;
  color: #000;
}
div.el-form-item__content{
  width: 220px;
  height: 20px;
  line-height: 20px;
}
input.el-input__inner{
  height: 20px;
  line-height: 20px;
  border: 1px solid #3196B4;
}
.cm1 .el-input__inner{
  width:50px;
padding: 0 5px;
}
/* 进度条底颜色 */
.el-progress-bar__outer{
  background-color: #ccc;
}
</style>