<template>
  <div class="app-container">
    <div class="filter-container"> 
        <el-input 
            v-model="listQuery.keyword"
            placeholder="分类名"
            style="width:200px"
            class="filter-item"
            clearable
            @keyup.enter.native ="handleFilter"
            @clear="handleFilter" 
            @blur="handleFilter"
        />
        <!--<el-select 
            v-model="listQuery.category" 
            placeholder="分类"
            clearable 
            class="filter-item"
            @change="handleFilter" 
        >
            <el-option 
                v-for="item in categoryList"
                :key="item.value"
                :label="item.label"
            /> 
        </el-select>-->
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
        @sort-change="sortChange"
    >
        <el-table-column
            label="ID"
            prop="id"
            sortable="createTime"
            align="center"
            width="200px"
        >
            <template slot-scope="{ row:{ id }}">
                <span>{{id}}</span>
            </template>
        </el-table-column>
        <el-table-column
            label="名称"
            prop="name" 
            align="center"
            width="200px"
        >
            <template slot-scope="{ row:{ name }}">
                <span>{{name}}</span>
            </template>
        </el-table-column> 
        <el-table-column
            label="创建时间"
            prop="creatorTime" 
            align="center"
            width="200px"
        >
            <template slot-scope="{ row:{ creatorTime }}">
                <span>{{creatorTime}}</span>
            </template>
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
            label-width="70px"
            style="width:400px;margin-left:50px;"
        >
            <el-form-item
                label="分类名称" prop="name"
            >
                <el-input v-model="temp.name" />
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
import { getGridJson, getFormJson, submitForm, updateForm, deleteForm} from '../../api/category.js'
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
            sord:'asc',
            keyword:'',
            category:undefined,
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
        categoryList:[],
        list:null,
        textMap: {
            update: 'Edit',
            create: 'Create'
        },
        rules: {
            name: [{ required: true, message: '名称必填', trigger: 'change' }] 
        },
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

    },
    getCategoryList(){
        // getCategory().then(response =>{
        //     this.categoryList=response.data
        // })
        console.log("getcategory")
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