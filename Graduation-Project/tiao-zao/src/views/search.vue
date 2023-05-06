<template>
  <div>
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      shape="round"
      background="rgba(0,0,0,0)"
      class="search"
      @search="onSearch"
    />
    <p class="tips">
      指定搜索内容
    </p>
    <div class="searchWapper">
      <div
        v-for="(item,index) in searchType"
        :key="index"
        class="searchItem"
        :class="{selectColor: index==ind}"
        @click="select(item,index)"
      >
        {{ item }}
      </div>
    </div>
    <TabBar />
  </div>
</template>

<script>
import { Search } from "vant";
export default {
  name: "Search",

  components: {
    [Search.name]: Search
  },
  data() {
    return {
      value: "",
      searchType: ["出售商品", "采购需求", "校园吐槽", "产品", "公司"],
      selectType: "贸易商机",
      ind: ""
    };
  },

  computed: {},

  mounted() {},

  methods: {
    select(item, index) {
      this.ind = index;
      this.selectType = item;
    },
    onSearch() {
      if (this.value === '') {
        this.$toast('请输入关键字')
        return
      }
      if (this.selectType === "公司") {
        this.$router.push({
          name: "companySearchList",
          params: { keyWord: this.value }
        });
      } else if (this.selectType === "产品") {
        this.$router.push({
          name: "productList",
          params: { keyWord: this.value }
        });
      } else if (this.selectType === "采购需求") {
        this.$router.push({
          name: "needBuySearchList",
          params: { keyWord: this.value, categories: '0' }
        });
      } else if (this.selectType === "投资项目") {
        this.$router.push({
          name: "needBuySearchList",
          params: { keyWord: this.value, categories: '1' }
        });
      } else if (this.selectType === "贸易商机") {
        this.$router.push({
          name: "needBuySearchList",
          params: { keyWord: this.value, categories: '2' }
        });
      }
      
    }
  }
};
</script>
<style lang='less' scoped>
.search {
  margin-top: 0.21rem;
  width: 8.61rem;
  margin-left: 0.69rem;
}
.tips {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
  color: #99a6c4;
}
.searchWapper {
  width: 100%;
  height: 100px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-content: space-around;
  .searchItem {
    // width: 50px;
    font-size: 20px;
    width: 100px;
    height: 30px;
    text-align: center;
  }
}
.selectColor {
  color: #0096ff;
}
</style>
