<!--  -->
<template>
    <div class="formCustomization">
        <!-- 按条件查询 -->
        <!-- <div class="table-search" v-if="button_sh">
            <el-form :model="tableForm" :size="size" label-position="right" label-width="120px">
                <div style="display: flex">
                    <el-form-item label="状态">
                        <el-select v-model="tableForm.state" placeholder="请选择状态">
                            <el-option v-for="(items, indexs) in stateList" :key="indexs" :label="items.dictLabel" :value="items.dictValue"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="物资名称">
                        <el-input v-model="tableForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label-width="20px">
                        <el-button type="primary" plain icon="el-icon-refresh-left" @click="resetForm">重置</el-button>
                    </el-form-item>
                    <el-form-item label-width="20px">
                        <el-button type="primary" icon="el-icon-search" @click="submitForm">查询</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div> -->
        <div class="table-title">
            <p>
                需求项：
                <span v-text="count"></span>
            </p>
            <p>
                计划金额：
                <span v-text="sum"></span>
                万元
            </p>
        </div>
        <div class="table-control">
            <el-button :disabled="button_yw" type="primary" icon="el-icon-plus" :size="size" @click="handleTableRowControl('Add')">添加</el-button>
            <el-button :disabled="button_yw" type="danger" icon="el-icon-delete" :size="size" @click="handleTableRowControl('Delete')">删除</el-button>
            <el-button  :disabled="button_sh" type="primary" icon="el-icon-check" :size="size" @click="handleTableRowControl('Check')">
                批量审核
            </el-button>
            <el-button :disabled="button_yw" type="primary" icon="el-icon-upload2" :size="size" @click="handleTableRowControl('Import')">导入</el-button>
            <el-button type="primary" icon="el-icon-download" :size="size" @click="handleTableRowControl('Export')">导出模板</el-button>
            <el-button  v-if="dialogData.flow_stuts=='流程已归档'" type="primary" icon="el-icon-download" :size="size" @click="handleTableRowControl('ExportData')">导出</el-button>
        </div>
        <div class="table-content">
            <el-table
                id="tableInner"
                row-key="id"
                v-loading="tableLoading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.4)"
                ref="tableInnerRef"
                border
                height="100%"
                :data="tableData"
                :size="size"
                @selection-change="handleSelectionChange"
            >
                <!-- @row-dblclick="handleTableRowClick" -->
                <!--   @row-click="handleTableRowClick"
        @sort-change="handleSortChange" -->
                <el-table-column fixed type="selection" :selectable="checkSelectState" width="45" reserve-selection></el-table-column>
                <el-table-column fixed type="index" :index="tableRowIndexRender" label="序号" width="60" align="center"></el-table-column>
                <template v-for="(column, columnIndex) in tableColumnsList">
                    <el-table-column
                        v-if="column.columnName=='state'"
                        :key="columnIndex + column.columnName"
                        show-overflow-tooltip
                        :align="column.columnAlign ? column.columnAlign : 'center'"
                        :width="column.columnWidth ? column.columnWidth : 'auto'"
                        :prop="column.columnName"
                        :label="column.columnComment"
                    >
                        <template slot-scope="scope">
                            <span>{{showState(stateList1,scope.row.state)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                       v-else-if="column.columnName=='technical_quality_standard_file'"
                       :key="columnIndex + column.columnName"
                       :align="column.columnAlign ? column.columnAlign : 'center'"
                       :width="column.columnWidth ? column.columnWidth : 'auto'"
                       :prop="column.columnName"
                       :label="column.columnComment"
                    >
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" placement="top">
                                <div slot="content">
                                    <div class="pointer" v-for="(file, fileIndex) of scope.row[column.columnName + '-fileList']" :key="fileIndex" @click="handllePreview(file)(file)">
                                        {{ file.name }}
                                    </div>
                                </div>
                                <div class="oneLine">
                                    <span class="pointer" v-for="(file, fileIndex) of scope.row[column.columnName + '-fileList']" :key="fileIndex" @click="handllePreview(file)">
                                        {{ file.name }};
                                    </span>
                                </div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                        v-else
                        :key="columnIndex + column.columnName"
                        show-overflow-tooltip
                        :align="column.columnAlign ? column.columnAlign : 'center'"
                        :width="column.columnWidth ? column.columnWidth : 'auto'"
                        :prop="column.columnName"
                        :label="column.columnComment"
                    ></el-table-column>
                </template>
                <el-table-column fixed="right" align="center" label="操作" width="140px">
                    <template slot-scope="scope">
                        <div class="btnBox">
                            <el-button :disabled="button_yw" type="text" size="small" @click.stop="handleTableRowControl('Edit', scope.row,scope.$index)">
                                编辑
                            </el-button>
                            <el-button :disabled="button_yw" type="text" size="small" @click.stop="handleTableRowControl('Delete', scope.row,scope.$index)">
                                删除
                            </el-button>
                            <el-button
                                :disabled="button_sh"
                                type="text"
                                size="small"
                                @click.stop="handleTableRowControl('Check', scope.row)"
                            >
                                审核
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            width="50%"
            :lock-scroll="true"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :destroy-on-close="false"
            :size="size"
            :append-to-body="true"
            class="myDialog"
        >
            <el-form :model="dialogForm" ref="dialogForm" class="dialogForm" label-width="auto" label-position="right" :size="size">
                <el-row>
                    <el-col :span="24">
                        <el-form-item
                            label="编码"
                            prop="code"
                            :rules="[{message: '请填写编码！',required: true},{ pattern: /^\d{16}$/, message:'请填写16位数值！'}]"
                        >
                            <el-input maxlength="16" clearable v-model="dialogForm.code" :disabled="button_yw"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="物资名称">
                            <el-input clearable v-model="dialogForm.name_of_material" :disabled="button_yw"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="规格型号">
                            <el-input clearable v-model="dialogForm.model_number" :disabled="button_yw"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="单位">
                            <el-input clearable v-model="dialogForm.unit" :disabled="button_yw"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="采购数量"
                            prop="quantity_purchased"
                            :rules="[{message: '请填写采购数量！',required: true},{ pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message:'请输入数字，最多两位小数!'}]"
                        >
                            <el-input clearable v-model="dialogForm.quantity_purchased" :disabled="button_yw"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="预算单价"
                            prop="budget_unit_price"
                            :rules="[{message: '请填写预算单价！',required: true},{ pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message:'请输入数字，最多两位小数!'}]"
                        >
                            <el-input clearable v-model="dialogForm.budget_unit_price" :disabled="button_yw"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="预算金额">
                            <!-- <el-input clearable v-model="dialogForm.budgeted_amount" disabled></el-input> -->
                            <span class="tsSpan">{{showYsValue(dialogForm)}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="技术质量标准">
                            <el-input clearable v-model="dialogForm.technical_quality_standard" :disabled="button_yw"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="需求时间">
                            <el-date-picker
                                v-model="dialogForm.demand_time"
                                type="date"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                placeholder="请选择申请日期"
                                style="width: 100%"
                                :disabled="button_yw"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="需求单位">
                            <el-input clearable v-model="dialogForm.demand_unit" :disabled="button_yw"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="成本中心">
                            <el-input clearable v-model="dialogForm.cost_center" :disabled="button_yw"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="业务类型">
                            <el-input clearable v-model="dialogForm.type_of_business" :disabled="button_yw"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="预算科目">
                            <el-input clearable v-model="dialogForm.budget_account" :disabled="button_yw"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="资金类型">
                            <el-input clearable v-model="dialogForm.type_of_funds" :disabled="button_yw"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="用途">
                            <el-input clearable v-model="dialogForm.use" :disabled="button_yw"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input clearable v-model="dialogForm.remarks" :disabled="button_yw"></el-input>
                        </el-form-item>
                    </el-col>
                   <!-- <el-col :span="24" v-if="dialogData.flow_stuts">
                        <el-form-item label="批注" >
                            <el-input clearable v-model="dialogForm.comment" :disabled="button_yw"></el-input>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="24">
                        <el-form-item label="附件">
                            <el-upload
                                :disabled="button_yw"
                                id="xgfjFileList"
                                action=""
                                :list-type="'text'"
                                :multiple="true"
                                :file-list="xgfjFileList.fileList"
                                :auto-upload="false"
                                :on-preview="handllePreview"
                                :on-change="(file, fileList) => {handleChange(file, fileList, xgfjFileList,'xgfjFileList');}"
                                :on-remove="(file, fileList) => {handleRemove(file, fileList, xgfjFileList);}"
                            >
                                <el-button :size="size" type="primary" :disabled="button_yw" v-if="!button_yw">点击上传</el-button>
                                <template slot="tip" v-else>
                                    <span class="tip" v-if="xgfjFileList.fileList.length==0">暂未上传文件</span>
                                    <span class="tip" v-else>总共上传{{xgfjFileList.fileList.length}}个文件</span>
                                </template>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :size="size" v-if="!button_yw" @click="submitDialogForm()">确认</el-button>
                <el-button type="primary" :size="size" @click="dialogVisible=false">取消</el-button>
            </div>
            <!-- <component v-if="bgdjDialogVisible" :dialogRowData="dialogForm" :is="comName" @closeBgdjDialog="closeBgdjDialog" :isShowSave="isShowSave"></component>
            <component v-if="bgfwDialogVisible" :dialogRowData="dialogForm" :is="comNameBgfw" @closeBgfwDialog="closeBgfwDialog"></component>
            <component v-if="sbTreeDialogVisible" :dialogRowData="dialogForm" :is="comNameSbTree" @closeSBtreeDialog="closeSBtreeDialog"></component> -->
            <el-dialog
                :destroy-on-close="false"
                title="审核"
                :visible.sync="dialogShVisible"
                width="40%"
                :lock-scroll="false"
                :close-on-click-modal="false"
                append-to-body
            >
                <template v-if="dialogShVisible">
                    <el-form :model="dialogShData" ref="dialogShData" class="dialogShData" label-width="auto" label-position="left" size="mini">
                        <el-form-item label="审批意见">
                            <el-input
                                type="textarea"
                                clearable
                                v-model="dialogShData.advice"
                                :autosize="{ minRows: 5, maxRows: 10 }"
                                style="width: 100%"
                                resize="none"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </template>
                <template #footer>
                    <div v-if="getBtnPermissions($route.path+':tool:table:save')">
                        <el-button type="primary" @click="saveState" size="mini">确认</el-button>
                        <el-button type="primary" @click="dialogShVisible=false" size="mini">取消</el-button>
                    </div>
                </template>
            </el-dialog>
            <fliePreview :fileVisible.sync="fileVisible" :previewDown="previewDown"></fliePreview>
        </el-dialog>

        <el-dialog
            :destroy-on-close="false"
            title="审核"
            :visible.sync="dialogShVisible"
            width="40%"
            :lock-scroll="false"
            :close-on-click-modal="false"
            append-to-body
        >
            <template v-if="dialogShVisible">
                <el-form :model="dialogShData" ref="dialogShData" class="dialogShData" label-width="auto" label-position="right" size="mini">
                    <el-form-item label="审批意见">
                        <el-input
                            type="textarea"
                            clearable
                            v-model="dialogShData.comment"
                            :autosize="{ minRows: 5, maxRows: 10 }"
                            style="width: 100%"
                            resize="none"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="是否通过">
                        <el-radio-group v-model="dialogShData.state">
                            <template v-for="(option, optionIndex) in stateList1">
                                <el-radio :label="option.dictValue">{{ option.dictLabel }}</el-radio>
                            </template>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </template>
            <template #footer>
                <div>
                    <el-button type="primary" @click="saveState()" size="mini">确认</el-button>
                    <el-button type="primary" @click="dialogShVisible=false" size="mini">取消</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog
            :destroy-on-close="false"
            title="导入文件"
            :visible.sync="dialogDrVisible"
            width="40%"
            :lock-scroll="false"
            :close-on-click-modal="false"
            append-to-body
        >
            <template v-if="dialogDrVisible">
                <el-form key="fourth" ref="bgsjjsFileList" :model="bgsjjsFileList" class="dialogForm" label-width="80px" label-position="right" :size="size">
                    <el-row>
                        <el-form-item label="文件" prop="fileList" >
                            <el-upload
                                id="bgsjjsFileList"
                                action=""
                                :multiple="false"
                                :limit="1"
                                :list-type="'text'"
                                :file-list="bgsjjsFileList.fileList"
                                :auto-upload="false"
                                accept=".xlsx, .xls"
                                :on-change="(file, fileList) => {handleChange1(file, fileList, bgsjjsFileList,'bgsjjsFileList');}"
                            >
                                <el-button :size="size" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-row>
                </el-form>
            </template>
            <template #footer>
                <div>
                    <el-button type="primary" @click="saveFile()" size="mini">确认</el-button>
                    <el-button type="primary" @click="dialogDrVisible=false" size="mini">取消</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 展示导入错误信息 -->
        <el-dialog :destroy-on-close="true" title="错误详情" :visible.sync="tableErrorDetailVisible" width="60%" :lock-scroll="false" :close-on-click-modal="false" append-to-body>
            <template v-if="tableErrorDetailVisible">
                <el-table border stripe :data="tableErrorDetailData" height="500" style="width: 100%;">
                    <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
                    <el-table-column width="80" prop="id" align="center" label="错误行数"></el-table-column>
                    <el-table-column prop="msg" align="center" label="错误原因"></el-table-column>
                </el-table>
            </template>
        </el-dialog>
        <fliePreview :fileVisible.sync="fileVisible" :previewDown="previewDown"></fliePreview>
    </div>
</template>

<script>
    import { getDeptList } from '@/views/sbgl/bgbfgl/api/index.js';
    import { permissionsMixin } from '@/mixins/permission.js';
    import { listInfo, deleteInfo, updateApproval, codeIsRepeat, upDateFiles, deleteFilesById, getFilesPrames, exportTemplates,exportData,importExcel } from '../api/index';
    import { getSysDictData } from '@api/permission.js';
    import fliePreview from '@com/fliePreview';
    export default {
        mixins: [permissionsMixin],
        name: 'bggl',
        components: { fliePreview },
        data() {
            return {
                fileVisible:false,
                previewDown:null,
                tableErrorDetailVisible:false,
                tableErrorDetailData:[],
                dialogDrVisible: false,
                bgsjjsFileList: {
                    fileList: [],
                    files: [],
                    id: '',
                },
                dialogShVisible: false,
                dialogShData: {
                    comment: '',
                    state: '',
                },
                bgsjdw: [],
                construction_unit: [],
                size: 'mini',
                tableForm: {
                    name: '',
                    state: '',
                    pageNum: 1,
                    pageSize: 10,
                },
                stateList: [
                    {
                        dictLabel: '审批中',
                        dictValue: '0',
                    },
                    {
                        dictLabel: '驳回',
                        dictValue: '1',
                    },
                    {
                        dictLabel: '已审批',
                        dictValue: '2',
                    },
                ],
                stateList1: [
                    {
                        dictLabel: '通过',
                        dictValue: '1',
                    },
                    {
                        dictLabel: '驳回',
                        dictValue: '2',
                    },
                ],
                tableData: [],
                tableLoading: false,
                tableParams: {
                    pageNum: 1,
                    pageSize: 10,
                },
                tableTotal: 0,
                tableColumnsList: [
                    {
                        columnName: 'state',
                        columnComment: '状态',
                    },
                    {
                        columnName: 'code',
                        columnComment: '编码',
                        columnWidth: 160,
                    },
                    {
                        columnName: 'name_of_material',
                        columnComment: '物资名称',
                        columnWidth: 120,
                    },
                    {
                        columnName: 'model_number',
                        columnComment: '规格型号',
                        columnWidth: 120,
                    },
                    {
                        columnName: 'unit',
                        columnComment: '单位',
                        columnWidth: 120,
                    },
                    {
                        columnName: 'quantity_purchased',
                        columnComment: '采购数量',
                        columnWidth: 120,
                    },
                    {
                        columnName: 'budget_unit_price',
                        columnComment: '预算单价（元）',
                        columnWidth: 120,
                    },
                    {
                        columnName: 'budgeted_amount',
                        columnComment: '预算金额（元）',
                        columnWidth: 120,
                    },
                    {
                        columnName: 'technical_quality_standard',
                        columnComment: '技术质量标准',
                        columnWidth: 120,
                    },
                    {
                        columnName: 'demand_time',
                        columnComment: '需求时间',
                        columnWidth: 120,
                    },
                    {
                        columnName: 'demand_unit',
                        columnComment: '需求单位',
                        columnWidth: 120,
                    },
                    {
                        columnName: 'cost_center',
                        columnComment: '成本中心',
                        columnWidth: 120,
                    },
                    {
                        columnName: 'type_of_business',
                        columnComment: '业务类型',
                        columnWidth: 120,
                    },
                    {
                        columnName: 'budget_account',
                        columnComment: '预算科目',
                        columnWidth: 120,
                    },
                    {
                        columnName: 'type_of_funds',
                        columnComment: '资金类型',
                        columnWidth: 120,
                    },
                    {
                        columnName: 'use',
                        columnComment: '用途',
                        columnWidth: 120,
                    },
                    {
                        columnName: 'remarks',
                        columnComment: '备注',
                        columnWidth: 120,
                    },
                    {
                        columnName: 'comment',
                        columnComment: '批注',
                        columnWidth: 120,
                    },
                    {
                        columnName: 'technical_quality_standard_file',
                        columnComment: '附件',
                        columnWidth: 120,
                    },
                ],
                nowDialogData: null,
                tableDialogType: null,
                comVisible: false,
                comVisibleDetail: false,
                comName: null,
                comNameDetail: null,
                dialogRowData: null,
                sbbg_flow_stuts: [],
                tableChekIds: [],
                tableMultipleSelection: [],
                //进度
                progressText: '0',
                tableDialogIndex: null,
                shid: [],
                dialogVisible: false,
                dialogForm: {},
                dialogTitle: '',
                xgfjFileList: {
                    fileList: [],
                    files: [],
                    id: '',
                },
                sum: 0,
                count: 0,
                progressText: '0',
            };
        },

        computed: {},
        created() {},
        props: {
            dialogData: {
                type: Object,
                default: {},
            },
            button_yw: {
                type: Boolean,
                default: false,
            },
            button_sh: {
                type: Boolean,
                default: false,
            },
            isAddOrEdit: {
                type: Boolean,
                default: true,
            },
        },
        mounted() {
            // this.getDept();
            this.$nextTick(() => {
                if (this.dialogData.id) {
                    this.sum = this.dialogData.sum;
                    this.count = this.dialogData.count;
                    this.getTableData();
                }
            });
        },
        methods: {
            
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
                    formData.append("bucketName", that.$route.query.data);
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
                if (fileList.length > 0) {
                    item.fileList = fileList;
                    // this.$refs[id].clearValidate('fileList')
                }
            },
            handleChange1(file, fileList, item, id) {
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

                function addFile() {}

                function delFile() {
                    fileList.splice(
                        fileList.findIndex((item) => item.url === file.url),
                        1
                    );
                }
                if (fileList.length > 0) {
                    item.fileList = fileList;
                    // this.$refs[id].clearValidate('fileList')
                }
            },
            // 移除文件
            handleRemove(file, fileList, item) {
                if (fileList.length == 0) {
                    this.xgfjFileList.fileList = [];
                }
                deleteFilesById({ dataIds: file.id }).then((res) => {
                    if (res.code == 200) {
                        this.getFileList(item.id, item);
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error',
                        });
                    }
                });
            },
            saveFile() {
                let that = this;
                const formData = new FormData();
                this.bgsjjsFileList.files.forEach((file) => {
                    formData.append('file', file);
                });
                if(this.bgsjjsFileList.files.length==0){
                    that.$message({
                        message: '请选择文件',
                        type: 'warning',
                    });
                    return 
                }
                var loading = that.$loading({
                    lock: true,
                    text: `数据提交中，进度${that.progressText}%,请稍后~`,
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                });
                importExcel(formData, (progressEvent) => {
                    that.progressText = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
                    loading.setText(`数据提交中，进度${that.progressText}%,请稍后~`);
                }).then((res) => {
                    if (res.code == 200) {
                        if(res.data.errorData.length>0){
                            this.tableErrorDetailVisible=true;
                            this.tableErrorDetailData=res.data.errorData;
                        }else{
                            this.tableData=[...res.data.tableData, ...this.tableData]
                            this.dialogDrVisible=false;
                            that.$message({
                                message: res.msg,
                                type: 'success',
                            });
                        }
                        
                    } else {
                        that.$message({
                            message: res.msg,
                            type: 'error',
                        });
                    }
                    
                    loading.close();
                });
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
            showYsValue(row) {
                row.budgeted_amount = this.accMul(row.quantity_purchased, row.budget_unit_price).toFixed(3);
                return isNaN(row.budgeted_amount) ? '' : row.budgeted_amount + '';
            },
            submitDialogForm() {
                this.$refs['dialogForm'].validate(async (valid) => {
                    if (valid) {
                        this.dialogForm.technical_quality_standard_file = this.xgfjFileList.id;
                        if (this.tableDialogType == 'Edit') {
                            this.tableData.splice(this.tableDialogIndex, 1, this.dialogForm);
                        } else {
                            if(this.dialogForm.technical_quality_standard_file){
                                let res = await getFilesPrames({
                                    dataId: this.dialogForm.technical_quality_standard_file,
                                    bucketName: this.$route.query.data
                                });
                                let rows = res.data.rows;
                                
                                let fileList = [];                            
                                for (let i in rows) {
                                    fileList.push({
                                        name: rows[i].fileName,
                                        url: `${this.GLOBAL.baseUrl}/file/downFile?url=${rows[i].objectName}`,
                                        id: rows[i].id
                                    });
                                }
                                this.dialogForm['technical_quality_standard_file-fileList']= fileList; 
                            }
                            this.tableData.push(this.dialogForm);
                            
                        }

                        var num = 0;
                        this.tableData.forEach((v, i) => {
                            num+=Number(v.budgeted_amount);
                        });
                        this.sum = num/10000;
                        this.count = this.tableData.length;
                        this.dialogVisible = false;
                        this.resetTablelayout();
                    } else {
                        return false;
                    }
                });
            },
            saveState() {
                this.$refs['dialogShData'].validate(async (valid) => {
                          if (valid) {
                              const loading = this.$loading({
                                  lock: true,
                                  text: '正在加载中',
                                  spinner: 'el-icon-loading',
                                  background: 'rgba(0, 0, 0, 0.7)',
                              });
                              this.dialogShData.ids = this.shid.join();
                              updateApproval(this.dialogShData).then((res) => {
                                  if (res.code == 200) {
                                      this.$message({
                                          message: res.msg,
                                          type: 'success',
                                      });
                                      this.dialogShVisible = false;
                                      this.getTableData();
                                  } else {
                                      this.$message({
                                          type: 'error',
                                          message: res.msg,
                                      });
                                  }
                                  loading.close();
                              });
                          } else {
                            return false
                          }
                        })
                
            },
            getDept() {
                getDeptList().then((res) => {
                    if (res.code == 200) {
                        this.construction_unit = this.$utils.handleTree(res.data, 'deptId', 'parentId', 'children');
                    }
                });
            },
            checkSelectState(row) {
                if (row.flow_id) {
                    return false;
                } else {
                    return true;
                }
            },
            //选中的表格数据集合
            handleSelectionChange(val) {
                this.tableMultipleSelection = val;
                this.tableChekIds = val.map((item) => item.code);
            },
            //匹配
            showState(list, value) {
                var obj = list.find((item) => {
                    return item.dictValue == value;
                });
                if (obj) {
                    return obj.dictLabel;
                } else {
                    return '';
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
                this.tableForm = {
                    name: '',
                    state: '',
                };
                this.bgsjdw = [];
                this.getTableData();
            },
            submitForm() {
                this.getTableData();
            },
            handleTableRowControl(type, row, index) {
                this.tableDialogType = type;
                this.tableDialogIndex = index;
                if (row) {
                    this.nowDialogData = JSON.parse(JSON.stringify(row));
                } else {
                    this.nowDialogData = null;
                }
                if (type == 'Query') {
                    this.getTableData();
                } else if (type == 'Add') {
                    this.nowDialogData = null;
                    this.handleTableRowAdd();
                } else if (type == 'Export') {
                    this.handleTableRowExport(row);
                } else if (type == 'Import') {
                    this.handleTableRowImport(row);
                }else if (type == 'ExportData') {
                    this.handleTableRowExportData(row);
                }else {
                    if (row) {
                        if (type == 'Edit') {
                            this.handleTableRowEdit(row);
                        } else if (type == 'Delete') {
                            this.handleTableRowDelete(row, index);
                        } else if (type == 'Check') {
                            this.handleTableRowCheck(row);
                        }
                    } else {
                        if (this.tableMultipleSelection.length != 0) {
                            if (type == 'Delete') {
                                this.handleTableRowDelete(row);
                                return;
                            }
                            if (this.tableMultipleSelection.length > 1) {
                                this.$message({
                                    type: 'warning',
                                    message: '只能选择一条数据,才可进行此操作!',
                                });
                            } else {
                                if (type == 'Edit') {
                                    this.handleTableRowEdit(row);
                                } else if (type == 'Check') {
                                    this.handleTableRowCheck(row);
                                }
                                // else if (type == "Look") {
                                //     this.tableDialogFormDisabled = true;
                                //     this.tableDialogVisible = true;
                                //     this.handleTableRowLook(row);
                                // }
                            }
                        } else {
                            this.$message({
                                type: 'warning',
                                message: '请选择一条数据,才可进行此操作!',
                            });
                        }
                    }
                }
            },
            handleTableRowExport(row) {
                var loading = this.$loading({
                    lock: true,
                    text: `数据提交中，进度${this.progressText}%,请稍后~`,
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                });
                exportTemplates((progressEvent) => {
                    this.progressText = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
                    loading.setText(`数据提交中，进度${this.progressText}%,请稍后~`);
                }).then((res) => {
                    if (res) {
                        let blob = new Blob([res], { type: res.type });
                        let downloadElement = document.createElement('a');
                        let href = window.URL.createObjectURL(blob);
                        downloadElement.href = href;
                        downloadElement.download = '计划申请单表格模板';
                        document.body.appendChild(downloadElement);
                        downloadElement.click();
                        document.body.removeChild(downloadElement);
                        window.URL.revokeObjectURL(href);

                        loading.close();
                        this.$message({
                            type: 'success',
                            message: '导出成功!',
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.msg,
                        });
                    }
                });
            },
            handleTableRowExportData(row){
                var loading = this.$loading({
                    lock: true,
                    text: `数据提交中，进度${this.progressText}%,请稍后~`,
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                });
                exportData({id:this.dialogData.id},(progressEvent) => {
                    this.progressText = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
                    loading.setText(`数据提交中，进度${this.progressText}%,请稍后~`);
                }).then((res) => {
                    if (res) {
                        let blob = new Blob([res], { type: res.type });
                        let downloadElement = document.createElement('a');
                        let href = window.URL.createObjectURL(blob);
                        downloadElement.href = href;
                        downloadElement.download = '计划申请单表格数据';
                        document.body.appendChild(downloadElement);
                        downloadElement.click();
                        document.body.removeChild(downloadElement);
                        window.URL.revokeObjectURL(href);
                
                        loading.close();
                        this.$message({
                            type: 'success',
                            message: '导出成功!',
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.msg,
                        });
                    }
                });
            },
            handleTableRowImport(row) {
                this.bgsjjsFileList={
                    fileList: [],
                    files: [],
                    id: '',
                }
                this.dialogDrVisible=true;
            },
            handleTableRowCheck(row) {
                this.dialogShVisible = true;
                this.shid = [row.code] || this.tableChekIds;
            },
            handleTableRowDelete(row, index) {
                this.$confirm('确认要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(() => {
                        // deleteInfo({ids:ids}).then(res => {
                        //     if (res.code == 200) {
                        //         this.$message({
                        //             type: "success",
                        //             message: "删除成功!"
                        //         });
                        //         this.tableDialogType ="Query"
                        //         this.getTableData();
                        //     } else {
                        //         this.$message({
                        //             type: "error",
                        //             message: res.msg
                        //         });
                        //     }
                        // });

                        // this.tableMultipleSelection.forEach((v,i)=>{
                        //     console.log(v);
                        // })
                        if (this.tableMultipleSelection.length > 0) {
                            // 获取选中行数据
                            const selectedRows = this.tableMultipleSelection;
                            // 遍历表格数据，查找选中行的索引
                            const tableData = this.tableData;

                            for (let i = 0; i < tableData.length; i++) {
                                for (let j = 0; j < selectedRows.length; j++) {
                                    if (tableData[i] === selectedRows[j]) {
                                        this.tableData.splice(i, 1);
                                    }
                                }
                            }
                        } else {
                            this.tableData.splice(index, 1);
                        }
                       this.$refs.tableInnerRef.clearSelection();
                        
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除',
                        });
                    });
            },
            //行点击
            handleTableRowClick(row) {
                if (row.flow_id) {
                    this.comNameDetail = () => import('@/views/wzgl/xqjhgl/wzxqtb/details/details.vue');
                    this.comVisibleDetail = true;
                    this.dialogRowData = row;
                } else {
                    this.$message({
                        type: 'warning',
                        message: '流程开始后才可以查看流程！',
                    });
                }
            },
            handleTableRowAdd() {
                this.dialogTitle = '添加数据';
                this.dialogForm = {};
                this.dialogVisible = true;
                this.$nextTick(() => {
                    this.$refs.dialogForm.clearValidate();
                });
            },
            handleTableRowEdit(row) {
                this.dialogTitle = '修改数据';
                this.dialogForm = row;
                if (this.dialogForm.technical_quality_standard_file) {
                    this.xgfjFileList.id = this.dialogForm.technical_quality_standard_file;
                    this.getFileList(this.dialogForm.technical_quality_standard_file, this.xgfjFileList);
                }
                this.dialogVisible = true;
            },

            closeVisibleDetail() {
                this.comVisibleDetail = false;
                this.getTableData();
            },
            exportFile() {},
            getTableData() {
                listInfo({
                    id: this.dialogData.id,
                    state: this.tableForm.state,
                    name: this.tableForm.name,
                }).then(  async  (res) => {
                    if (res.code == 200) {
                        var tableData = res.data;
                        
                        let fileList = [];
                         for (let i in tableData) {
                            if (tableData[i].technical_quality_standard_file) {
                                let res = await getFilesPrames({
                                    dataId: tableData[i].technical_quality_standard_file,
                                    bucketName: this.$route.query.data
                                });
                                let rows = res.data.rows;
                            
                                for (let i in rows) {
                                    fileList.push({
                                        name: rows[i].fileName,
                                        url: `${this.GLOBAL.baseUrl}/file/downFile?url=${rows[i].objectName}`,
                                        id: rows[i].id
                                    });
                                }
                                tableData[i]['technical_quality_standard_file-fileList']= fileList; 
                            }
                         }
                         this.tableData=tableData;
                        this.resetTablelayout();
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error',
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
                    this.autoTableControlWidth('tableInnerRef');
                    // this.windowResize();
                });
            },
            // 监听窗口resize
            windowResize() {
                this.$nextTick(() => {
                    window.removeEventListener('resize', this.getAutoHeight);
                    this.getAutoHeight();
                    window.addEventListener('resize', this.getAutoHeight);
                });
            },
            getAutoHeight() {
                this.autoTableHeight('tableRef', 138);
            },
        },
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
        .table-title {
            display: flex;
            padding-bottom: 15px;
            color: #fff;
            font-size: 16px;
            span {
                font-size: 18px;
                font-weight: bold;
                color: #02f9fa;
                padding: 0 10px;
            }
        }
    }
    .blue {
        color: #409eff;
    }
    .formCustomization {
        display: flex;
        flex-direction: column;
        .table-content {
            flex: 1;
        }
    }
    :deep(.el-cascader .el-input .el-input__inner) {
        height: 28px !important;
    }
    :deep(.el-cascader) {
        overflow: hidden;
    }
    :deep(.el-cascader__tags) {
        height: 100%;
    }
    .tsSpan {
        display: block;
        width: 100%;
        height: 28px;
        line-height: 28px;
        border: 1px solid var(--disabled-color);
        border-radius: 4px;
        padding: 0 15px;
        color: #fff;
    }
    .formBox {
        flex: 1;
    }
</style>
