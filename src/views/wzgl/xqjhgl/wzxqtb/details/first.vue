<template>
  <div class="module-item">
    <el-form  :model="dialogForm" ref="dialogForm" class="dialogForm"  label-position="right" label-width="120px" :size="size">
        <el-row>
           <el-col :span="12">
               <el-form-item label="编号">
                 <el-input clearable v-model="dialogForm.code" disabled></el-input>
               </el-form-item>
             </el-col>
             <el-col :span="12">
               <el-form-item label="申请日期">
                 <el-date-picker
                    :disabled="isHaveSave||showFieldsOrDisabled(columnConfig,'date_of_application',true)"
                     v-model="dialogForm.date_of_application"
                     type="date"
                     format="yyyy-MM-dd"
                     value-format="yyyy-MM-dd"
                     placeholder="请选择申请日期"
                     style="width: 100%;"
                 ></el-date-picker>
               </el-form-item>
             </el-col>
             <el-col :span="12">
               <el-form-item label="申请人">
                 <el-input clearable v-model="dialogForm.report_user_name" disabled></el-input>
               </el-form-item>
             </el-col>
            <el-col :span="12">
              <el-form-item label="申请单位">
                <el-input clearable v-model="dialogForm.dept_name" disabled></el-input>
              </el-form-item>
            </el-col>
           <el-col :span="12" class="flex">
              <el-form-item label="提报类型">
                  <el-radio-group v-model="dialogForm.report_monthly_state" :disabled="isHaveSave||showFieldsOrDisabled(columnConfig,'report_monthly_state',true)">
                    <template v-for="(option, optionIndex) in bgsxList">
                      <el-radio :label="option.dictValue" :key="optionIndex">{{ option.dictLabel }}</el-radio>
                    </template>
                  </el-radio-group>
              </el-form-item>
              <el-form-item label="" label-width="30px" class="flex align-items-center">
                 <el-date-picker
                    :disabled="isHaveSave||showFieldsOrDisabled(columnConfig,'report_monthly',true)"
                     v-model="dialogForm.report_monthly"
                     type="month"
                     format="yyyy-MM"
                     value-format="yyyy-MM"
                     placeholder="请选择月份"
                     style="width: 100%;"
                 ></el-date-picker>
              </el-form-item>
           </el-col>
           <el-col :span="12">
               <el-form-item label="专业管理部门"  prop="administrative_dept" :rules="[{message: '请选择部门!',required: true}]">
                   <el-select :disabled="isHaveSave||showFieldsOrDisabled(columnConfig,'administrative_dept',true)" v-model="dialogForm.administrative_dept" placeholder="请选择部门" :rules="[{message: '请选择部门!',required: true}]">
                       <el-option v-for="(items, indexs) in construction_unit" :key="indexs" :label="items.deptName" :value="items.deptId"></el-option>
                   </el-select>
               </el-form-item>
           </el-col>
            <el-col :span="24">
                <el-form-item label="说明">
                    <el-input
                        type="textarea"
                        clearable
                        v-model="dialogForm.description"
                        :autosize="{ minRows: 5, maxRows: 10 }"
                        style="width: 100%"
                        resize="none"
                        :disabled="isHaveSave||showFieldsOrDisabled(columnConfig,'description',true)"
                    ></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <div class="formBox">
           <!-- <formCustomization
                class="myTable"
                ref="myTable"
                :dialogData="formDialogData"
            >
            <template v-slot:tableInlineControl="scope">
                 <el-button v-hasPermi="[$route.path+':tool:column:sh']" type="text" size="small" @click.stop="handleSh( scope.row)">
                     审核
                 </el-button>
               </template>
            </formCustomization> -->
            
            <tbTable ref="tbTable" v-if="dialogForm" :dialogData="dialogForm" :button_yw="isHaveSave||showFieldsOrDisabled(columnConfig,'button_yw',true)" :button_sh="isHaveSave||showFieldsOrDisabled(columnConfig,'button_sh',true)"></tbTable>
            
        </div>
        
    </el-form>
   <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" :size="size" @click="submitDialogForm('tableDialogForm','1')">保 存</el-button>
        <el-button type="primary" :size="size" @click="submitDialogForm('tableDialogForm','2')">提 交</el-button>
    </div> -->
    <!-- <component v-if="bgdjDialogVisible" :dialogRowData="dialogForm" :is="comName" @closeBgdjDialog="closeBgdjDialog" :isShowSave="isShowSave"></component>
    <component v-if="bgfwDialogVisible" :dialogRowData="dialogForm" :is="comNameBgfw" @closeBgfwDialog="closeBgfwDialog"></component>
    <component v-if="sbTreeDialogVisible" :dialogRowData="dialogForm" :is="comNameSbTree" @closeSBtreeDialog="closeSBtreeDialog"></component> -->
    <fliePreview :fileVisible.sync="fileVisible" :previewDown="previewDown"></fliePreview>
  </div>
</template>

<script>
import { saveOrUpdateGybg, deleteFilesById, getEditAreaList, getFilesPrames, upDateFiles, editSqxx, getEditLevelList,listDept } from '../api';
    import tbTable from '@/views/wzgl/xqjhgl/wzxqtb/tbTable/index.vue';
import fliePreview from '@com/fliePreview'
import {permissionsMixin} from "@/mixins/permission.js";
export default {
  name: "add",
  mixins: [permissionsMixin],
  components: { tbTable, fliePreview},
  props: {
    dialogRowData: {
      type: Object,
      default: () => {
      }
    },
    isHaveSave:{
        type:Boolean,
        default:false
    },
    columnConfig:{
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      dialogTitle: "变更详情",
      dialogVisible: true,
      bgdjDialogVisible: false,
      bgfwDialogVisible: false,
      sbTreeDialogVisible: false,
      comName: null,
      comNameBgfw: null,
      comNameSbTree: null,
      size: "mini",
      dialogForm: {
        
      },
      bgsxList: [
        {
          dictLabel: "月度计划",
          dictValue: "1"
        },
        {
          dictLabel: "临时计划",
          dictValue: "2"
        }
      ],
      bgdjList: [
        {
          dictLabel: "一般变更",
          dictValue: "一般变更"
        },
        {
          dictLabel: "较大变更",
          dictValue: "较大变更"
        },
        {
          dictLabel: "重大变更",
          dictValue: "重大变更"
        }
      ],
      sjzyList: [
        {
          dictLabel: "动设备",
          dictValue: "动设备"
        },
        {
          dictLabel: "静设备",
          dictValue: "静设备"
        },
        {
          dictLabel: "电气",
          dictValue: "电气"
        },
        {
          dictLabel: "仪表",
          dictValue: "仪表"
        },
        {
          dictLabel: "计量",
          dictValue: "计量"
        },
        {
          dictLabel: "车辆",
          dictValue: "车辆"
        },
        {
          dictLabel: "消气防",
          dictValue: "消气防"
        },
        {
          dictLabel: "其他",
          dictValue: "其他"
        }
      ],
      dictList: [],
      construction_unit: [],
      bgsjjsFileList: {
        fileList: [],
        files: [],
        id: ''
      },
      xgfjFileList: {
        fileList: [],
        files: [],
        id: ''
      },
      gzfwOptions: [],
      dialogFormGzfw: [],
      bgsjdw: [],
      bgcydw: [],
      
      saveTableData:[],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.dialogForm.clearValidate()
    }) 
    this.getCompany();
    this.dialogForm = this.dialogRowData
    this.dialogForm.administrative_dept = Number(this.dialogForm.administrative_dept)
    // this.getTableData();
  },
  methods: {
      
      checkLjzj(rule, value, callback,row){
        setTimeout(() => {
            if (!value) {
                  callback()
            }else{
              if (!/^(\-|\+)?\d+(\.\d+)?$/.test(value)) {
                callback(new Error('请输入数字值！'))
              } else {
                if (value >row.old_value) {
                  callback(new Error('累计折旧必须小于原值！'))
                } else {
                  callback()
                }
              }
            }
        }, 400)
      },
      getTableData(){
        selectEquiScrapInfo(this.dialogForm.id).then(res => {
          if (res.code == 200) {
           this.dialogForm.tableData=res.data;
           this.$set(this.dialogForm, 'sbNumber', this.dialogForm.tableData.length);
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        });
        
      },
      showResidual_value(row) {
          // row.residual_value = parseFloat(row.old_value) - parseFloat(row.cumulative_depreciation);
          row.residual_value = this.accSub(row.old_value,row.cumulative_depreciation);
          return isNaN(row.residual_value) ? '' : row.residual_value;
      },
      del(index){
          
          this.$confirm("确认此操作吗?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
          }).then((res) => {
              if( this.dialogForm.tableData.length==1){
                  this.$message({
                    message: '至少含有一条设备数据！',
                    type: "warning"
                  }); 
              }else{
                  
                 this.dialogForm.tableData.splice(index,1); 
                  this.$set(this.dialogForm,'sbNumber',this.dialogForm.tableData.length)
              }
          }).catch((res) => {
          this.$message({
              type: "info",
              message: "已取消此操作"
          });
      });

      },
    isDisabled(){
        if(this.dialogRowData.stuts>this.$parent.$parent.tabsIndex+1){
          return true
        }else{
            if(this.isHaveSave){
              return false
            }else{
              return true
            }
        }
    },
      getFileList(id, item) {
        getFilesPrames({"dataId": id}).then(res => {
          if (res.code == 200) {
            item.fileList = [];
            res.data.rows.forEach((v, i) => {
              item.fileList.push({
                name: v.fileName,
                url: v.filePath,
                id: v.id
              })
            })
            
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        });
      },
    openBgdj() {
      this.comName = () => import("@/views/sbgl/bgbfgl/bfgl/bgdj.vue");
      this.bgdjDialogVisible = true;
    },
    openSbTree() {
      this.comNameSbTree = () => import("@/views/sbgl/bgbfgl/bfgl/details/sbTree.vue");
      this.sbTreeDialogVisible = true;
    },
    closeBgdjDialog(data, bgysu) {
      this.bgdjDialogVisible = false;
      this.dialogForm.level = data;
      this.dialogForm.editLevList = bgysu;
    },
    closeBgfwDialog(bgysu) {
      this.bgfwDialogVisible = false;
      this.dialogForm.eitAreaList = bgysu;
    },
    closeSBtreeDialog(data) {
      this.sbTreeDialogVisible = false;
        var cfDataSl=0;
        data.forEach((item, index) => {
            if (this.saveTableData.indexOf(data.formId + '-' + item.id) == -1) {
                this.dialogForm.tableData.push({
                    form_id: data.formId,
                    form_tab_id: item.id,
                    equi_name: item.f_equi_sbmc,
                    old_value: item.f_equi_sbyz,
                    equi_code: item.f_equi_zcbh,
                    model: item.f_equi_ggxh,
                    number: '1',
                    area: '',
                    date_time: '',
                    cumulative_depreciation: '',
                    residual_value: '',
                    dept: [],
                    scrap_reason: '',
                    notes: '',
                });
                this.saveTableData.push(data.formId + '-' + item.id);
            }else{
                cfDataSl++;
            }
        });
        if(cfDataSl>0){
            this.$message({
                message: '请勿重复添加数据！',
                type: 'warning',
            });
        }
     this.$set(this.dialogForm,'sbNumber',this.dialogForm.tableData.length)
    },
    // 选择文件
    handleChange(file, fileList, item,id) {
      let that = this;
      const isLt2M = file.raw.size / 1024 / 1024 < 100;
      if (!isLt2M) {
        item.files=[];
        item.fileList=[];
        this.$message.error("所选文件大小不能超过 100MB!");
        return
      }
      if (isLt2M) {
        item.files.push(file.raw)
      }
      var len = $('#'+id).find('.el-upload__input')[0].files.length;
      if(len==item.files.length){
        addFile()
      }
      
    function addFile() {
        
        const formData = new FormData()
        
        item.files.forEach(file => {
            formData.append("files", file);
        });
        
        
        // formData.append('files', file.raw);
        formData.append('dataId', item.id);
        var loading = that.$loading({
            lock: true,
            text: `数据提交中，进度${that.progressText}%,请稍后~`,
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
        });
      upDateFiles(formData,(progressEvent)=> {
                            that.progressText = (progressEvent.loaded / progressEvent.total * 100 | 0);
                            loading.setText(`数据提交中，进度${that.progressText}%,请稍后~`)
                        }).then(res => {
          if (res.code == 200) {
            item.id = res.msg
            
             item.files=[];that.getFileList(res.msg, item)
            
          } else {
            that.$message({
              message: res.msg,
              type: "error"
            });
          }
         loading.close();
        });
      }
    
      function delFile() {
        fileList.splice(fileList.findIndex(item => item.url === file.url), 1);
      }
    },
   // 移除文件
   handleRemove(file, fileList, item) {
     // let files = item.files;
     // let list = item.fileList;
     // item.files.splice(item.files.findIndex(item => item.url === file.url), 1);
     // item.fileList.splice(item.fileList.findIndex(item => item.url === file.url), 1);
     console.log(item);
   
     deleteFilesById({"dataIds": file.id}).then(res => {
       if (res.code == 200) {
         this.getFileList(item.id)
       } else {
         this.$message({
           message: res.msg,
           type: "error"
         });
       }
     });
   
   },
    resetDialogForm(ref) {
    },
    getCompany() {
        listDept().then((res) => {
            if (res.code == 200) {
                this.construction_unit = res.data;
            }
        });
    },

    getFileList(id, item) {
      getFilesPrames({"dataId": id}).then(res => {
        if (res.code == 200) {
          item.fileList = [];
          res.data.rows.forEach((v, i) => {
            item.fileList.push({
              name: v.fileName,
              url: v.filePath,
              id: v.id
            })
          })
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    submitDialogForm(flag) {
        this.$refs['dialogForm'].validate(valid => {
            if (valid) {
               const loading = this.$loading({
                         lock: true,
                         text: '正在加载中',
                         spinner: 'el-icon-loading',
                         background: 'rgba(0, 0, 0, 0.7)'
                       });
                    this.dialogForm.wzglXqjhglTbInfos=this.$refs.tbTable.tableData;
                    saveOrUpdateGybg(this.dialogForm).then((res) => {
                        if (res.code == 200) {
                          if(flag){
                              this.$parent.$parent.approvalEqui(loading);
                          }else{
                            loading.close();
                              this.$emit('closeVisibleDetail');
                              this.$message({
                                message: '提交成功',
                                type: 'success'
                              });
                          }
                        } else {
                          loading.close();
                          this.$message({
                            type: "error",
                            message: res.msg
                          });
                        }
                    });
                    
            } else {
                console.log("error submit!!");
                return false;
            }
        });
        
        
     
      
    }
  }
};
</script>

<style lang="scss" scoped>

.module-item {
  // width: 80%;
  // box-shadow: 0 0 5px #ddd;
  padding: 20px 0;
  // margin: 20px auto;
    height: 100%;
  .tools-btn {
    width: 140px;
    margin-left: -70px;
    position: fixed;
    left: 50%;
    bottom: 0.2rem;
  }

  .dialogForm {
    // width: 80%;
    margin: auto;
    height: 97%;
    display: flex;
    flex-direction:column;
  }
}

/deep/ .el-tree-node__content:hover, /deep/ .el-upload-list__item:hover {
  background-color: rgba(60, 147, 236, 0.49);

  .el-upload-list__item-name, .el-icon-close, .el-icon-document {
    color: white;
  }
}
/deep/ .flex-row {
  .el-form-item__content {
    display: flex;

    .el-select {
      width: 100%;
    }
  }
}

::v-deep .el-input-group__append, ::v-deep .el-input-group__prepend{
    background: var(--border-color);
    color: var(--font-color);
    border: 1px solid var(--border-color);
}
// .mytable{
//     margin-bottom: 18px;
// }
::v-deep.el-table.mytable .cell{
        overflow: inherit !important;
    }
    ::v-deep.el-table.mytable .cell.el-tooltip{
        overflow: hidden !important;
    }
    ::v-deep .el-table.mytable .el-table__body-wrapper .cell > div.is-error {
        overflow: inherit !important;
    }
::v-deep .el-table .el-form-item{
    margin-bottom: 0;
}
 .formBox {
     flex: 1;
        // padding-top: 15px;
        background: var(--bg-light-color);
        :deep(.el-form-item) {
            margin-bottom: 18px !important;
        }
        :deep(.el-form-item__content) {
            display: flex;
            align-items: center;
            span.tsSpan {
                width: 100%;
                height: 28px;
                line-height: 28px;
                border: 0.01rem solid var(--disabled-color);
                border-radius: 4px;
                padding: 0 15px;
            }
        }
        :deep(.el-cascader) {
            width: 100%;
        }
    }
    :deep(.el-table__expand-icon) {
        color: #fff;
    }
    .bgdj {
        margin-right: 15px;
    }
</style>
