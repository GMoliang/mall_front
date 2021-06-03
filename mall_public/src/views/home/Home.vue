<template>

  <div>
    <category-nav></category-nav>
    <div style="margin-left: 10%;margin-right: 10%">
      <v-main>
        <v-container>
          <v-row>
            <v-col
                v-for="(item, id) in oneList"
                :key="id"
                cols="3"
            >
              <v-card height="300">
                <img :src="item.mainImage" alt="商品图片"
                     style="width: 250px;height:180px" />
                <p>标题:{{item.title}}</p>
                <p>价格:{{item.prices}}元/{{item.unit}}</p>
                <p>地址:{{item.address}}</p>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

    </div>
    <div>
      <v-main>
        <v-container>
          <v-row>
            <v-col
                v-for="(item, id) in twoList"
                :key="id"
                cols="3"
            >
              <v-card height="300">
                <img :src="item.mainImage" alt="商品图片"
                     style="width: 250px;height:180px" />
                <p>标题:{{item.title}}</p>
                <p>价格:{{item.prices}}元/{{item.unit}}</p>
                <p>地址:{{item.address}}</p>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </div>
  </div>



</template>

<script>
import CategoryNav from "components/content/categoryNav/CategoryNav";
export default {
  name: 'Home',
  components: {
    CategoryNav
  },

  created () {

  },
  mounted () {

  },
  data () {
    return {
      oneList:[
        {
          mainImage:require('@/assets/images/home/manggguo01.jpeg'),
          prices:"7",
          title:"每日芒果",
          address:"海南三亚",
          unit:"斤",
        },
        {
          mainImage:require('@/assets/images/home/tudou01.png'),
          prices:"0.9",
          title:"河南土豆。全国发货。",
          address:"河南省商丘市宁陵县",
          unit:"斤",
        },
        {
          mainImage:require('@/assets/images/home/jidan01.png'),
          prices:"255",
          title:"土鸡蛋 精品虫草鸡蛋",
          address:" 湖北省武汉市硚口区",
          unit:"箱",
        },
        {
          mainImage:require('@/assets/images/home/pingguo01.png'),
          prices:"1.3",
          title:"山东新鲜红富士苹果",
          address:" 山东省临沂市沂南县",
          unit:"斤",
        }
      ],
      twoList:[
        {
          mainImage:require('@/assets/images/home/yang01.png'),
          prices:"1500",
          title:"波尔山羊-种羊-繁殖羊-青年羊 ",
          address:"河南省商丘市宁陵县",
          unit:"只",
        },
        {
          mainImage:require('@/assets/images/home/caoyu01.png'),
          prices:"12",
          title:"草鱼",
          address:"云南省昆明市禄劝彝族苗族自治县",
          unit:"斤",
        },
        {
          mainImage:require('@/assets/images/home/huluobo01.png'),
          prices:"0.65",
          title:"长红胡萝卜 红萝卜 ",
          address:"河南省开封市祥符区",
          unit:"斤",
        },
        {
          mainImage:require('@/assets/images/home/niu01.png'),
          prices:"1400",
          title:"黄牛小牛犊开始预定了，早下单早发货 ",
          address:"甘肃省陇南市宕昌县",
          unit:"头",
        }
      ]
    };
  },
  methods: {

  },
  computed: {

  },
  destroyed () {

  },
};
</script>

<style scoped>

</style>
