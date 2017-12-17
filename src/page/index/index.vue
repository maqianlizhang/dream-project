<template>
  <div>
   <header class="header">
    <div class="back iconfont">&#xe624;</i></div>
    <div class="search"><a href="#" class="prompt">输入城市/景点/游玩主题</a></div>
    <div class="city">城市</div>
  </header>
   <swiper :options="swiperOption">
     <swiper-slide v-for="item in swiperInfo" :key="item.id">
       <div class="swiper-img-container">
          <img  class="swiper-img" :src="item.imgUrl" alt="">
       </div>
    </swiper-slide>
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>

  <swiper>
    <swiper-slide v-for="(pageInfo, index) in pages" :key="index">
      <div class="icon-wrapper">
        <div v-for="item in pageInfo" :key="item.id" class="icon-item">
          <div class="icon-img-con">
            <img  class="icon-img" :src="item.imgUrl"/>
            <p>{{item.con}}</p>
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
 
  <ul class="map-listitem-con">
    <li class="map-listentrance-con map-listentrance-right"><a href="javascript:;" class="map-list-cons"><span class="iconfont map-list-position">&#xe693;</span>定位失败</a></li>
    <li class="map-listentrance-con"><a href="javascript:;" class="map-list-cons"><span class="iconfont map-list-position" >&#xe62e;</span>五折泡温泉</a></li>
  </ul>
   <main>
     <div class="main-container">
        <ul class="map-activity-con">
          <li class="map-activity-list map-activity-right">
            <a href="">
              <img class="map-activity-img" src="http://img1.qunarzz.com/piao/fusion/1710/a2/e395615b16fb1302.png" alt="">
            </a>
          </li>
          <li class="map-activity-list">
            <a href="">
              <img class="map-activity-img" src="http://img1.qunarzz.com/piao/fusion/1711/8a/4c62d1a89fc2d602.png" alt="">
            </a>
          </li>
      </ul>
      <h2 class="hot-title">热销推荐</h2>
      <ul class="map-hot-container">
        <li class="map-hot-production" v-for="item in hotInfo" :key="item.id">
          <a href="" class="hot-con">
            <div class="map-hot-imgCon"><img class="map-hot-img" :src="item.imgUrl" alt=""></div>
            <div class="map-hot-cons">
              <p class="hot-product-title">{{item.title}}</p>
              <p class="hot-product-description">{{item.description}}</p>
              <p class="hot-product-priceCon"><span class="map-hot-price">{{item.price}}</span>起</p>
            </div> 
          </a>
        </li>
      </ul>
      <h2 class="all-production"><a href="">查看所有产品</a></h2>
      <h3 class="weekend-production">周末去哪儿</h3>
      <ul class="weekend-prod-cons">
        <li classs="product-cons" v-for="item in weekendInfo" :key="item.id">
          <img  class="product-img" :src="item.imgUrl" alt="">
          <div class="product-descriptions">
             <p class="product-name">{{item.name}}</p>
             <p class="product-con">{{item.con}}</p>
          </div>
         
        </li>
      </ul>
     </div>
  </main>
  
</div>
</template>
<script>
  export default {
    name: 'Index',
    data () {
      return {
        swiperInfo: [],
        iconsInfo: [],
        hotInfo: [],
        weekendInfo: [],
        swiperOption: {
          autoplay: 1000,
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          }
        }
      }
    },
    computed: {
      pages () {
        const pages = []
        this.iconsInfo.forEach((value, index) => {
          let page = Math.floor(index / 8)
          if (!pages[page]) {
            pages[page] = []
          }
          pages[page].push(value)
        })
        return pages
      }
    },
    methods: {
      getIndexData () {
        this.$http.get('/static/index.json')
          .then(this.handleGetDataSucc.bind(this))
      },
      handleGetDataSucc (res) {
        const body = res.body
        this.swiperInfo = body.data.swiper
        this.iconsInfo = body.data.icons
        this.hotInfo = body.data.hotCons
        this.weekendInfo = body.data.weekendCons
      }
    },
    created () {
      this.getIndexData()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.header{
    display: flex;
    background: #05bad5;
    color: #fff;
    position: relative;
  }
  .back{
    width: .64rem;
    line-height: .86rem;
    text-align: center;
  }
  .search{
    flex: 1;
    margin: .14rem .18rem;
    background: #fff;
    border-radius: .1rem;
  }
   .prompt {
    font-size: 0.26rem;color: #ccc;line-height: 0.6rem;
  }
  .city{
    width: 1.14rem;
    line-height: .86rem;
    text-align: center;
  }
  .city::after{
    content: "";
    display: block;
    height: 0;
    width: 0;
    border: .1rem solid #fff;
    border-color: white transparent transparent transparent;
    position: absolute;
    top: .36rem;
    right: .02rem;
  } 
  .swiper-img-container{
    width:100%;
    height: 0;
    overflow: hidden;
    padding-bottom: 31.25%;
  }
  .swiper-img{
    width: 100%;
  }
  .icon-item {
    box-sizing: border-box;
    float: left;
    width: 25%;
    padding: .4rem;
  }
  .icon-img-con {
    height: 0;
    padding-bottom: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-size: .26rem;
  }
  .icon-img {
    width: 100%;
    width: .66rem;
    height: .66rem;
    margin-bottom: .3rem;
  }
  .map-listitem-con{
    height: .98rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: .01rem solid #e0e0e0;
  }
  .map-listentrance-con{
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .map-listentrance{
    width: 50%;
    height: 100%;
   
  }
  .map-listentrance-right{

    border-right: .01rem solid #e0e0e0;
  }
  .map-list-cons{
    color: #252525;
  }
  .map-list-position{
    color: #616161;
  }
  .main-container{
    display: flex;
    flex-direction: column;
    padding-top: .3rem;
    background: #f5f5f5;
  }
  .map-activity-con{
    display: flex;
    height: 1.4rem;
    border-bottom: .01rem solid #e0e0e0;
    border-top: .01rem solid #e0e0e0;
    background: #fff;
    align-items: center;
    justify-content: space-around;
  }
  .map-activity-list{
    height: 100%;
    display: flex;
    align-items: center;
  }
  .map-activity-right{
    border-right: .01rem solid #e0e0e0;
  }
  .map-activity-img{
    width: 100%;
  }
  .hot-title{
    height: .8rem;
    line-height: .8rem;
    padding-left: .4rem;
    color: #212121;
  }
  .map-hot-container{

  }
  .map-hot-production{
    height: 1.4rem;
    padding: .24rem;
    background: #fff;
    border-bottom: .01rem solid #e0e0e0;
  }

  .map-hot-imgCon{
    height: 1.4rem;
    width: 1.4rem;
    margin-right: .32rem;
  }
  .hot-con{
    display: flex;
  }
  .map-hot-img{
    width: 100%;
  }
  .hot-product-title{
    font-size: .3rem;
    color: #212121;
  }
  .hot-product-description{
    color:#9e9e9e;
  }
  .hot-product-priceCon{
    color: #9e9e9e;
  }
  .map-hot-price{
    color: #ff8300;
    font-size: .35rem;
  }
  .map-hot-cons{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .all-production{
    height: .88rem;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .weekend-production{
    height: .8rem;
    line-height: .8rem;
    padding-left: .4rem;
  }
  .product-cons{
    height: 4.04rem;
  }
  .product-img{
    height: 2.32rem;
    width: 100%;
  }
  .product-descriptions{
    height: 1rem;
    padding-left: .32rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: #fff;
  }
  .product-name{
    color: #252525;
  }
  .product-con{
    color: #616161;
  }
</style>
