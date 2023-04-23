<!--  -->
<template>
  <div class="formCustomization">
    <!-- 按条件查询 -->
    <div class="table-search">
      <el-form :model="tableForm" :inline="true" :size="size">
        <div style="display: inline-block;">
          <el-form-item label="填报部门">
           <!-- <el-cascader
               style="width: 300px;"
               collapse-tags
               clearable
               v-model="bgsjdw"
               placeholder="请选择"
               :options="construction_unit"
               :show-all-levels="false"
               :props="{ checkStrictly: false,emitPath:false,multiple: true, value: 'deptId', label: 'deptName' }"
           ></el-cascader> -->
           <el-select v-model="tableForm.dept_id" placeholder="请选择填报部门">
               <el-option v-for="(items, indexs) in construction_unit" :key="indexs" :label="items.deptName" :value="items.deptId"></el-option>
           </el-select>
          </el-form-item>
          <el-form-item label="申请时间">
            <el-date-picker
                clearable
                v-model="tableForm.sj"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
            ></el-date-picker>
            
          </el-form-item>
          
        </div>
        <el-form-item>
          <el-button type="primary" plain icon="el-icon-refresh-left" @click="resetForm">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="submitForm">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-control">
      <el-button v-hasPermi="[$route.path+':tool:table:insert']" type="primary" icon="el-icon-plus" :size="size" @click="handleTableRowControl('Add')">添加</el-button>
      <el-button v-hasPermi="[$route.path+':tool:table:del']"  type="danger" icon="el-icon-delete" :size="size" @click="handleTableRowControl('Delete')">删除</el-button>
    </div>
    <div class="table-content">
      <el-table
        id="table"
        row-key="id"
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.4)"
        ref="tableRef"
        border
        height="100%"
        :data="tableData"
        :size="size"
        @row-dblclick="handleTableRowClick"
        @selection-change="handleSelectionChange"
      >
      <!--   @row-click="handleTableRowClick"
        @sort-change="handleSortChange" -->
        <el-table-column fixed type="selection" :selectable="checkSelectState" width="45" reserve-selection></el-table-column>
        <el-table-column fixed type="index" :index="tableRowIndexRender" label="序号" width="60"
                         align="center"></el-table-column>
        <template v-for="(column, columnIndex) in tableColumnsList">
            
            
            <!-- <el-table-column
            v-if="column.columnName=='flow_stuts'"
              :key="columnIndex + column.columnName"
              sortable="custom"
              show-overflow-tooltip
              :align="column.columnAlign ? column.columnAlign : 'center'"
              :width="column.columnWidth ? column.columnWidth : 'auto'"
              :prop="column.columnName"
              :label="column.columnComment">
                 <template slot-scope="scope">
                     <span class='blue'>{{showState(sbbg_flow_stuts,scope.row.flow_stuts)}}</span>
             </template>
            </el-table-column> -->

            <el-table-column
            v-if="column.columnName=='bgsx'"
              :key="columnIndex + column.columnName"
              sortable="custom"
              show-overflow-tooltip
              :align="column.columnAlign ? column.columnAlign : 'center'"
              :width="column.columnWidth ? column.columnWidth : 'auto'"
              :prop="column.columnName"
              :label="column.columnComment">
                 <template slot-scope="scope">
                     <span>{{showState(bgsxList,scope.row.bgsx)}}</span>
             </template>
            </el-table-column>
          <el-table-column
          v-else
            :key="columnIndex + column.columnName"
            sortable="custom"
            show-overflow-tooltip
            :align="column.columnAlign ? column.columnAlign : 'center'"
            :width="column.columnWidth ? column.columnWidth : 'auto'"
            :prop="column.columnName"
            :label="column.columnComment">
            <!-- <slot :name="column.columnName" :row="scope.row" :column="column" slot-scope="scope">
                <div :style="{ color: showStyle(scope.row, column) }">{{ scope.row[column.columnName] }}</div>
            </slot> -->
          </el-table-column>
        </template>
        <el-table-column fixed="right" align="center" label="操作"
                         :width="tableControlWidth < 60 ? 60 : tableControlWidth">
          <template slot-scope="scope">
            <div class="btnBox">
              <el-button  :disabled="scope.row.flow_id?true:false"  v-hasPermi="[$route.path+':tool:column:edit']" type="text" size="small"
                         @click.stop="handleTableRowControl('Edit', scope.row)">编辑
              </el-button>
             
              <el-button  :disabled="scope.row.flow_id?true:false" v-hasPermi="[$route.path+':tool:column:del']" type="text" size="small"
                         @click.stop="handleTableRowControl('Delete', scope.row)">删除
              </el-button>
<!--                <el-button   type="text" size="small"
                           @click.stop="handleTableRowControl('Export', scope.row)">导出
                </el-button> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-page" v-if="tableData">
      <el-pagination
        class="pagination"
        ref="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="tableForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableTotal"
        :size="size"
        :current-page.sync="tableForm.pageNum"
      ></el-pagination>
    </div>

    <!-- 新增 -->
    <component v-if="comVisible" :is="comName" :dialogData="dialogData"
               @closeTableRowAdd="closeTableRowAdd"></component>
    <!-- 变更详情 -->
    <component v-if="comVisibleDetail" :is="comNameDetail" :rowId="rowId" @closeVisibleDetail="closeVisibleDetail"></component>
  </div>
</template>

<script>

import {permissionsMixin} from "@/mixins/permission.js";
import {listGybg,deleteGybg,exportEquiSbbg,getDept} from "./api/index";
import {
    getSysDictData
} from "@api/permission.js";
export default {
  mixins: [permissionsMixin],
  name: "bggl",
  components: {},
  data() {
    return {
        bgsjdw:[],
        construction_unit:[],
      size: "mini",
      tableForm: {
          dept_id:'',
          sj:[],
        pageNum: 1,
        pageSize: 10
      },
      bgdjList: [
          {
              dictLabel: '一般变更',
              dictValue: '一般变更',
          },
          {
              dictLabel: '重大变更',
              dictValue: '重大变更',
          },
      ],
      stateList: [
          
      ],
      
      tableData: [],
      tableLoading: false,
      tableParams: {
        pageNum: 1,
        pageSize: 10
      },
      tableTotal: 0,
      tableColumnsList: [
        {
          columnName: "code",
          columnComment: "编号"
        },
        {
          columnName: "flow_stuts",
          columnComment: "当前节点"
        },
        {
          columnName: "report_monthly",
          columnComment: "月度"
        },
        {
          columnName: "dept_name",
          columnComment: "填报部门"
        },
        {
          columnName: "report_user_name",
          columnComment: "填报人"
        },
        {
          columnName: "date_of_application",
          columnComment: "申请日期"
        },
        {
          columnName: "sum",
          columnComment: "计划金额(万元)"
        }
      ],
      nowDialogData: null,
      tableDialogType: null,
      comVisible: false,
      comVisibleDetail: false,
      comName: null,
      comNameDetail: null,
      dialogData: null,
      rowId: null,
      sbbg_flow_stuts:[],
      tableChekIds:[],
      tableMultipleSelection:[],
      //进度
      progressText:'0',
    };
  },
  watch: {},
  computed: {},
  created() {
  },
  mounted() {
      this.getDept();
    
  },
  methods: {
   
      getDept(){
        getDept().then((res) => {
            if (res.code == 200) {
                this.construction_unit = res.data;
                this.tableForm.dept_id=this.construction_unit[0].deptId;
                this.getTableData();
            }
        });  
      },
      checkSelectState(row){
          if(row.flow_id){
              return false;
          }else{
              return true;
          }
      },
      //选中的表格数据集合
      handleSelectionChange(val) {
           this.tableMultipleSelection = val;
          this.tableChekIds = val.map(item => item.id);
      },
      //匹配
      showState(list,value){
          var obj =list.find((item)=>{
              return item.dictValue==value
          })
          if(obj)
          {
              
          return obj.dictLabel
          }else{
            return ''  
          }
      },
     /* getSbbfZt(){
          
          getSysDictData({ dictType: 'sbbg_flow_stuts',pageSize:1000 }).then((res)=>{
              if (res.code == 200) {
                  this.sbbg_flow_stuts=res.rows;
                  this.getTableData();
              } else {
                  this.$message({
                      message: res.msg,
                      type: "error"
                  });
              }
          })
      },*/
    resetForm() {
        this.tableForm={
            dept_id:this.construction_unit[0].deptId,
          sj:[],
        pageNum: 1,
        pageSize: 10
      };
      this.bgsjdw=[];
        this.getTableData();
    },
    submitForm() {
         this.getTableData();
    },
    handleTableRowControl(type, row) {
      this.tableDialogType = type;
      if (row) {
        this.nowDialogData = JSON.parse(JSON.stringify(row));
      } else {
        this.nowDialogData = null;
      }
      if (type == "Query") {
        this.getTableData();
      } else if (type == "Add") {
        this.dialogData = null
        this.handleTableRowAdd();
      } else {
        if (row) {
          if (type == "Edit") {
            this.handleTableRowEdit(row);
          }else if (type == "Delete") {
                      this.handleTableRowDelete(row);
                  }
                  else if (type == "Export") {
                              this.handleTableRowExport(row);
                          }
          //  else if (type == "Look") {
          //     this.tableDialogFormDisabled = true;
          //     this.tableDialogVisible = true;
          //     this.handleTableRowLook(row);
          // } else if (type == "Delete") {
          //     this.handleTableRowDelete(row);
          // }
        } else {
          if (this.tableMultipleSelection.length != 0) {
              if (type == "Delete") {
                  this.handleTableRowDelete(row);
                  return;
              }
              if (this.tableMultipleSelection.length > 1) {
                  this.$message({
                      type: "warning",
                      message: "只能选择一条数据,才可进行此操作!"
                  });
              } else {
                  if (type == "Edit") {
                      this.handleTableRowEdit(row);
                  } 
                  // else if (type == "Look") {
                  //     this.tableDialogFormDisabled = true;
                  //     this.tableDialogVisible = true;
                  //     this.handleTableRowLook(row);
                  // }
              }
          } else {
              this.$message({
                  type: "warning",
                  message: "请选择一条数据,才可进行此操作!"
              });
          }
        }
      }
    },
    handleTableRowExport(row){
        var loading = this.$loading({
            lock: true,
            text: `数据提交中，进度${this.progressText}%,请稍后~`,
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
        });
        exportEquiSbbg({sbbg_id:row.id},(progressEvent)=> {
                            this.progressText = (progressEvent.loaded / progressEvent.total * 100 | 0);
                            loading.setText(`数据提交中，进度${this.progressText}%,请稍后~`)
                        }).then(res => {
            
            if (res) {
              let blob = new Blob([res],{type:res.type})
              let downloadElement = document.createElement('a')
              let href = window.URL.createObjectURL(blob)
              downloadElement.href =  href
              downloadElement.download = '变更管理-'+row.num
              document.body.appendChild(downloadElement)
              downloadElement.click()
              document.body.removeChild(downloadElement);
              window.URL.revokeObjectURL(href)
              
               loading.close();
                this.$message({
                    type: "success",
                    message: "导出成功!"
                });
              
            } else {
                this.$message({
                    type: "error",
                    message: res.msg
                });
            }
        });
        
        
        
        
    },
    handleTableRowDelete(row) {
        let ids = "";
        if (row) {
            ids = row.id;
        } else {
            ids = this.tableChekIds.join();
        }
        this.$confirm("确认要删除吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        })
            .then(() => {
                deleteGybg({ids:ids}).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        this.tableDialogType ="Query"
                        this.getTableData();
                    } else {
                        this.$message({
                            type: "error",
                            message: res.msg
                        });
                    }
                });
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });
    },
    //行点击
    handleTableRowClick(row) {
        if(row.flow_id){
            
            this.comNameDetail = () => import("@/views/wzgl/xqjhgl/wzxqtb/details/details.vue");
            this.comVisibleDetail = true;
            this.rowId = row.id;
        }else{
            this.$message({
                type: "warning",
                message: "流程开始后才可以查看流程！"
            });
        } 
      
    },
    handleTableRowAdd() {
      this.comName = () => import("@/views/wzgl/xqjhgl/wzxqtb/add.vue");
      this.comVisible = true;
    },
    handleTableRowEdit(row) {
      this.dialogData = row;
      this.comName = () => import("@/views/wzgl/xqjhgl/wzxqtb/add.vue");
      this.comVisible = true;
    },
    closeTableRowAdd() {
      this.comVisible = false;
      this.getTableData();
    },
    closeVisibleDetail(){
        this.comVisibleDetail=false;
        this.getTableData();
    },
    exportFile() {
    },
    getTableData() {
      listGybg({
          start_time:this.tableForm.sj[0]?this.tableForm.sj[0]:'',
          end_time:this.tableForm.sj[1]?this.tableForm.sj[1]:'',
          dept_id:this.tableForm.dept_id,
          pageNum: this.tableForm.pageNum,
          pageSize: this.tableForm.pageSize
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.rows
          this.tableTotal = res.total
          this.resetTablelayout();
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    // 序号定制getTableData
    tableRowIndexRender(index) {
      return (this.tableForm.pageNum - 1) * this.tableForm.pageSize + index + 1;
    },
    //分页切换
    handleCurrentChange(currentPage) {
      this.tableForm.pageNum = currentPage;
      this.getTableData();
    },
    //每页条数改变
    handleSizeChange(val) {
      this.tableForm.pageSize = val;
      this.getTableData();
    },
    //表格样式重置
    resetTablelayout() {
      this.$nextTick(() => {
        this.autoTableControlWidth("tableRef");
        this.windowResize();
      });
    },
    // 监听窗口resize
    windowResize() {
      this.$nextTick(() => {
        window.removeEventListener("resize", this.getAutoHeight);
        this.getAutoHeight();
        window.addEventListener("resize", this.getAutoHeight);
      });
    },
    getAutoHeight() {
      this.autoTableHeight("tableRef", 138);
    }
  }
};
</script>
<style scoped lang="scss">
.formCustomization {
  height: 100%;

  .input {
    margin-bottom: 10px;
  }

  .tree {
    overflow: auto;
    height: calc(100% - 38px);
  }

  .table-page {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }

  .table-control {
    .el-button {
      margin-bottom: 18px;
    }
  }
}
.blue{
    color: #409eff;
}
.formCustomization{
    display: flex;
    flex-direction: column;
    .table-content{
        flex: 1;
        
    }
}
:deep(.el-cascader .el-input .el-input__inner){
    height: 28px !important; 
}
:deep(.el-cascader){
    overflow: hidden;
}
:deep(.el-cascader__tags ){
    height: 100%;
}
</style>
