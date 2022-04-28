<template>
  <div :class="login_layout">
    <div class="login-main">
      <div class="login-title standard-font">Rmfield Console</div>
      <div class="login-space"></div>
      <div class="arrowTransform" @click="changePagePosition">
        <div class="arrowTransform_style_1">
          <div class="arrowTransform_style_2">
            <div class="arrowTransform_style_3"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="login-footer">
      <div class="footer-content standard-font">
        <a href="https://beian.miit.gov.cn/" class="footer-beian standard-font">闽ICP备2021014916号-1</a>
      </div>
      <div class="login-area">
        <div class="login-form-box">
          <form class="login-card-form">
            <input v-model="username" placeholder=" username" class="login-input standard-font">
            <br>
            <input v-model="password" type="password" placeholder=" password" class="login-input standard-font">
            <br>
            <button @click="login_submit" type="button" class="login-submit standard-font">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {onMounted, ref} from "vue";
import axios from "axios";
import router from "@/router";

export default {
  name: "AdminLogin",
  setup() {

    //设置sleep
    function sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    // 鼠标滚轮事件
    let login_layout = ref('login-layout-down')

    function handleMousewhell(event) {
      sleep(100).then(() => {
        event = event || window.event;
        if (event.wheelDelta > 0) {
          login_layout.value = 'login-layout-down'
        } else {
          login_layout.value = 'login-layout-up'
        }
      })
    }
    function changePagePosition(){
      if(login_layout.value === 'login-layout-down'){
        login_layout.value = 'login-layout-up'
      }else if (login_layout.value === 'login-layout-up'){
        login_layout.value = 'login-layout-down'
      }
    }

    //登录部分
    let username = ref('')
    let password = ref('')
    function login_submit() {
      if (username.value === '' || password.value === '') {
        return
      }

      axios({
        url: "/api/login",
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          username: username.value,
          password: password.value
        })
      }).then(response => {
        let data = response.data
        if(data.status === 0){
          let token = data.data.token
          //储存cookie
          let cookie_exp_ms = 365*24*60*60*1000;
          let cookie_exp_date = new Date();
          cookie_exp_date.setTime(cookie_exp_date.getTime() + cookie_exp_ms);
          document.cookie = "token="+token+";expires="+cookie_exp_date.toGMTString()
          let targetPath = '/admin'
          if (router.currentRoute.value.query.redirect){
            targetPath = router.currentRoute.value.query.redirect
          }
          router.push({path:targetPath})
        }
      })
    }

    onMounted(() => {
      window.addEventListener('mousewheel', handleMousewhell)
    })

    return {
      login_layout,
      changePagePosition,
      username,
      password,
      login_submit
    }
  }
}
</script>

<style scoped>
.standard-font {
  font-family: "Microsoft YaHei UI", Consolas, sans-serif;
}

.login-layout-down {
  height: 100%;
  text-align: center;
  overflow-y: visible;
  margin-top: 0;
  transition: 1s;
}
.login-layout-down::-webkit-scrollbar {
  display: none;
}
.login-layout-up {
  height: 100%;
  text-align: center;
  overflow-y: visible;
  margin-top: -500px;
  transition: 1s;
}
.login-layout-up::-webkit-scrollbar {
  display: none;
}

.login-main{
  background: url("/src/assets/ak_bg_1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100%;
}
.login-title{
  font-size: 28px;
  font-weight: lighter;
}
.login-space{
  height: 68%;
}

.login-footer {
  height: 500px;
  background-color: rgba(10, 10, 10, 0.9);
}

.footer-content {
  background: rgba(41, 144, 255, 0.6);
  border-radius: 4px;
  padding: 5px;
  font-size: 12px;
}
.footer-beian,.footer-beian:visited{
  color: rgba(200,200,200,0.7);
  text-decoration: none;
  font-weight: lighter;
}

.login-area{
  height: 300px;
  margin-top: 80px;
}
.login-input{
  border: rgba(53, 169, 255, 0.7) solid 2px;
  background-color: rgba(255,255,255,0.25);
  width: 260px;
  height: 30px;
  border-radius: 8px;
  margin-top: 40px;
  font-weight: lighter;
  font-size: 18px;
  color: rgb(90, 205, 255);
}
.login-input:focus{
  border: rgb(90, 205, 255) solid 2px;
  background-color: rgba(255,255,255,0.25);
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  width: 260px;
  height: 30px;
  border-radius: 8px;
  margin-top: 40px;
  font-weight: lighter;
  font-size: 18px;
  color: rgb(90, 205, 255);
}
.login-submit{
  border: rgba(53, 169, 255, 0.7) solid 2px;
  background-color: rgba(255,255,255,0.25);
  width: 100px;
  height: 35px;
  border-radius: 8px;
  margin-top: 40px;
  font-weight: lighter;
  font-size: 18px;
  color: rgba(53, 169, 255, 0.7);
}
.login-submit:active{
  border: rgb(90, 205, 255) solid 2px;
  background-color: rgba(255,255,255,0.25);
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  width: 98px;
  height: 35px;
  border-radius: 8px;
  margin-top: 40px;
  font-weight: lighter;
  font-size: 18px;
  color: rgb(90, 205, 255);
}



/* 包裹箭头效果的盒子 */
.arrowTransform {
  animation: downArrow 3.5s infinite; /* 启动动画特效 */
  animation-timing-function: ease;
  width: min-content;
  height: min-content;
  background-color: rgba(0, 0, 0, 0);
  margin: 90px auto 0;
}
/* 箭头效果的盒子 */
.arrowTransform_style_1 {
  display: block;
  margin: 0;
  width: 45px;
  height: 45px;
  background-color: rgba(0,0,0,0);
  border-left: none;
  border-right: rgba(255, 255, 255, 0.1) 4px solid;
  border-top: none;
  border-bottom: rgba(255, 255, 255, 0.1) 4px solid;
  transform: rotate(45deg);
  cursor: pointer;
}
.arrowTransform_style_2 {
  display: inline-block;
  margin-top: 12px;
  margin-left: 12px;
  width: 45px;
  height: 45px;
  background-color: rgba(0,0,0,0);
  border-left: none;
  border-right: rgba(255, 255, 255, 0.4) 3px solid;
  border-top: none;
  border-bottom: rgba(255, 255, 255, 0.4) 3px solid;
  cursor: pointer;
}
.arrowTransform_style_3 {
  display: inline-block;
  margin-top: 10px;
  margin-left: 10px;
  width: 45px;
  height: 45px;
  background-color: rgba(0,0,0,0);
  border-left: none;
  border-right: rgba(255, 255, 255, 0.8) 2px solid;
  border-top: none;
  border-bottom: rgba(255, 255, 255, 0.8) 2px solid;
  cursor: pointer;
}
/* 箭头动画 */
@keyframes downArrow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}


input::placeholder, input:hover::placeholder {
  color: rgba(255, 255, 255, 0.6);
  font-family: Consolas,"Microsoft YaHei UI",sans-serif;
  font-weight: lighter;
  font-size: 18px;
  transition: 0.2s;
}
input:focus::placeholder {
  color: rgba(255, 255, 255, 0);
  transition: 0.2s;
}

</style>