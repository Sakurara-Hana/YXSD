<template>
  <div class="subInfo">
    <el-form ref="form" :model="form" label-width="80px">
      <!-- 查询区域 -->
      <div class="search">
        <div class="img">
            <el-image style="width:280px;height:138px;display:block"  src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
          <!-- <img style="width:100px;height:100px;display:block" src="images/1.jpg" alt="图片"> -->
        </div>
        <div class="ipt">
          <div class="cm" style="width:600px;display:flex;">
            <el-form-item label="物流信息">
              <el-input placeholder="物流号/订单号" v-model="form.info"></el-input>
            </el-form-item>
            <div class="cm_wrap" style="width:360px;">
              <el-form-item
                style="margin-right: 5px;margin-top: 5px;margin-left: 5px;width:70px"
                label="公司名称"
              >
                <el-select class="bus" v-model="form.gs_name" placeholder="公司名称">
                  <el-option label="圆通" value="圆通"></el-option>
                  <el-option label="顺丰" value="顺丰"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <el-form-item label="仓库号">
            <el-input v-model="form.ck_no"></el-input>
          </el-form-item>
        </div>
      </div>
      <!-- 包裹信息区域  -->
      <div class="itemInfo">
        <div class="left">
          <div class="left_top">
            <el-form-item label="包裹信息"></el-form-item>
            <div class="cm" style="width:600px;display:flex;">
              <el-form-item label="包裹名称">
                <el-input v-model="form.bg_name"></el-input>
              </el-form-item>
              <div class="cm_wrap" style="width:360px;">
                <el-form-item
                  style="margin-right: 5px;margin-top: 5px;margin-left: 5px;width:70px"
                  label="服装件数"
                >
                  <el-select class="bus" v-model="form.fz_count" placeholder="服装件数">
                    <el-option label="服装1件" value="1"></el-option>
                    <el-option label="服装2件" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>

            <el-form-item label="数量">
              <el-input v-model="form.count"></el-input>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input type="textarea" v-model="form.hd_style"></el-input>
            </el-form-item>
            <el-form-item style="margin-top:40px" label="包裹验货">
               <el-radio v-model="form.bg_yh" label="已验">已验</el-radio>
              <el-radio v-model="form.bg_yh" label="问题">问题</el-radio>
              <!-- <el-button v-model="form.bg_yh"  size="small" type="warning">已验</el-button>
              <el-button v-model="form.bg_yh" size="small" type="primary">问题</el-button> -->
            </el-form-item>
            <el-form-item label="如何处理">
              <el-radio v-model="form.cl" label="1">入库</el-radio>
              <el-radio v-model="form.cl" label="2">打包</el-radio>
            </el-form-item>
          </div>
          <div class="left_center">
            <el-form-item label="物品重量">
              <el-input placeholder="kg" v-model="form.wp_weight"></el-input>
            </el-form-item>
          
            <div class="cm" style="width:600px;display:flex;">
                      <el-form-item label="体积重量">
                     <el-input placeholder="kg" v-model="form.tj_weight"></el-input>            
                  </el-form-item> 
                  <span style="display:inline-block;margin-top:5px;margin-left: 0px;">kg</span>
                  <div class="cm_wrap" style="width:360px;display:flex;margin-top: 5px;">
                    <el-form-item style="margin-right: 5px;margin-top: 0px;margin-left: 5px;width:8px">      
                  </el-form-item> 
                  <el-input class="cm1" v-model="form.tj_x"></el-input>  
                  <span>X</span> 
                   <el-input class="cm1" v-model="form.tj_y"></el-input>   
                  <span>X</span> 
                   <el-input class="cm1" v-model="form.tj_z"></el-input>  
                   <span>CM</span> 
                   <el-button size="small" type="primary" style="margin-left: 5px;">确认</el-button>
                  </div>
                </div> 
                  <el-form-item label="是否到付">
              <el-input placeholder="元" v-model="form.df_money"></el-input>
            </el-form-item>       
          </div>
          <div class="left_bottom">
             <el-form-item label="包装情况">
              <el-radio v-model="form.bz_qk" label="无">无</el-radio>
              <el-radio v-model="form.bz_qk" label="有包装">有包装</el-radio>
            </el-form-item>   
             <el-form-item label="能否真空压缩">
              <el-radio v-model="form.nf_zkys" label="否">否</el-radio>
              <el-radio v-model="form.nf_zkys" label="能">能</el-radio>
            </el-form-item>   
             <el-form-item label="产品特征">
               <el-checkbox-group style="width:600px;" v-model="form.checkedFeatures" @change="handleCheckedCitiesChange">
               <el-checkbox style="width:120px; text-align: left;margin-right:0;" v-for="item in form.features" :label="item" :key="item">{{item}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>  
              <div class="cm" style="width:600px;display:flex;margin-top:100px;">
             <el-form-item  label="运输情况">
              <el-radio v-model="form.ys_qk" label="可运输">可运输</el-radio>
              <el-radio v-model="form.ys_qk" label="禁运">禁运</el-radio>            
            </el-form-item>  
              <div class="cm_wrap" style="width:360px;">
                <el-form-item class="reason"
                  style="margin-right: 5px;margin-top: 5px;margin-left: -80px;width:70px"
                >
                <el-input  placeholder="原因" v-model="form.ys_yy"></el-input>
                </el-form-item>
              </div>
            </div> 
             
          </div>
        </div>
        <div class="right">
          
          <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.img" :src="form.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span>上传头像</span>
        </div>
      </div>
      <!-- 操作区域 -->
      <div class="detailedList">
        <el-form-item>
          <el-button style="padding: 6px 13px;" type="warning" @click="submitForm(form)">确认入库</el-button>
           <el-button @click="resetForm(form)">重置</el-button>
          </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        info: "",
        gs_name: "",
        ck_no: "",
        bg_name: "",
        fz_count: "",
        count: "",
        hd_style: "",
        bg_yh: "",
        cl: "1",
        wp_weight: "25",
        tj_weight: "25",
        tj_x:'',
        tj_y:'',
        tj_z:'',
        df_money: "20",
        bz_qk: "1",
        nf_zkys: "1",
        features:[
        '正常',
        '一线品牌',
        '二线品牌',
        '纯电池',
        '配套电池',
        '移动电源',
        '电机/马达',
        '食品',
        '粉末',
        '膏状',
        '处方药',
        '其他敏感',
        '保健品',
        '眼镜',
        '光盘',
        '化妆品',
        '易碎',
        '50ml以下液体',
        '100ml以下液体',
        '100ml以上液体',
        '书籍',
      ],
        checkedFeatures: ['正常'],
       ys_qk:'1',
        ys_yy: '',
        img:''
      },
      features:[
        '正常',
        '一线品牌',
        '二线品牌',
        '纯电池',
        '配套电池',
        '移动电源',
        '电机/马达',
        '食品',
        '粉末',
        '膏状',
        '处方药',
        '其他敏感',
        '保健品',
        '眼镜',
        '光盘',
        '化妆品',
        '易碎',
        '50ml以下液体',
        '100ml以下液体',
        '100ml以上液体',
        '书籍',
      ],
      checkedFeatures:['正常'],
       imageUrl: ''
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res);
      // this.form.img=res;
        this.form.img = URL.createObjectURL(file.raw);
        console.log(this.imageUrl);
      },
      //重置
       resetForm(form) {
        this.$refs[form].resetFields();
      },
      submitForm(form){
        console.log(form);
      }
  }
};
</script>
<style scoped>
div.subInfo {
  height: 100%;
  width: 100%;
  background-color: #fafafa;
  margin: 0;
  padding: 0;
}
form {
  height: 100%;
  width: 100%;
  background-color: #fafafa;
  margin: 0;
  padding: 0;
}
/* 查询区域  */
div.subInfo div.search {
  height: 20%;
  width: 100%;
  /* background-color: rgb(236, 31, 31); */
  box-sizing: border-box;

  display: flex;
  border: 1px solid #ccc;
}
div.search div.img {
  height: 100%;
  width: 20%;
  /* background-color: rgb(211, 179, 179); */
}
div.search div.ipt {
  height: 100%;
  width: 80%;
  box-sizing: border-box;
  padding-top: 30px;
}
/* 包裹信息区域 */
div.subInfo div.itemInfo {
  height: 72%;
  width: 100%;
  /* background-color: rgb(11, 201, 74); */
  display: flex;
  box-sizing: border-box;
    /* border-bottom: 1px solid #ccc; */
  
}
div.itemInfo div.left {
  height: 100%;
  width: 80%;
  box-sizing: border-box;
}
div.itemInfo div.left div.left_top {
  width: 100%;
  height: 40%;
  /* background-color: rgb(49, 19, 221); */
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
}
div.itemInfo div.left div.left_center {
  width: 100%;
  height: 17%;
  /* background-color: rgb(17, 160, 226); */
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
   
}
div.itemInfo div.left div.left_bottom {
  width: 100%;
  height: 43%;
  background-color: #fff;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
}
div.subInfo div.itemInfo div.right {
  height: 100%;
  width: 20%;
  /* background-color: rgb(137, 211, 18); */
  box-sizing: border-box;
}

/* 操作区域 */
div.subInfo div.detailedList {
  height: 8%;
  width: 100%;
  /* background-color: rgb(33, 13, 212); */
  box-sizing: border-box;
  padding-top: 17px;
}
</style>
<style >
.bus .el-input__icon {
  line-height: 20px;
}
.el-button--small {
  padding: 2px 9px;
}
.el-checkbox__label{
  font-size: 4px;
}
/* 图片上传 */
  .avatar-uploader .el-upload {
    margin-top: 20px;
    border: 1px dashed #3113DD;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>