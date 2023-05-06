<template>
  <div class="Setting">
    <p class="title">
      设置
    </p>
    <img
      src="./../../assets/login/line.png"
      alt
      class="iconSetting"
    >
    <div class="itemList">
      <div class="item">
        <p>头像</p>
        <van-uploader
          :after-read="afterRead"
          result-type="file"
        >
          <van-image
            :src="user.avatar"
            width="1.7rem"
            height="1.7rem"
            fit="cover"
            class="avatarImg"
            round
          >
            <template v-slot:error>
              暂无头像
            </template>
          </van-image>
        </van-uploader>
      </div>
    </div>
    <div class="itemList">
      <div class="item">
        <p>昵称</p>
        <div class="companyName">
          <span>{{ user.nickName }}</span>
        </div>
      </div>
    </div>
    <div class="itemList">
      <div class="item">
        <p>账号</p>
        <p>{{ user.account }}</p>
      </div>
    </div>
    <div class="itemList">
      <div
        class="item"
        @click="toChangePassword"
      >
        <p>账户密码</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Tag, Uploader   } from "vant";

export default {
  name: "Setting",

  components: {
    [Image.name]: Image,
    [Tag .name]: Tag ,
    [Uploader .name]: Uploader,
  },
  data() {
    return {
      user: {
        avatar : this.$ls.get('user').avatar,
        account: this.$ls.get('user').account,
        nickName: this.$ls.get('user').nickName
      }
    };
  },

  computed: {
    loginCompany () {
      return this.$store.state.loginCompany
    }
  },

  mounted() {},

  methods: {
    toChangePassword() {
      this.$router.push({
        name: 'changePassword'
      })
    },
    // 上传头像
    async afterRead(file) {
      let formData = new FormData()
      formData.append('file', file.file)
      try {
        let {data:res} = await this.$api.userApi.uploadAvatar(formData)
        this.$set(this.user, 'avatar', res.data.path)
        let user = this.$ls.get('user')
        user.avatar = res.data.path
        this.$ls.set('user', user)
      } catch (err) {
        console.log(err);
        
      }
      
    }
  }
};
</script>
<style lang='less' scoped>
.Setting {
  padding: 0.27rem;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background: #fff;
}
.title {
  margin-top: 2rem;
  margin-bottom: 0;
  width: 1.7rem;
  text-align: center;
  font-size: 0.53rem;
  color: rgba(51, 51, 51, 1);
}
.iconSetting {
  display: block;
  margin-bottom: 1rem;
  width: 1.7rem;
  height: 8px;
}
.itemList {
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.11rem;
    font-size: 0.4rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    border-bottom: 1px solid #f2f2f2;
    .companyName {
      display: flex;
      align-items: center;
    }
    .lab {
      margin-right: 5px;
    }
  }
}
</style>
