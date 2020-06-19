<template>
    <div id="home-page">
      <banner-carousel/>
      <left-collapse/>
      <middleTop-carouse/>
      <rightTop-collapse/>
      <rightBottom-collapse/>
      <book-sort/>
      <div class="imgs">
        <img v-for="(item,index) in lists.banner1" :key="index" :src="item">
      </div>
      <grounding-books/>
      <grounding-ranking/>
    </div>
</template>

<script>
  import data from '../assets/dates/datas.js'
  import bannerCarousel from '../components/content/banner-carousel'
  import leftCollapse from '../components/content/left-collapse'
  import middleTopCarouse from '../components/content/middleTop-carouse'
  import rightTopCollapse from '../components/content/rightTop-collapse'
  import rightBottomCollapse from '../components/content/rightBottom-collapse'
  import bookSort from '../components/content/book-sort'
  import groundingBooks from '../components/content/grounding-books'
  import groundingRanking from '../components/content/grounding-ranking'
  export default {
    name: "home-page",
    data() {
      return {
        lists: data
      }
    },
    components: {
      bannerCarousel,
      leftCollapse,
      middleTopCarouse,
      rightTopCollapse,
      rightBottomCollapse,
      bookSort,
      groundingBooks,
      groundingRanking
    }
  }
</script>

<style scoped>
#home-page{
  width: 100vw;
  height: 100%;
}
  .imgs{
    width: 100%;
    text-align: center;
    display: inline-block;
  }
  .imgs img{
    padding: 15px;
  }
</style>
