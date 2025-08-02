/**
 * 参考接口文档：https://app.apifox.com/project/2429576
 * 完成下面的api函数
 * 并对每个函数进行调用测试
 * 需要统一处理的地方：
 * 1. 对baseurl进行统一处理
 * 2. 当服务器响应结果中的code不为0时，需要使用alert弹出错误消息msg
 * 3. 如果服务器响应头中出现Authorization:token，需要对把响应头中的token保存到localstorage
 * 4. 请求时，如果发现本地localstorage中包含token，需要将其带入到请求头中 Authorization: Bearer token
 */

const axiosIntance = axios.create({
  // 1. 对baseurl进行统一处理
  baseURL: "https://study.duyiedu.com/",
});

// 统一处理：拦截器
// 只给当前axiosIntance实例添加响应拦截器，如果写axios.interceptors，则会给所有实例添加拦截器
axiosIntance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 服务器给了授权码，我需要保存它

    // 2. 当服务器响应结果中的code不为0时，需要使用alert弹出错误消息msg
    if (response.data.code !== 0) {
      alert(response.data.msg);
    }

    const token = response.headers.authorization;
    if (token) {
      // 3. 如果服务器响应头中出现Authorization:token，需要对把响应头中的token保存到localstorage
      localStorage.setItem("token", token);
    }
    return response.data.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    alert(error.message); // 弹出错误消息
  }
);

// 添加请求拦截器
axiosIntance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么

  // config 为当前的请求配置
  // 在发送请求之前做些什么
  // 这里，我们添加一个请求头

  // 4. 请求时，如果发现本地localstorage中包含token，需要将其带入到请求头中 Authorization: Bearer token
  const token = localStorage.getItem("token");
  config.headers.authorization = `Bearer ${token}`;

  return config; // 返回处理后的配置
});

/**
 * 登录
 * @param {*} loginId 账号
 * @param {*} loginPwd 密码
 * @return 返回登录成功的用户
 */
async function login(loginId, loginPwd) {
  /* const resp = await axiosIntance.post("/api/user/login", {
    loginId,
    loginPwd,
  });
  console.log(resp.data.data); // 两个data含义不一样。第一个data：响应体；第二个data：数据
  // 每次都需要resp.data.data————》封装响应拦截器
   */
  return await axiosIntance.post("/api/user/login", {
    loginId,
    loginPwd,
  });
}

// test
(async function () {
  const resp = await login("theo", "123");
  console.log(resp); // {id: '688dca7b5f8cc70c8a4ba2ab', loginId: 'theo', nickname: 'gin'}
})();

/**
 * 注册
 * @param {*} loginId 账号
 * @param {*} loginPwd 密码
 * @param {*} nickname 昵称
 */
async function reg(loginId, loginPwd, nickname) {
  return await axiosIntance.post("/api/user/reg", {
    loginId,
    loginPwd,
    nickname,
  });
}
// test
/* (async function () {
  const resp = await reg("zhangsanfeng", "123", '小z');
  console.log(resp); // {code: 0, msg: "", data: {id: "688dd2705f8cc70c8a4ba564", loginId: "zhangsanfeng", nickname: "小z"}}
})(); */

/**
 * 验证账号是否存在
 * @param {*} loginId 账号
 */
async function exists(loginId) {
  return await axiosIntance.get("/api/user/exists", {
    params: {
      loginId,
    },
  });
}
// test
(async function () {
  const resp = await exists("theo");
  console.log(resp); // true
})();

/**
 * 恢复登录，获取当前登录的用户信息
 */
async function profile() {
  return await axiosIntance.get("/api/user/profile");
}
// test
(async function () {
  const resp = await profile();
  console.log(resp); // {code: 0, msg: "", data: {id: "688dca7b5f8cc70c8a4ba2ab", loginId: "theo", nickname: "gin"}}
})();
