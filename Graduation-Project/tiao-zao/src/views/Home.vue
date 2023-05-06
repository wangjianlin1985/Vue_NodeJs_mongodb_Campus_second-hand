<template>
  <div class="home">
    <van-swipe
      :autoplay="3000"
      indicator-color="red"
      class="swipe"
    >
      <van-swipe-item
        v-for="item in swiperBox"
        :key="item.id"
      >
        <img
          :src="item.url"
          alt
          @click="getTradeDetail(item.link)"
        >
      </van-swipe-item>
    </van-swipe>

    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      shape="round"
      class="search"
      background="rgba(0,0,0,0)"
      @search="onSearch"
    />
    <div class="container">
      <div class="linkWapper wapper3">
        <div
          class="linkitem"
          @click="goName('sellInfoList')"
        >
          <p>出售商品</p>
        </div>
      </div>
      
      <div class="linkWapper wapper2">
        <div
          class="linkitem"
          @click="go('2')"
        >
          <p>采购需求</p>
        </div>
      </div>

      <div class="linkWapper wapper1">
        <div
          class="linkitem"
          @click="go('4')"
        >
          <p>校园吐槽</p>
        </div>
      </div>

      
      <div class="linkWapper wapper4">
        <div
          class="linkitem"
          @click="go('3')"
        >
          <p>校园活动</p>
        </div>
      </div>
    </div>

    <TabBar />
  </div>
</template>

<script>
// @ is an alias to /src
import TabBar from "@/components/tabBar";
import { Button, Icon, Swipe, SwipeItem, Search } from "vant";
export default {
  name: "Home",
  components: {
    TabBar,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Search.name]: Search
  },
  data() {
    return {
      // 轮播图
      swiperBox: [
        {
          "id": 1,
          "url": "http://127.0.0.1:3000/uploads/banner1.jpg",
          "link": ""
        },
        {
          "id": 1,
          "url": "http://127.0.0.1:3000/uploads/banner2.jpg",
          "link": ""
        },
        {
          "id": 1,
          "url": "http://127.0.0.1:3000/uploads/banner3.jpg",
          "link": ""
        },
        {
          "id": 1,
          "url": "http://127.0.0.1:3000/uploads/banner4.jpg",
          "link": ""
        }
      ],
      value: "",
      httpurls: this.httpurl
    };
  },
  computed: {},

  async mounted() {

    console.log('获取轮播图')
    //let { data: res } = await this.$api.homeApi.getSwipe()

    //this.swiperBox = res.data;
  },

  methods: {
    toSearchPaeg() {
      this.$router.push({ name: "search" });
    },

    go(category) {
      this.$router.push({
        name: 'otherInfoList',
        params: {
          category
        }
      })
    },
    goName(name) {
      this.$router.push({
        name
      })
    },
    onSearch() {
      if (!this.value) {
        this.$toast('请输入关键字')
        return
      }

      this.$router.push({
        name: 'searchList',
        params: {key: this.value}
      })
      
    },
    getTradeDetail(TRADE_ID) {
      this.$router.push({
        name: 'exhibitionDetails',
        params: {TRADE_ID}
      })
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
  background: #fff;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}
.swipe {
  display: block;
  width: 10rem;
  height: 4.91rem;
  position: fixed;
  top: 0;
  img {
    display: block;
    width: 10rem;
    height: 100%;
  }
}
.search {
  position: absolute;
  top: 0.21rem;
  width: 8.61rem;
  margin-left: 0.69rem;
  // background: rgba(f,f,f,.3);
}
.container {
  box-sizing: border-box;
  margin-top: 0.24rem;
  padding: 0 0.18rem;
  height: 100vh;
  padding-top: 4.91rem;
  padding-bottom: 1.5rem;
  .linkWapper {
    height: 23%;
     padding-bottom: 0.27rem;
    .linkitem {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background:linear-gradient(90deg,rgba(255,222,163,1),rgba(255,239,210,1));
     
      border-radius: 4px;
      p {
        margin: 0;
        padding: 0;
      }
    }
    
  };
  .wapper2 {
    .linkitem:nth-child(1) {
      background: linear-gradient(90deg,rgba(184,164,255,1),rgba(223,217,255,1));
    }
  }
  .wapper3 {
    .linkitem:nth-child(1) {
      background: linear-gradient(90deg,rgba(101,230,208,1),rgba(198,255,230,1));
    }
  }
  .wapper4 {
    .linkitem:nth-child(1) {
      background: linear-gradient(90deg,rgba(214,214,214,1),rgba(237,240,247,1));
    }
  }
}
</style>
