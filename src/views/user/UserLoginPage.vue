<template>
  <div id="userLoginPage">
    <div class="login-container">
      <div class="login-image">
        <img :src="loginImage" alt="Login Illustration">
      </div>
      <div class="login-form">
        <h2 style="margin-bottom: 24px; text-align: center; color: #1d2129;">欢迎登录</h2>
        <a-form
          :model="form"
          label-align="left"
          auto-label-width
          @submit="handleSubmit"
        >
          <a-form-item field="userAccount" label="账号">
            <a-input
              v-model="form.userAccount"
              placeholder="请输入账号"
              allow-clear
              size="large"
            >
              <template #prefix>
                <icon-user />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item field="userPassword" tooltip="密码不小于 8 位" label="密码">
            <a-input-password
              v-model="form.userPassword"
              placeholder="请输入密码"
              size="large"
              allow-clear
            >
              <template #prefix>
                <icon-lock />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <div class="form-actions">
              <a-button
                type="primary"
                html-type="submit"
                long
                size="large"
                :loading="loading"
              >
                登录
              </a-button>
            </div>
          </a-form-item>
          <div class="form-footer">
            <a-link href="/user/register">注册新账号</a-link>
            <a-link href="/user/forget" style="margin-left: 16px">忘记密码?</a-link>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import API from "@/api";
import { userLoginUsingPost } from "@/api/userController";
import { useLoginUserStore } from "@/store/userStore";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { IconUser, IconLock } from "@arco-design/web-vue/es/icon";
import loginImage from "@/assets/login1.png";

const loginUserStore = useLoginUserStore();
const router = useRouter();
const loading = ref(false);

const form = reactive({
  userAccount: "",
  userPassword: ""
} as API.UserLoginRequest);

/**
 * 提交
 */
const handleSubmit = async () => {
  loading.value = true;
  try {
    const res = await userLoginUsingPost(form);
    if (res.data.code === 0) {
      await loginUserStore.fetchLoginUser();
      message.success("登录成功");
      router.push({
        path: "/",
        replace: true
      });
    } else {
      message.error("登录失败，" + res.data.message);
    }
  } catch (error) {
    message.error("登录失败，请稍后重试");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
#userLoginPage {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.login-container {
  display: flex;
  width: 900px;
  height: 550px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.login-image {
  width: 50%;
  background: linear-gradient(135deg, #3498db, #2ecc71);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.login-image img {
  max-width: 120%;
  max-height: 120%;
  object-fit: contain;
  image-rendering: auto;
  transform: scale(1.1); /* 放大 10% */
}


.login-form {
  width: 50%;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-actions {
  margin-top: 24px;
}

.form-footer {
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    width: 90%;
    height: auto;
  }

  .login-image, .login-form {
    width: 100%;
  }

  .login-image {
    height: 200px;
    padding: 20px;
  }

  .login-form {
    padding: 30px 20px;
  }
}
</style>
<!--<template>-->
<!--  <div id="userLoginPage">-->
<!--    <h2 style="margin-bottom: 16px">用户登录</h2>-->
<!--    <a-form-->
<!--      :model="form"-->
<!--      :style="{ width: '480px', margin: '0 auto' }"-->
<!--      label-align="left"-->
<!--      auto-label-width-->
<!--      @submit="handleSubmit"-->
<!--    >-->
<!--      <a-form-item field="userAccount" label="账号">-->
<!--        <a-input v-model="form.userAccount" placeholder="请输入账号" />-->
<!--      </a-form-item>-->
<!--      <a-form-item field="userPassword" tooltip="密码不小于 8 位" label="密码">-->
<!--        <a-input-password-->
<!--          v-model="form.userPassword"-->
<!--          placeholder="请输入密码"-->
<!--        />-->
<!--      </a-form-item>-->
<!--      <a-form-item>-->
<!--        <div-->
<!--          style="-->
<!--            display: flex;-->
<!--            width: 100%;-->
<!--            align-items: center;-->
<!--            justify-content: space-between;-->
<!--          "-->
<!--        >-->
<!--          <a-button type="primary" html-type="submit" style="width: 120px">-->
<!--            登录-->
<!--          </a-button>-->
<!--          <a-link href="/user/register">新用户注册</a-link>-->
<!--        </div>-->
<!--      </a-form-item>-->
<!--    </a-form>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { reactive } from "vue";-->
<!--import API from "@/api";-->
<!--import { userLoginUsingPost } from "@/api/userController";-->
<!--import { useLoginUserStore } from "@/store/userStore";-->
<!--import message from "@arco-design/web-vue/es/message";-->
<!--import { useRouter } from "vue-router";-->

<!--const loginUserStore = useLoginUserStore();-->
<!--const router = useRouter();-->

<!--const form = reactive({-->
<!--  userAccount: "",-->
<!--  userPassword: ""-->
<!--} as API.UserLoginRequest);-->

<!--/**-->
<!-- * 提交-->
<!-- */-->
<!--const handleSubmit = async () => {-->
<!--  const res = await userLoginUsingPost(form);-->
<!--  if (res.data.code === 0) {-->
<!--    await loginUserStore.fetchLoginUser();-->
<!--    message.success("登录成功");-->
<!--    router.push({-->
<!--      path: "/",-->
<!--      replace: true-->
<!--    });-->
<!--  } else {-->
<!--    message.error("登录失败，" + res.data.message);-->
<!--  }-->
<!--};-->
<!--</script>-->
