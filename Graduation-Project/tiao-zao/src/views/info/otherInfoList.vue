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
            <p class="infoTitle">
              {{ item.title }}
            </p>
            <van-tag
              type="success"
              size="medium"
              plain
              class="nickName"
            >
              {{ item.nickName }}
            </van-tag>
            <div class="time">
              <van-icon
                name="underway"
                size="15"
                class="icon"
              />
              {{ item.createdTime.split('T')[0] }}
            </div>
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
      offset: 30,
      category: ''
    };
  },

  computed: {},

  mounted() {
    this.category = this.$route.params.category
  },

  methods: {
    async getData() {

      try {
        let { data: res } = await this.$api.infoApi.sellInfoList(
          { category: parseInt(this.category),
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
        name: "otherInfoDeatil",
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
    height: 2.1rem;
    border-bottom: 1px solid #f0f0f0;
    position: relative;
    .info {
      font-size: 0.37rem;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      width: 100%;
      height: 2rem;
      margin-left: 0.64rem;
      .infoTitle {
        margin-top: 0.1rem;
      }
      .nickName {
        margin-top: .2rem;
      }
      .time {
        position: absolute;
        right: .2rem;
        bottom: 0.2rem;
        float: right;
        color: #999;
        .icon {
          vertical-align: middle;
        }
      }
     
    }
  }

}
</style>
