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
        :append-to-body="true"
    >
        <div class="el-dialog-div" :class="showRight?'active':''">
            <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="申请信息" name="first">
          <first :dialogRowData="dialogRowData"></first>
         
        </el-tab-pane>
        <el-tab-pane label="风险评估" name="second">
          <second :dialogRowData="dialogRowData"></second>
        </el-tab-pane>
        <el-tab-pane label="变更实施" name="third">
          <third :dialogRowData="dialogRowData"></third>
        </el-tab-pane>
        <el-tab-pane label="变更验收" name="fourth">
          <fourth :dialogRowData="dialogRowData"></fourth>
        </el-tab-pane>
        <el-tab-pane label="变更后评估" name="five">
          <five :dialogRowData="dialogRowData"></five>
        </el-tab-pane>
      </el-tabs>
      <div class="tools-right">
        <el-button type="primary" :size="size">审 批</el-button>
        <el-button type="warning" :size="size">驳 回</el-button>
      </div>
      <flow :flowId="dialogRowData.flow_id"></flow> -->
            <div class="topFixed">
                <div class="tabs">
                    <div class="item" v-for="(item, index) in tabsData" :key="index" :class="index == tabsIndex ? 'active' : ''" @click="changeTabs(item, index)">{{ item.name }}</div>
                </div>
            </div>
           <!-- <div class="contentBox" v-if="dialogRowData.level=='重大变更'">
                <first ref="flow1" v-if="tabsIndex == 0" :dialogRowData="dialogRowData" :isHaveSave="isHaveSave" @closeVisibleDetail="closeVisibleDetail"></first>
                <second ref="flow2" v-if="tabsIndex == 1" :dialogRowData="dialogRowData" :isHaveSave="isHaveSave" @closeVisibleDetail="closeVisibleDetail"></second>
                <third ref="flow3" v-if="tabsIndex == 2" :dialogRowData="dialogRowData" :isHaveSave="isHaveSave" @closeVisibleDetail="closeVisibleDetail"></third>
                <fourth ref="flow4" v-if="tabsIndex == 3" :dialogRowData="dialogRowData" :isHaveSave="isHaveSave" @closeVisibleDetail="closeVisibleDetail"></fourth>
                <six ref="flow5" v-if="tabsIndex == 4" :dialogRowData="dialogRowData" :isHaveSave="isHaveSave" @closeVisibleDetail="closeVisibleDetail"></six>
                <five ref="flow6" v-if="tabsIndex == 5" :dialogRowData="dialogRowData" :isHaveSave="isHaveSave" @closeVisibleDetail="closeVisibleDetail"></five>
                <seven ref="flow7" v-if="tabsIndex == 6" :dialogRowData="dialogRowData" :isHaveSave="isHaveSave" @closeVisibleDetail="closeVisibleDetail"></seven>
            </div>
            <div class="contentBox" v-else>
                <first ref="flow1" v-if="tabsIndex == 0" :dialogRowData="dialogRowData" :isHaveSave="isHaveSave" @closeVisibleDetail="closeVisibleDetail"></first>
                <second ref="flow2" v-if="tabsIndex == 1" :dialogRowData="dialogRowData" :isHaveSave="isHaveSave" @closeVisibleDetail="closeVisibleDetail"></second>
                <third ref="flow3" v-if="tabsIndex == 2" :dialogRowData="dialogRowData" :isHaveSave="isHaveSave" @closeVisibleDetail="closeVisibleDetail"></third>
                <fourth ref="flow4" v-if="tabsIndex == 3" :dialogRowData="dialogRowData" :isHaveSave="isHaveSave" @closeVisibleDetail="closeVisibleDetail"></fourth>
                <five ref="flow5" v-if="tabsIndex == 4" :dialogRowData="dialogRowData" :isHaveSave="isHaveSave" @closeVisibleDetail="closeVisibleDetail"></five>
                <six ref="flow6" v-if="tabsIndex == 5" :dialogRowData="dialogRowData" :isHaveSave="isHaveSave" @closeVisibleDetail="closeVisibleDetail"></six>
                <seven ref="flow7" v-if="tabsIndex == 6" :dialogRowData="dialogRowData" :isHaveSave="isHaveSave" @closeVisibleDetail="closeVisibleDetail"></seven>
            </div> -->
            <div class="contentBox">
                <keep-alive>
                <component v-if="columnConfig" :isHaveSave="showFieldsOrDisabled(columnConfig,'page_'+isShow,true)" ref="flow"  :columnConfig="columnConfig" :is="isShow" :dialogRowData="dialogRowData"  @closeVisibleDetail="closeVisibleDetail"></component>
                <!-- <component  ref="flow" :isHaveSave="showFieldsOrDisabled(columnConfig,'page_'+isShow,true)" :columnConfig="columnConfig" :is="isShow" :dialogRowData="dialogRowData"  @closeVisibleDetail="closeVisibleDetail"></component> -->
            </keep-alive>
            <!-- <keep-alive>
                <component :ref="'flow'+(tabsIndex+1)" :is="isShow" :dialogRowData="dialogRowData" :isHaveSave="isHaveSave" @closeVisibleDetail="closeVisibleDetail"></component>
            </keep-alive> -->
            </div>
            <el-button class="btnSz"   type="text" @click="showRight = !showRight"
                >
                     <i :class="showRight ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
               </el-button>
        </div>
        
        
        </div>
        <div class="el-dialog-div"  v-show="showRight">
            
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>操作方式</span>
              </div>
              <div class="sbox">
                  <div class="btns">
                      <el-button v-for="(item, index) in btnsData" :key="index" :type="item.b_style" :size="size" @click="submitDialogForm(item)">{{ item.b_name }}</el-button>
                      <el-button  type="primary" :size="size" @click="isShowLct=true">流程图</el-button>
                  </div>
              </div>
            </el-card>
            
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>审查审批</span>
              </div>
              <div class="sbox">
                 <div class="btns agreeBtns" v-if="btnsSpData.length>0&&isSowBtns">
                    <el-button v-for="(item, index) in btnsSpData" :key="index" :type="item.b_style" :size="size" @click="submitDialogForm(item)">{{ item.b_name }}</el-button>
                  </div>
                  <div class="agree">
                      <el-input type="textarea"  clearable v-model="advice" :autosize="{ minRows: 5, maxRows: 10 }" style="width: 100%;" resize="none"></el-input>
                  </div>
              </div>
            </el-card>
            
            <el-card class="box-card lastbox">
              <div slot="header" class="clearfix">
                <span>流转意见</span>
              </div>
              <div class="sbox">
                 <flowHistory :flowId="dialogRowData.flow_id"></flowHistory>
              </div>
            </el-card>
            
        </div>
        <el-dialog
          class="lct"
            title="流程图"
            :visible.sync="isShowLct"
            width="100%"
            :lock-scroll="true"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :destroy-on-close="false"
            :size="size"
            :append-to-body="true"
        >
         <flowImage :flowId="dialogRowData.flow_id"></flowImage> 
         
        </el-dialog>    
    </el-dialog>
</template>

<script>
import flowHistory from "@com/flows/flowHistory";
import flowImage from "@com/flows/flowPicture/flow.vue";
import first from "./first";
import {listGybg,approvalEqui,processRejectionToStart,processRejection,getBtnsData,isApprove} from "../api";
import {permissionsMixin} from "@/mixins/permission.js";
export default {
  mixins: [permissionsMixin],
    name: "add",
    components: { flowHistory,flowImage, first },
    data() {
        return {
            isSowBtns:true,
            showRight:true,
            isShow:'first',
            isShowLct:false,
            isHaveSave:false,
            advice: "",
            tabsIndex: 0,
            columnConfig:null,
            tabsData: [
               
            ],
            btnsData: [
              
            ],
            btnsSpData:[],
            dialogTitle: "计划申请单流程",
            dialogVisible: true,
            bgdjDialogVisible: false,
            comName: null,
            size: "mini",
            dialogForm: {
                code: "11111",
                date: "2023-01-05",
                bgdj: "一般变更",
                sx: ""
            },
            bgsxList: [
                {
                    dictLabel: "时效一",
                    dictValue: "1"
                },
                {
                    dictLabel: "时效二",
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
            bgsjjsFileList: {
                fileList: [],
                files: []
            },
            xgfjFileList: {
                fileList: [],
                files: []
            },
            activeName: "first",
            comVisibleDetail: true,
            comNameDetail: import("@/views/sbgl/bgbfgl/bggl/details/first.vue"),
            flowData:null,
            dialogRowData:{flow_id:""}
            };
        },
        props: {
            rowId: {
                type: [Number,String],
                default: 0
            }
        },
        mounted() {
            this.getDetailData();
        },
        methods: {
            getDetailData(){
                listGybg({
                    id:this.rowId,
                    pageNum: 1,
                    pageSize: 10
                }).then(res => {
                  if (res.code == 200) {
                    this.dialogRowData = res.rows[0]
                    this.getBtnsData();
                  } else {
                    this.$message({
                      message: res.msg,
                      type: "error"
                    });
                  }
                });
            },
        isApprove(){
            isApprove({
               "id":this.dialogRowData.id,
            }).then((res)=>{
                if (res.code == 200) {
                    this.isSowBtns=res.data;
                } else {
                    this.$message({
                    message: res.msg,
                    type: "error"
                    });
                }
            })
        },
        getBtnsData(){
            getBtnsData({
              "instanceId":this.dialogRowData.flow_id
            }).then((res)=>{
                if (res.code == 200) {
                    this.columnConfig=res.columnConfig;  
                    this.btnsData=res.ywButton;
                    this.btnsSpData=res.lcButton;
                    this.tabsData=res.columnConfig.pageConfig;
                    this.tabsIndex=this.dialogRowData.flow_stuts=='流程已归档'?0:this.tabsData.length-1;
                    this.isShow=this.tabsData[this.tabsIndex].com;
                } else {
                    this.$message({
                    message: res.msg,
                    type: "error"
                    });
                }
            })

            /*getBtnsData({
                "createUserId":this.dialogRowData.userid,
                "type":this.dialogRowData.flow_type_id,
                "flowId":this.dialogRowData.flow_id
            }).then((res)=>{
                if (res.code == 200) {
                   var data=res.data[0];
                   this.flowData=data;
                 this.btnsData=data.business_oper?JSON.parse(data.business_oper):[];
                 this.btnsSpData=data.node_oper?JSON.parse(data.node_oper):[];
                  var obj=this.btnsData.find((item)=>{
                      return item.name=='保存'
                  })
                  if(obj){
                      this.isHaveSave=true;
                  }else{
                     this.isHaveSave=false;  
                  }
                } else {
                  this.$message({
                    message: res.msg,
                    type: "error"
                  });
                }
            })*/
        },
        closeVisibleDetail() {
            this.$emit("closeVisibleDetail");
        },
        //审批流程
        approvalEqui(lastLoading){
            var loading=null;
            if(lastLoading){
                loading=lastLoading;
            }else{
                loading = this.$loading({
                    lock: true,
                    text: '正在加载中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            }
            
          approvalEqui({
              "id":this.dialogRowData.id,
              "advice":this.advice,
              "num":this.dialogRowData.num,
          }).then((res)=>{
              if (res.code == 200) {
                  this.$emit('closeVisibleDetail');
                this.$message({
                  message: res.msg,
                  type: "success"
                });
              } else {
                
                this.$message({
                  message: res.msg,
                  type: "error"
                });
              }
               loading.close();
          })
        },
        //驳回至起点
        processRejectionToStart(){
            const loading = this.$loading({
                      lock: true,
                      text: '正在加载中',
                      spinner: 'el-icon-loading',
                      background: 'rgba(0, 0, 0, 0.7)'
                    });
            processRejectionToStart({
               "id":this.dialogRowData.id,
               "flowStuts":this.dialogRowData.flow_stuts,
               "level":this.dialogRowData.level,
               "advice":this.advice,
               "flowId":this.dialogRowData.flow_id,
            }).then((res)=>{
                if (res.code == 200) {
                    this.$emit('closeVisibleDetail');
                  this.$message({
                    message: res.msg,
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: res.msg,
                    type: "error"
                  });
                }
                loading.close();
            })
        },
        
        // 驳回上一节点
        processRejection(){
            const loading = this.$loading({
                      lock: true,
                      text: '正在加载中',
                      spinner: 'el-icon-loading',
                      background: 'rgba(0, 0, 0, 0.7)'
                    });
            processRejection({
              "id":this.dialogRowData.id,
              "advice":this.advice,
              "num":this.dialogRowData.num,
            }).then((res)=>{
                if (res.code == 200) {
                    this.$emit('closeVisibleDetail');
                  this.$message({
                    message: res.msg,
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: res.msg,
                    type: "error"
                  });
                }
                loading.close();
            })
        },
        
        
        submitDialogForm(item) {
            this.$confirm("确认此操作吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
            
                    //审批
                    if(item.b_event=='approvalEqui'){
                        this.approvalEqui(); 
                    //保存
                    }else if(item.b_event=='submitDialogForm'){
                        this.$refs.flow.submitDialogForm();
                    //保存并提交    
                    }else if(item.b_event=='saveAndSubmitDialogForm'){
                       this.$refs.flow.submitDialogForm(true);
                    //驳回上一个节点
                    }else if(item.b_event=='processRejection'){
                         this.processRejection(); 
                    //驳回上起点
                    }else if(item.b_event=='processRejectionToStart'){
                         this.processRejectionToStart(); 
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消此操作"
                    });
                });
            
           
        },
        changeTabs(item, index) {
            this.tabsIndex = index;
              this.isShow=item.com;
               $(".contentBox")[0].scrollTop = 0;
        },
        openBgdj() {
            this.comName = () => import("@/views/sbgl/bgbfgl/bggl/bgdj.vue");
            this.bgdjDialogVisible = true;
        },
        closeBgdjDialog(data) {
            this.bgdjDialogVisible = false;
            console.log(data);
            this.dialogForm.bgdj = data;
        },
        // 选择文件
        handleChange(file, fileList, item) {
            let that = this;
            const isLt2M = file.raw.size / 1024 / 1024 < 100;

            if (!isLt2M) {
                delFile();
                this.$message.error("文件大小不能超过 100MB!");
            }
            if (isLt2M) {
                addFile();
            }

            function addFile() {
                item.fileList.push({ name: file.name, url: file.url });
                item.files.push(file.raw);
            }

            function delFile() {
                fileList.splice(fileList.findIndex(item => item.url === file.url), 1);
            }
        },
        // 移除文件
        handleRemove(file, fileList, item) {
            let files = item.files;
            let list = item.fileList;
            item.files.splice(item.files.findIndex(item => item.url === file.url), 1);
            item.fileList.splice(item.fileList.findIndex(item => item.url === file.url), 1);
        },
        resetDialogForm(ref) {},

    }
};
</script>

<style lang="scss" scoped>
.bgdj {
    margin-right: 15px;
}

/deep/ .el-dialog {
  height: 100%;
  
}

// /deep/ .el-dialog__body {
//   max-height: 80vh;
// }
::v-deep .el-dialog__body {
    height: calc(100% - 54px);
      max-height: calc(100vh - 54px);
    display: flex;
}
/deep/ .el-tabs__item {
    color: white;
}

/deep/ .el-tabs__item:hover,
/deep/ .el-tabs__item.is-active {
    color: #409eff;
}

.el-dialog-div {
    position: relative;
    
    .tools-right {
        position: absolute;
        right: 0;
        top: 0;
    }
    .box-card{
        &:not(:last-child){
            margin-bottom: 15px;
        }
    }
    .el-card{
        background: transparent;
        color: #FFF;
    }
}
.el-dialog-div {
    height: 100%;
    &:nth-child(1){
        flex:1;
        &.active{
            width:  calc(80% - 7px);
        }
    }
    &:nth-child(2){
        margin-left: 14px;
        width:  calc(20% - 7px);
        display: flex;
        flex-direction: column;
        ::v-deep .el-card{
            &:last-child{
                flex: 1;
                .el-card__body{
                    height: calc(100% - 56px);
                    overflow-y: auto;
                }
            }
        }
        
    }
    position: relative;
    .btnSz{
        position: absolute;
        right: -15px;
        top: 5px;
        font-size: 20px;
        color: #FFF;
        font-weight: bold;
    }
}
.topFixed {
    display: flex;
    justify-content: space-between;
    height: 56px;
    line-height: 56px;
    padding-bottom: 10px;
    border-bottom: 1px solid #c9c9c9;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border: 1px solid #EBEEF5;
    padding: 0 15px;
}
.tabs {
    display: flex;

    .item {
        padding: 0 15px 10px;
        color: #fff;
        cursor: pointer;

        &.active {
            color: #409eff;
            border-bottom: 4px solid #409eff;
        }
    }
}
.contentBox {
    height: calc(100% - 56px);
    overflow-y: auto;
}
.agree {
    // width: 80%;
    // margin: 0.2rem auto;
    // padding: 20px;
    // box-shadow: 0 0 5px #ddd;
    // margin-top: 18px;
    .label {
        color: #fff;
        padding-bottom: 10px;
    }
}
// .lastbox{
//    ::v-deep .el-card__body{
//         max-height: 550px;
//         overflow-y: auto;
//     }
// }
.lct{
   ::v-deep .el-dialog{
       height: 100%;
       .el-dialog__body{
           background: #FFF;
       }
    }
}
.agreeBtns{
    padding-bottom: 18px;
}
</style>
