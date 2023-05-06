<template>
  <div class="changePassword resetbg">
    <p class="title">
      修改密码
    </p>
    <img
      src="./../../assets/login/line.png"
      alt
      class="iconSetting"
    >
    <van-cell-group>
      <van-field
        v-model="Opassword"
        type="password"
        label="当前密码"
        placeholder="请输入密码"
        required
        :error-message="OpasswordTips"
        label-width="70px"
        @blur="checkPsw3"
      />
      <van-field
        v-model="password"
        type="password"
        label="新密码"
        placeholder="请输入密码"
        required
        :error-message="passwordTips"
        label-width="70px"
        @blur="checkPsw1"
      />
      <van-field
        v-model="password2"
        type="password"
        label="确认密码"
        placeholder="请输入相同密码"
        required
        :error-message="password2Tips"
        label-width="70px"
        @blur="checkPsw2"
      />
    </van-cell-group>
    <div class="btnGrop">
      <van-button
        type="primary"
        class="btn"
        @click="checkPwd"
      >
        确认修改
      </van-button>
      <van-button
        class="btn"
        @click="cancel"
      >
        取消
      </van-button>
    </div>
  </div>
</template>

<script>
import { Field, Button, Cell, CellGroup } from "vant";
export default {
  name: "ChangePassword",

  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      password: "",
      password2: "",
      Opassword: "",
      passwordTips: "",
      password2Tips: "",
      OpasswordTips: ""
    };
  },

  computed: {},

  mounted() {},

  methods: {
    checkPsw1() {
      if (!/^(?![a-z]+$)(?![0-9]+$)[a-zA-Z0-9]{5,20}$/.test(this.password)) {
        this.passwordTips = "请输入5~20个字符，包含字母和数字！";
        return;
      } else {
        this.passwordTips = "";
      }
    },
    checkPsw3() {
      if (!/^(?![a-z]+$)(?![0-9]+$)[a-zA-Z0-9]{5,20}$/.test(this.Opassword)) {
        this.OpasswordTips = "请输入5~20个字符，包含字母和数字！";
        return;
      }
    },
    checkPsw2() {
      if (this.password2 !== this.password) {
        this.password2Tips = "两次输入密码必须保持一致";
        return;
      } else {
        this.password2Tips = "";
      }
    },
    async checkPwd() {
      this.checkPsw2()
      if (
        this.OpasswordTips == "" &&
        this.Opassword !== "" &&
        this.passwordTips == "" &&
        this.password !== "" &&
        this.password2Tips == "" &&
        this.password2 !== ""
      ) {
        try {
          let { data: res } = await this.$api.userApi.modifyPassword(
            {
              oldPassword: this.md5(this.Opassword),
              newPassword: this.md5(this.password)
            }
          );
          if (res.code === 0) {
            this.$toast.success("修改成功");
            this.cancel()
          } 
        } catch (error) {
         console.log(error);
         
        }
      } else {
        this.$toast.fail("修改失败");
      }
    },
    cancel() {
      this.password = "";
      this.password2 = "";
      this.Opassword = "";
      this.passwordTips = "";
      this.password2Tips = "";
      this.OpasswordTips = "";
      this.$router.go(-1)
    }
  }
};
</script>
<style lang='less' scoped>
.changePassword {
  padding: 0.27rem;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background: #fff;
}
.title {
  margin-top: 2rem;
  margin-bottom: 0;
  width: 2.7rem;
  text-align: center;
  font-size: 0.53rem;
  color: rgba(51, 51, 51, 1);
}
.iconSetting {
  display: block;
  margin-bottom: 1rem;
  width: 2.7rem;
  height: 10px;
}
.btnGrop {
  display: flex;
  justify-content: space-around;
  padding: 0.27rem;
  margin-top: 2rem;
  .btn {
    width: 3.79rem;
    height: 0.93rem;
    line-height: 0.93rem;
  }
}
</style>
