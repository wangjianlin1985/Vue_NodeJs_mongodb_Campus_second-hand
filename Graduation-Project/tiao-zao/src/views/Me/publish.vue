<template>
  <div class="publish">
    <div class="title">
      发布消息
    </div>

    <van-form @submit="onSubmit">
      <van-field
        readonly
        clickable
        name="category"
        :value="category"
        label="发布类型"
        placeholder="点击选择发布类型"
        :rules="[{required: true, message: '请选择发布类型'}]"
        @click="showPicker = true"
      />

      <van-popup
        v-model="showPicker"
        position="bottom"
      >
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>

      <van-field
        v-model="title"
        name="title"
        label="标题"
        placeholder="请输入标题"
        :rules="[{ required: true, message: '请输入标题' }]"
      />
      <van-field
        v-if="priceShow"
        v-model="price"
        name="price"
        label="价格"
        placeholder="请输入价格"
        :rules="[{ required: true, message: '请输入价格' }]"
      />

      <van-field
        v-model="description"
        rows="1"
        autosize
        name="description"
        label="详情描述"
        type="textarea"
        placeholder="请输入详情描述"
        :rules="[{ required: true, message: '请输入详情描述' }]"
      />

      <van-field
        v-if="contactShow"
        v-model="contact "
        name="contact"
        type="textarea"
        label="联系方式"
        placeholder="请输入联系方式"
      />
      

      <van-field
        name="file"
        label="图片上传"
      >
        <template #input>
          <van-uploader
            v-model="uploader"
            :max-count="5"
            multiple
          />
        </template>
      </van-field>



      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :disabled="disabled"
        >
          提交
        </van-button>
      </div>
    </van-form>
    <TabBar />
  </div>
</template>

<script>
import { Form, Field, Button, Picker, Popup, Uploader  } from "vant";

export default {
  name: 'Publish',

  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Uploader.name]: Uploader,
  },
  data () {
    return {
      title: '',
      price: '',
      category: '',
      columns:  ['发布出售信息', '发布采购信息', '发布活动信息', '发布吐槽信息'],
      showPicker: false,
      uploader: [],
      description: '',
      contact: '',
      priceShow: true,
      contactShow: true,
      disabled: false
    }
  },

  computed: {},

  mounted () {
    this.category = this.columns[0]
  },

  methods: {
    async onSubmit(values) {
      this.disabled = true
      this.columns.forEach((item,index) => {
        if (item === values.category) {
          values.category = index + 1
        }
      });
      for (let i = 0; i < values.file.length; i++) {
        const ele = values.file[i];
        values.file[i] = ele.file
      }
      let formData = new FormData()
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          const ele = values[key];
          if (key === 'file') {
            for (let j = 0; j < ele.length; j++) {
              const item = ele[j];
              formData.append('file', item)
            }
          }else {
            formData.append(key,ele)
          }
        }
      }
      try {
        let {data: res} = await this.$api.infoApi.publish(formData)
        
        if (res.code === 0) {
          this.disabled = false
          this.category = this.columns[0]
          this.title = ''
          this.description = '',
          this.price = ''
          this.uploader = [],
          this.contact = ''
        }
        this.$toast.success('发布成功')
        
      } catch (error) {
        console.log(error);
        
      }
    },
    onConfirm(value) {
      if (value === '发布活动信息') {
        this.priceShow = false
      }else {
        this.priceShow = true
      }
      this.priceShow = value === '发布活动信息' || value === '发布吐槽信息' ? false : true
      this.contactShow = value === '发布吐槽信息' ? false: true

      this.category = value;
      this.showPicker = false;
    },
  }

}

</script>
<style lang='less' scoped>
  .publish {
    box-sizing: border-box;
    padding: 0.27rem;
    .title {
      color:#19b5fe;
      text-align: center;
      margin-bottom: 10px;
    }
  }
</style>
