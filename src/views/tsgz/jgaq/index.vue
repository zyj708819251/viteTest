 
<template>
	<div class="box">
		<div v-for="(item, index) in videoList" :key="index">
		  <!-- <video width="400" height="300" :id="'video'+index" :src="item.src" :poster="item.poster" controls autoplay muted></video> -->
		</div>
	</div>
   
</template>

<script>
export default {
  data() {
    return {
      videoList: [
        {
          src: 'http://117.68.0.187:1858/icvs2/stream.flv?puid=34012400561180001001&idx=2&stream=0&token=_-blCxqrmkOEKUlaNvRcO0WSdNeX1-5a',
          poster: '/video/poster1.jpg'
        },
		{
		  src: 'https://mister-ben.github.io/videojs-flvjs/bbb.flv',
		  poster: '/video/poster1.jpg'
		},
		{
		  src: 'http://example.com/video.flv',
		  poster: '/video/poster1.jpg'
		},
		
      ]
    }
  },
  mounted() {
    // this.videoList.forEach((item, index) => {
    //   const video = document.getElementById('video' + index)
    //   if (flvjs.isSupported()) {
    //     const flvPlayer = flvjs.createPlayer({
    //       type: 'flv',
    //       url: item.src
    //     })
    //     flvPlayer.attachMediaElement(video)
    //     flvPlayer.load()
    //     flvPlayer.play()
    //   }
    // })
  }
}
</script>

<style lang="scss">
/* Add your own styles here */
.box{
	display: flex;
	flex-wrap: wrap;
	div{
		width: 33.33%;
		height: 300px;
		video{
			width: 100%;
			height: 100%;
		}
	}
}
</style>

