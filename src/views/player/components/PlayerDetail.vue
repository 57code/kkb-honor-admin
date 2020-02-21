<template>
  <div class="createPost-container">
    <el-form
      ref="playerForm"
      :model="playerForm"
      :rules="rules"
      class="form-container"
    >
      <div class="createPost-main-container">
        <el-form-item
          style="margin-bottom: 40px;"
          prop="title"
          label="账户名"
        >
          <el-input
            v-model="playerForm.acountname"
            name="name"
            required
          />
        </el-form-item>

        <el-form-item
          style="margin-bottom: 40px;"
          prop="title"
          label="昵称"
        >
          <el-input
            v-model="playerForm.nickname"
            name="name"
            required
          />
        </el-form-item>

        <el-form-item
          prop="avatar"
          style="margin-bottom: 30px;"
          label="用户头像"
        >
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm"
          >
            提交
          </el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import {
  getPlayer,
  updatePlayer,
  createPlayer,
  defaultPlayerData
} from '@/api/players'
import { Form } from 'element-ui'
import {
  ElUploadInternalFileDetail,
  ElUploadInternalRawFile
} from 'element-ui/types/upload'

@Component({
  name: 'PlayerDetail'
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;

  // 必填项校验函数，额外弹出一个message提示
  private validateRequire = (rule: any, value: string, callback: Function) => {
    if (value === '') {
      this.$message({
        message: rule.field + '必须填写',
        type: 'error'
      })

      callback(new Error(rule.field + '必须填写'))
    } else {
      callback()
    }
  };

  // 初始化数据，默认均为空
  private playerForm = Object.assign({}, defaultPlayerData);
  private loading = false;

  // 校验规则
  private rules = {
    imageURL: [{ validator: this.validateRequire }],
    title: [{ validator: this.validateRequire }],
    fullContent: [{ validator: this.validateRequire }]
  };

  // 上传头像预览地址
  private imageUrl = '';

  created() {
    // 如果是更新数据则获取对应玩家信息
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    }
  }

  private async fetchData(id: number) {
    try {
      const { data } = await getPlayer(id, {})
      this.playerForm = data.player

      // todo:设置imageUrl，显示预览
    } catch (err) {
      console.error(err)
    }
  }

  private handleAvatarSuccess(res: any, file: ElUploadInternalFileDetail) {
    console.log(res)
    console.log(file)

    this.imageUrl = URL.createObjectURL(file.raw)
    // 将返回图片名称设置到playerForm上
    // todo：设置为响应中图片地址
    this.playerForm.avatar = file.name
  }

  private beforeAvatarUpload(file: ElUploadInternalRawFile) {
    const isLt2M = file.size / 1024 / 1024 < 1

    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 1MB!')
    }
    return isLt2M
  }

  private submitForm() {
    (this.$refs.playerForm as Form).validate(async valid => {
      if (valid) {
        this.loading = true

        try {
          // 提交操作
          if (this.isEdit) {
            await updatePlayer(this.playerForm.id, this.playerForm)
          } else {
            await createPlayer(this.playerForm)
          }

          this.$notify({
            title: '操作成功',
            message: '新增玩家数据成功',
            type: 'success',
            duration: 2000
          })

          this.loading = false
        } catch (error) {
          console.error(error)
        }
      } else {
        console.error('校验失败，请修改后重试')
        return false
      }
    })
  }
}
</script>

<style lang="scss">
.article-textarea {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>

<style lang="scss" scoped>
.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
