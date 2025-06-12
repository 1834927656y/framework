<template>
    <div class="login">
        <div class="loginForm">
          <span style="font-family: FangSong; font-size: 58px; margin-bottom: 2vh">智品堂数据治理平台</span>
          <el-form ref="loginRef" style="" >
            <el-form-item prop="username">
              <el-input
            
                type="text"
                placeholder="请输入管理员账户"
       
                ref="usernameRef"
              >
                <template #prefix>
                  <el-icon ><UserFilled /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input 
                
                  type="password" 
                  placeholder="请输入登录密码"
                 
                  ref="passwordRef"
                >
                  <template #prefix>
                    <el-icon><Tools  /></el-icon>
                  </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="code" style="background-color: transparent">
                <input
               
                  type="text"
                  placeholder="验证码"
                  style="text-align: center; height: 76%; width: 60%; margin-right: 10%; color: black;"
                 
                  ref="codeRef"
                />
                <img  alt="" style=" height: 76%; width: 30%;"  />
              
            </el-form-item>
            <el-form-item style="background-color: transparent;  margin-top: -4%;">
              <el-checkbox  style="color: aliceblue; font-family: FangSong; " >
                记住密码
              </el-checkbox>
            </el-form-item>
          </el-form>
          <button
          class="loginButton"
          style="
            background-color: #202f8f;
            border-radius: 4%;
            position: relative;
            font-family: FangSong;
            width: 44%;
            height: 10%;
            left: 0%;
            top: 12%;
          "
         
          >
            登录
          </button>
        </div>
      
  
    </div>
  </template>
  
  <script setup lang="ts">
  
  </script>
  
  <style lang="scss" scoped>
  * {
    color: aliceblue;
    box-sizing: border-box;
  }
  
  .login {
    display: flex;
    position: relative;
    width: 100vw;
    height: 100vh;
    background: url(@/assets/images/loginBackground.png);
    background-size: 100% 100%;
    background-position: center;
  }
  
  .loginForm {
    width: 40%;
    height: 40%;
    display: flex;
    position: absolute;
    top: 33%;
    left: 53%;
    flex-direction: column;
    align-items: center; /* 设置子元素垂直居中 */
  }
  
  // form {
  //   display: flex;
  //   flex-direction: column;
  //   gap: 2vh;
  // }
  
  // .loginForm div {
  //   width: 100%;
  //   height: 100%;
  //   display: flex;
  //   flex-direction: row;
  //   align-items: center;
  //   opacity: 1;
  //   background-color: #fff;
  //   border-radius: 2%;
  //   gap: 0.5vw;
  // }
  // .loginForm :deep(.el-form-item) {
  //   width: 100%;
  //   height: 20%;
  //   border-radius: 2%;
  //   margin-bottom: 0px;
  // }
  // .loginForm :deep(.el-form-item__content) {
  //   width: 100%;
  //   height: 100%;
  //   border-radius: 2%;
  // }
  
  // .loginForm ::v-deep .el-form-item__content .el-checkbox,
  // .loginForm ::v-deep .el-form-item__content .el-checkbox__input,
  // .loginForm ::v-deep .el-form-item__content::after, .el-form-item__content::before,
  // .loginForm ::v-deep .el-form-item__content .el-checkbox__input *{
  //   width: 40%;
  //   height: 80%;
  // }
  .loginForm :deep(.el-form-item__content .el-checkbox__label) {
    font-size: 1vw;
  }
  
  
  :deep(.el-icon svg) {
    color: #9d9e9f; 
  }
  
  :deep(.el-form-item .el-input--default) {
    height: 80%;
  }
  
  :deep(.el-form-item) {
    height:25%;
  }
  
  </style>
  