<template>
  <div class="layout">
    <z-slide v-if='banners.length'>
      <div v-for='(item,index) in banners' :key="index">
        <a :href="item.url">
          <img :src="item.pic">
        </a>
      </div>
    </z-slide>
    <div class="recommendList">
      <scroll :data='banners'>
        <z-list>
        </z-list>
      </scroll>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import BScroll from 'better-scroll'
  export default {
    name: 'Layout',
    data () {
      return {
        banners: []
      }
    },
    computed: {
      ...mapState([

      ])
    },
    beforeCreate () {
      var vm=this;
      this.$http.get('/banner').then(res => {
        this.banners = res.data.banners;
        console.dir(this.banners)
        var wrapper = vm.$refs.wrapper;
      }
      ).catch(err => {
        console.dir(err)
      }
        );
    },
    methods: {

    },
    mounted () {
      // var vm = this;
      // this.$nextTick(function () {
      //   var wrapper=vm.$refs.wrapper;
      //   let scroll = new BScroll(wrapper)
      // });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .layout {
    .container {
      display: flex;
      flex-direction: column;
      li {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 350px;
        align-items: center;
        img {
          width: 300px;
        }
      }
    }
    .recommendList{

    }
  }
</style>
