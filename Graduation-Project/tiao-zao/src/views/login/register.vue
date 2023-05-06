<template>
  <div class="reg resetbg">
    <img
      src="./../../assets/login/title.jpg"
      alt
      class="titlePic"
    >
    <p class="title">
      注册
    </p>
    <img
      src="./../../assets/login/line.png"
      alt
      class="icon"
    >

    <van-cell-group>
      <van-field
        v-model="username"
        label="账号"
        placeholder="请输入账号"
        required
        :error-message="usernameTips"
        label-width="70px"
        @blur="checkUserName"
      />
      <van-field
        v-model="nickname"
        label="昵称"
        placeholder="请输入昵称"
        required
        :error-message="nicknameTips"
        label-width="70px"
        @blur="checkNickName"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
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
      <van-field
        v-model="phone"
        label="手机号"
        placeholder="请输入手机号"
        required
        :error-message="phoneTips"
        label-width="70px"
        @input="checkPhone"
      />
    </van-cell-group>
    <van-button
      type="primary"
      size="large"
      class="btn"
      :disabled="isClick"
      @click="regrister"
    >
      注册
    </van-button>
  </div>
</template>

<script>
import { Field, Button, Cell, CellGroup } from "vant";

export default {
  name: "Regrister",

  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      username: "",
      nickname: '',
      password: "",
      password2: "",
      phone: "",
      usernameTips: "",
      nicknameTips: '',
      passwordTips: "",
      password2Tips: "",
      phoneTips: "",
      // 按钮是否禁用
      isClick: true,
      // 登录名是否校验完成
      userHasCheck: false
    };
  },

  computed: {},

  mounted() {},

  methods: {
    async checkUserName() {
      if (!/^[a-zA-Z0-9]{5,20}$/.test(this.username)) {
        this.usernameTips = "请输入5~20个字符，包含字母或数字！";
        return;
      } else {
        
        let { data: res } = await this.$api.userApi.hasUserName(
          {userName: this.username}
        );
        if (res.code == 0) {
          this.usernameTips = "";
          this.userHasCheck = true;
        } else {
          this.usernameTips = "账号不可用";
        }
      }
    },
    checkNickName(){
      
      if (this.nickname.length>8) {
        this.nicknameTips = '昵称不能超过8个字符'
        return
      }
      if (this.nickname.length === 0) {
        this.nicknameTips = '昵称为必填项'
        return
      }
      this.nicknameTips = ''
    },
    checkPsw1() {
      if (!/^(?![a-z]+$)(?![0-9]+$)[a-zA-Z0-9]{5,20}$/.test(this.password)) {
        this.passwordTips = "请输入5~20个字符，包含字母和数字！";
        return;
      } else {
        this.passwordTips = "";
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
    checkPhone() {
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.phoneTips = "输入的电话号码格式有误";
        return;
      } else {
        this.isClick = false;
        this.phoneTips = "";
      }
    },
    async regrister() {
      if (
        this.usernameTips == "" &&
        this.username !== "" &&
        this.nicknameTips == "" &&
        this.nickname !== "" &&
        this.passwordTips == "" &&
        this.password !== "" &&
        this.password2Tips == "" &&
        this.password2 !== "" &&
        this.phoneTips == "" &&
        this.phone !== "" &&
        this.checkUserName
      ) {

        let { data: res } = await this.$api.userApi.register(
          {
            account: this.username,
            password: this.md5((this.password)),
            phone: this.phone,
            nickName:this.nickname,
          }
        );
        if (res.code == 0) {
          this.$router.push({ name: "registerSuccess" });
        } else {
          this.$toast.fail("注册失败，请重新注册");
        }
      } else {
        this.$toast.fail("* 为必填内容");
      }
    }
  }
};
</script>
<style lang='less' scoped>
.reg {
  box-sizing: border-box;
  padding: 0.97rem;
  height: 100%;
  background: #fff;
  .titlePic {
    width: 8.53rem;
  }
  .btn {
    margin-top: 1rem;
  }
  .title {
    margin-bottom: 0;
  }
  .icon {
    display: block;
    margin-bottom: 1rem;
    width: 1.7rem;
  }
}
</style>
