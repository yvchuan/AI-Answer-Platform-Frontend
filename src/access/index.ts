import router from "@/router";
import { useLoginUserStore } from "@/store/userStore";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

//进入页面前,进行权限校验

router.beforeEach(async (to, from, next) => {
  // 获取当前登陆用户
  const loginUserStore = useLoginUserStore();
  const loginUser = loginUserStore.loginUser;

  // 当前页面需要的权限
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  //要跳转的页面必须登陆
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果没登陆, 跳转到登陆页面
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ACCESS_ENUM.NOT_LOGIN
    ) {
      next(`/user/login?redirect= ${to.fullPath}`);
    }
    // 如果已经登陆了, 判断权限是否足够, 如果不足, 跳转到无权限页面
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
