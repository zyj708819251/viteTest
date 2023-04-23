<script>
	/*
		<formCustomization
			:formData="formData"
			@resetSearchForm="resetSearchForm"
			@row-click="handleTableRowClick"
			@selection-change="handleSelectionChange"
		>
			<!-- 搜索插槽 -->
			<template v-slot:tableSearch>
				<el-form-item label="部门">
					<el-input
						v-model="formData.outParams.f_equi_ggxh"
						placeholder="请输入"
					></el-input>
				</el-form-item>
			</template>
			<!-- 顶部按钮插槽 -->
			<template v-slot:tableControl>
				<el-button type="primary" :size="proxy.size">下载</el-button>
			</template>
			<!-- 行内按钮插槽 -->
			<template v-slot:tableInlineControl="scope">
				<el-button text type="primary" :size="proxy.size">{{scope.row.id}}</el-button>
			</template>
			<!-- 展开行展示插槽 -->
			<template v-slot:tableExpand="scope">
				<span>{{ scope.row }}</span>
			</template>
			<!-- 定制某个字段个性化 -->
			<template v-slot:f_equi_sbmc="scope">
				<span style="color: red">{{ scope.row.f_equi_sbmc }}</span>
			</template>
		</formCustomization>
		
		
		
		
		let formData = reactive({
			formId: '100095',
			outParams: {
				f_equi_ggxh: abc.value,
			},
			// isExpand:true,//是否展开行展示
			// isRadio:true,//是否是单选模式
			// hideSelection:true,//隐藏行首的单选或者多选
			hideSearch: true, //隐藏搜索
			hideControl: true, //隐藏控制按钮
			hideInlineControl: true, //隐藏行内控制按钮
		});
	*/
</script>

<template>
	<div class="formCustomization flex-column h100">
		<div
			class="table-search"
			v-if="!formData.hasOwnProperty('hideSearch')&&(search.field.length>0||$slots.tableSearch)"
		>
			<el-form ref="searchRef" :model="search.form" :size="proxy.size" :inline="true">
				<el-form-item
					v-for="(item, index) of search.field"
					:key="item.columnName"
					:label="item.columnComment"
				>
					<template v-if="item.htmlType == 'datetime'">
						<el-date-picker
							style="width: 100%"
							clearable
							v-model="search.form[item.columnName]"
							type="datetime"
							value-format="yyyy-MM-dd HH:mm:ss"
							placeholder="请选择日期时间"
						></el-date-picker>
					</template>
					<template v-else-if="item.htmlType == 'datetimerange'">
						<el-date-picker
							clearable
							v-model="search.form[item.columnName]"
							type="datetimerange"
							value-format="yyyy-MM-dd HH:mm:ss"
							range-separator="至"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
						></el-date-picker>
					</template>
					<template v-else-if="item.htmlType == 'date'">
						<el-date-picker
							style="width: 100%"
							clearable
							v-model="search.form[item.columnName]"
							type="date"
							value-format="yyyy-MM-dd"
							placeholder="请选择日期"
						></el-date-picker>
					</template>
					<template v-else-if="item.htmlType == 'daterange'">
						<el-date-picker
							clearable
							v-model="search.form[item.columnName]"
							type="daterange"
							value-format="yyyy-MM-dd"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
						></el-date-picker>
					</template>
					<template v-else-if="item.htmlType == 'month'">
						<el-date-picker
							style="width: 100%"
							clearable
							v-model="search.form[item.columnName]"
							type="month"
							value-format="YYYY-MM"
							placeholder="请选择月份"
						></el-date-picker>
					</template>
					<template v-else-if="item.htmlType == 'monthrange'">
						<el-date-picker
							clearable
							v-model="search.form[item.columnName]"
							type="monthrange"
							value-format="yyyy-MM"
							range-separator="至"
							start-placeholder="开始月份"
							end-placeholder="结束月份"
						></el-date-picker>
					</template>
					<template v-else-if="item.htmlType == 'year'">
						<el-date-picker
							style="width: 100%"
							clearable
							v-model="search.form[item.columnName]"
							type="year"
							value-format="yyyy"
							placeholder="请选择年份"
						></el-date-picker>
					</template>
					<template v-else-if="item.htmlType == 'yearrange'">
						<el-date-picker
							clearable
							v-model="search.form[item.columnName]"
							type="yearrange"
							value-format="yyyy"
							range-separator="至"
							start-placeholder="开始年份"
							end-placeholder="结束年份"
						></el-date-picker>
					</template>
					<template v-else-if="item.htmlType == 'select'">
						<el-select
							style="width: 100%"
							clearable
							filterable
							v-model="search.form[item.columnName]"
							:placeholder="'请选择'+(item.remindText?item.remindText:item.columnComment)"
						>
							<el-option
								v-for="(item, index) in item.dictList"
								:key="index"
								:label="item.dictLabel"
								:value="item.dictValue"
							></el-option>
						</el-select>
					</template>
					<template v-else-if="item.htmlType == 'selectmultiple'">
						<el-select
							clearable
							filterable
							multiple
							collapse-tags
							collapse-tags-tooltip
							v-model="search.form[item.columnName]"
							:placeholder="'请选择'+(item.remindText?item.remindText:item.columnComment)"
						>
							<el-option
								v-for="(item, index) in item.dictList"
								:key="index"
								:label="item.dictLabel"
								:value="item.dictValue"
							></el-option>
						</el-select>
					</template>
					<template v-else-if="item.htmlType == 'radio'">
						<el-radio-group v-model="search.form[item.columnName]">
							<el-radio
								v-for="(item, index) in item.dictList"
								:key="index"
								:label="item.dictLabel"
							>
								{{ item.dictValue }}
							</el-radio>
						</el-radio-group>
					</template>
					<template v-else-if="item.htmlType == 'checkbox'">
						<el-checkbox-group v-model="search.form[item.columnName]">
							<el-checkbox
								v-for="(item, index) in item.dictList"
								:key="index"
								:label="item.dictLabel"
							>
								{{ item.dictValue }}
							</el-checkbox>
						</el-checkbox-group>
					</template>
					<template v-else>
						<el-input
							clearable
							:placeholder="'请输入'+(item.remindText?item.remindText:item.columnComment)"
							v-model="search.form[item.columnName]"
						></el-input>
					</template>
				</el-form-item>
				<slot name="tableSearch"></slot>
				<el-form-item>
					<el-button
						type="primary"
						plain
						icon="Refresh"
						@click="resetSearchForm(searchRef)"
					>
						重置
					</el-button>
					<el-button type="primary" icon="Search" @click="submitSearchForm(searchRef)">
						查询
					</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="table-control" v-if="!formData.hasOwnProperty('hideControl')">
			<el-form :size="proxy.size">
				<el-form-item>
					<el-button
						v-if="proxy.hasPermi($route.path+':tool:table:insert')"
						type="primary"
						icon="plus"
						@click="handleTableRowControl('Add')"
					>
						添加
					</el-button>
					<el-button
						v-if="proxy.hasPermi($route.path+':tool:table:del')"
						type="danger"
						icon="delete"
						@click="handleTableRowControl('Delete')"
					>
						删除
					</el-button>
					<el-button
						v-if="proxy.hasPermi($route.path+':tool:table:import')"
						type="success"
						icon="upload"
						@click="importFile()"
					>
						导入
					</el-button>
					<el-button
						v-if="proxy.hasPermi($route.path+':tool:table:export')"
						type="success"
						icon="download"
						@click="exportFileFn()"
					>
						导出
					</el-button>
					<el-button
						type="success"
						v-if="proxy.hasPermi($route.path+':tool:table:exportTemplate')"
						icon="download"
						@click="exportFileFn('template')"
					>
						导出模板
					</el-button>
					<slot name="tableControl"></slot>
				</el-form-item>
			</el-form>
		</div>

		<div class="table-content flex-1 mb18">
			<el-table
				id="table"
				ref="tableRef"
				v-bind="$attrs"
				v-loading="table.tableLoading"
				element-loading-text="拼命加载中"
				element-loading-spinner="el-icon-loading"
				element-loading-background="rgba(0, 0, 0, 0.4)"
				border
				height="100%"
				:row-key="(row)=>{return row.id}"
				:data="table.tableData"
				@selection-change="handleSelectionChange"
				:size="proxy.size"
				@sort-change="handleSortChange"
				@row-click="handleTableRowClick"
			>
				<el-table-column
					v-if="!formData.hasOwnProperty('hideSelection')&&formData.hasOwnProperty('isRadio')"
					fixed
					align="center"
					width="32"
				>
					<template #default="scope">
						<el-radio
							class="noLabel"
							v-model="table.tableRadioSelection"
							:label="scope.row"
							@change="tableRadioChange"
						></el-radio>
					</template>
				</el-table-column>
				<el-table-column
					v-else-if="!formData.hasOwnProperty('hideSelection')"
					fixed
					type="selection"
					:selectable="formData.isSelectable"
					width="32"
					:reserve-selection="true"
				></el-table-column>
				<el-table-column v-if="formData.hasOwnProperty('isExpand')" fixed type="expand">
					<template #default="scope">
						<slot name="tableExpand" :row="scope.row"></slot>
					</template>
				</el-table-column>
				<el-table-column
					fixed
					type="index"
					:index="tableRowIndexRender"
					label="序号"
					width="60"
					align="center"
				></el-table-column>
				<template v-for="(column, columnIndex) in table.tableColumnsFilter">
					<el-table-column
						:key="columnIndex + column.columnName"
						sortable="custom"
						v-if="column.htmlType == 'switch'"
						:align="column.columnAlign ? column.columnAlign : 'center'"
						:width="column.columnWidth ? column.columnWidth : 'auto'"
						:prop="column.columnName"
						:label="column.columnComment"
					>
						<template #default="scope">
							<el-switch
								:disabled="true"
								v-model="scope.row[column.columnName]"
								:active-value="'1'"
								:inactive-value="'0'"
								active-color="#13ce66"
								inactive-color="#ff4949"
							></el-switch>
						</template>
					</el-table-column>

					<el-table-column
						:key="columnIndex + column.columnName"
						show-overflow-tooltip
						sortable="custom"
						v-else-if="column.htmlType == 'select'"
						:align="column.columnAlign ? column.columnAlign : 'center'"
						:width="column.columnWidth ? column.columnWidth : 'auto'"
						:prop="column.columnName"
						:label="column.columnComment"
					>
						<template #default="scope">
							<span
								v-text="showData(column.dictList, scope.row[column.columnName])"
							></span>
						</template>
					</el-table-column>
					<el-table-column
						:key="columnIndex + column.columnName"
						sortable="custom"
						v-else-if="column.htmlType == 'imageUpload'"
						:align="column.columnAlign ? column.columnAlign : 'center'"
						:width="column.columnWidth ? column.columnWidth : 'auto'"
						:prop="column.columnName"
						:label="column.columnComment"
					>
						<template #default="scope">
							<el-tooltip class="item" effect="dark" placement="top">
								<template #content>
									<div
										class="pointer"
										v-for="(file, fileIndex) of scope.row[column.columnName + '-fileList']"
										:key="file.url"
										@click="downLoadFile(file)"
									>
										{{ file.name }}
									</div>
								</template>
								<div class="oneLine">
									<span
										class="pointer"
										v-for="(file, fileIndex) of scope.row[column.columnName + '-fileList']"
										:key="file.url"
										@click="downLoadFile(file)"
									>
										{{ file.name }};
									</span>
								</div>
							</el-tooltip>
						</template>
					</el-table-column>
					<el-table-column
						:key="columnIndex + column.columnName"
						sortable="custom"
						v-else-if="column.htmlType == 'fileUpload'"
						:align="column.columnAlign ? column.columnAlign : 'center'"
						:width="column.columnWidth ? column.columnWidth : 'auto'"
						:prop="column.columnName"
						:label="column.columnComment"
					>
						<template #default="scope">
							<el-tooltip class="item" effect="dark" placement="top">
								<template #content>
									<div
										class="pointer"
										v-for="(file, fileIndex) of scope.row[column.columnName + '-fileList']"
										:key="fileIndex"
										@click="downLoadFile(file)"
									>
										{{ file.name }}
									</div>
								</template>
								<div class="oneLine">
									<span
										class="pointer"
										v-for="(file, fileIndex) of scope.row[column.columnName + '-fileList']"
										:key="fileIndex"
										@click="downLoadFile(file)"
									>
										{{ file.name }};
									</span>
								</div>
							</el-tooltip>
						</template>
					</el-table-column>
					<el-table-column
						:key="columnIndex + column.columnName"
						sortable="custom"
						show-overflow-tooltip
						v-else
						:align="column.columnAlign ? column.columnAlign : 'center'"
						:width="column.columnWidth ? column.columnWidth : 'auto'"
						:prop="column.columnName"
						:label="column.columnComment"
					>
						<template #default="scope">
							<slot :name="column.columnName" :row="scope.row" :column="column">
								<div :style="{ color: showStyle(scope.row, column) }">
									{{ scope.row[column.columnName] }}
								</div>
							</slot>
						</template>
					</el-table-column>
				</template>
				<el-table-column
					fixed="right"
					align="center"
					label="操作"
					:width="table.operationWidth"
					v-if="!formData.hasOwnProperty('hideInlineControl')"
				>
					<template #default="scope">
						<div class="operation">
							<el-button
								v-if="proxy.hasPermi($route.path+':tool:column:detail')"
								text
								type="primary"
								:size="proxy.size"
								@click.stop="handleTableRowControl('Look', scope.row)"
							>
								查看
							</el-button>
							<el-button
								v-if="proxy.hasPermi($route.path+':tool:column:edit')"
								text
								type="primary"
								:size="proxy.size"
								@click.stop="handleTableRowControl('Edit', scope.row)"
							>
								编辑
							</el-button>
							<el-button
								v-if="proxy.hasPermi($route.path+':tool:column:del')"
								text
								type="primary"
								:size="proxy.size"
								@click.stop="handleTableRowControl('Delete', scope.row)"
							>
								删除
							</el-button>
							<slot name="tableInlineControl" :row="scope.row"></slot>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="table-page flex jc-fe">
			<el-pagination
				class="pagination"
				ref="pagination"
				:page-sizes="[10, 20, 30, 40, 50,100]"
				:page-size="table.tablePage.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="table.tableTotal"
				small
				background
				:current-page.sync="table.tablePage.pageNum"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			></el-pagination>
		</div>
	</div>
	<ZyjDialog
		v-model="table.tableDialogVisible"
		:dialogTitle="table.tableDialogTitle"
		:dialogCenter="true"
		:dialogAlignCenter="true"
		:dialogFullscreenBtn="true"
		dialogWidth="40%"
	>
		<template v-slot:body>
			<el-form
				:model="table.tableDialogForm"
				ref="tableDialogForm"
				label-width="auto"
				label-position="right"
				:size="proxy.size"
			>
				<el-form-item
					v-for="(item, itemIndex) in table.tableDialogField"
					:key="itemIndex"
					:label="item.columnComment"
					:prop="item.columnName"
					:rules="rules(item)"
				>
					<el-input
						v-if="item.htmlType == 'input'"
						clearable
						:maxlength="getVarchar(item.columnType)"
						show-word-limit
						:disabled="table.tableDialogFormDisabled"
						v-model="table.tableDialogForm[item.columnName]"
						:placeholder="'请输入'+(item.remindText?item.remindText:item.columnComment)"
					></el-input>
					<el-input
						v-else-if="item.htmlType == 'textarea'"
						:maxlength="getVarchar(item.columnType)"
						show-word-limit
						type="textarea"
						clearable
						:disabled="table.tableDialogFormDisabled"
						v-model="table.tableDialogForm[item.columnName]"
						:autosize="{ minRows: 5, maxRows: 10 }"
						style="width: 100%"
						resize="none"
						:placeholder="'请输入'+(item.remindText?item.remindText:item.columnComment)"
					></el-input>
					<!-- 	<el-radio-group v-if="item.type == 'radio'" :disabled="table.tableDialogFormDisabled" v-model="tableDialogForm[item.prop]">
			                    <template v-for="(option, optionIndex) in item.options">
			                        <el-radio :label="option.value">{{ option.label }}</el-radio>
			                    </template>
			                </el-radio-group>
			                <el-checkbox-group v-if="item.type == 'checkbox'" :disabled="table.tableDialogFormDisabled" v-model="tableDialogForm[item.prop]">
			                    <template v-for="(option, optionIndex) in item.options">
			                        <el-checkbox :label="option.value" :name="item.prop">{{ option.label }}</el-checkbox>
			                    </template>
			                </el-checkbox-group> -->
					<el-switch
						v-else-if="item.htmlType == 'switch'"
						:disabled="table.tableDialogFormDisabled"
						v-model="table.tableDialogForm[item.columnName]"
						:active-value="'1'"
						:inactive-value="'0'"
						active-color="#13ce66"
						inactive-color="#ff4949"
					></el-switch>
					<el-select
						v-else-if="item.htmlType == 'select'"
						:disabled="table.tableDialogFormDisabled"
						style="width: 100%"
						v-model="table.tableDialogForm[item.columnName]"
						filterable
						clearable
						:placeholder="'请选择'+(item.remindText?item.remindText:item.columnComment)"
					>
						<el-option
							v-for="(option, optionIndex) in item.dictList"
							:key="optionIndex"
							:label="option.dictLabel"
							:value="option.dictValue"
						></el-option>
					</el-select>
					<el-select
						v-else-if="item.htmlType == 'multipleSelect'"
						:disabled="table.tableDialogFormDisabled"
						style="width: 100%"
						v-model="table.tableDialogForm[item.columnName]"
						filterable
						clearable
						multiple
						:placeholder="'请选择'+(item.remindText?item.remindText:item.columnComment)"
					>
						<el-option
							v-for="(option, optionIndex) in item.dictList"
							:key="optionIndex"
							:label="option.dictLabel"
							:value="option.dictValue"
						></el-option>
					</el-select>
					<el-date-picker
						v-else-if="item.htmlType == 'year'"
						:disabled="table.tableDialogFormDisabled"
						v-model="table.tableDialogForm[item.columnName]"
						type="year"
						format="yyyy"
						value-format="yyyy"
						placeholder="请选择年份"
						style="width: 100%"
					></el-date-picker>
					<el-date-picker
						v-else-if="item.htmlType == 'month'"
						:disabled="table.tableDialogFormDisabled"
						v-model="table.tableDialogForm[item.columnName]"
						type="month"
						format="yyyy-MM"
						value-format="yyyy-MM"
						placeholder="请选择月份"
						style="width: 100%"
					></el-date-picker>
					<el-date-picker
						v-else-if="item.htmlType == 'date'"
						:disabled="table.tableDialogFormDisabled"
						v-model="table.tableDialogForm[item.columnName]"
						type="date"
						format="yyyy-MM-dd"
						value-format="yyyy-MM-dd"
						placeholder="请选择日期"
						style="width: 100%"
					></el-date-picker>
					<el-date-picker
						v-else-if="item.htmlType == 'datetime'"
						:disabled="table.tableDialogFormDisabled"
						v-model="table.tableDialogForm[item.columnName]"
						type="datetime"
						format="yyyy-MM-dd HH:mm:ss"
						value-format="yyyy-MM-dd HH:mm:ss"
						placeholder="请选择日期时间"
						style="width: 100%"
					></el-date-picker>
					<!-- :class="table.tableDialogFormDisabled?'uploadDisabled':''" -->
					<el-upload
						v-else-if="item.htmlType == 'imageUpload' || item.htmlType == 'fileUpload'"
						:disabled="table.tableDialogFormDisabled"
						action=""
						:list-type="item.htmlType == 'imageUpload' ? 'picture-card' : 'text'"
						:limit="item.limit"
						:multiple="true"
						:on-exceed="
			                (file, fileList) => {
			                    handleExceed(file, fileList, item);
			                }
			            "
						:on-change="
			                (file, fileList) => {
			                    handleChange(file, fileList, item,itemIndex);
			                }
			            "
						:on-remove="
			                (file, fileList) => {
			                    handleRemove(file, fileList, item,itemIndex);
			                }
			            "
						:on-preview="handllePreview"
						:file-list="item.options.fileList"
						:auto-upload="false"
					>
						<!-- :before-remove="
					    (file, fileList) => {
					        handleBeforeRemove(file, fileList, item);
					    }
					" -->
						<template v-if="table.tableDialogType!='Look'">
							<el-button
								v-if="item.htmlType == 'fileUpload'"
								:size="size"
								type="primary"
							>
								点击上传
							</el-button>
							<el-icon v-else><Plus /></el-icon>
						</template>
						<template slot="tip" v-else>
							<span class="tip" v-if="item.options.fileList.length==0">
								暂未上传文件
							</span>
							<span class="tip" v-else>
								总共上传{{item.options.fileList.length}}个文件
							</span>
						</template>
					</el-upload>
				</el-form-item>
			</el-form>
		</template>
		<template v-slot:footer v-if="!table.tableDialogFormDisabled">
			<el-button type="primary" :size="proxy.size" @click="resetDialogForm(tableDialogForm)">
				重 置
			</el-button>
			<el-button type="primary" :size="proxy.size" @click="submitDialogForm(tableDialogForm)">
				提 交
			</el-button>
		</template>
	</ZyjDialog>

	<ZyjDialog
		dialogTitle="预览或下载"
		v-model="table.isPreviewOrDown"
		:dialogCenter="true"
		:dialogAlignCenter="true"
		dialogWidth="20%"
	>
		<template v-slot:body>
			<el-button type="primary" :size="proxy.size" @click="preview()">预览</el-button>
			<el-button type="primary" :size="proxy.size" @click="down()">下载</el-button>
		</template>
	</ZyjDialog>
	<ZyjDialog
		dialogTitle="导入"
		v-model="table.dialogExport"
		:dialogCenter="true"
		:dialogAlignCenter="true"
		dialogWidth="20%"
	>
		<template v-slot:body>
			<el-upload
				ref="excelUpload"
				class="uploadImport"
				name="file"
				:limit="1"
				:on-change="excelChange"
				:on-exceed="onExceed"
				accept=".xlsx, .xls"
				:data="table.importFileParams"
				:auto-upload="false"
				action=""
				:file-list="table.exportFiles"
			>
				<!-- :headers="{ Authorization: token }" -->
				<el-button slot="trigger" :size="size" type="primary">选取文件</el-button>
			</el-upload>
		</template>
		<template v-slot:footer>
			<el-button type="primary" :size="proxy.size" @click="table.dialogExport = false">
				取消
			</el-button>
			<el-button type="primary" :size="proxy.size" @click="postExcel">确定</el-button>
		</template>
	</ZyjDialog>

	<ZyjDialog
		dialogTitle="错误详情"
		v-model="table.tableErrorDetailVisible"
		:dialogCenter="true"
		:dialogAlignCenter="true"
		dialogWidth="50%"
	>
		<template v-slot:body>
			<el-table
				border
				stripe
				:data="table.tableErrorDetailData"
				height="500"
				style="width: 100%"
			>
				<el-table-column
					type="index"
					label="序号"
					align="center"
					width="80"
				></el-table-column>
				<el-table-column
					width="80"
					prop="id"
					align="center"
					label="错误行数"
				></el-table-column>
				<el-table-column
					width="100"
					prop="type"
					align="center"
					label="错误类型"
				></el-table-column>
				<el-table-column prop="msg" align="center" label="错误原因"></el-table-column>
			</el-table>
		</template>
	</ZyjDialog>
</template>

<script setup>
	import {
		ref,
		reactive,
		watch,
		watchEffect,
		provide,
		onMounted,
		getCurrentScope,
		getCurrentInstance,
		nextTick,
	} from 'vue';
	import { Base64 } from 'js-base64';
	import { ElMessage, ElMessageBox, ElLoading } from 'element-plus';
	import ZyjDialog from '@com/ZyjDialog/index.vue';
	import {
		getTableColumn,
		getTableData,
		addTableData,
		updateTableData,
		delTableData,
		uploadFile,
		delFile,
		getFile,
		impdatas,
		dowFiles,
		exportFile,
	} from '@api/form.js';
	let { ctx, proxy } = getCurrentInstance();

	console.log(proxy);
	let props = defineProps({
		formData: {
			type: Object,
			default: () => {},
		},
	});
	// 搜索
	let search = reactive({
		field: [],
		form: {},
	});
	// 表格
	let table = reactive({
		tableLoading: false,
		tableData: [],
		tableTotal: 0,
		tableColumnsInit: [],
		tableColumnsFilter: [],
		operationWidth: 0,
		tablePage: {
			pageNum: 1,
			pageSize: 10,
		},
		nowSelectData: null,
		// 操作类型
		tableDialogType: null,
		// 是否已经获取过列
		isGetTableColumns: false,
		// 添加/修改/查看弹窗是否显示
		tableDialogVisible: false,
		// 弹窗标题
		tableDialogTitle: null,
		// 弹窗表单
		tableDialogForm: {},
		//弹窗列
		tableDialogField: [],
		// 选中的数据集合
		tableMultipleSelection: [],
		// 单选的数据
		tableRadioSelection: null,
		// 排序格式
		orderJson: {},
		// 选中的id集合
		tableChekIds: [],
		// 进度数
		progressText: '0',
		// 是否弹出预览框
		isPreviewOrDown: false,
		// 预览文件
		previewDown: {},
		// 存储临时值
		tableTempData: [],
		//导入
		exportFiles: [],
		dialogExport: false,
		// 参数
		importFileParams: {
			bucketName: props.formData.formId,
			dataId: '',
		},
		// 错误信息
		tableErrorDetailData: [],
		tableErrorDetailVisible: false,
	});
	let searchRef = ref();
	let tableRef = ref();
	let tableDialogForm = ref();
	let excelUpload = ref();

	let emit = defineEmits(['resetSearchForm']);

	let getFilterList = function (key) {
		let data = JSON.parse(JSON.stringify(table.tableColumnsInit));
		return data.filter((item) => item[key] == '1');
	};

	let getData = async function () {
		if (!table.isGetTableColumns) {
			let res = await getTableColumn({ formId: props.formData.formId });
			if (res.code == 200) {
				table.tableColumnsInit = res.rows;

				table.tableColumnsFilter = getFilterList('isList');

				table.isGetTableColumns = true;

				search.field = searchFieldFormateFun(getFilterList('isQuery'));
				getTableDataInit();
			} else {
				ElMessage({
					type: 'error',
					message: res.msg,
				});
			}
		} else {
			getTableDataInit();
		}
	};
	let getTableDataInit = function () {
		var searchJson = JSON.parse(JSON.stringify(search.form));
		for (let key in searchJson) {
			if (key.includes('BETWEEN')) {
				if (searchJson[key] instanceof Array === true) {
					if (searchJson[key].length) {
						searchJson[key] = searchJson[key][0] + ' AND ' + searchJson[key][1];
					} else {
						searchJson[key] = '';
					}
				} else {
					searchJson[key] = '';
				}
			}
		}
		let params = {
			searchJson: searchJson,
		};
		params.orderbyJson = table.orderJson;
		if (props.formData.outParams) {
			for (let key in props.formData.outParams) {
				params.searchJson[key + '@='] = props.formData.outParams[key];
			}
		}
		getTableData(props.formData.formId, table.tablePage, params).then(async (res) => {
			if (res.code == 200) {
				let tableData = res.rows;
				for (let i in tableData) {
					for (let j in table.tableColumnsInit) {
						if (
							table.tableColumnsInit[j].htmlType == 'imageUpload' ||
							table.tableColumnsInit[j].htmlType == 'fileUpload'
						) {
							let fileList = [];
							let rowFileList = [];
							let files = [];
							if (tableData[i][table.tableColumnsInit[j].columnName]) {
								let res = await getFile({
									dataId: tableData[i][table.tableColumnsInit[j].columnName],
									bucketName: props.formData.formId,
								});
								let rows = res.data.rows;
								if (rows.length > 0) {
									for (let i in rows) {
										fileList.push({
											name: rows[i].fileName,
											url: `${proxy.baseUrl}/file/downFile?url=${rows[i].objectName}`,
											id: rows[i].id,
										});
									}
								}
							}
							tableData[i][table.tableColumnsInit[j].columnName + '-fileList'] =
								fileList;
							table.tableColumnsInit[j].options = {
								fileList: fileList,
								files: [],
								dataId: tableData[i][table.tableColumnsInit[j].columnName],
							};
						}
					}
				}
				table.tableData = tableData;
				table.tableTotal = res.total;
				resetTablelayout();
			} else {
				ElMessage({
					type: 'error',
					message: res.msg,
				});
			}
		});
	};
	//排序自定义
	let handleSortChange = function ({ column, prop, order }) {
		table.orderJson = {};
		if (order == 'ascending') {
			table.orderJson[prop] = 'asc';
		} else {
			table.orderJson[prop] = 'desc';
		}
		getData();
	};
	// 序号定制
	let tableRowIndexRender = function (index) {
		return (table.tablePage.pageNum - 1) * table.tablePage.pageSize + index + 1;
	};
	//显示个性style
	let showStyle = function (row, column) {
		if (column.colorType) {
			var style = '';
			var arr = column.colorType.split(';');
			for (let v of arr) {
				var newArr = v.split(',');
				if (newArr[0] == '=') {
					if (row[column.columnName] == newArr[1]) {
						style = newArr[2];
					}
				} else if (newArr[0] == '!=') {
					if (row[column.columnName] != newArr[1]) {
						style = newArr[2];
					}
				} else if (newArr[0] == '>') {
					if (row[column.columnName] > newArr[1]) {
						style = newArr[2];
					}
				} else if (newArr[0] == '>=') {
					if (row[column.columnName] >= newArr[1]) {
						style = newArr[2];
					}
				} else if (newArr[0] == '<') {
					if (row[column.columnName] < newArr[1]) {
						style = newArr[2];
						break;
					}
				} else if (newArr[0] == '<=') {
					if (row[column.columnName] <= newArr[1]) {
						style = newArr[2];
						break;
					}
				}
			}
			return style;
		}
	};
	// 格式化select数据
	let showData = function (options, key) {
		if (options && key) {
			var obj = options.find((v, i) => {
				return v.dictValue == key;
			});
			if (obj) {
				return obj.dictLabel;
			} else {
				return key;
			}
		} else {
			return key;
		}
	};

	// 重置样式
	let resetTablelayout = function () {
		if (!props.formData.hideInlineControl) {
			nextTick(() => {
				let ele = tableRef.value.$el.querySelectorAll('.operation');
				if (ele.length > 0) {
					let widestButtonWidth = 0;
					const buttons = ele[0].querySelectorAll('.el-button');
					buttons.forEach((button) => {
						const buttonWidth = button.offsetWidth;
						widestButtonWidth += buttonWidth;
					});

					table.operationWidth = widestButtonWidth + 20;
				}
				tableRef.value.doLayout();
			});
		}
	};
	// 输入最大长度
	let getVarchar = function (item) {
		let index = item.indexOf('varchar');
		if (index != -1) {
			return parseInt(item.substring(item.indexOf('(') + 1, item.indexOf(')')));
		}
	};
	// 规则校验
	let rules = function (item) {
		var rule1 = {
			required: item.isRequired == '1' ? true : false,
			message: item.remindText
				? item.remindText
				: item.htmlType == 'input' || item.htmlType == 'textarea'
				? '请输入' + item.columnComment
				: '请选择' + item.columnComment,
			trigger: item.htmlType == 'input' || item.htmlType == 'textarea' ? 'blur' : 'change',
		};
		var rule2 = null;
		if (item.columnType.indexOf('int') > -1 || item.columnType.indexOf('double') > -1) {
			rule2 = {
				pattern: /^(\-|\+)?\d+(\.\d+)?$/,
				message: item.columnComment + '必须为数字值',
			};
		}

		if (rule2) {
			return [rule1, rule2];
		} else {
			return [rule1];
		}
	};
	//分页切换
	let handleCurrentChange = function (currentPage) {
		table.tablePage.pageNum = currentPage;
		getTableData();
	};
	//每页条数改变
	let handleSizeChange = function (val) {
		table.tablePage.pageSize = val;
		getTableData();
	};
	//每行点击事件
	let handleTableRowClick = function (row, column, event) {
		// this.$refs.tableRef.toggleRowSelection(row);
		// console.log('行数据：' + row);
		// this.$emit('handleTableRowClick',row, column, event)
	};
	//编辑/删除/增加一条数据
	let handleTableRowControl = function (type, row) {
		table.tableDialogType = type;
		if (type == 'Query') {
			getTableData();
		} else if (type == 'Add') {
			table.tableDialogFormDisabled = false;
			table.tableDialogVisible = true;
			handleTableRowAdd();
		} else {
			if (row) {
				table.nowSelectData = JSON.parse(JSON.stringify(row));
				if (type == 'Edit') {
					table.tableDialogFormDisabled = false;
					table.tableDialogVisible = true;
					handleTableRowEdit(row);
				} else if (type == 'Look') {
					table.tableDialogFormDisabled = true;
					table.tableDialogVisible = true;
					handleTableRowLook(row);
				} else if (type == 'Delete') {
					handleTableRowDelete(row);
				}
			} else {
				table.nowSelectData = null;
				if (table.tableMultipleSelection.length != 0) {
					if (type == 'Delete') {
						handleTableRowDelete(row);
						return;
					}
					// if (table.tableMultipleSelection.length > 1) {
					// 	ElMessage({
					// 		type: 'warning',
					// 		message: '只能选择一条数据,才可进行此操作!',
					// 	});
					// } else {
					// 	if (type == 'Edit') {
					// 		table.tableDialogFormDisabled = false;
					// 		table.tableDialogVisible = true;
					// 		handleTableRowEdit(row);
					// 	} else if (type == 'Look') {
					// 		table.tableDialogFormDisabled = true;
					// 		table.tableDialogVisible = true;
					// 		handleTableRowLook(row);
					// 	}
					// }
				} else {
					ElMessage({
						type: 'warning',
						message: '请选择一条数据,才可进行此操作!',
					});
				}
			}
		}
	};
	//详情
	let handleTableRowLook = function (row) {
		table.tableDialogTitle = '查看';
		table.tableDialogField = [];
		table.tableDialogForm = {};
		let data = JSON.parse(JSON.stringify(table.tableColumnsInit));
		data.forEach((v, i) => {
			if (v.isDetail == '1') {
				if (v.htmlType == 'multipleSelect') {
					table.tableDialogForm[v.columnName] = row[v.columnName]
						? row[v.columnName].split(',')
						: [];
				} else if (v.htmlType == 'imageUpload' || v.htmlType == 'fileUpload') {
					v.options = {
						fileList: row[v.columnName + '-fileList'],
						files: [],
						dataId: '',
					};
				} else {
					table.tableDialogForm[v.columnName] = row[v.columnName];
				}
				table.tableDialogField.push(v);
			}
		});
	};
	//添加
	let handleTableRowAdd = function () {
		nextTick(() => {
			tableDialogForm.value.clearValidate();
		});
		table.tableDialogTitle = '添加';
		table.tableDialogField = [];
		table.tableDialogForm = {};
		table.tableTempData = [];
		let data = JSON.parse(JSON.stringify(table.tableColumnsInit));
		data.forEach((v, i) => {
			if (v.isInsert == '1') {
				if (v.htmlType == 'imageUpload' || v.htmlType == 'fileUpload') {
					v.options = {
						fileList: [],
						files: [],
						dataId: '',
					};
				}
				table.tableDialogForm[v.columnName] = '';
				table.tableDialogField.push(v);
			}
		});
		table.tableTempData = JSON.parse(JSON.stringify(table.tableDialogField));
	};
	//编辑
	let handleTableRowEdit = function (row) {
		nextTick(() => {
			tableDialogForm.value.clearValidate();
		});
		table.tableDialogTitle = '编辑';
		table.tableDialogField = [];
		table.tableDialogForm = {};
		table.tableTempData = [];
		let data = JSON.parse(JSON.stringify(table.tableColumnsInit));
		data.forEach((v, i) => {
			if (v.isEdit == '1') {
				if (v.htmlType == 'multipleSelect') {
					table.tableDialogForm[v.columnName] = row[v.columnName]
						? row[v.columnName].split(',')
						: [];
				} else if (v.htmlType == 'imageUpload' || v.htmlType == 'fileUpload') {
					v.options = {
						fileList: row[v.columnName + '-fileList'],
						files: [],
						dataId: '',
					};
					table.tableDialogForm[v.columnName] = row[v.columnName];
				} else {
					table.tableDialogForm[v.columnName] = row[v.columnName];
				}
				table.tableDialogField.push(v);
			}
		});

		table.tableTempData = JSON.parse(JSON.stringify(table.tableDialogField));

		table.tableDialogForm.id = row.id;
	};
	//删除
	let handleTableRowDelete = function (row) {
		let ids = '';
		if (row) {
			ids = row.id;
		} else {
			ids = table.tableChekIds.join();
		}

		ElMessageBox.confirm('确认要删除吗?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
		})
			.then(() => {
				delTableData(props.formData.formId, ids).then((res) => {
					if (res.code == 200) {
						ElMessage({
							type: 'success',
							message: '删除成功!',
						});
						table.tableDialogForm = {};
						table.tablePage.pageNum = 1;
						table.tableDialogType = 'Query';
						getData();
					} else {
						ElMessage({
							type: 'error',
							message: res.msg,
						});
					}
				});
			})
			.catch(() => {
				ElMessage({
					type: 'info',
					message: '已取消删除',
				});
			});
	};
	//重置表单
	let resetDialogForm = function (formEl) {
		if (!formEl) return;
		nextTick(() => {
			if (table.tableDialogType == 'Query' || table.tableDialogType == 'Add') {
				table.tableDialogForm = {};
			} else {
				formEl.resetFields();
			}
		});
	};
	//提交表单
	let submitDialogForm = function (formEl) {
		if (!formEl) return;
		formEl.validate((valid) => {
			if (valid) {
				if (table.tableDialogType == 'Query') {
					submitDialogFormQuery();
				} else {
					submitDialogFormSubmit();
				}
			} else {
				console.log('error submit!!');
				return false;
			}
		});
	};
	//查询提交
	let submitDialogFormQuery = function () {
		table.tableDialogVisible = false;
		getData();
	};
	//提交
	let submitDialogFormSubmit = async function () {
		let loading = ElLoading.service({
			lock: true,
			text: `数据提交中，进度${table.progressText}%,请稍后~`,
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.7)',
		});
		var params = JSON.parse(JSON.stringify(table.tableDialogForm));
		for (let i in table.tableDialogField) {
			if (
				table.tableDialogField[i].htmlType == 'imageUpload' ||
				table.tableDialogField[i].htmlType == 'fileUpload'
			) {
				let files = table.tableDialogField[i].options.files;
				if (files.length) {
					let form = new FormData();
					table.tableDialogField[i].options.files.forEach((file) => {
						form.append('files', file);
					});
					form.append('bucketName', props.formData.formId);
					form.append('dataId', params[table.tableDialogField[i].columnName] || '');
					let res = await uploadFile(form, (progressEvent) => {
						table.progressText =
							((progressEvent.loaded / progressEvent.total) * 100) | 0;
						loading.setText(`数据提交中，进度${table.progressText}%,请稍后~`);
					});
					if (res.code == 200) {
						// if (this.tableDialogType == "Add") {
						params[table.tableDialogField[i].columnName] = res.msg;
						// }
						console.log('照片已上传');
					} else {
						ElMessage({
							type: 'error',
							message: res.msg,
						});
					}
				}
			} else if (table.tableDialogField[i].htmlType == 'multipleSelect') {
				params[table.tableDialogField[i].columnName] =
					params[table.tableDialogField[i].columnName].join();
			}
		}
		if (table.tableDialogType == 'Add') {
			if (props.formData.outParams) {
				for (let key in props.formData.outParams) {
					params[key] = props.formData.outParams[key];
				}
			}

			addTableData(props.formData.formId, params).then((res) => {
				if (res.code == 200) {
					ElMessage({
						message: '添加成功',
						type: 'success',
					});
					table.tableDialogVisible = false;
					table.tableDialogForm = {};
					table.tablePage.pageNum = 1;
					table.tableDialogType = 'Query';
					getData();
				} else {
					ElMessage({
						type: 'error',
						message: res.msg,
					});
				}
				loading.close();
			});
		} else {
			updateTableData(props.formData.formId, params).then((res) => {
				if (res.code == 200) {
					ElMessage({
						message: '修改成功',
						type: 'success',
					});
					table.tableDialogVisible = false;
					table.tableDialogForm = {};
					table.tablePage.pageNum = 1;
					table.tableDialogType = 'Query';
					getData();
				} else {
					ElMessage({
						type: 'error',
						message: res.msg,
					});
				}
				loading.close();
			});
		}

		resetSelection();
	};
	let resetSelection = function () {
		if (tableRef && tableRef.value.clearSelection) {
			tableRef.value.clearSelection();
		}
		table.tableMultipleSelection = [];
		table.tableChekIds = [];
		table.tableRadioSelection = null;
	};

	//选中的表格数据集合
	let handleSelectionChange = function (val) {
		table.tableMultipleSelection = val;
		table.tableChekIds = val.map((item) => item.id);
	};
	// 单选操作
	let tableRadioChange = function (val) {
		table.tableMultipleSelection = [val];
		table.tableChekIds = val.id;
	};

	// 文件超出个数限制时的钩子
	let handleExceed = function (files, fileList, item) {
		ElMessage.warning(`限制选择 ${item.limit} 个文件!`);
	};
	// 移除文件
	let handleRemove = async function (file, fileList, item, itemIndex) {
		let res = await delFile(file.id);
		if (res.code == 200) {
			if (table.tableTempData[itemIndex].isRequired == '1') {
				if (item.options.fileList.length == 0) {
					table.tableDialogForm[item.columnName] = '';
					item.isRequired = '1';
				} else {
					item.isRequired = '0';
				}
			} else {
				if (item.options.fileList.length == 0) {
					table.tableDialogForm[item.columnName] = '';
				}
			}
		}
	};
	// let handleBeforeRemove = function (file, fileList, item,itemIndex) {
	// 	if (fileList.length != 0) {
	// 		item.isRequired = '1';
	// 	}
	// };
	// 选择文件
	let handleChange = function (file, fileList, item, itemIndex) {
		const isLt2M = file.raw.size / 1024 / 1024 < 100;
		if (item.htmlType == 'imageUpload') {
			const isPicture = ['image/jpeg', 'image/png', 'image/gif'].includes(file.raw.type);
			if (!isPicture) {
				delFile();
				ElMessage.error('只能上传图片!');
			}
			if (!isLt2M) {
				delFile();
				ElMessage.error('文件大小不能超过 100MB!');
			}
			if (isPicture && isLt2M) {
				addFile();
			}
		} else {
			if (!isLt2M) {
				delFile();
				ElMessage.error('文件大小不能超过 100MB!');
			}
			if (isLt2M) {
				addFile();
			}
		}
		function addFile() {
			item.options.fileList.push({ name: file.name, url: file.url });
			item.options.files.push(file.raw);
		}
		function delFile() {
			fileList.splice(
				fileList.findIndex((item) => item.url === file.url),
				1
			);
		}
		if (table.tableTempData[itemIndex].isRequired == '1') {
			if (item.options.fileList.length > 0) {
				tableDialogForm.value.clearValidate(item.columnName);
				item.isRequired = '0';
			} else {
				item.isRequired = '1';
			}
		} else {
			if (item.options.fileList.length > 0) {
				tableDialogForm.value.clearValidate(item.columnName);
			} else {
			}
		}
	};

	// 格式化搜索数据格式
	let searchFieldFormateFun = function (data) {
		data.forEach((v, i) => {
			let type = '';
			if (v.queryType == 'BETWEEN') {
				type = 'BETWEEN';
			} else {
				if (v.queryType == 'EQ') {
					type = '=';
				} else if (v.queryType == 'NE') {
					type = '!=';
				} else if (v.queryType == 'GT') {
					type = '>';
				} else if (v.queryType == 'GTE') {
					type = '>=';
				} else if (v.queryType == 'LT') {
					type = '<';
				} else if (v.queryType == 'LTE') {
					type = '<=';
				} else {
					type = v.queryType ? v.queryType : 'LIKE';
				}
			}
			v.columnName = `${v.columnName}@${type}`;
		});
		return data;
	};
	// 导入
	let importFile = function () {
		if (table.exportFiles.length > 0) {
			excelUpload.value.clearFiles();
		}
		table.dialogExport = true;
	};
	let onExceed = function (file, fileList) {
		ElMessage({
			message: '只能上传一个文件！若想替换文件，请先删除后再进行操作！',
			type: 'error',
		});
	};
	let excelChange = function (res, file, fileList) {
		table.exportFiles = [res.raw];
	};
	/**
	 * 导入-提交事件
	 */
	let postExcel = function () {
		if (props.formData.formId != '') {
			let loading = ElLoading.service({
				lock: true,
				text: `数据提交中，进度${table.progressText}%,请稍后~`,
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)',
			});

			let formData = new FormData();
			if (props.formData.outParams) {
				for (let key in props.formData.outParams) {
					formData.append(key, props.formData.outParams[key]);
				}
			}

			formData.append('file', table.exportFiles[0]);
			impdatas(props.formData.formId, formData, (progressEvent) => {
				table.progressText = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
				loading.setText(`数据提交中，进度${table.progressText}%,请稍后~`);
			}).then((res) => {
				if (res.code == 200) {
					ElMessage({
						message: '导入成功！',
						type: 'success',
					});
					table.tableDialogForm = {};
					table.tablePage.pageNum = 1;
					table.tableDialogType = 'Query';
					getData();
					excelUpload.value.clearFiles();
					table.dialogExport = false;
				} else {
					ElMessage({
						message: res.msg,
						type: 'error',
					});
					table.tableErrorDetailData = res.data;
					table.tableErrorDetailVisible = true;
				}
				loading.close();
			});
			excelUpload.value.submit();
		} else {
			ElMessage({
				message: '请选择目录后导入',
				type: 'info',
			});
		}
	};

	/**
	 * 导出
	 */
	let exportFileFn = async function (type) {
		if (props.formData.formId) {
			//设备特殊传参
			var data = { ids: type == 'template' ? 0 : table.tableChekIds.join() };

			if (props.formData.outParams) {
				var outParams = {};
				for (let key in props.formData.outParams) {
					outParams[key] = props.formData.outParams[key];
				}
				data = { ...outParams, ...data };
			}
		}
		let loading = ElLoading.service({
			lock: true,
			text: `数据提交中，进度${table.progressText}%,请稍后~`,
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.7)',
		});
		let res = await exportFile(
			{
				formId: props.formData.formId,
				userId: '1',
			},
			data,
			(progressEvent) => {
				table.progressText = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
				loading.setText(`数据提交中，进度${table.progressText}%,请稍后~`);
			}
		);
		if (res) {
			let blob = new Blob([res], { type: res.type });
			let downloadElement = document.createElement('a');
			let href = window.URL.createObjectURL(blob);
			downloadElement.href = href;
			downloadElement.download = props.formData.formName;
			document.body.appendChild(downloadElement);
			downloadElement.click();
			document.body.removeChild(downloadElement); //移除元素；防止连续点击创建多个a标签
			window.URL.revokeObjectURL(href);
			loading.close();
		}
	};

	let downLoadFile = function (item) {
		table.previewDown = item;
		table.isPreviewOrDown = true;
	};

	let handllePreview = function (item) {
		table.previewDown = item;
		table.isPreviewOrDown = true;
	};
	// 预览
	let preview = function () {
		var originUrl = table.previewDown.url;
		var previewUrl = originUrl + '&fullfilename=' + table.previewDown.name;
		var url = previewUrl.replace(/\#/g, '%23');
		window.open(
			proxy.fileUrl + ':8012/onlinePreview?url=' + encodeURIComponent(Base64.encode(url))
		);
	};
	// 下载
	let down = function () {
		var url = table.previewDown.url;
		const x = new window.XMLHttpRequest();
		x.open('GET', url, true);
		x.responseType = 'blob';
		x.onload = () => {
			const url = window.URL.createObjectURL(x.response);
			const a = document.createElement('a');
			a.href = url;
			a.download = table.previewDown.name;
			a.click();
		};
		x.send();
	};

	let resetSearchForm = function (formEl) {
		search.form = {};
		emit('resetSearchForm');
		getData();
	};
	let submitSearchForm = function (formEl) {
		if (!formEl) return;
		getData();
	};
	// provide('resetSearchForm', resetSearchForm)
	// let submitSearchForm=function (val) {
	//     console.log(val);
	// }
	// provide('submitSearchForm', submitSearchForm)

	onMounted(() => {
		// 获取表头数据
		// getData();
	});

	// watch(
	//     props.formData.formId,
	//     (newVal, oldVal) => {
	// 		if(newVal){
	// 			getData();
	// 		}
	//     },
	//     {
	// 		deep: true,
	// 		immediate: true,
	// 		}
	// );

	watch(
		() => props.formData.formId,
		(newVal, oldVal) => {
			getData();
		},
		{
			deep: true,
			immediate: true,
		}
	);
</script>

<style scoped></style>
