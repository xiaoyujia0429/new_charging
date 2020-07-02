import request from "@/utils/http";

// 登录方法
export function login(username, password) {
  const data = {
    username,
    password
  };
  return request({
    url: "/login",
    method: "post",
    data: data
  });
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: "/getInfo",
    method: "get"
  });
}

// 退出方法
export function logout() {
  return request({
    url: "/logout",
    method: "post"
  });
}
