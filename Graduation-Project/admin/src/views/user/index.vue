
<template>
  <div class="app-container">
    <div>用户管理</div>
    <el-button type="primary" style=" margin: 20px" @click="addUser">添加用户</el-button>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%"
    >
      <el-table-column
        label="登录账号"
        width="300"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.account }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="显示昵称"
        width="300"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="30%" center>
      <el-form ref="form" :model="form" size="medium" :rules="rules" status-icon>
        <el-form-item label="登录账号:" :label-width="formLabelWidth" prop="account">
          <el-input v-model="form.account" autocomplete="off" :disabled="disabled" />
        </el-form-item>
        <el-form-item label="昵称:" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" :disabled="disabled" />
        </el-form-item>
        <el-form-item v-if="disabled" label="旧密码:" :label-width="formLabelWidth" prop="oldPassword">
          <el-input v-model="form.oldPassword" autocomplete="off" type="password" />
        </el-form-item>
        <el-form-item label="新密码:" :label-width="formLabelWidth" prop="newPassword">
          <el-input v-model="form.newPassword" autocomplete="off" type="password" />
        </el-form-item>
        <el-form-item label="确认密码:" :label-width="formLabelWidth" prop="confimPassword">
          <el-input v-model="form.confimPassword" autocomplete="off" type="password" />
        </el-form-item>
        <el-form-item v-show="false">
          <el-input v-model="form._id" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="disabled" type="primary" @click="changeUserInfo('form')">确 定</el-button>
        <el-button v-else type="primary" @click="submit('form')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getAllUser, modifyUserInfo, addUser, deluser } from '@/api/user'
export default {
  name: '',
  components: {},
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        account: '',
        name: '',
        oldPassword: '',
        newPassword: '',
        _id: '',
        confimPassword: ''
      },
      dialogTitle: '修改信息',
      formLabelWidth: '100px',
      rules: {
        account: [
          { required: true, message: '请输入登录账号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 6, max: 18, message: '请输入6~18位的密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 18, message: '请输入6~18位的密码', trigger: 'blur' }
        ],
        confimPassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      disabled: true
    }
  },

  computed: {},

  mounted() {
    this.getAllAdmin()
  },

  methods: {
    handleEdit(index, row) {
      this.disabled = true
      this.dialogFormVisible = true
      this.form.account = row.account
      this.form.name = row.name
      this.form._id = row._id
    },
    async handleDelete(index, row) {
      if (index === 0) {
        this.$message({
          message: '原始管理员不能删除',
          type: 'warning'
        })
        return
      }

      const res = await deluser(row)
      if (res.code === 0) {
        this.tableData.splice(index, 1)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }
    },
    async getAllAdmin() {
      const { data } = await getAllUser()
      this.tableData = data
    },
    changeUserInfo(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          const { data } = await modifyUserInfo(this.form)
          if (data.code !== '1') {
            this.dialogFormVisible = false
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            for (const key in this.form) {
              if (this.form.hasOwnProperty(key)) {
                this.form[key] = ''
              }
            }
          }
        } else {
          this.$message({
            message: '请填写完整信息',
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    },
    addUser() {
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = ''
        }
      }
      this.dialogFormVisible = true
      this.dialogTitle = '添加管理员'
      this.disabled = false
    },
    submit(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          const data = await addUser(this.form)
          if (data.code === 0) {
            this.getAllAdmin()
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          }
        } else {
          this.$message({
            message: '请填写完整信息',
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    }
  }

}

</script>
<style lang='' scoped>

</style>
