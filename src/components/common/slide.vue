<template>
  <div ref="wrapper" class='wrapper'>
    <div ref='sliderGroup' class="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span v-for='(item,index) in childrenNub' :key="index" :class="index==currentIndex?'active':false"></span>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    data () {
      return {
        currentIndex: 0,
        childrenNub: 0
      }
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 3000
      }
    },
    mounted () {
      setTimeout(() => {
        this._setSliderWidth();
        this._initSlider();
        if (this.autoPlay) {
          this._play()
        }
      }, 20);
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    methods: {
      _setSliderWidth (isResize) {
        this.children = this.$refs.sliderGroup.children;
        let width = 0;
        let sliderWidth = this.$refs.wrapper.clientWidth;
        if (this.loop && !isResize) {
          width = (this.children.length + 2) * sliderWidth;
        }else{
          width = (this.children.length) * sliderWidth;
        }
        if(isResize){
           this.childrenNub = this.children.length-2;
        }else{
           this.childrenNub = this.children.length;
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider () {
        this.slider = new BScroll(this.$refs.wrapper, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: { loop: this.loop, speed: 400, threshold: 0.2 }, //speed为动画切换时间，trreshold为触发的距离（比值）
	        click:true
        });
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX;
          if (this.loop) {
            pageIndex -= 1;
          }
          this.currentIndex = pageIndex;
          if (this.autoPlay) {
            this._play();
          }
        });
        this.slider.on('beforeScrollStart', () => { //滚动开始之前，即手接触屏幕时刻；
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        });
      },
      _play () {
        let pageIndex = this.currentIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)  //goToPage方法是betterScroll提供的跳转页面的方法
        }, this.interval);
      }
    }
  }
</script>

<style scoped lang="less">
  .wrapper {
    position: relative;
    overflow: hidden;
    .sliderGroup {
      display: flex;
      &>div {
        img {
          max-width: 100%;
        }
      }
    }
    .dots {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translate(-50%, 0);
      span {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background: #fff;
        margin: 0 3px;
      }
      .active {
        width: 15px;
        background: #f3a;
      }
    }
  }
</style>
