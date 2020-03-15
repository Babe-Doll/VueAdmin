<template>
   <el-form ref="postForm" :model="postForm">
      <!--吸顶-->
      <sticky :class-name="'sub-navbar'">
        <el-button v-if="!isEdit" @click="showGuide">显示帮助</el-button>
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
              ></ebook-upload>
          </el-col> 
          <el-col :span="24"></el-col>
        </el-row> 
      </div>
   </el-form>
</template>

<script>
import Sticky from '../../../components/Sticky';
import Waring from './waring';
import EbookUpload from '../../../components/Upload/index';
export default {
  components:{
    Sticky,Waring,EbookUpload
  },
  props:{
    isEdit:Boolean
  },
  data() {
    return {
      loading:false,
      postForm:{ 
      }, 
    }
  },
  methods: {
     showGuide(){
       console.log("show guide")
     },
     submitForm(){
       this.loading =true
       setTimeout(()=>
        {
          this.loading=false
        },1000)
     }
  }
}
</script>

 
<style scoped lang = "scss">
 .detail-container{
   padding:40px
 }
</style>