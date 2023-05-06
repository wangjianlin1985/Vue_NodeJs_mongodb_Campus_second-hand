<template>
  <div class="me">
    <header style="height:220px;margin-bottom: 0px;">
      <div class="avatar">
        <van-image
          :src="avatar"
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
      </div>
      <p class="name">
        {{ nickname }}
      </p>
      <p class="account">
        {{ account }}
      </p>
    </header>

    <div class="list">
      <div
        class="listItem"
        @click="go('myProduct')"
      >
        <van-icon
          name="bag"
          color="#2885ff"
          class="icon"
        />
        <span>我的出售信息</span>
      </div>

      <div
        class="listItem"
        @click="go('otherInfo', 2)"
      >
        <van-icon
          name="shopping-cart"
          color="#39c6b7"
          class="icon"
        />
        <span>我的采购信息</span>
      </div>

      <div
        class="listItem"
        @click="go('otherInfo', 4)"
      >
        <van-icon
          name="balance-list"
          color="#f7ab27"
          class="icon"
        />
        <span>我的吐槽信息</span>
      </div>

      <div
        class="listItem"
        @click="go('otherInfo', 3)"
      >
        <van-icon
          name="friends"
          color="orangered"
          class="icon"
        />
        <span>我的活动信息</span>
      </div>

      <div
        class="listItem"
        @click="go('publish')"
      >
        <van-icon
          name="add-square"
          color="#f7ab27"
          class="icon"
        />
        <span>发布消息</span>
      </div>

      <div
        class="listItem"
        @click="go('setting')"
      >
        <van-icon
          name="setting
"
          color="#f54139"
          class="icon"
        />
        <span>设置</span>
      </div>

      <div
              class="listItem"
              @click="go('login')"
      >
        <van-icon
                name="bag"
                color="#f54139"
                class="icon"
        />
        <span>退出</span>
      </div>

    </div>
    <TabBar />
  </div>
</template>

<script>
import { Image, Icon } from "vant";
export default {
  name: "Me",

  components: {
    [Image.name]: Image,
    [Icon.name]: Icon
  },
  data() {
    return {
      avatar: this.$ls.get('user').avatar,
      company: '',
      nickname: this.$ls.get('user').nickName,
      account: this.$ls.get('user').account,
    };
  },

  computed: {
    userData() {
      return this.$ls.get('user')
    }
  },

  mounted() {},

  methods: {
    go(router, category) {
      this.$router.push({
        name: router,
        params: { category }
      })
    }
  }
};
</script>
<style lang='less' scoped>
.me {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/meBg.png") center / cover;
  header {
    font-size: 0.37rem;
    color: rgba(255, 255, 255, 1);
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    height: 7rem;
    width: 100%;
    margin: 0;
    margin-bottom: 1rem;
  }
  .list {
    padding: 0.27rem;
    margin-bottom: 1rem;
    .listItem {
      border-bottom: 1px solid #f2f2f2;
      height: 1.3rem;
      font-size: 0.4rem;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      display: flex;
      align-items: center;
      .icon {
        margin-right: 10px;
      }
    }
  }
}
</style>
