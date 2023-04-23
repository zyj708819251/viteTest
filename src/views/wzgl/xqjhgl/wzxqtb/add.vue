<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="100%"
        :lock-scroll="true"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :destroy-on-close="false"
        :size="size"
        :append-to-body="false"
        class="myDialog"
    >
        <el-form :model="dialogForm" ref="dialogForm" class="dialogForm" label-width="auto" label-position="right" :size="size">
            <el-row>
               <el-col :span="12">
                   <el-form-item label="编号">
                     <el-input clearable v-model="dialogForm.code" disabled></el-input>
                   </el-form-item>
                 </el-col>
                 <el-col :span="12">
                   <el-form-item label="申请日期">
                     <el-date-picker
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
                      <el-radio-group v-model="dialogForm.report_monthly_state">
                        <template v-for="(option, optionIndex) in bgsxList">
                          <el-radio :label="option.dictValue" :key="optionIndex">{{ option.dictLabel }}</el-radio>
                        </template>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="" label-width="30px" class="flex align-items-center">
                     <el-date-picker
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
                      <!-- <el-cascader
                           collapse-tags
                           clearable
                           filterable
                           v-model="dialogForm.administrative_dept"
                           placeholder="请选择单位"
                           :options="construction_unit"
                           :show-all-levels="false"
                           :props="{ checkStrictly: false,emitPath:false,multiple: true, value: 'deptId', label: 'deptName' }"
                       ></el-cascader> -->
                       
                       <el-select v-model="dialogForm.administrative_dept" placeholder="请选择部门" :rules="[{message: '请选择部门!',required: true}]">
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
                
                <tbTable ref="tbTable" :dialogData="dialogForm" :button_yw="false" :button_sh="true"></tbTable>
            </div>
        </el-form>
       <div slot="footer" class="dialog-footer">
            <el-button type="primary" :size="size" @click="submitDialogForm('tableDialogForm','1')">保 存</el-button>
            <el-button type="primary" :size="size" @click="submitDialogForm('tableDialogForm','2')">提 交</el-button>
        </div>
        <component v-if="bgdjDialogVisible" :dialogRowData="dialogForm" :is="comName" @closeBgdjDialog="closeBgdjDialog" :isShowSave="isShowSave"></component>
        <component v-if="bgfwDialogVisible" :dialogRowData="dialogForm" :is="comNameBgfw" @closeBgfwDialog="closeBgfwDialog"></component>
        <component v-if="sbTreeDialogVisible" :dialogRowData="dialogForm" :is="comNameSbTree" @closeSBtreeDialog="closeSBtreeDialog"></component>
        
        <fliePreview :fileVisible.sync="fileVisible" :previewDown="previewDown"></fliePreview>
    </el-dialog>
</template>

<script>
    import { saveOrUpdateGybg, deleteFilesById, getEditAreaList, getFilesPrames, upDateFiles, editSqxx, getEditLevelList,listDept } from './api';
    import tbTable from '@/views/wzgl/xqjhgl/wzxqtb/tbTable/index.vue';
    import fliePreview from '@com/fliePreview';
    import { permissionsMixin } from '@/mixins/permission.js';

    import { getSysDictData } from '@api/permission.js';

    export default {
        mixins: [permissionsMixin],
        name: 'add',
        components: {
            tbTable,
            fliePreview
        },
        props: {
            dialogData: {
                type: Object,
                default: {},
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
                dialogShData:{
                  advice:''  
                },
                dialogShVisible:false,
                formDialogData:{
                  formId: '202219822',  
                },
                equi_azqy: [],
                dialogTitle: '新增变更',
                dialogVisible: true,
                bgdjDialogVisible: false,
                bgfwDialogVisible: false,
                sbTreeDialogVisible: false,
                comName: null,
                comNameBgfw: null,
                comNameSbTree: null,
                size: 'mini',
                dialogForm: {
                    report_monthly_state:"1"
                },
                task_type: [],
                djList: [
                    {
                        dictLabel: '一级',
                        dictValue: '一级',
                    },
                    {
                        dictLabel: '二级',
                        dictValue: '二级',
                    },
                ],
                zllxList: [
                    {
                        dictLabel: '生产操作',
                        dictValue: '生产操作',
                    },
                    {
                        dictLabel: '维修操作',
                        dictValue: '维修操作',
                    },
                    {
                        dictLabel: '抢修操作',
                        dictValue: '抢修操作',
                    },
                    {
                        dictLabel: '应急类',
                        dictValue: '应急类',
                    },
                ],
                dyssbh: [
                    {
                        dictLabel: '临时编号1',
                        dictValue: '1',
                    },
                    {
                        dictLabel: '临时编号2',
                        dictValue: '2',
                    },
                ],
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
                sjzyList: [
                    {
                        dictLabel: '工艺',
                        dictValue: '工艺',
                    },
                    {
                        dictLabel: '动设备',
                        dictValue: '动设备',
                    },
                    {
                        dictLabel: '静设备',
                        dictValue: '静设备',
                    },
                    {
                        dictLabel: '电气',
                        dictValue: '电气',
                    },
                    {
                        dictLabel: '仪表',
                        dictValue: '仪表',
                    },

                    {
                        dictLabel: '车辆',
                        dictValue: '车辆',
                    },

                    {
                        dictLabel: '安全管理',
                        dictValue: '安全管理',
                    },
                    {
                        dictLabel: '质量',
                        dictValue: '质量',
                    },
                    {
                        dictLabel: '消气防',
                        dictValue: '消气防',
                    },
                    {
                        dictLabel: '计量',
                        dictValue: '计量',
                    },
                    {
                        dictLabel: '化验',
                        dictValue: '化验',
                    },
                    {
                        dictLabel: '物资供应',
                        dictValue: '物资供应',
                    },
                    {
                        dictLabel: '人力资源',
                        dictValue: '人力资源',
                    },
                    {
                        dictLabel: '其他',
                        dictValue: '其他',
                    },
                ],
                dictList: [],
                construction_unit: [],
                bgsjjsFileList: {
                    fileList: [],
                    files: [],
                    id: '',
                },
                xgfjFileList: {
                    fileList: [],
                    files: [],
                    id: '',
                },
                gzfwOptions: [],
                dialogFormGzfw: [],
                bgsjdw: [],
                administrative_dept: [],
                isShowSave: false,
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
            };
        },
        mounted() {
            this.$nextTick(() => {
                this.$refs.dialogForm.clearValidate();
            });
            this.getCompany();
            if (this.dialogData) {
                this.dialogTitle = '修改计划申请单';
                this.dialogForm = this.dialogData;
                this.dialogForm.administrative_dept=Number(this.dialogForm.administrative_dept)
            } else {
                this.dialogTitle = '新增计划申请单';
                this.dialogForm.date_of_application = this.getNowTime(3)
                this.dialogForm.dept_name = sessionStorage.getItem('department')
                this.dialogForm.report_user_name=sessionStorage.getItem('username')
            }
            
        },
        methods: {
            saveState(){
              this.dialogShVisible=false;
            },
            handleSh(row){
                this.dialogShVisible=true;
            },
            // 选择文件
            handleChange(file, fileList, item, id) {
                let that = this;
                const isLt2M = file.raw.size / 1024 / 1024 < 100;
                if (!isLt2M) {
                    item.files = [];
                    item.fileList = [];
                    this.$message.error('所选文件大小不能超过 100MB!');
                    return;
                }
                if (isLt2M) {
                    item.files.push(file.raw);
                }
                var len = $('#' + id).find('.el-upload__input')[0].files.length;
                if (len == item.files.length) {
                    addFile();
                }

                function addFile() {
                    const formData = new FormData();

                    item.files.forEach((file) => {
                        formData.append('files', file);
                    });

                    // formData.append('files', file.raw);
                    formData.append('dataId', item.id);
                    var loading = that.$loading({
                        lock: true,
                        text: `数据提交中，进度${that.progressText}%,请稍后~`,
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)',
                    });
                    upDateFiles(formData, (progressEvent) => {
                        that.progressText = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
                        loading.setText(`数据提交中，进度${that.progressText}%,请稍后~`);
                    }).then((res) => {
                        if (res.code == 200) {
                            item.id = res.msg;

                            item.files = [];
                            that.getFileList(res.msg, item);
                        } else {
                            that.$message({
                                message: res.msg,
                                type: 'error',
                            });
                        }
                        loading.close();
                    });
                }

                function delFile() {
                    fileList.splice(
                        fileList.findIndex((item) => item.url === file.url),
                        1
                    );
                }
            },
            getFileList(id, item) {
                getFilesPrames({ dataId: id }).then((res) => {
                    if (res.code == 200) {
                        item.fileList = [];
                        res.data.rows.forEach((v, i) => {
                            item.fileList.push({
                                name: v.fileName,
                                url: v.filePath,
                                id: v.id,
                            });
                        });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error',
                        });
                    }
                });
            },

            // 移除文件
            handleRemove(file, fileList, item) {
                // let files = item.files;
                // let list = item.fileList;
                // item.files.splice(item.files.findIndex(item => item.url === file.url), 1);
                // item.fileList.splice(item.fileList.findIndex(item => item.url === file.url), 1);

                deleteFilesById({ dataIds: file.id }).then((res) => {
                    if (res.code == 200) {
                        this.getFileList(item.id);
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error',
                        });
                    }
                });
            },
            getCompany() {
                listDept().then((res) => {
                    if (res.code == 200) {
                        this.construction_unit = res.data;
                    }
                });
            },
            submitDialogForm(ref, type) {
                this.$refs['dialogForm'].validate(async (valid) => {
                    if (valid) {
                        
                        const loading = this.$loading({
                            lock: true,
                            text: '正在加载中',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)',
                        });
                        this.dialogForm.flow_stuts = type;
                        this.dialogForm.wzglXqjhglTbInfos=this.$refs.tbTable.tableData;
                        this.dialogForm.sum=this.$refs.tbTable.sum;
                        this.dialogForm.count=this.$refs.tbTable.count;
                        saveOrUpdateGybg(this.dialogForm).then((res) => {
                            if (res.code == 200) {
                                this.$message({
                                    message: res.msg,
                                    type: 'success',
                                });
                                this.$emit('closeTableRowAdd');
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.msg,
                                });
                            }
                            loading.close();
                        });
                    } else {
                        return false;
                    }
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .bgdj {
        margin-right: 15px;
    }

    /deep/ .flex-row {
        .el-form-item__content {
            display: flex;

            .el-select {
                width: 100%;
            }
        }
    }
    .tsClass {
        :deep(.el-form-item__content) {
            display: flex;
            align-items: center;
            color: #fff;
            & > span {
                padding-left: 10px;
            }
        }
        :deep(.el-form-item__label) {
            text-align: right;
        }
    }
    .ml30 {
        margin-left: 30px;
        display: inline-block;
        width: 180px;
    }
    
    .myDialog{
        :deep(.el-dialog){
            height: 100vh;
        }
        :deep(.el-dialog__body){
            height:100%;
        }
    }
    ::v-deep .myDialog .el-dialog__body{
        height:100%;
    }
    // :deep(.el-cascader){
    //     overflow: inherit !important; 
    // }
    // :deep(.el-cascader .el-input .el-input__inner){
    //     height: auto !important; 
    // }
    // :deep(.el-cascader__tags ){
    //     height: auto !important; 
    // }
    .dialogForm{
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .formBox{
        flex: 1;
    }
</style>
