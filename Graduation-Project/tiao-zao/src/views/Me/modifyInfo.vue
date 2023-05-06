<template>
  <div class="publish">
    <div class="title">
      修改发布消息
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

      <van-field
        v-if="hasPublish"
        name="status"
        label="是否撤回"
      >
        <template #input>
          <van-radio-group
            v-model="status"
            direction="horizontal"
          >
            <van-radio name="0">
              是
            </van-radio>
            <van-radio name="1">
              否
            </van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        v-else-if="!hasPublish"
        name="status"
        label="是否重新发布"
      >
        <template #input>
          <van-radio-group
            v-model="status"
            direction="horizontal"
          >
            <van-radio name="1">
              是
            </van-radio>
            <van-radio name="0">
              否
            </van-radio>
          </van-radio-group>
        </template>
      </van-field>



      <div
        style="margin: 16px;"
        class="btn"
      >
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
import { Form, Field, Button, Picker, Popup, Uploader, Radio, RadioGroup   } from "vant";

export default {
  name: 'ModdiyInfo',

  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Uploader.name]: Uploader,
    [Radio.name]: Radio ,
    [RadioGroup.name]: RadioGroup ,
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
      Info_id: '',
      status: '1',
      // 是否已经发布
      hasPublish: true,
      disabled: false
    }
  },

  computed: {},
  // TODO 图片回显问题
  async mounted () {
    this.Info_id = this.$route.params._id
    // 查询消息信息并回显
    try {
      let {data:res} = await this.$api.infoApi.getInfo({
        _id: this.Info_id
      })

      if (res.data.img !== null) {
        
        res.data.img = res.data.img.map(item => {
          return {url: item, isImage: true}
        })
          this.uploader = res.data.img
      }
      
      this.hasPublish = res.data.status === 1 ? true: false


      this.title = res.data.title
      this.price = res.data.price
      this.description = res.data.description
      this.contact = res.data.contact
      this.category = this.columns[res.data.category - 1]
      if (this.category === '发布活动信息') {
        this.priceShow = false
      }else {
        this.priceShow = true
      }
      this.priceShow = this.category === '发布活动信息' || this.category === '发布吐槽信息' ? false : true
      this.contactShow = this.category === '发布吐槽信息' ? false: true
      

    } catch (err) {
      console.log(err);
      
    }
  },

  methods: {
    async onSubmit(values) {
       // 将分类名转换对 对应的 数字
       this.disabled = true
      this.columns.forEach((item,index) => {
        if (item === values.category) {
          values.category = index + 1
        }
      });

     // 将图片数组中只保留二进制的图片文件
      for (let i = 0; i < values.file.length; i++) {
        const ele = values.file[i];
        if (ele.file) {
          values.file[i] = ele.file
        }
      }
      

      // 所有数据存放到 formData
      let formData = new FormData()
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          const ele = values[key];
          // 图片单独处理
          if (key === 'file') {
            for (let j = 0; j < ele.length; j++) {
              const item = ele[j];
              // 返回没修改的图片 url
              if (item.url) {
                formData.append('img', item.url)
              } else {
                // 上传新添加的图片
                formData.append('file', item)
              }
              
            }
          }else {
            formData.append(key,ele)
          }
        }
      }
      formData.append('info_id', this.Info_id)
      
      
      try {
        let {data: res} = await this.$api.infoApi.modifyInfo(formData)
        
        if (res.code === 0) {
          this.disabled = false
          this.category = this.columns[0]
          this.title = ''
          this.description = '',
          this.price = ''
          this.uploader = [],
          this.contact = ''
        }
        this.$toast.success('修改成功')
        
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
    margin-top: 1rem;
    .title {
      color:#19b5fe;
      text-align: center;
      margin-bottom: 10px;
    }
    .btn {
      padding-bottom: 1.5rem;
    }
  }
</style>
