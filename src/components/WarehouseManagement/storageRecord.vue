<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 查找--search区域 -->
      <div class="search_wrap">
        <el-input
          v-model="listQuery.title"
          placeholder="物品编号/仓库号/用户名"
          style="width: 200px;"
          class="filter-item"
        />
        <div class="date_wrap">
          <span>时间范围：</span>
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
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="item_No,sub_time" label="物品编号" width="140">
        <template scope="scope">
          <p>{{scope.row.item_No}}</p>
          <p style="color:#989898;">{{scope.row.sub_time}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="item_info" label="物品信息" width="270">
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
              >{{scope.row.item_info.info}}</p>
              <p style="color:#989898;">属性:{{scope.row.item_info.sx}}</p>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="ck_No,userName" label="仓库号/用户名" width="100">
        <template scope="scope">
          <p>{{scope.row.ck_No}}</p>
          <p style="color:#989898">{{scope.row.userName}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="buss_name" label="快递公司" width="80"></el-table-column>
      <el-table-column prop="kd_No" label="快递号" width="120"></el-table-column>
      <el-table-column prop="origin" label="来源" width="90"></el-table-column>
      <el-table-column prop="item_count" label="物品数量" width="70"></el-table-column>
      <el-table-column prop="item_jz" label="物品净重(kg)" width="90"></el-table-column>
      <el-table-column prop="yg_tj" label="预估体积(kg)" width="110"></el-table-column>
      <el-table-column prop="cw,cz_people" label="库位/操作人" width="100">
        <template scope="scope">
          <p>{{scope.row.cw}}</p>
          <p style="color:#1136FD">{{scope.row.cz_people}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template scope="scope">
          <p>内:{{scope.row.status.x}}</p>
          <p style="color:red">外:{{scope.row.status.y}}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="cz_people" width="115">
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
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-table-column>
    </el-table>
    <div class="bottom">
      <div class="bottom_btn">
        <button>发起运单</button>
        <button>退换货</button>
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
  </div>
</template>

<script>
import { parseTime } from "@/utils"; //格式化时间
import FileSaver from "file-saver";
import XLSX from "xlsx";
import _ from "../utils/format";

export default {
  name: "ComplexTable",
  filters: {},
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
      loading: false,
      tableData: [
        {
          item_No: "208881167614",
          sub_time: "2019-08-15 14:32:47",
          item_info: {
            img: "衣服",
            info: "热敏纸10卷、贴纸2盒、吊牌扎袋5包",
            sx: "正常"
          },
          ck_No: "P0VMJ",
          userName: "于海滨",
          buss_name: "顺丰",
          kd_No: "361392948228",
          origin: "自助包裹",
          item_count: "1",
          item_jz: "3.34",
          yg_tj: "3.48",
          cw: "BH-11",
          cz_people: "严婷",
          status: {
            x: "已出库",
            y: "(已出库)"
          }
        },
        {
          item_No: "208881167615",
          sub_time: "2019-08-15 14:32:47",
          item_info: {
            img: "衣服",
            info: "热敏纸10卷、贴纸2盒、吊牌扎袋5包",
            sx: "正常"
          },
          ck_No: "P0VM8",
          userName: "于海滨",
          buss_name: "顺丰",
          kd_No: "361392948229",
          origin: "自助包裹",
          item_count: "1",
          item_jz: "3.34",
          yg_tj: "3.48",
          cw: "BH-11",
          cz_people: "严婷",
          status: {
            x: "已出库",
            y: "(已出库)"
          }
        }
      ],
      list: null,
      total: 0,
      listQuery: {
        title: ""
      }
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
      if (
        this.formSearch.start_time == null ||
        this.formSearch.end_time == null
      ) {
        this.tableData.forEach(item => {
          if (
            item.item_No == this.listQuery.title ||
            item.ck_No == this.listQuery.title ||
            item.userName == this.listQuery.title
          ) {
            str.push(item);
          }
        });
      } else {
        this.formSearch.start_time = this.fmtTime(this.formSearch.start_time);
        this.formSearch.end_time = this.fmtTime(this.formSearch.end_time);
        if (
          item.sub_time >= this.formSearch.start_time &&
          item.sub_time <= this.formSearch.end_time
        ) {
          str.push(item);
        }
      }
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
<style >
.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 35px;
  line-height: 35px;
  padding: 0 10px;
}
</style>

