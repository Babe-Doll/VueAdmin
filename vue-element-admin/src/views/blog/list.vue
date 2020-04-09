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
            style="width:400px;margin-left:50px;"
        >
            <el-form-item
                label="标题" prop="title"
            >
                <el-input v-model="temp.title" />
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="temp.catagoryID" placeholder="请选择分类">
                <el-option 
                    v-for="item in catagoryList"
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
                label="内容" prop="content"
            >
                 
            </el-form-item>
             <el-form-item
                label="是否可见" 
            >
                <el-input  v-model="temp.isVisible" />
            </el-form-item>
             <el-form-item
                label="标签" 
            > 
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
import { getAllCatagory } from '../../api/category.js'
export default {
  components:{
    Pagination
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
            name:''            
        },
        dialogFormVisible:false,
        dialogFormBtnVisible:false,
        dialogStatus: '',
        listLoading:false,
        showCover:false,
        catagoryList:[],
        list:null,
        textMap: {
            update: '编辑',
            create: '新增'
        },
        rules: {
            name: [{ required: true, message: '名称必填', trigger: 'change' }] 
        },
    }
  },
  mounted() {
      this.getList()
      this.getCatagoryList()
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
    getCatagoryList(){
        getAllCatagory().then(response =>{
            this.catagoryList=response.data
        }) 
    },
    resetTemp(){
        this.temp={ 
            id:undefined,
            name:''
        }
    },
    handleFilter(){
        this.getList()
    }, 
    handleCreate(){
        this.resetTemp()
        this.dialogStatus='create'
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
        this.$set(this.temp,'name',row.name) 
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
        this.temp.name=row.name 
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
    }
  }
}
</script>

 
<style scoped lang = "scss">
 
</style>