<template>
  <div id="userRegisterPage">
    <div class="register-container">
      <div class="register-header">
        <h2>加入我们</h2>
        <p>创建您的账户，开始您的旅程</p>
      </div>
      <a-form
        ref="formRef"
        :model="form"
        label-align="left"
        auto-label-width
        @submit="handleSubmit"
        class="register-form"
      >
        <a-form-item field="userAccount" label="账号" :rules="[{ required: true, message: '请输入账号' }]">
          <a-input
            v-model="form.userAccount"
            placeholder="请输入账号"
            size="large"
            allow-clear
          >
            <template #prefix>
              <icon-user />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          field="userPassword"
          label="密码"
          :rules="[{ required: true, minLength: 8, message: '密码长度至少8位' }]"
        >
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
          <div class="password-strength" :class="getPasswordStrengthClass">
            <div class="strength-bar"></div>
            <div class="strength-bar"></div>
            <div class="strength-bar"></div>
            <span>{{ passwordStrengthText }}</span>
          </div>
        </a-form-item>

        <a-form-item
          field="checkPassword"
          label="确认密码"
          :rules="[{ required: true, validator: validatePasswordMatch }]"
        >
          <a-input-password
            v-model="form.checkPassword"
            placeholder="请再次输入密码"
            size="large"
            allow-clear
          >
            <template #prefix>
              <icon-lock />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-checkbox v-model="agreeTerms">
            我已阅读并同意
          </a-checkbox>
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            long
            :disabled="!agreeTerms"
            :loading="loading"
          >
            立即注册
          </a-button>
        </a-form-item>

        <div class="login-link">
          已有账户?
          <a-link href="/user/login">立即登录</a-link>
        </div>
      </a-form>

    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import API from "@/api";
import { userRegisterUsingPost } from "@/api/userController";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import {
  IconUser,
  IconLock
} from "@arco-design/web-vue/es/icon";
import { FormInstance } from "@arco-design/web-vue";

const router = useRouter();
const loading = ref(false);
const agreeTerms = ref(false);
const formRef = ref<FormInstance>();

const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: ""
} as API.UserRegisterRequest);

// 密码强度计算
const passwordStrength = computed(() => {
  if (!form.userPassword) return 0;

  let strength = 0;
  if (form.userPassword.length >= 8) strength += 1;
  if (/\d/.test(form.userPassword)) strength += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(form.userPassword)) strength += 1;
  if (/[a-z]/.test(form.userPassword) && /[A-Z]/.test(form.userPassword)) strength += 1;

  return Math.min(strength, 3);
});

const passwordStrengthText = computed(() => {
  const texts = ["弱", "中", "强", "非常强"];
  return texts[passwordStrength.value];
});

const getPasswordStrengthClass = computed(() => {
  return `strength-${passwordStrength.value}`;
});

// 密码匹配验证
const validatePasswordMatch = (value: string, callback: (error?: string) => void) => {
  if (value !== form.userPassword) {
    callback("两次输入的密码不一致");
  } else {
    callback();
  }
};

const handleSubmit = async () => {
  if (!formRef.value) return;
  try {
    await formRef.value.validate();
  } catch {
    message.error("请完善表单信息");
    return;
  }

  loading.value = true;
  try {
    const res = await userRegisterUsingPost(form);
    if (res.data.code === 0) {
      message.success("注册成功");
      router.push({ path: "/user/login", replace: true });
    } else {
      message.error("注册失败，" + res.data.message);
      form.userPassword = "";
      form.checkPassword = "";
    }
  } catch (error) {
    message.error("注册失败，请稍后重试");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
#userRegisterPage {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  background-image: radial-gradient(circle at 10% 20%, rgba(100, 149, 237, 0.1) 0%, transparent 20%),
  radial-gradient(circle at 90% 80%, rgba(144, 238, 144, 0.1) 0%, transparent 20%);
}

.register-container {
  width: 480px;
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.register-header {
  text-align: center;
  margin-bottom: 32px;
}

.register-header h2 {
  font-size: 24px;
  color: #1d2129;
  margin-bottom: 8px;
}

.register-header p {
  color: #86909c;
  font-size: 14px;
}

.register-progress {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
}

.progress-step {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f2f3f5;
  color: #86909c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
}

.progress-step.active {
  background: #165dff;
  color: #fff;
}

.progress-line {
  width: 60px;
  height: 2px;
  background: #f2f3f5;
}

.register-form {
  margin-top: 24px;
}

.password-strength {
  display: flex;
  align-items: center;
  margin-top: 8px;
  font-size: 12px;
  color: #86909c;
}

.strength-bar {
  width: 20px;
  height: 4px;
  background: #f2f3f5;
  border-radius: 2px;
  margin-right: 4px;
}

.password-strength.strength-1 .strength-bar:nth-child(1),
.password-strength.strength-1 span {
  background: #f53f3f;
  color: #f53f3f;
}

.password-strength.strength-2 .strength-bar:nth-child(-n+2),
.password-strength.strength-2 span {
  background: #f7ba1e;
  color: #f7ba1e;
}

.password-strength.strength-3 .strength-bar,
.password-strength.strength-3 span {
  background: #00b42a;
  color: #00b42a;
}

.login-link {
  text-align: center;
  margin-top: 16px;
  color: #86909c;
}

@media (max-width: 768px) {
  .register-container {
    width: 90%;
    padding: 24px;
  }
}
</style>


<!--<template>-->
<!--  <div id="userRegisterPage">-->
<!--    <h2 style="margin-bottom: 16px">用户注册</h2>-->
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
<!--      <a-form-item-->
<!--        field="checkPassword"-->
<!--        tooltip="确认密码不小于 8 位"-->
<!--        label="确认密码"-->
<!--      >-->
<!--        <a-input-password-->
<!--          v-model="form.checkPassword"-->
<!--          placeholder="请输入确认密码"-->
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
<!--            注册-->
<!--          </a-button>-->
<!--          <a-link href="/user/login">已有账户,登录</a-link>-->
<!--        </div>-->
<!--      </a-form-item>-->
<!--    </a-form>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { reactive } from "vue";-->
<!--import API from "@/api";-->
<!--import { userRegisterUsingPost } from "@/api/userController";-->
<!--import message from "@arco-design/web-vue/es/message";-->
<!--import { useRouter } from "vue-router";-->

<!--const router = useRouter();-->

<!--const form = reactive({-->
<!--  userAccount: "",-->
<!--  userPassword: "",-->
<!--  checkPassword: ""-->
<!--} as API.UserRegisterRequest);-->

<!--/**-->
<!-- * 提交-->
<!-- */-->
<!--const handleSubmit = async () => {-->
<!--  const res = await userRegisterUsingPost(form);-->
<!--  if (res.data.code === 0) {-->
<!--    message.success("注册成功");-->
<!--    router.push({-->
<!--      path: "/user/login",-->
<!--      replace: true-->
<!--    });-->
<!--  } else {-->
<!--    message.error("注册失败，" + res.data.message);-->
<!--  }-->
<!--};-->
<!--</script>-->
