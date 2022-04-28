<template>
  <div class="navigation-bar">
    <div class="menu-switch">
      <div class="menu-switch-inside-1"></div>
      <div class="menu-switch-inside-2"></div>
    </div>
    <div :class="{navigation_item:true,item_checked:item_checked_1}" @click="item_click(1)">
      Home
    </div>
    <div :class="{navigation_item:true,item_checked:item_checked_2}" @click="item_click(2)">
      User Control
    </div>
    <div :class="{navigation_item:true,item_checked:item_checked_3}" @click="item_click(3)">
      Notice Board
    </div>
    <div :class="{navigation_item:true,item_checked:item_checked_4}" @click="item_click(4)">
      Global Status
    </div>
    <div class="audio-ctrl-box">
      <div :class="{audio_button_1_1:isPlaying,audio_button_1_2:!isPlaying}" @click="pausePlayAudioClick"></div>
      <div class="audio_button_2" @click="nextAudioClick"></div>
    </div>
    <div class="navigation-item-admin-box">
      <div class="navigation-item-admin" @click="item_click(0)">
        Logout
      </div>
    </div>
  </div>
</template>

<script>
import {inject, ref} from "vue";
import router from "@/router";

export default {
  name: "NavigationBarPC",
  setup(){
    let item_checked_1 = ref('')
    let item_checked_2 = ref('')
    let item_checked_3 = ref('')
    let item_checked_4 = ref('')
    function item_click(num){
      switch (num){
        case 0:
          router.push('/');
          break;
        case 1:
          item_checked_1.value = true
          item_checked_2.value = false
          item_checked_3.value = false
          item_checked_4.value = false
          router.push('/admin');
          break;
        case 2:
          item_checked_1.value = false
          item_checked_2.value = true
          item_checked_3.value = false
          item_checked_4.value = false
          router.push('/admin/user-ctrl');
          break;
        case 3:
          item_checked_1.value = false
          item_checked_2.value = false
          item_checked_3.value = true
          item_checked_4.value = false
          router.push('/admin/notice-board');
          break;
        case 4:
          item_checked_1.value = false
          item_checked_2.value = false
          item_checked_3.value = false
          item_checked_4.value = true
          router.push('/admin/global-status');
          break;
      }
    }

    let isPlaying = inject('isPlaying')
    let audio_button_1 = ref('audio_button_1_2')
    const audioPausePlay = inject('audioPausePlay',Function,true)
    function pausePlayAudioClick(){
      audioPausePlay()
    }
    const audioRandomPlay = inject('audioRandomPlay',Function,true)
    function nextAudioClick(){
      audioRandomPlay()
    }


    return{
      item_checked_1,
      item_checked_2,
      item_checked_3,
      item_checked_4,
      item_click,
      audio_button_1,
      nextAudioClick: nextAudioClick,
      pausePlayAudioClick: pausePlayAudioClick,
      isPlaying
    }
  }
}
</script>

<style scoped>
.navigation-bar{
  width: 100%;
  height: 45px;
  background-color: rgba(7, 21, 31, 0.4);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
}

.navigation_item{
  color: rgba(255, 255, 255, 0.8);
  font-family: Consolas,"Microsoft YaHei UI",sans-serif;
  font-weight: lighter;
  font-size: 18px;
  text-align: center;
  height: 45px;
  line-height: 45px;
  margin-left: 3%;
  margin-right: 1%;
  cursor: pointer;
  transition: 0.15s;
}
.navigation_item:hover, .item_checked{
  box-sizing: border-box;
  border-color: rgba(252, 74, 33, 0.8);
  border-style: solid;
  border-width: 0 0 3px 0;
  color: rgba(255, 255, 255, 1);
  font-family: Consolas,"Microsoft YaHei UI",sans-serif;
  font-weight: lighter;
  font-size: 18px;
  text-align: center;
  height: 45px;
  line-height: 45px;
  margin-left: 3%;
  margin-right: 1%;
  cursor: pointer;
  transition: 0.15s;
}

.navigation-item-admin-box{
  display: flex;
  flex-grow: 1;
  flex-direction: row-reverse;
}
.navigation-item-admin{
  color: rgba(255, 255, 255, 0.8);
  font-family: Consolas,"Microsoft YaHei UI",sans-serif;
  font-weight: lighter;
  font-size: 18px;
  text-align: center;
  width: 60px;
  height: 45px;
  line-height: 45px;
  margin-left: 1%;
  margin-right: 3%;
  align-content: flex-end;
  cursor: pointer;
  transition: 0.15s;
}
.navigation-item-admin:hover{
  box-sizing: border-box;
  border-color: rgba(252, 74, 33, 0.8);
  border-style: solid;
  border-width: 0 0 3px 0;
  color: rgba(255, 255, 255, 1);
  font-family: Consolas,"Microsoft YaHei UI",sans-serif;
  font-weight: lighter;
  font-size: 18px;
  text-align: center;
  width: 60px;
  height: 45px;
  line-height: 45px;
  margin-left: 1%;
  margin-right: 3%;
  align-content: flex-end;
  cursor: pointer;
  transition: 0.15s;
}

.audio-ctrl-box{
  width: 45px;
  height: 45px;
  margin-left: 4%;
  margin-right: 1.5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.audio_button_1_1{
  background: url("/src/assets/audio_play.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 15px;
  height: 15px;
  transition: 0.2s;
}
.audio_button_1_1:hover{
  background: url("/src/assets/audio_play_hover.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 15px;
  height: 15px;
  transition: 0.2s;
}
.audio_button_1_2{
  background: url("/src/assets/audio_stop.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 15px;
  height: 15px;
  transition: 0.2s;
}
.audio_button_1_2:hover{
  background: url("/src/assets/audio_stop_hover.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 15px;
  height: 15px;
  transition: 0.2s;
}
.audio_button_2{
  background: url("/src/assets/audio_next.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 15px;
  height: 15px;
  transition: 0.2s;
}
.audio_button_2:hover{
  background: url("/src/assets/audio_next_hover.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 15px;
  height: 15px;
  transition: 0.2s;
}
</style>