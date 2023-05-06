<template>
  <div class="productDetail">
    <van-swipe
      :autoplay="3000"
      indicator-color="white"
      class="swiper"
    >
      <van-swipe-item
        v-for="(item,index) in res.img"
        :key="index"
      >
        <van-image
          :src="item"
          width="100%"
          height="10rem"
          fit="cover"
          class="swiperImg"
        >
          <template v-slot:error>
            该用有未上传图片
          </template>
        </van-image>
      </van-swipe-item>
    </van-swipe>

    <div class="name">
      <div class="titleWapper">
        <div class="title">
          {{ res.title }}
        </div>
      </div>
      
      <div class="deliveryTime">
        <van-icon
          name="underway"
          size="15"
          class="icon"
        />
        {{ res.createdTime }}
      </div>
    </div>

    <div
      class="price"
    >
      <div class="priceTitle">
        <van-icon
          name="gold-coin"
          class="icon"
          size="15"
        />
        <span>价格 {{ res.price }}</span>
      </div>
    </div>

    <div
      class="banner"
    >
      <van-image
        :src="avatar"
        width="1rem"
        height="1rem"
        fit="cover"
        class="swiperImg companyLogi"
      >
        <template v-slot:error>
          暂无图片
        </template>
      </van-image>
      <div class="companyName">
        {{ nickName }}
      </div>
    </div>
    <div class="info">
      <p class="infoName">
        <span>联系方式</span>
      </p>
      <div class="desc">
        {{ res.contact }}
      </div>
    </div>
    <div class="details">
      <p class="detailTitle">
        详细介绍
      </p>
      <div>{{ res.description }}</div>
    </div>
    <TabBar />
  </div>
</template>

<script>
import { Swipe, SwipeItem, Image, Icon, Button, Dialog } from "vant";
export default {
  name: "SellInfoDeatil",

  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      info_id: "",
      res: {},
      swipeShow: false,
      avatar: '',
      nickName: ''
    };
  },

  computed: {},

  async mounted() {
    this.info_id = this.$route.params._id;
    this.getProduct();
  },

  methods: {
    async getProduct() {
      let { data: res } = await this.$api.infoApi.getInfo({
          _id: this.info_id
        }
      );
      res.data.createdTime = res.data.createdTime.split('T')[0]
      this.avatar = res.data.userInfo.avatar
      this.nickName = res.data.userInfo.nickName
    this.res = res.data
    if (this.res.img) {
      
      this.swipeShow = this.res.img.length === 0 ? false : true
    }
    
    }
  }
};
</script>
<style lang='less' scoped>
@import "./sellInfoDeatil.less";
</style>
