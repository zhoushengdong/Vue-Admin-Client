<template>
    <div>
        <el-dialog title="自定义添加" :visible.sync="dialogFormVisible" :before-close="changeStatus">
        <el-form :model="form">
            <el-form-item label="标题" :label-width="formLabelWidth">
                <el-input v-model="form.title" auto-complete="off" class="provide"></el-input>
            </el-form-item>
            <el-form-item label="作者" :label-width="formLabelWidth">
                <el-input v-model="form.author" auto-complete="off" class="provide"></el-input>
            </el-form-item>
            <el-form-item label="综合浏览量" :label-width="formLabelWidth">
                <el-input v-model="form.pageviews" auto-complete="off" class="provide"></el-input>
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth">
                <el-input v-model="form.status" auto-complete="off" class="provide"></el-input>
            </el-form-item>
            <el-form-item label="当前时间" :label-width="formLabelWidth">
                <el-input v-model="form.displayTime" auto-complete="off" class="provide"></el-input>
            </el-form-item>
            <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="changeStatus">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

  export default {
    data() {
      return {
          formInline: {
          user: '',
          region: ''
        },
        dialogTableVisible: false,
        // dialogFormVisible: false,
        form: {
          title: '',
          author: '',
          pageviews: '',
          status: '',
          displayTime: '',
        },
        formLabelWidth: '100px'
      };
    },
    props: ['dialogFormVisible'],
    methods: {
        ...mapActions(['AddData']),
        changeStatus () {
            this.$emit('update:dialogFormVisible', !this.dialogFormVisible)
        },
        submit () {
            this.changeStatus();
            // this.$store.dispatch('AddData', this.form)
            this.AddData(this.form).then(() => {
                this.loading = false
                // this.$router.push({ path: '/' })
            }).catch(() => {
                this.loading = false
            });
        }
    },
    watch: {
        dialogFormVisible (val) {
            // console.log(val);
            this.$emit('update:dialogFormVisible', this.dialogFormVisible)
        }
    }
  };
</script>

<style>
    .el-form--inline .el-form-item__content {
        
        margin-left: 30px !important;
    }
    .provide {
        width: 100%;
    }
</style>
