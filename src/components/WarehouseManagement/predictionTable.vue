<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 查找--search区域 -->
      <div class="search_wrap">
        <el-input
          v-model="listQuery.userName"
          placeholder="用户名"
          style="width: 150px;"
          class="filter-item"
        />
        <el-input
          v-model="listQuery.wl_No"
          placeholder="物流单号"
          style="width: 150px;"
          class="filter-item"
        />
        <el-input
          v-model="listQuery.ck_No"
          placeholder="仓库号"
          style="width: 150px;"
          class="filter-item"
        />
        <div class="date_wrap">
          <span style="font-size:14px;">入库时间：</span>
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
        <el-select
          class="se"
          style="width:150px;margin-top:2px;margin-left:2px;"
          v-model="listQuery.value"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
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
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="id" label="ID" width="120"></el-table-column>
      <!-- <el-table-column prop="fangshi" label="物品信息" width="120"></el-table-column> -->
      <el-table-column prop="pre_No" label="预报编号" width="120"></el-table-column>
      <el-table-column prop="wl_No" label="物流单号" width="190"></el-table-column>
      <el-table-column prop="style" label="类型" width="90"></el-table-column>
      <el-table-column prop="userName" label="用户名" width="120"></el-table-column>
      <el-table-column prop="itemName" label="包裹名称" width="210">
        <template scope="scope">
          <span style="color:#1136FD">{{scope.row.itemName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ck_No"  label="仓库号" width="115"></el-table-column>
      <el-table-column prop="status"  label="状态" width="115"></el-table-column>
      <el-table-column prop="sub_time" label="提交时间" width="150"></el-table-column>
      <el-table-column width="110" prop="cz" label="操作"></el-table-column>
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

  data() {
    return {
      options: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "等待入库",
          label: "等待入库"
        },
        {
          value: "已入云仓库",
          label: "已入云仓库"
        },
        {
          value: "已删除",
          label: "已删除"
        }
      ],
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
      // formLabelWidth: "120px",
      loading: false,
      tableData: [
        {
          id: "55024",
          pre_No: "YB20195502409",
          wl_No: "[申通]773004420245866",
          style: "普通包裹",
          userName: "mimihu007",
          itemName: "黑色运动鞋37号",
          ck_No: "POM85",
          status: "等待入库",
          sub_time: "2019-09-17 15:41:09",
          cz: "验货入库"
        },
        {
          id: "55022",
          pre_No: "YB20195502244",
          wl_No: "[圆通]YT4089167500800",
          style: "普通包裹",
          userName: "mimihu007",
          itemName: "2黑+1酒红 共三件 球衣",
          ck_No: "POM85",
          status: "等待入库",
          sub_time: "2019-09-16 21:41:09",
          cz: "验货入库"
        }
      ],
      list: null,
      total: 0,
      listQuery: {
        userName: "",
        wl_No: "",
        ck_No: "",
        value: "全部"
      }
    };
  },
  created() {},
  methods: {
    //设置table中的扩展项，展开的id，此处我需要全部展开
    getExpends() {
      var tranId = this.tableData.map(item => item.id);
      this.expends = tranId;
    },
    getRowKeys(row) {
      return row.id;
    },
    //分页部分
    getShowCount() {
      this.totalCount = 3;
    },

    fmtTime(cellValue) {
      var time = new Date(cellValue);
      return time.getFormatDate() + " " + time.getFormatTime();
    },
    handleFilter() {
      console.log(this.listQuery);
      var str = [];

      this.tableData.forEach(item => {
        if (
          this.formSearch.start_time == null ||
          this.formSearch.end_time == null
        ) {
          if (
            item.status == this.listQuery.value ||
            this.listQuery.userName == item.userName ||
            this.listQuery.wl_No == item.wl_No ||
            this.listQuery.ck_No == item.ck_No
          ) {
            str.push(item);
          }
        } else {
          this.formSearch.start_time = this.fmtTime(this.formSearch.start_time);
          this.formSearch.end_time = this.fmtTime(this.formSearch.end_time);
          if (
            item.sub_time >= this.formSearch.start_time &&
            item.sub_time <= this.formSearch.end_time
          ) {
            if (
              item.status == this.listQuery.value ||
              this.listQuery.userName == item.userName ||
              this.listQuery.wl_No == item.wl_No ||
              this.listQuery.ck_No == item.ck_No
            ) {
              str.push(item);
            }else{
               str.push(item);
            }
          }
        }
      });
      this.tableData = str;
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
<style >
div.filter-container .filter-item {
  /* margin-left: 10px; */
  margin: 0 2px;
}
.se .el-input__icon {
  line-height: 20px;
}
.wl .el-table td {
  color: red;
}
</style>