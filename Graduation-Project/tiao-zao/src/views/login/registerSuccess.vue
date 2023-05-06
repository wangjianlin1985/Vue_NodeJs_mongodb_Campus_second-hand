<template>
  <div class="regSuc resetbg">
    <van-icon name="checked" size="1.17rem" color="#41c87f" class="icon" />
    <p class="info">你的账号已经注册成功，若想体验更多功能请前往PC网站“陕西省“一带一路”投资贸易撮合平台”完善账号认证信息</p>
    <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" class="btn" @click="toLogin">去登录</van-button>
  </div>
</template>

<script>
import { Button, Icon } from "vant";
export default {
  name: "",
  data() {
    return {};
  },

  components: {
    [Button.name]: Button,
    [Icon.name]: Icon
  },

  computed: {},

  mounted() {},

  methods: {
    toLogin() {
      this.$router.push({name:'login'})
    }
  }
};
</script>
<style lang='less' scoped>
.regSuc {
  padding: 1.56rem;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  .icon {
    margin-left: 2.7rem;
    margin-top: 30%;
  }
  .info {
    font-size: 0.37rem;
    color: rgba(51, 51, 51, 1);
    line-height: 0.53rem;
    margin-bottom: 1rem;
  }
  .btn{
    margin-left: 2.5rem;
  }
}
</style>
