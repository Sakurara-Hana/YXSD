<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 查找--search区域 -->
      <div class="search_wrap">
        <el-input
          v-model="listQuery.title"
          placeholder="输入单号/仓库号/用户名等"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <div class="date_wrap">
          <el-date-picker
            v-model="formSearch.start_time"
            type="datetime"
            placeholder="选择开始日期"
            :picker-options="start_Date"
          />
          <span>--</span>
          <el-date-picker
            v-model="formSearch.end_time"
            type="datetime"
            placeholder="选择结束日期"
            :picker-options="end_Date"
          />
        </div>
        <!-- 筛选按钮区域 -->
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >Search</el-button>
      </div>
      <!-- 下载按钮区域 -->
      <div class="down_wrap">
         <el-checkbox-group v-model="checkList">
         <el-checkbox label="没制发票"></el-checkbox>
         <el-checkbox label="未打印地址"></el-checkbox>
      </el-checkbox-group>
        <!-- <el-button
          :loading="downloadLoading"
          class="filter-item"
          type="primary"
          icon="el-icon-download"
          @click="handleDownload"
        >Export</el-button> -->
      </div>
    </div>

    <!-- 表格区域 -->
    <el-table
      id="excel-table"
      v-loading="loading"
      ref="filterTable"
      :data="tableData"
      style="width: 100%"
      :expand-row-keys="expends"
      :row-key="getRowKeys"
    >
  <!-- 扩展项 -->
    <el-table-column prop="yun" type="expand" width="100">
          <template  slot-scope="props">
            <!-- 评价：{{ props.row.comment}} -->
            <span class="sub"> 提交：{{props.row.sub_time}}</span>
            <span>付款：{{props.row.fk_time}}</span>
            <span>仓库号:{{props.row.ck_No}}</span>
            <span>用户名:{{props.row.userName}}</span>
          
            </template>
        </el-table-column>
             <!-- 多选框 -->
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="yun" label="悠奇运单编号" width="120"></el-table-column>
      <el-table-column
        prop="fangshi"
        label="运送方式"
        width="100"
        :filters="[{ text: 'DHL', value: 'DHL' }, { text: 'EMS', value: 'EMS' },
                    { text: '西马海运包税快递', value: '西马海运包税快递' },
                    { text: '中国邮政大包', value: '中国邮政大包' },
                    { text: 'E邮宝', value: 'E邮宝' },
                    { text: '西马包税专线(建议大货)', value: '西马包税专线(建议大货)' }
                    ]"
        :filter-method="filterFangshi"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.fangshi === 'DHL' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.fangshi}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="destination"
        label="目的地"
        width="90"
        :filters="[
        { text: '美国', value: '美国' }, 
        { text: '马来西亚', value: '马来西亚' }
        ]"
        :filter-method="filterDestination"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.destination === '美国' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.destination}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="addressee" label="收件人" width="90"></el-table-column>
      <el-table-column prop="netWeight" sortable label="物品净重(kg)" width="120"></el-table-column>
      <el-table-column prop="weight" sortable label="预付重量(kg)" width="115"></el-table-column>
      <el-table-column prop="advanceCharge" sortable label="预付款(rmb)" width="115"></el-table-column>
      <el-table-column
        prop="channel"
        label="发货渠道"
        width="100"
        :filters="[
                  { text: '递四方', value: '递四方' }, 
                  { text: '互联易', value: '互联易' }, 
                  { text: '商壹运通', value: '商壹运通' },
                  { text: '跨境翼欧线', value: '跨境翼欧线' }
                  ]"
        :filter-method="filterChannel"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.channel === '递四方' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.channel}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="channelNumber" label="渠道单号" width="90"></el-table-column>
      <el-table-column prop="conversionNumber" label="转单号" width="80"></el-table-column>
      <el-table-column prop="status" label="状态" width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
           <el-menu
          :default-active="activeIndex"
          background-color="#F5F6F6"
          text-color="#000"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          style="border:1px solid #B8C3CE;height:35px;width:68px;"
      
        >
          <el-submenu class="t1" style="height:35px;width:68px;" index="2">
            <template slot="title">详情</template> 
            <el-menu-item @click="handleClick(scope.row)" index="orderDetails">
              详情界面
            </el-menu-item>
            <el-menu-item  index="2-2">选项2</el-menu-item>
          </el-submenu>
        </el-menu>
      </template>
        
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
   <div class="bottom"
       style="margin:15px 0;">
      <div class="bottom_btn">   
      </div>
      <!-- 分页区域 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="sizes, prev, pager, next"
          :total="1000"
        ></el-pagination>
      </div>
    </div>
    <!-- 弹出框--编辑区域 -->
  </div>
</template>

<script>
import { parseTime } from "@/utils"; //格式化时间
import FileSaver from "file-saver";
import XLSX from "xlsx";
import _ from "../utils/format";
const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" }
];

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

export default {
  name: "ComplexTable",
  // components: { Pagination },
  // directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    }
  },
  data() {
    return {
      checkList:[],
      expends:[],
      // 时间选择器，控制开始时间和结束时间
      formSearch: {
        //搜索
        start_time: null,
        end_time: null
      },
      start_Date: {
        //时间限制
        disabledDate: time => {
          return time > Date.now();
        }
      },
      end_Date: {
        //时间限制
        disabledDate: time => {
          return time.getTime() < this.formSearch.start_time;
        }
      },
      totalCount: 3, //分页的总页码
      pageSize: 2, //一页有多少条
      dialogTableVisible: false,
      dialogFormVisible: false,
      loading: false,
      tableData: [
        {
          sub_time:'2019-09-17 12:15:53',
          fk_time:'2019-09-17 12:15:53',
          ck_No:'P0GUJ',
          userName:'amz519',
          yun: "190917172R74B",
          fangshi: "DHL",
          destination: "美国",
          addressee: "Amy Zhu",
          netWeight: "5.61",
          weight: "10.01",
          advanceCharge: "684.25",
          channel: "递四方",
          channelNumber: "6186164412",
          conversionNumber: "暂无",
          status: "待打包",
        },
        {
          sub_time:'2019-09-17 12:15:53',
          fk_time:'2019-09-17 11:32:33',
          ck_No:'P1KND',
          userName:'xiaotingcui8',
          yun: "190917172R74B",
          fangshi: "DHL",
          destination: "马来西亚",
          addressee: "Annie Cui",
          netWeight: "7.67",
          weight: "16.32",
          advanceCharge: "1015.45",
          channel: "互联易",
          channelNumber: "6186164154",
          conversionNumber: "暂无",
          status: "待打包",
          comment:'我和我的祖国',
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          tag: "公司"
        }
      ],

      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" }
      ],
      statusOptions: ["published", "draft", "deleted"],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        type: "",
        status: "published"
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" }
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change"
          }
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" }
        ]
      },
      downloadLoading: false
    };
  },
  created() {
    this.getExpends();
  },
  methods: {
    //跳转到详情页并传递参数
    handleClick(row){
      this.$router.push(
        
        {
          name: "orderDetails",
          params:{
            details:row
          }
        }
       
        );
      // console.log(row);
    },
    //设置table中的扩展项，展开的id，此处我需要全部展开
    getExpends(){
      var tranId = this.tableData.map(item => item.id)
            this.expends = tranId
    },
    getRowKeys(row){
      return row.id
    },
    //分页部分
    getShowCount() {
      this.totalCount = 3;
    },
    getShowList() {
      var _this = this;
      this.$axios
        .get("http://www.liulongbin.top:3005/api/getnewslist")
        .then(function(response) {
          console.log("get");
          if (response.status == 0) {
            _this.tableData = response.message;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    del(id) {
      console.log(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData.map((n, index) => {
            if (n.id == id) {
              this.tableData.splice(index, 1);
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    fmtTime(row, column, cellValue, index) {
      var time = _.convertMysqlTime2JSTime(cellValue);
      return time.getFormatDate() + "   " + time.getFormatTime();
    },
    formatter(row, column) {
      return row.address;
    },
    // 筛选--方法区域
    filterFangshi(value, row) {
      return row.fangshi === value;
    },
    filterDestination(value, row) {
      return row.destination === value;
    },
    filterChannel(value, row) {
      return row.channel === value;
    },


      handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // filterHandler(value, row, column) {
    //   const property = column["property"];
    //   return row[property] === value;
    // },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleDownload() {
      // this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["id", "时间", "姓名", "地址", "标签"];
        const filterVal = ["id", "date", "name", "address", "tag"];
        const data = this.formatJson(filterVal, this.tableData);
        console.log(data);
        // const data = this.tableData;
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list"
        });
        // this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "id") {
            //这里其实是格式化的一个判断，如没有要格式化的字段可以不用次判断
            // return parseTime(v[j])
            return v[j];
          } else {
            return v[j];
          }
        })
      );
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}`
        ? "ascending"
        : sort === `-${key}`
        ? "descending"
        : "";
    }
  }
};
</script>
<style scope>
/* 查询区域 */

div.filter-container {
  height: 30px;
  display: flex;
  justify-content: space-between;
  /* justify-content: space-around; */
  border-bottom: 1px solid #eaeaea;
  background-color: #fafafa;
}
div.filter-container .filter-item {
  /* margin-left: 10px; */
  margin: 0 10px;
}
div.filter-container .search_wrap {
  display: flex;
}
/* 输入框的样式 */
div.filter-container .filter-item .el-input__inner {
  height: 23px;
}
/* 选择器中的下拉小图标样式 */
div.filter-container
  .filter-item
  .el-input
  .el-input__suffix
  .el-input__suffix-inner
  .el-input__icon {
  line-height: 23px;
}

/* 时间选择器 */
div.filter-container div.search_wrap .el-date-editor .el-input__inner {
  height: 23px;
}

div.filter-container
  div.search_wrap
  .el-date-editor
  .el-input__prefix
  .el-input__icon {
  line-height: 23px;
}
div.filter-container
  div.search_wrap
  .el-date-editor
  .el-input__suffix
  .el-input__icon {
  line-height: 23px;
}

/* 查询按钮 */
button.el-button.filter-item.el-button--primary {
  height: 23px;
}
/* 查询按钮的内容居中 */
div.filter-container div.search_wrap button.el-button {
  font-size: 11px;
  padding: 4px 10px;
}
/* 下载按钮的内容居中 */
div.filter-container div.down_wrap button.el-button {
  font-size: 11px;
  padding: 4px 10px;
}

/* 表格区域 */
div.el-table__body-wrapper.is-scrolling-left{
  overflow-x: hidden;
}
/* 表头部分 */
.el-table th {
  padding: 1px 0;
  background-color: #e7edf6;
  color: #000000;
  font-size: 10px;
}
/* 表格行td部分 */
.el-table td {
  padding: 1px 0;
  font-size: 7px;
  color: #000000;
  background-color: #FEFEFE;
}
/* 扩展行部分 */
.el-table td.el-table__expanded-cell{
  padding: 5px 50px;
  color: #656565;
  background-color: #F4F4F4;
}
/* 扩展行 span部分 */
.el-table td.el-table__expanded-cell span.sub{
  margin-left: 40px;
}
.el-table td.el-table__expanded-cell span{
  margin-left: 30px;
}
/* 表格中标签按钮部分 */
.el-table td div.cell span.el-tag{
height: 25px;
line-height: 25px;
padding: 0 5px;
}


/* 表格中 详情按钮 */
button.el-button--mini {
  /* margin-left: 5px; */
  padding:  5px 12px;
}
div.el-pagination {
  padding: 35px 5px;
}
</style>
<style>
.el-menu--popup {
    min-width: 120px;
}
</style>