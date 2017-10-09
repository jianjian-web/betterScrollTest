<template>
  <div class='songList' v-if="list.length">
    <div class='listWrapper' v-for='(item,index) in list' :key="index">
      <img :src="item.creator.avatarUrl">
      <p>{{item.name}}</p>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'songList',
    data () {
      return {
          offset:10,
          list:[]
      }
    },
    computed: {
    },
    created () {
      var vm=this;
      this.$http.get('/top/playlist/highquality?limit='+this.offset).then(res => {
        this.list=res.data.playlists;
      }
      ).catch(err => {
        console.dir(err)
      }
        );
    },
    methods: {

    },
    mounted () {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .songList{
    display: flex;
    flex-direction: column;
    align-items: center;
    .listWrapper{
      width:90%;
      img{
        max-width: 100%;
      }
    }
  }
</style>
