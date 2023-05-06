<template>
  <div>
    <van-swipe :autoplay="3000" indicator-color="red" class="swipter">
      <van-swipe-item v-for="item in  swiperBox" :key="item" class="swipeItem">
        <img :src="item" alt class="swipeImg" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
export default {
  name: "",
  data() {
    return {
      swiperBox: []
    };
  },

  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },

  computed: {},

  mounted() {

     let companyInfo = this.$store.state.companyData

    if(!companyInfo) {
      return ;
    }
    if(companyInfo.COMPANY_SCENE){
      this.swiperBox = companyInfo.COMPANY_SCENE
       this.swiperBox = this.swiperBox.split('@;@')
       this.swiperBox = this.swiperBox.map(ele => this.httpurl + ele)
     }
  },
   
  
  methods: {}
};
</script>
<style lang='less' scoped>
.swipeItem {
  width: 100%;
  height: 4.16rem;
  overflow: hidden;
  background: #fff;
}
.swipeImg {
  display: block;
  width: 100%;
  height: 4.16rem;
}
.swipter {
  background: #fff;
  width: 100%;
  height: 4.16rem;
}
</style>
