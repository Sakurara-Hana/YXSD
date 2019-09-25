<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 查找--search区域 -->
      <div class="search_wrap">
        <el-input
          v-model="listQuery.userName"
          placeholder="用户名"
          style="width: 200px;"
          class="filter-item"
        />
        <!-- 筛选按钮区域 -->
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >Search</el-button>
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
      <!-- 多选框 -->
      <el-table-column prop="id" label="ID" width="150"></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="250"
      >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        width="150"
       
      >
      </el-table-column>
      <el-table-column prop="startTime" label="创建时间" width="150"></el-table-column>
      <el-table-column prop="monery"  label="金额" width="130"></el-table-column>
      <el-table-column prop="serverMonery"  label="服务费" width="130"></el-table-column>
      <el-table-column prop="zhenName"  label="实名" width="130"></el-table-column>
      <el-table-column
        prop="alp_No"
        label="支付宝账号"
        width="150"
      >
      </el-table-column>
      <el-table-column prop="submitTime"  label="支付时间" width="150"></el-table-column>
    </el-table>
    <div class="bottom">
        <div class="bottom_btn">
            <button>支付处理</button>
        </div>
          <!-- 分页区域 -->
     <el-pagination
      background
      layout="prev, pager, next"
      @current-change="getShowCount"
      :page-size="pageSize"
      :total="totalCount"
    ></el-pagination>
  
    </div>
    
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
          id: "13493",
          status: "已处理",
          userName: "egg_suen",
          startTime: "2013-09-23 15:33:13",
          monery: "90.00",
          serverMonery: "4.50",
          zhenName: "孙一山",
          alp_No: "tasuen@hotmail.com",
          submitTime: "2013-09-23 16:41:07",
        },
        {
          id: "13491",
          status: "待付款",
          userName: "Bonbon",
          startTime: "2013-09-23 04:45:13",
          monery: "1000.00",
          serverMonery: "50.00",
          zhenName: "张旭",
          alp_No: "tasuen@hotmail.com",
          submitTime: " ",
        },
      ],

      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        userName: undefined,
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
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },

    getList() {
      // this.listLoading = true;
      // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.total = response.data.total
      //   // Just to simulate the time of the request
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 1.5 * 1000)
      // })
    },
    handleFilter() {
      var str=[];
      this.tableData.forEach(item=>{
        if(item.userName==this.listQuery.userName){
          str.push(item);
        }
      })
      this.tableData=str;
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作Success",
        type: "success"
      });
      row.status = status;
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        status: "published",
        type: ""
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          this.temp.author = "vue-element-admin";
          // createArticle(this.temp).then(() => {
          //   this.list.unshift(this.temp)
          //   this.dialogFormVisible = false
          //   this.$notify({
          //     title: 'Success',
          //     message: 'Created Successfully',
          //     type: 'success',
          //     duration: 2000
          //   })
          // })
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // updateArticle(tempData).then(() => {
          //   for (const v of this.list) {
          //     if (v.id === this.temp.id) {
          //       const index = this.list.indexOf(v)
          //       this.list.splice(index, 1, this.temp)
          //       break
          //     }
          //   }
          //   this.dialogFormVisible = false
          //   this.$notify({
          //     title: 'Success',
          //     message: 'Update Successfully',
          //     type: 'success',
          //     duration: 2000
          //   })
          // })
        }
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
  padding: 8px 0;
  font-size: 7px;
  color: #000000;
  background-color: #FEFEFE;
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
 
 /* 底部区域 */
 div.bottom{
     display: flex;
     height: 20px;
     justify-content: space-between;
     margin-top: 20px;
 }
  div.bottom button{
      margin-left: 20px;
  }
 div.el-pagination{
         padding: 0px 5px;
 }
</style>
