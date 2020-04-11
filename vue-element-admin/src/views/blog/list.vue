<template>
  <div class="app-container">
    <div class="filter-container"> 
        <el-input 
            v-model="listQuery.keyword"
            placeholder="标题"
            style="width:200px"
            class="filter-item"
            clearable
            @keyup.enter.native ="handleFilter"
            @clear="handleFilter" 
            @blur="handleFilter"
        /> 
        <el-button 
            v-waves 
            class="filter-item" 
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
        >查询</el-button>
        <el-button 
            v-waves 
            class="filter-item" 
            type="primary"
            icon="el-icon-edit"
            style="margin-left:5px"
            @click="handleCreate"
        >新增</el-button>
        <el-checkbox 
            v-model="showCover"
            class="filter-item" 
            @change="changeShowCover"
        >
        显示图片
        </el-checkbox>
    </div>
    
    <el-table 
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border 
        fit
        highlight-current-row 
        style="width:100%" 
    >
        <el-table-column
            label="ID"
            prop="id" 
            align="center" 
        >
          
        </el-table-column>
        <el-table-column
            label="标题"
            prop="title" 
            align="center" 
        > 
        </el-table-column>
        <el-table-column
            label="分类"
            prop="catagory" 
            align="center" 
        > 
        </el-table-column>
        <el-table-column
            label="摘要"
            prop="summary" 
            align="center" 
        > 
        </el-table-column>  
        <el-table-column
            label="创建时间"
            prop="creatorTime" 
            sortable
            align="center" 
        > 
        </el-table-column> 
        <el-table-column
            label="是否可见"
            prop="isVisible" 
            align="center" 
        > 
        </el-table-column>  
        <el-table-column
            label="操作"
            align="center" 
            width="230px"
        >
            <template slot-scope="{ row, $index}">
                <el-button 
                    type="primary"
                    size="mini"
                    @click="handleUpdate(row)" 
                >
                编辑
                </el-button>
                 <el-button 
                    type="primary"
                    size="mini"
                    @click="handleDetail(row)" 
                >
                查看
                </el-button>
                 <el-button 
                    type="danger"
                    size="mini"
                    @click="handleDelete(row)" 
                >
                删除
                </el-button>
            </template>

        </el-table-column>
    </el-table>
    <pagination 
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.rows"
        @pagination="getList"
    />

    <el-dialog 
        :title="textMap[dialogStatus]"
        :visible.sync="dialogFormVisible" 
    >
        <el-form
            ref="dataForm"
            :rules="rules"
            :model="temp"
            label-position="left"
            label-width="120px"
            style="width:800px;margin-left:50px;"
        >
            <el-form-item
                label="标题" prop="title"
            >
                <el-input v-model="temp.title" />
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="temp.catagoryID" placeholder="请选择分类">
                <el-option 
                    v-for="item in categoryList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name" 
                /> 
                </el-select>
            </el-form-item>

            <el-form-item
                label="摘要" prop="summary"
            >
                <el-input  v-model="temp.summary" />
            </el-form-item>
            <el-form-item
                label="内容" 
            >
                <tinymce 
                    v-model="temp.content"
                    prop="content"
                    ref="tinymce"
                ></tinymce>
            </el-form-item>
             <el-form-item
                label="是否可见" 
            >
                <el-switch
                v-model="temp.isVisible"
                active-text="可见"
                inactive-text="不可见">
                </el-switch> 
            </el-form-item>
             <el-form-item
                label="标签" 
            > 
            <el-tag
                :key="tag.id"
                v-for="tag in blogTagBindList"
                closable
                :disable-transitions="false"
                @close="handleTagClose(tag)">
                {{tag.name}}
            </el-tag>
            <el-autocomplete
                class="input-new-tag"
                v-if="inputTagVisible"
                v-model="inputTagValue"
                ref="saveTagInput"
                size="small"
                :fetch-suggestions="queryTagSearch" 
                @select="handleTagSelect"
                @keyup.enter.native="handleTagInputConfirm"
                @blur="handleTagInputConfirm"
            >
            </el-autocomplete>
            <el-button v-else class="button-new-tag" size="small" @click="showTagInput">+ New Tag</el-button>
            </el-form-item>
        </el-form>
        <div
            slot="footer"
            class="dialog-footer"
            v-if="dialogFormBtnVisible"
        >
            <el-button @click="dialogFormVisible = false">
                取消
            </el-button>
            <el-button type="primary"  @click="dialogFormVisible === 'create' ?createData():updateData()">
                提交
            </el-button>
        </div>
    </el-dialog>

  </div>
</template>

<script> 
import Pagination from '../../components/Pagination/index'
import Waves from '../../directive/waves/waves.js'
import { getGridJson, getFormJson, submitForm, updateForm, deleteForm} from '../../api/user.js'
import { getAllCategory } from '../../api/category.js'
import { getTagListByBlogID,submitBlogTagBind,deleteBlogTagBind,submitTagForm,createTagAndBindBlog,getAllTag } from '../../api/tag.js'
import Tinymce from '../../components/Tinymce/index'

export default {
  components:{
    Pagination,Tinymce
  },
  directives:{
    Waves
  },
  data() {
    return {
        tableKey:0,  
        total:0,
        listQuery:{
            page:1,
            rows:30,
            sidx:'CreatorTime',
            sord:'ascending',
            keyword:'', 
        }, 
        temp:{ 
            id:undefined,
            title:'',
            catagoryID:'', 
            summary:'',
            blogContent:'',
            isVisible:true
        }, 
        
        dialogFormVisible:false,
        dialogFormBtnVisible:false,
        dialogStatus: '',
        listLoading:false,
        showCover:false,
        categoryList:[],
        tagList:[],
        blogTagBindList:[],
        list:null,
        textMap: {
            update: '编辑',
            create: '新增'
        },
        rules: {
            name: [{ required: true, message: '名称必填', trigger: 'change' }] 
        },
        inputTagValue:'',
        inputTagVisible:false, 
    }
  },
  mounted() {
      this.getList()
      this.getCategoryList()
  },
  methods: { 
    getList(){
        this.listLoading=true 
        getGridJson(this.listQuery).then(response =>{
            this.listLoading=false  
            this.list =response.data.rows
            this.total= response.data.total
        })
    },
    sortChange(data){
        console.log(data)
        if(data.order == null){
            data.order ='ascending'
        }
        this.listQuery.sord =data.order
        this.getList()

    }, 
    getCategoryList(){
        getAllCategory().then(response =>{
            this.categoryList=response.data
        }) 
    },
    getTagList(){
        getAllTag().then(response =>{
            console.log(response.data)
            this.tagList=response.data
        }) 
    },
    getTagListByBlogID(keyValue){
        getTagListByBlogID(keyValue).then(response =>{
            this.blogTagBindList=response.data
        }) 
    },  
    resetTemp(){
        this.temp={ 
            id:undefined,
            title:'',
            catagoryID:'', 
            summary:'',
            blogContent:'',
            isVisible:true
        }
    },
    handleFilter(){
        this.getList()
    }, 
    handleCreate(){
        this.resetTemp()
        this.dialogStatus='create'

        this.getTagList()

        this.dialogFormVisible=true
        this.dialogFormBtnVisible=true 
        this.$nextTick(()=>{
            this.$refs['dataForm'].clearValidate()
        })
    },
    createData(){
        this.$refs['dataForm'].validate((valid)=>
        {
            if(valid){
                submitForm(this.temp).then(()=>{ 
                this.dialogFormVisible = false 
                    this.$notify({
                        title: 'Success',
                        message: '创建成功',
                        type: 'success',
                        duration: 2000
                    })
                    this.getList() 
                })

            }
        
        })
    },
    handleUpdate(row){ 


        // this.temp.id = row.id
        // this.temp.name=row.name 
        this.$set(this.temp,'id',row.id)
        this.$set(this.temp,'title',row.title) 
        this.$set(this.temp,'catagoryID',row.catagoryID)
        this.$set(this.temp,'summary',row.summary) 
        this.$set(this.temp,'blogContent',row.blogContent)
        this.$set(this.temp,'isVisible',row.isVisible)  

        this.getTagList()

        this.dialogStatus='update'
        this.dialogFormVisible=true
        this.dialogFormBtnVisible=true
        this.$nextTick(()=>{
            this.$refs['dataForm'].clearValidate()
        })
    },
    updateData(){
        this.$refs['dataForm'].validate((valid)=>
        {
            if(valid){
                // const tempData=Object.assign({},this.temp)
                    const tempData = Object.assign({}, this.temp)
                    console.log(tempData)
                    updateForm(tempData.id,tempData).then(()=>{ 
                    this.dialogFormVisible = false
                    this.$notify({
                        title: 'Success',
                        message: '更新成功',
                        type: 'success',
                        duration: 2000
                    }) 
                    this.getList()
                })

            }
        
        })
    },
    handleDetail(row){ 
        
        this.temp.id = row.id
        this.temp.title=row.title 
        this.temp.catagoryID=row.catagoryID 
        this.temp.summary=row.summary 
        console.log(row.blogContent)
        this.temp.blogContent=row.blogContent 
        this.temp.isVisible=row.isVisible 

        this.getTagListByBlogID(row.id)

        this.dialogStatus='update'
        this.dialogFormVisible=true
        this.dialogFormBtnVisible=false 
        this.$nextTick(()=>{
            this.$refs['dataForm'].clearValidate()
        })
    },
    handleDelete(row) { 
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { 
            const tempData =Object.assign({},row) 
            deleteForm(tempData.id).then(()=>{ 
                this.$notify({
                    title: 'Success',
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                }) 
                this.getList()
            })  
        }).catch(err => {

            console.log(err)
            this.$notify({
                title: 'error',
                message: '删除失败',
                type: 'error',
                duration: 2000
            }) 
        }); 
    },
    changeShowCover(value){
        this.showCover=value 
    },
    handleTagClose(tag){ 
        console.log("删除tag",tag)
        deleteBlogTagBind(tag.bindID).then(()=>{ 
            this.$notify({
                title: 'Success',
                message: '删除标签成功',
                type: 'success',
                duration: 2000
            }) 
            this.getList()
        }).catch(err => {

            console.log(err)
            this.$notify({
                title: 'error',
                message: '删除标签失败',
                type: 'error',
                duration: 2000
            }) 
        }) 
    },
    showTagInput() {
        this.inputTagVisible = true;
        this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
        });
    },
    handleTagInputConfirm(){ 
        console.log(this.inputTagValue)
        // if(tagList.indexOf(this.inputTagValue) > -1){
        //     var bindModel={
        //         TagName:this.inputTagValue,
        //         BlogID:this.temp.id,
        //     }
        //     createTagAndBindBlog(bindModel).then(()=>{ 
        //         this.$notify({
        //             title: 'Success',
        //             message: '添加标签和绑定成功',
        //             type: 'success',
        //             duration: 2000
        //         }).catch(err => { 
        //             this.$notify({
        //                 title: 'error',
        //                 message: '添加标签和绑定失败',
        //                 type: 'error',
        //                 duration: 2000
        //             }) 
        //         })
        //     }) 
        //     this.getList() 
        // }else{
        //     var entity={
        //         TagID:,
        //         BlogID:this.temp.id,
        //     }  
        //     submitBlogTagBind(entity).then(()=>{ 
        //         this.$notify({
        //             title: 'Success',
        //             message: '删除标签成功',
        //             type: 'success',
        //             duration: 2000
        //         }) 
        //         this.getList()
        //     }).catch(err => {

        //         console.log(err)
        //         this.$notify({
        //             title: 'error',
        //             message: '删除标签失败',
        //             type: 'error',
        //             duration: 2000
        //         }) 
        //     }) 
        // }
        this.inputTagValue=""
        
    },
    handleTagSelect(item){
        console.log(item)
    },
    createFilter(queryString) {
        return (tag) => {
          return (tag.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
    },
    queryTagSearch(queryString, cb){
        var tags = this.tagList;
        console.log("TAGS",tags)
        
        var results = queryString ? tags.filter(this.createFilter(queryString)) : tags;
        // 调用 callback 返回建议列表的数据
        cb(results);
    }
  
   }
}
</script>

 
<style >
 .el-dialog{
    width:950px;
 }
</style>