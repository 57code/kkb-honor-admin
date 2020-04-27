<template>
  <div>
    <el-form ref="form" :model="playerForm" :rules="rules">
      <el-form-item prop="accountname" label="账户名">
        <el-input v-model="playerForm.accountname"></el-input>
      </el-form-item>
      <el-form-item prop="nickname" label="昵称">
        <el-input v-model="playerForm.nickname"></el-input>
      </el-form-item>

      <!-- 头像上传 -->
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
      >
        <!-- 预览 -->
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <!-- 添加按钮 -->
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from "vue-property-decorator";
import {
  defaultPlayerData,
  getPlayer,
  updatePlayer,
  createPlayer
} from "@/api/players";
import { ElUploadInternalFileDetail } from "element-ui/types/upload";
import { Form } from "element-ui";

@Component
export default class PlayerDetail extends Vue {
  // 编辑模式
  @Prop({ default: false })
  isEdit!: boolean;

  @Ref()
  form!: Form;

  // 数据模型，默认全为空
  playerForm = Object.assign({}, defaultPlayerData);

  // 自定义非空校验函数
  validateRequire = (rule: any, value: string, callback: Function) => {
    if (value === "") {
      this.$message({
        message: rule.field + "必须填写",
        type: "error"
      });

      callback(new Error(rule.field + "必须填写"));
    } else {
      callback();
    }
  };

  // 表单校验规则
  rules = {
    accountname: [{ validator: this.validateRequire }],
    nickname: [{ validator: this.validateRequire }]
  };

  // 加载状态
  loading = false;

  // 上传头像预览地址
  imageUrl = "";

  // 根据isEdit状态决定是否需要获取玩家详情信息
  created() {
    // 编辑状态路由： players/edit/:id
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id;
      this.fetchData(parseInt(id));
    }
  }

  async fetchData(id: number) {
    try {
      const { data } = await getPlayer(id);
      this.playerForm = data.player;
    } catch (error) {
      console.error(error);
    }
  }

  // 上传之前校验
  beforeAvatarUpload(file: ElUploadInternalFileDetail) {
    const isLt1M = file.size / 1024 / 1024 < 1;

    if (!isLt1M) {
      this.$message.error("上传头像图片大小不能超过1MB！");
    }

    return isLt1M;
  }

  // 上传成功预览
  handleAvatarSuccess(resp: any, file: ElUploadInternalFileDetail) {
    // 预览图片
    this.imageUrl = URL.createObjectURL(file.raw);

    // 赋值,todo: avatar值应该是在resp中返回的
    this.playerForm.avatar = file.name;
  }

  // 提交表单
  submitForm() {
    // 校验全局判断
    this.form.validate(async valid => {
      if (valid) {
        // 加载状态
        this.loading = true;

        // 提交操作
        try {
          if (this.isEdit) {
            await updatePlayer(this.playerForm.id, this.playerForm);
          } else {
            await createPlayer(this.playerForm);
          }

          // 操作成功提示信息
          this.$notify({
            title: "操作成功",
            message: "新增玩家数据成功",
            type: "success",
            duration: 2000
          });

          // 还原加载状态
          this.loading = false;
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("校验失败，请修改后重试！");

        return false;
      }
    });
  }
}
</script>

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