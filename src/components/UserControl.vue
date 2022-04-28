<template>
  <div class="user-ctrl-area">
    <div class="ops-area">
        <input type="text" v-model="id" placeholder=" id" class="input-text-item">
        <input type="text" v-model="username" placeholder=" username" class="input-text-item">
        <input type="text" v-model="password" placeholder=" password" class="input-text-item">
        <input type="text" v-model="realname" placeholder=" realname" class="input-text-item">
        <div class="input-check-area">
          <div class="input-check-item">
            <div :class="{input_check_option:!admin_checked,input_check_option_checked:admin_checked}"
                 @click="chagneAdminOption"></div>
            <div class="input-check-text  standard-font">ADMIN</div>
          </div>
          <div class="input-check-item">
            <div :class="{input_check_option:!dba_checked,input_check_option_checked:dba_checked}"
                 @click="chagneDbaOption"></div>
            <div class="input-check-text  standard-font">DBA</div>
          </div>
          <div class="input-check-item">
            <div :class="{input_check_option:!user_checked,input_check_option_checked:user_checked}"
                 @click="chagneUserOption"></div>
            <div class="input-check-text  standard-font">USER</div>
          </div>
        </div>
      <div>
        <button type="button" id="findUser" class="input-button-item" @click="queryUser">Find</button>
        <button type="button" id="updateUser" class="input-button-item" @click="updateUser">Update</button>
      </div>
    </div>
    <div class="data-area">
      <table class="data-table">
        <thead id="resultThead">
          <tr>
            <th class="data-th">
              id
            </th>
            <th class="data-th">
              username
            </th>
            <th class="data-th">
              realname
            </th>
            <th class="data-th">
              a
            </th>
            <th class="data-th">
              d
            </th>
            <th class="data-th">
              u
            </th>
          </tr>
        </thead>
        <tbody id="resultTbody">
          <tr>
            <td class="data-td">
              1
            </td>
            <td class="data-td">
              DiscoloR
            </td>
            <td class="data-td">
              xxxxx
            </td>
            <td class="data-td">
              y
            </td>
            <td class="data-td">
              n
            </td>
            <td class="data-td">
              y
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import axios from "axios";

export default {
  name: "UserControl",
  setup(){
    let admin_checked = ref(false)
    let dba_checked = ref(false)
    let user_checked = ref(false)
    function chagneAdminOption(){
      admin_checked.value = (admin_checked.value === false);
    }
    function chagneDbaOption(){
      dba_checked.value = (dba_checked.value === false);
    }
    function chagneUserOption(){
      user_checked.value = (user_checked.value === false);
    }


    let id = ref('')
    let username = ref('')
    let password = ref('')
    let realname = ref('')
    let userList = []

    function queryUser(){
      axios({
        url:'/admin/api/user-ctrl',
        method:'get',
        params:{
          id:id.value,
          username:username.value,
          realname:realname.value
        }
      }).then(response=>{
        let result=response.data
        if(result.status===0){
          userList = result.data
        }else {
          throw 'something went wrong'
        }
      }).catch(response=>{
        console.log(response.data.msg)
      })
    }

    function updateUser(){
      axios({
        url:'/admin/api/user-ctrl',
        method:'put',
        data:JSON.stringify({
          id:id.value,
          username:username.value,
          password:password.value,
          realname:realname.value,
          role_admin:admin_checked.value,
          role_dba:dba_checked.value,
          role_user:user_checked.value
        })
      }).then(response=>{
        let result=response.data
        if(result.status===0){
          userList = result.data
        }else {
          throw 'something went wrong'
        }
      }).catch(response=>{
        console.log(response.data.msg)
      })
    }


    return{
      id,
      username,
      password,
      realname,
      admin_checked,
      dba_checked,
      user_checked,
      chagneAdminOption,
      chagneDbaOption,
      chagneUserOption,
      queryUser,
      updateUser,
      userList
    }
  }
}
</script>

<style scoped>
.standard-font {
  font-family: "Microsoft YaHei UI", sans-serif;
}

.user-ctrl-area {
  background-color: rgba(0, 0, 0, 0.3);
  margin-top: 35px;
  height: 80%;
  width: 50%;
  min-width: 330px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
}

.ops-area {
  width: 100%;
  height: 23%;
  min-height: 160px;
  margin-top: 8%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.input-text-item{
  border: rgba(53, 169, 255, 0.7) solid 2px;
  background-color: rgba(0,0,0,0.35);
  width: 35%;
  min-width: 250px;
  height: 7%;
  border-radius: 8px;
  font-weight: lighter;
  font-size: 16px;
  color: rgb(90, 205, 255);
  transition: 0.2s;
}
.input-text-item:focus{
  border: rgb(90, 205, 255) solid 2px;
  background-color: rgba(0,0,0,0.5);
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  width: 35%;
  min-width: 250px;
  height: 27px;
  border-radius: 8px;
  font-weight: lighter;
  font-size: 16px;
  color: rgb(90, 205, 255);
  transition: 0.2s;
}
.input-check-area{
  display: flex;
  flex-direction: row;
  width: 35%;
  min-width: 250px;
  justify-content: space-between;
}
.input-check-item{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.input_check_option{
  border: rgba(53, 169, 255, 0.7) solid 2px;
  background-color: rgba(0,0,0,0.5);
  margin-left: 9px;
  width: 14px;
  height: 14px;
  border-radius: 8px;
  transition: 0.1s;
}
.input_check_option:hover{
  border: rgba(90, 205, 255, 0.7) solid 2px;
  background-color: rgba(0,0,0,0.5);
  margin-left: 9px;
  width: 14px;
  height: 14px;
  border-radius: 8px;
  transition: 0.1s;
}
.input_check_option_checked{
  border: rgba(0, 0, 0, 1) solid 3px;
  background-color: rgba(90, 205, 255, 0.8);
  margin-left: 9px;
  width: 12px;
  height: 12px;
  border-radius: 9px;
  transition: 0.1s;
  box-shadow: 0 0 5px rgba(53, 169, 255, 1);
}
.input-check-text{
  margin-left: 5px;
  margin-right: 8px;
  flex-grow: 1;
  color: rgba(53, 169, 255, 1);
}
.input-button-item{
  border: rgba(53, 169, 255, 0.7) solid 2px;
  background-color: rgba(0,0,0,0.35);
  border-radius: 8px;
  width: 80px;
  height: 22px;
  margin-left: 10px;
  margin-right: 10px;
  font-weight: lighter;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
}
.input-button-item:active{
  border: rgb(90, 205, 255) solid 2px;
  background-color: rgba(0,0,0,0.5);
  border-radius: 8px;
  width: 80px;
  height: 22px;
  margin-left: 10px;
  margin-right: 10px;
  font-weight: lighter;
  font-size: 16px;
  color: rgba(53, 169, 255, 1);
}

input::placeholder, input:hover::placeholder {
  color: rgba(255, 255, 255, 0.6);
  font-family: "Microsoft YaHei UI",sans-serif;
  font-weight: lighter;
  font-size: 16px;
  transition: 0.2s;
}
input:focus::placeholder {
  color: rgba(255, 255, 255, 0);
  transition: 0.2s;
}




.data-area{
  width: 100%;
  height: 69%;
  margin-top: 5%;
  margin-bottom: 8%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
}
.data-area::-webkit-scrollbar{
  display: none;
}

.data-table{
  width: 90%;
}
.data-th{
  color: rgb(90, 205, 255);
  font-family: "Microsoft YaHei UI",sans-serif;
  font-weight: lighter;
  font-size: 16px;
  text-align: center;
}
.data-td{
  color: rgba(255, 255, 255, 0.8);;
  font-family: "Microsoft YaHei UI",sans-serif;
  font-weight: lighter;
  font-size: 14px;
  text-align: center;
}


</style>