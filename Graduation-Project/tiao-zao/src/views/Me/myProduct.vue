<template>
  <div class="myProduct">
    <div class="productList">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我是有底线的"
        :offset="offset"
        @load="getData"
      >
        <div
          v-for="item in data"
          :key="item._id"
          class="productItem"
          @click="detail(item._id)"
        >
          <van-image
            :src="item.img!==null&&item.img.length!==0 ? item.img[0] : ''"
            width="3.2rem"
            height="3.2rem"
            fit="cover"
            class="avatarImg"
          >
            <template v-slot:error>
              图片未上传
            </template>
          </van-image>
          <div class="info">
            <p>{{ item.title }}</p>
            <div
              class="price"
            >
              <div class="priceTitle">
                <van-icon
                  name="gold-coin"
                  class="icon"
                  size="15"
                />
                <span>价格 {{ item.price }}</span>
              </div>
            </div>
            
            <van-tag
              v-if="item.status === 1"
              type="success"
              size="medium"
            >
              已发布
            </van-tag>
            <van-tag
              v-else-if="item.status === 0"
              type="warning"
              size="medium"
            >
              已撤回
            </van-tag>
          </div>
        </div>
      </van-list>
    </div>
    <TabBar />
  </div>
</template>

<script>
import { Image, Tag, Icon, List } from "vant";
export default {
  name: "MyProduct",

  components: {
    [Image.name]: Image,
    [Tag.name]: Tag,
    [Icon.name]: Icon,
    [List.name]: List
  },
  data() {
    return {
      data: "",
      loading: false,
      finished: false,
      currentPage: 1,
      showCount: 10,
      offset: 30
    };
  },

  computed: {},

  mounted() {
    // this.getData();
  },

  methods: {
    async getData() {

      try {
        let { data: res } = await this.$api.infoApi.getInfoList(
          { category: 1,
            currentPage: this.currentPage,
            showCount: this.showCount
          }
        );

        this.loading = false;
        this.data = [...this.data, ...res.data];

        if (this.currentPage >= Math.ceil(res.total / this.showCount)) {
          this.finished = true;
        } else {
          this.currentPage++;
        }
      } catch (error) {
        console.log(error);
      }
    },

    detail(_id) {
      this.$router.push({
        name: "modifyInfo",
        params: { _id }
      });
    }
  }
};
</script>
<style lang='less' scoped>
.myProduct {
  background: #fff;
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 0.27rem;
  padding-bottom: 1.5rem;
  .productItem {
    display: flex;
    align-items: center;
    width: 100%;
    height: 4.1rem;
    border-bottom: 1px solid #f0f0f0;
    .info {
      font-size: 0.37rem;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      width: 4rem;
      height: 3.2rem;
      margin-left: 0.64rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      // flex-wrap: wrap;
      p {
        margin: 0;
      }
      p:nth-child(2) {
        color: #999;
        font-weight: 400;
      }
    }
  }
  .price {
    padding: 0.27rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.32rem;
    padding: 0;
    .priceTitle {
      display: flex;
      align-items: center;
      font-size: 0.35rem;
      color: #ff0000;
      .icon {
        margin-right: 5px;
      }
    }
  }
}
</style>
