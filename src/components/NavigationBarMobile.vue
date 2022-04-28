<template>
  <div :class="navigation_bar">
    <div class="navigation-bar-firstline">
      <div class="menu-switch" @click="menu_switch_event">
        <div class="menu-switch-inside-1"></div>
        <div class="menu-switch-inside-2"></div>
      </div>
      <div class="audio-ctrl-box">
        <div :class="{audio_button_1_1:isPlaying,audio_button_1_2:!isPlaying}" @click="pausePlayAudioClick"></div>
        <div class="audio_button_2" @click="nextAudioClick"></div>
      </div>
    </div>
    <div :class="[navigation_item,item_checked_1]" @click="item_click(1)">
      Home
    </div>
    <div :class="[navigation_item,item_checked_2]" @click="item_click(2)">
      User Control
    </div>
    <div :class="[navigation_item,item_checked_3]" @click="item_click(3)">
      Notice Board
    </div>
    <div :class="[navigation_item,item_checked_4]" @click="item_click(4)">
      Global Status
    </div>
    <div :class="navigation_item" @click="item_click(0)">
      Logout
    </div>
  </div>
</template>

<script>
import {inject, onMounted, ref} from "vue";
import router from "@/router";

export default {
  name: "NavigationBarMobile",
  setup(){
    let navigation_bar = ref('navigation-bar-1')
    let navigation_item = ref('navigation-item-1')
    let item_checked_1 = ref('')
    let item_checked_2 = ref('')
    let item_checked_3 = ref('')
    let item_checked_4 = ref('')
    let checked_num = ref(-1)

    function sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    function navigation_bar_up(){
      item_change_color(-1)
      navigation_item.value='navigation-item-1'
      sleep(300).then(()=>{
        if(navigation_item.value==='navigation-item-1'
            && item_checked_1.value === ''
            && item_checked_2.value === ''
            && item_checked_3.value === ''
            && item_checked_4.value === ''
        ){
          navigation_bar.value='navigation-bar-1'
        }else {
          navigation_bar_up()
        }
      })
    }
    function navigation_bar_down(){
      navigation_bar.value='navigation-bar-2'
      sleep(300).then(()=>{
        if(navigation_bar.value==='navigation-bar-2'){
          navigation_item.value='navigation-item-2'
          item_change_color(checked_num.value)
        }else {
          navigation_bar_down()
        }
      })
    }
    function menu_switch_event(event){
      if(event==='mouseenter'){
        navigation_bar_down()
        return
      }else if (event==='mouseleave'){
        navigation_bar_up()
        return;
      }
      if(navigation_bar.value==='navigation-bar-1'){
        navigation_bar_down()
      }else {
        navigation_bar_up()
      }
    }

    function item_change_color(num){
      switch (num){
        case 0:
          break;
        case 1:
          item_checked_1.value = 'item_checked'
          item_checked_2.value = ''
          item_checked_3.value = ''
          item_checked_4.value = ''
          break;
        case 2:
          item_checked_1.value = ''
          item_checked_2.value = 'item_checked'
          item_checked_3.value = ''
          item_checked_4.value = ''
          break;
        case 3:
          item_checked_1.value = ''
          item_checked_2.value = ''
          item_checked_3.value = 'item_checked'
          item_checked_4.value = ''
          break;
        case 4:
          item_checked_1.value = ''
          item_checked_2.value = ''
          item_checked_3.value = ''
          item_checked_4.value = 'item_checked'
          break;
        case -1:
          item_checked_1.value = ''
          item_checked_2.value = ''
          item_checked_3.value = ''
          item_checked_4.value = ''
      }
    }
    function item_click(num){
      checked_num.value = num
      item_change_color(num)
      switch (num) {
        case 0:
          router.push('/');
          break;
        case 1:
          router.push('/admin');
          break;
        case 2:
          router.push('/admin/user-ctrl');
          break;
        case 3:
          break;
        case 4:
          router.push('/admin/global-status');
          break;
      }
      navigation_bar_up()
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


    onMounted(()=>{
      window.addEventListener("mousedown",(event)=>{
        if(navigation_bar.value==='navigation-bar-2' && event.clientY>270){
          navigation_bar_up()
        }
      })
      window.addEventListener('touchstart', (event)=>{
        if(navigation_bar.value==='navigation-bar-2' && event.touches[0].pageY>270){
          navigation_bar_up()
        }
      })
    })

    return{
      navigation_bar,
      navigation_item,
      menu_switch_event,
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
.navigation-bar-1{
  width: 100%;
  height: 45px;
  overflow: visible;
  background-color: rgba(7, 21, 31, 0.4);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: left;
  transition: 0.3s;
}
.navigation-bar-2{
  width: 100%;
  height: 270px;
  background-color: rgba(7, 21, 31, 0.4);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: left;
  transition: 0.3s;
}

.navigation-bar-firstline{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.menu-switch{
  width: 45px;
  height: 45px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
}
.menu-switch-inside-1{
  border-color: white;
  border-style: solid;
  border-width: 3px 0 2px 0;
  width: 30px;
  height: 7px;
}
.menu-switch-inside-2{
  border-color: white;
  border-style: solid;
  border-width: 1px 0 3px 0;
  width: 30px;
  height: 7px;
}

.audio-ctrl-box{
  width: 60px;
  height: 45px;
  margin-right: 30px;
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
  width: 20px;
  height: 20px;
  transition: 0.2s;
}
.audio_button_1_1:hover{
  background: url("/src/assets/audio_play_hover.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 20px;
  height: 20px;
  transition: 0.2s;
}
.audio_button_1_2{
  background: url("/src/assets/audio_stop.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 20px;
  height: 20px;
  transition: 0.2s;
}
.audio_button_1_2:hover{
  background: url("/src/assets/audio_stop_hover.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 20px;
  height: 20px;
  transition: 0.2s;
}
.audio_button_2{
  background: url("/src/assets/audio_next.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 20px;
  height: 20px;
  transition: 0.2s;
}
.audio_button_2:hover{
  background: url("/src/assets/audio_next_hover.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 20px;
  height: 20px;
  transition: 0.2s;
}





.navigation-item-1{
  color: rgba(0,0,0,0);
  font-family: Consolas,"Microsoft YaHei UI",sans-serif;
  font-weight: lighter;
  font-size: 18px;
  width: 130px;
  height: 45px;
  line-height: 45px;
  margin-left: 20px;
  margin-right: 10px;
  pointer-events: none;
  transition: 0.3s;
}
.navigation-item-2{
  color: rgba(255, 255, 255, 0.8);
  font-family: Consolas,"Microsoft YaHei UI",sans-serif;
  font-weight: lighter;
  font-size: 18px;
  width: 130px;
  height: 45px;
  line-height: 45px;
  margin-left: 20px;
  margin-right: 10px;
  cursor: pointer;
  transition: 0.3s;
}
.navigation-item-2:hover, .item_checked{
  color: rgba(252, 74, 33, 1);
  font-family: Consolas,"Microsoft YaHei UI",sans-serif;
  font-size: 18px;
  width: 130px;
  height: 45px;
  line-height: 45px;
  margin-left: 20px;
  margin-right: 10px;
  cursor: pointer;
  transition: 0.3s;
}
</style>