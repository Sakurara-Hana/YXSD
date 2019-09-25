<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 查找--search区域 -->
      <div class="search_wrap">
        <el-input
          v-model="listQuery.title"
          placeholder="条形码"
          style="width: 200px;"
          class="filter-item"
        />
        <div class="date_wrap">
          <span>入库时间：</span>
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
      <el-table-column prop="tiao_NO" label="条形码" width="120"></el-table-column>
      <!-- <el-table-column prop="fangshi" label="物品信息" width="120"></el-table-column> -->
      <el-table-column prop="item_name" label="包裹名称" width="170"></el-table-column>
      <el-table-column prop="buss_name" label="物流公司" width="120"></el-table-column>
      <el-table-column prop="item_No" label="物流单号" width="150"></el-table-column>
      <el-table-column prop="ch_yun_money" label="国内运费" width="90"></el-table-column>
      <el-table-column prop="start_time" label="创建时间" width="150"></el-table-column>
      <el-table-column prop="userName" label="用户名" width="120"></el-table-column>
      <el-table-column prop="ck_No" label="仓库号" width="110"></el-table-column>
      <el-table-column prop="origin" label="来源" width="120"></el-table-column>
      <el-table-column prop="status" label="状态" width="120"></el-table-column>
      <el-table-column label="操作人" prop="cz_people" width="115"></el-table-column>
    </el-table>

    <div class="bottom">
      <div class="bottom_btn"></div>
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

export default {
  name: "ComplexTable",
  filters: {
  },
  data() {
    return {
      expends: [],
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
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      loading: false,
      tableData: [
        {
          tiao_NO: "211459831837",
          item_name: "衣服",
          buss_name: "顺丰",
          item_No: "SF10035550070705",
          ch_yun_money: "19.00",
          start_time: "2019-09-14 10:26:21",
          userName: "Zyh9197",
          ck_No: "P1J27",
          origin: "资助包裹",
          status: "已入库",
          cz_people: "严婷"
        },
        {
          tiao_NO: "211304345915",
          item_name: "饰品，梳子",
          buss_name: "顺丰",
          item_No: "234817766813",
          ch_yun_money: "14.00",
          start_time: "2019-09-12 15:39:05",
          userName: "MU小宝",
          ck_No: "P0XSK",
          origin: "预报包裹",
          status: "已出库",
          cz_people: "严婷"
        }
      ],
      list: null,
      total: 0,
      listQuery: {
        title: "",
      },
    };
  },
  created() {
    this.getExpends();
  },
  methods: {
    //分页部分
    getShowCount() {
      this.totalCount = 3;
    },
    // 格式化时间部分
    fmtTime(cellValue) {
      var time = new Date(cellValue);
      // var time = _.convertMysqlTime2JSTime(cellValue);
      return time.getFormatDate() + " " + time.getFormatTime();
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
    // 筛选操作
    handleFilter() {
      var str = [];
      if (this.listQuery.title.length != 0) {
       
        if (
          this.formSearch.start_time == null ||
          this.formSearch.end_time == null
        ) {
           console.log(this.listQuery.title);
          this.tableData.forEach(item => {
            if (item.tiao_NO == this.listQuery.title) {      
              str.push(item);
            }
          });
        } else {
      this.formSearch.start_time = this.fmtTime(this.formSearch.start_time);
      this.formSearch.end_time = this.fmtTime(this.formSearch.end_time);
          this.tableData.forEach(item => {
            if (
              item.tiao_NO == this.listQuery.title &&
              item.start_time >= this.formSearch.start_time &&
              item.start_time <= this.formSearch.end_time
            ) {
              str.push(item);
            }
          });
        }
      } else {
        if (
          this.formSearch.start_time != null &&
          this.formSearch.end_time != null
        ) {
          this.formSearch.start_time = this.fmtTime(this.formSearch.start_time);
          this.formSearch.end_time = this.fmtTime(this.formSearch.end_time);
          console.log(this.formSearch.start_time);
          this.tableData.forEach(item => {
            if (
              item.start_time >= this.formSearch.start_time &&
              item.start_time <= this.formSearch.end_time
            ) {
              str.push(item);
            }
          });
        }
      }
      this.tableData = str;
    },
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
div.el-table__body-wrapper.is-scrolling-left {
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
  background-color: #fefefe;
}
/* 表格中标签按钮部分 */
.el-table td div.cell span.el-tag {
  height: 25px;
  line-height: 25px;
  padding: 0 5px;
}

/* 表格中 详情按钮 */
button.el-button--mini {
  /* margin-left: 5px; */
  padding: 5px 12px;
}
div.el-pagination {
  padding: 35px 5px;
}

/* 底部区域 */
div.bottom {
  display: flex;
  height: 20px;
  justify-content: space-between;
  margin-top: 20px;
}
div.bottom button {
  margin-left: 20px;
}
div.el-pagination {
  padding: 0px 5px;
}
</style>