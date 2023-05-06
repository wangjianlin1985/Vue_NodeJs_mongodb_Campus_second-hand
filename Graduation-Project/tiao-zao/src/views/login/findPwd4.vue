<template>
  <div class="regSuc resetbg">
    <van-icon
      name="checked"
      size="1.17rem"
      color="#41c87f"
      class="icon"
    />
    <p class="info">
      密码已经重置
    </p>
    <van-button
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      class="btn"
      @click="toLogin"
    >
      去登录
    </van-button>
  </div>
</template>

<script>
import { Button, Icon } from "vant";
export default {
  name: "",

  components: {
    [Button.name]: Button,
    [Icon.name]: Icon
  },
  data() {
    return {};
  },

  computed: {},

  mounted() {},

  methods: {
    toLogin() {
      this.$router.replace({name:'login'})
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
    text-align: center;
  }
  .btn{
    margin-left: 2.5rem;
  }
}
</style>
