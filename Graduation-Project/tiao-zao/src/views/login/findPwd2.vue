<template>
  <div class="findPwd1 resetbg">
    <img
      src="./../../assets/login/title.jpg"
      alt
      class="titlePic"
    >
    <p class="title">
      忘记密码
    </p>
    <img
      src="./../../assets/login/line.png"
      alt
      class="icon"
    >

    <van-cell-group>
      <van-cell-group>
        <van-field
          v-model="phone"
          label="手机号"
          placeholder="请输入手机号"
          required
          :error-message="phoneTips"
          label-width="70px"
          @input="checkPhone"
        />
        <van-field 
          v-model="sms" 
          center
          clearable
          label="短信验证码" 
          placeholder="请输入短信验证码"
        >
          <van-button
            v-if="!timeShow"
            slot="button"
            size="small"
            type="primary"
            :disabled="isSend"
            @click="sendCode"
          >
            发送验证码
          </van-button>

          <van-button
            v-if="timeShow"
            slot="button"
            size="small"
            type="primary"
            :disabled="true"
            @click="sendCode"
          >
            <van-count-down 
              :time="time" 
              format="ss 秒"
              class="time"
            />
          </van-button>
        </van-field>
      </van-cell-group>
    </van-cell-group>
    <van-button
      type="primary"
      size="large"
      class="btn"
      :disabled="isClick"
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      @click="next"
    >
      下一步
    </van-button>
  </div>
</template>

<script>
import { Field, Button, Cell, CellGroup, CountDown  } from "vant";
export default {
  name: "FindPwd2",

  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [CountDown .name]: CountDown 
  },
  data() {
    return {
      // 获取上一步传入的用户名和手机号
      params: "",
      // 收到后台的验证码
      receiveCode: "",
      sms: "",
      isClick: true,
      // 是否禁用发送验证码
      isSend: true,
      phone: "",
      phoneTips: "",
      time: 60*1000,
      // 是否显示 倒计时
      timeShow: false
    };
  },

  computed: {
    uData() {
      return this.$store.state.uData
    }
  },

  mounted() {
    this.params = this.uData;
  },

  methods: {
    checkPhone() {
      
      if (parseInt(this.phone) !== this.params.phone) {
        this.phoneTips = "您输入的手机号不是您预留的手机号";
      } else {
        this.isSend = false
        this.phoneTips = "";
      }
    },
    async sendCode() {
      try {
        let { data: res } = await this.$api.userApi.getPhoneVerification(
          {
            phone: this.phone
          }
        );
        this.receiveCode = res.data
        console.log(this.receiveCode);
        
        this.$toast.success('验证码已经发送，30分钟内有效')
        this.isSend = true
        this.timeShow= true
        this.isClick = false
        this.codeTips = '60s后可重发'
        // 1min 可以重发验证码
        setTimeout(() => {
          this.isSend = false
          this.timeShow = false
          this.codeTips = '发送验证码'
        }, 60000);
        // 30min 后验证码失效
         setTimeout(() => {
           this.receiveCode = ''
        }, 60000*30);
      } catch (error) {
        this.$toast.fail("发送失败请稍后重试");
      }
    },
    async next() {
      if (this.sms === '') {
        this.$toast('请输入验证码')
        return
      }
      try {
        await this.$api.userApi.checkPhoneVerification({
          phone:this.phone,
          code: this.sms
        })
        this.$router.push({ name: "findPwd3" });
        
      } catch (err) {
        return
      }
    }
  }
};
</script>
<style lang='less' scoped>
.findPwd1 {
  box-sizing: border-box;
  padding: 0.72rem;
  .titlePic {
    width: 8.53rem;
    // margin-top: 2.84rem;
    margin-bottom: 1.5rem;
    display: block;
  }
  .title {
    margin-bottom: 0;
    width: 2.7rem;
    text-align: center;
    font-size: 0.53rem;
    color: rgba(51, 51, 51, 1);
  }
  .icon {
    display: block;
    margin-bottom: 1rem;
    width: 2.7rem;
  }
  .btn {
    margin-top: 1rem;
  }
  .time {
    color: #fff;
  }
}
</style>
