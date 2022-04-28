<template>
  <div class="base-background">
    <NavigationBarPC v-if="clientWidth>=700"/>
    <NavigationBarMobile v-else/>
    <audio id="audio" :src="audioPath"></audio>
    <router-view />
  </div>
</template>

<script>
import {onMounted, provide, ref} from "vue";
import NavigationBarPC from "@/components/NavigationBarPC";
import NavigationBarMobile from "@/components/NavigationBarMobile";

export default {
  name: "AdminBase-Component",
  components: {
    NavigationBarPC,
    NavigationBarMobile
  },
  setup(){
    let clientHeight = ref(window.innerHeight)
    let clientWidth = ref(window.innerWidth)

    function sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }


    let audioPath = ref()
    let audioPathList = [
      require('/src/assets/audio/BeautifulWorld.mp3'),
      require('/src/assets/audio/Immutable.mp3'),
      require('/src/assets/audio/OneLastYou.mp3'),
      require('/src/assets/audio/ScarboroughFair.mp3'),
      require('/src/assets/audio/SparklingHydraulics.mp3'),
      require('/src/assets/audio/SongOfTheAncients.mp3'),
      require('/src/assets/audio/云烟成雨.mp3'),
      require('/src/assets/audio/嗚咽.mp3'),
      require('/src/assets/audio/WeightOfTheWorld.mp3'),
      require('/src/assets/audio/孤独な巡礼.mp3')
    ]
    let currentAudioNum = -1
    let isPlaying = ref(false)
    function audioRandomPlay(){
      let nextAudioNum = Math.floor(Math.random()*10)
      if (nextAudioNum===currentAudioNum){
        audioRandomPlay()
        return
      }else {
        currentAudioNum = nextAudioNum
      }
      audioPath.value = audioPathList[nextAudioNum]
      const audio = document.getElementById("audio")
      audio.load()
      sleep(500).then(()=>{
        audio.volume = 0.05
        if(audio.readyState!==4){
          isPlaying.value = false
          audioRandomPlay()
          return
        }
        audio.play()
        isPlaying.value = true
      })
    }
    function audioPausePlay(){
      const audio = document.querySelector("#audio")
      if(isPlaying.value===true){
        audio.pause()
        isPlaying.value=false
      }else {
        if(currentAudioNum===-1){
          audioRandomPlay()
        }else {
          audio.play()
          isPlaying.value=true
        }
      }
    }


    provide('audioRandomPlay',audioRandomPlay)
    provide('audioPausePlay',audioPausePlay)
    provide('isPlaying',isPlaying)

    onMounted(()=>{
      window.addEventListener('resize',()=>{
        clientHeight.value = window.innerHeight
        clientWidth.value = window.innerWidth
      });

      const audio = document.querySelector("#audio")
      audio.onended = () =>{
        audioRandomPlay()
      }
    })


    return{
      clientWidth,
      clientHeight,
      audioPath,
      audioRandomPlay,
      audioPausePlay
    }
  }
}
</script>

<style scoped>
.base-background {
  background: url("/src/assets/ak_bg_2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}


</style>