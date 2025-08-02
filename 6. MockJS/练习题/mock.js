Mock.mock("/api/cart", "get", {
  code: 0,
  msg: "",
  "data|3-6": [
    {
      productName: "@csentence",
      productUrl: "@image(100x80, #008c8c, #fff, testimage)",
      // .2 表示保留两位小数
      "unitPrice|10-500.2": 0, // 此处0表示属性值是number类型
      "count|1-10": 0,
    },
  ],
});
