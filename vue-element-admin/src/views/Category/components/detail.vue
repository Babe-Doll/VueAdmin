<template>
   <el-form ref="postForm" :model="postForm" :rules="rules">
      <!--吸顶-->
      <sticky :class-name="'sub-navbar'">
        <el-button v-if="!isEdit" @click="showGuide"></a>显示帮助</el-button>
        <el-button v-loading="loading"
                    @click="submitForm"
                    type="success"
        >
          {{isEdit?'编辑电子书':'新增电子书'}}           
        </el-button> 
      </sticky>
      
      <div class="detail-container">
        <el-row>
          <waring />
          <el-col :span="24">
              <ebook-upload
                :file-list="fileList"
                :disabled="isEdit"
                @onSuccess="onUploadSuccess"
                @onRemove="onUploadRemove"
              />
          </el-col> 
          <el-col :span="24">
            <el-form-item prop="imgName">
              <md-input v-model="postForm.imgName" name="name" required>
                头像名
              </md-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="图片大小" :label-width="labelWidth">
                  <el-input 
                    v-model="postForm.size"
                    placeholder="大小"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12"></el-col>
            </el-row> 
            <el-row>
              <el-col :span="24">
                <el-form-item label="图片大小" :label-width="labelWidth">
                  <img src="http://localhost:5002/upload/test.jpg" class="preview-img"> 
                </el-form-item> 
              </el-col> 
            </el-row>
            
          </el-col>
        </el-row> 
      </div>
   </el-form>
</template>

<script>
import Sticky from '../../../components/Sticky';
import Waring from './waring';
import EbookUpload from '../../../components/Upload/index';
import MdInput from '../../../components/MDinput';

export default {
  components:{
    Sticky,Waring,EbookUpload,MdInput
  },
  props:{
    isEdit:Boolean
  },
  data() {
    return {
      loading:false,
      postForm:{ 
      }, 
      fileList:[], //获取到电子书时放到这里 才可以展示文件
      labelWidth:'120px',
      rules:{
        title:[{}]
      }
    }
  },
  methods: {
      onUploadSuccess(){
        console.log("onUploadSuccess")
      },
      onUploadRemove(){
        console.log("onUploadRemove") 
      },
      showGuide(){
        console.log("show guide")
      },
      submitForm(){
        this.loading =true
        this.$refs.postForm.validate((valid,fields) =>{
          console.log(valid,fields)
          if(valid){

          }else{

          }
        })
      }
  }
}
</script>

 
<style scoped lang = "scss">
 .detail-container{
   padding:40px;
   .preview-img{
    width:200px;
    height:200px;
   }
 }
 
</style>