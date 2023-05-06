<template>
  <div>
    <router-view />

<van-tabbar route>
  <van-tabbar-item
    replace
    to="/"
    icon="home-o"
  >
    首页
  </van-tabbar-item>
  <van-tabbar-item
    replace
    to="/about"
    icon="friends-o"
  >
    我的
  </van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: "",
  data() {
    return {
      active: 0
    };
  },

  components: {
    [Tabbar.name]:Tabbar,
    [TabbarItem.name]:TabbarItem,
  },

  computed: {},

  mounted() {},

  methods: {
  }
};
</script>
<style lang='' scoped>
</style>
