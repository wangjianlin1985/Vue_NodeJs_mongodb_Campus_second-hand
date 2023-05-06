<template>
  <div class="OtherInfo">
    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="offset"
        @load="getData"
      >
        <div
          v-for="item in data"
          :key="item._id"
          class="item"
          @click="goDetail(item._id)"
        >


          <div class="title">
            {{ item.title }}
          </div>

          
          <div class="footer">
            <van-tag
              v-if="item.status == 1"
              type="success"
              size="medium"
            >
              已发布
            </van-tag>
            <van-tag
              v-if="item.status == 0"
              type="warning"
              size="medium"
            >
              已撤回
            </van-tag>

            <div class="time">
              <van-icon
                name="clock"
                size="13"
                class="icon"
              />
              <span>{{ item.createdTime }}</span>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <TabBar />
  </div>
</template>

<script>
import { Tag, Icon, List } from "vant";
export default {
  name: "OtherInfo",

  components: {
    [Tag.name]: Tag,
    [Icon.name]: Icon,
    [List.name]: List
  },
  data() {
    return {
      data: [],
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
        let { data: res } = await this.$api.infoApi.getInfoList(
          {
            category: this.category,
            currentPage: this.currentPage,
            showCount: this.showCount
          }
        );

        if (res.data.length !== 0) {
          res.data.forEach(ele => {
            ele.createdTime = ele.createdTime.split('T')[0]
          });
        }
        

        
        this.loading = false;
        this.data = [...this.data, ...res.data];
        if (this.currentPage >= Math.ceil(res.total / this.showCount)) {
          this.finished = true;
        } else {
          this.currentPage++;
        }
      } catch (error) {
        this.$toast("网络异常" + error);
      }
    },
    goDetail(_id) {
      this.$router.push({
        name: 'modifyInfo',
        params:{_id}
      })
    }
  }
};
</script>
<style lang='less' scoped>
.OtherInfo {
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  padding: 0.27rem;
  .item {
    width: 100%;
    height: 3rem;
    border-bottom: 1px solid #f0f0f0;
    font-size: 0.37rem;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p {
      margin: 0;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .time {
        display: flex;
        align-items: center;
        font-size: 0.29rem;
        font-weight: bold;
        color: rgba(188, 188, 188, 1);
        .icon {
          margin-right: 10px;
        }
      }
    }
  }
  .tag {
    width: 50px;
  }
}
</style>
