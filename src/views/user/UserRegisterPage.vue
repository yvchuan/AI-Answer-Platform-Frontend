<template>
  <div id="userRegisterPage">
    <h2 style="margin-bottom: 16px">用户注册</h2>
    <a-form
      :model="form"
      :style="{ width: '480px', margin: '0 auto' }"
      label-align="left"
      auto-label-width
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不小于 8 位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item
        field="checkPassword"
        tooltip="确认密码不小于 8 位"
        label="确认密码"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请输入确认密码"
        />
      </a-form-item>
      <a-form-item>
        <div
          style="
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-between;
          "
        >
          <a-button type="primary" html-type="submit" style="width: 120px"
            >注册
          </a-button>
          <a-link href="/user/login">老用户登陆</a-link>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import API from "@/api";
import { useLoginUserStore } from "@/store/userStore";
import { userRegisterUsingPost } from "@/api/userController";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const router = useRouter();

const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as API.UserRegisterRequest);

/**
 * 提交
 */
/*const handleSubmit = async () => {
  const res = await userRegisterUsingPost(form);
  if (res?.data?.code === 0) {
    message.success("注册成功");
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败, " + (res.data.message || "未知错误"));
    console.log(res.data);
  }
};*/

const handleSubmit = async () => {
  const res = await userRegisterUsingPost(form);
  console.log("API Response:", res); // 输出 API 返回的响应内容
  if (res?.data?.code === 0) {
    message.success("注册成功");
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败, " + (res?.data?.message || "未知错误"));
    console.log(res.data); // 输出更详细的错误信息
  }
};

// const handleSubmit = async () => {
//   try {
//     console.log("开始请求 API...");
//
//     const res = await userRegisterUsingPost(form);
//
//     console.log("API 响应:", res);
//
//     if (!res) {
//       throw new Error("API 请求无响应");
//     }
//
//     if (!res.data) {
//       console.error("服务器返回空数据:", res);
//       throw new Error("服务器返回空数据");
//     }
//
//     if (res.data.code === 0) {
//       message.success("注册成功");
//       router.push({ path: "/user/login", replace: true });
//     } else {
//       message.error("注册失败, " + (res.data.message || "未知错误"));
//     }
//   } catch (error) {
//     console.error("请求出错:", error);
//     message.error("注册失败, 网络错误或服务器无响应");
//   }
// };

/*const handleSubmit = async () => {
  try {
    console.log("开始请求 API...");
    const response = await fetch("http://localhost:8102/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error(`HTTP 错误! 状态码: ${response.status}`);
    }

    const data = await response.json();
    console.log("API 响应:", data);

    if (data.code === 0) {
      message.success("注册成功");
      router.push({ path: "/user/login", replace: true });
    } else {
      message.error("注册失败, " + (data.message || "未知错误"));
    }
  } catch (error) {
    console.error("请求出错:", error);
    message.error("注册失败, 网络错误或服务器无响应");
  }
};*/
</script>
