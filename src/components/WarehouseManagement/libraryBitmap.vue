<template>
  <div class="libraryBitmap">
    <div class="top">
      <!-- 快速搜索 -->

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
          <!-- 筛选按钮区域 -->
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
          >Search</el-button>
        </div>
        <!-- 下载按钮区域 -->
      </div>
    </div>
    <div class="center">
      <div class="library_A">
        <div class="A_row" v-for="itemX in row" :key="itemX">
          <div class="A_column" v-for="itemY in coloum" :key="itemY">
              <div v-if="itemY=='a'" style="width:10px" class="A_cell">{{itemX}}</div>
              <div v-else-if="itemX==' '" class="A_cell">{{itemY}}</div>
            <div v-else class="A_cell">
              <p>AA-{{itemX}}{{itemY}}</p>
              <p>Kenny</p>
              <p>P13AI</p>
              <p>0</p>
            </div>
          </div>
        </div>
      </div>
      <div class="library_A">
        <div class="A_row" v-for="itemX in row" :key="itemX">
          <div class="A_column" v-for="itemY in coloum" :key="itemY">
              <div v-if="itemY=='a'" style="width:10px" class="A_cell">{{itemX}}</div>
              <div v-else-if="itemX==' '" class="A_cell">{{itemY}}</div>
            <div v-else class="A_cell">
              <p>AA-{{itemX}}{{itemY}}</p>
              <p>Kenny</p>
              <p>P13AI</p>
              <p>0</p>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="library_A">
        <div class="A_row" v-for="itemX in row" :key="itemX">
          <div class="A_column" v-for="itemY in coloum" :key="itemY">
              <div v-if="itemY=='a'" style="width:10px" class="A_cell">{{itemX}}</div>
              <div v-else-if="itemX==' '" class="A_cell">{{itemY}}</div>
            <div v-else class="A_cell">
              <p>AA-{{itemX}}{{itemY}}</p>
              <p>Kenny</p>
              <p>P13AI</p>
              <p>0</p>
            </div>
          </div>
        </div>
      </div> -->

      
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      coloum: ['a',1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      row: [5, 4, 3, 2, 1,' '],
      listQuery: {
        title: ""
      }
    };
  },
  created(){

  },
  methods: {}
};
</script>
<style scoped>
.libraryBitmap {
  width: 100%;
}
.libraryBitmap .top {
  width: 100%;
  height: 40px;
  /* background-color: red; */
  padding-top: 5px;
  box-sizing: border-box;
}
/* 头部查询区域 */
div.filter-container {
  height: 30px;
  display: flex;
  justify-content: space-between;
  /* justify-content: space-around; */
  border-bottom: 1px solid #eaeaea;
  /* background-color: #fafafa; */
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

/* 库位图 */
.center{
    /* float: left; */
    display: flex;
    justify-content: space-between;
}
/* 库位图-最外层部分 */
.library_A {
    display: inline-block;
}
/* 库位图-行 */
.A_row {
  display: flex;
  background-color: green;
}
/* 库位图-列 */
.A_column {
  padding: 5px;
  background-color: yellow;
  border: 1px solid #ccc;
}
/* 库位图-cell部分 */
.A_cell {
  width: 53px;
  word-wrap: break-word;
  font-size: 13px;
}
</style>