import request from "@/utils/http";
// 侧边栏的目录接口
export function catalog(username, password) {
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
