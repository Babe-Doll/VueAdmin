<template>
 <div class="upload-container">
     <el-upload :action="action" 
        :headers="headers"
        :multiple="false"
        :limit="1"
        :before-upload="beforeUpload"
        :on-success="onSuccess"
        :on-error="onError"
        :on-remove="onRemove"
        :file-list="fileList"
        :on-exceed="onExceed"
        :disabled="disabled"
        drag
        show-file-list 
        class="image-upload"
        >    
            <i class="el-icon-upload"/>
            <div
                class="el-upload__text" v-if="fileList.length === 0"
            >
                请将电子书拖入或<em> 点击上传</em>
            </div> 

            <div class="el-upload__text" v-else>
                图书已上传 
            </div>
     </el-upload>
 </div>
</template>
 
<script>
import { getToken } from '../../utils/auth'
import { array } from 'jszip/lib/support'
import { getInfo } from '../../api/user'
import store from '../../store'
export default { 
    props:{ 
        fileList:{
            type: Array,
            default(){
                return []
            }
        },
        disabled:{
            type:Boolean,
            default:false
        }
    },
    computed:{
        headers(){
            return{
                Authorization:`Bearer ${getToken()}`  
            }
        } 
    },

    
    data () { 
        return {
            userID:'',
            action:`${process.env.VUE_APP_BASE_API}/User/UpdateAvatar?userID=${store.getters.id}`,
        }
    },
    methods:{
        beforeUpload(file){
            console.log(file)
            this.userID = store.getters.id
            // this.action+=this.userID
            console.log(this.userID,this.action)
            this.$emit('beforeUpload',file)
        },
        onSuccess(response,file){
            console.log(response,file)
            const { state,message} = response
            if(state === 1){
                this.$message({
                    message:message,
                    type:'success'
                })
                this.$emit('onSuccess',file)
            }else if(state === 2 || state ===3 ){
                 this.$message({
                    message:message,
                    type:'error'
                })
                this.$emit('onError',file)
            }

        }, 
        onError(error){
            console.log({error})
            const errMsg= error.message //&& JSON.parse(error.message)   
            this.$message({
                message:(errMsg  && `上传失败，失败原因：${errMsg} `) || '上传失败',
                type:'error'
            })
            this.$emit('onError',errMsg)
        }, 
        onRemove(){
             this.$message({
                message:'文件移除成功',
                type:'success'
            })
            this.$emit('onRemove')

        },  
        onExceed(){
            this.$message({
                message:'每次只能上传一个文件',
                type:'warning'
            })

        } 
    }
}
</script>
 
<style scoped lang = "stylus">
 
</style>