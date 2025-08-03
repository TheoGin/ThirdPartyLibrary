/**
 * 设置各个时区的时间文本
 */
function setNow() {
  $("[data-zone]").each((index, element) => {
    const zone = +element.dataset.zone;
    element.innerText = moment().utcOffset(zone).format("YYYY-MM-DD HH:mm:ss");
  });

  // 监听事件写在外面，不用隔1秒开一个
  // $("#birthInput").on("change", function (e) {
}

/**
 * 设置和生日相关的信息
 * 生日数据来源于文本框的值
 */
function setBirthInfo() {
  const birthTxt = $("#birthInput").val();
  console.log(birthTxt);

  // 要判空，不然会出现
  /* 
  出生日期： Invalid date
  年龄： NaN
  你在这个世界上已存在了 NaN 秒钟
  你还有 NaN 天就会迎来你 NaN 岁的生日
  你将在 Invalid date 迎来你下个生日
  */
  if (!birthTxt) {
    $("#birthInfo").empty(); // 不正确的日期文本
    return;
  }

  const birthdayMoment = moment(birthTxt);
  const now = moment();

  if (birthdayMoment > now) {
    // 生日有问题
    $("#birthInfo").html("生日不正确");
    return;
  }
  const p1 = `<p>
        <strong>出生日期：</strong>
        <span>${birthdayMoment.format("YYYY年MM月DD日")}</span>
      </p>`;
  const age = now.diff(birthdayMoment, "years");
  const p2 = `<p>
        <strong>年龄：</strong>
        <span>${age}</span>
      </p>`;

  const p3 = `<p>
        你在这个世界上已存在了
        <strong>${now.diff(birthdayMoment, "seconds")}</strong>
        秒钟
      </p>`;

  const thisYearBirthdayMoment = birthdayMoment.year(now.year()); // 今年的生日
  // 生日相对时间
  let targetDateMoment;
  if (thisYearBirthdayMoment < now) {
    // 生日已过

    // targetDateMoment = thisYearBirthdayMoment.add(1, years);
    // add添加时间会改变原始 moment，所以需要重新生成一份
    targetDateMoment = moment(thisYearBirthdayMoment).add(1, "years");
  } else {
    targetDateMoment = thisYearBirthdayMoment;
  }
  const p4 = `<p>
        你还有
        <strong>${targetDateMoment.diff(now, "days") + 1}</strong>
        天就会迎来你 ${age + 1} 岁的生日
      </p>`;

  const cal = thisYearBirthdayMoment.calendar(null, {
    sameDay: "今天",
    nextDay: "明天",
    nextWeek: "下个 dddd",
    lastDay: "昨天",
    lastWeek: "上个 dddd",
    sameElse: "YYYY年MM月DD日",
  });
  let p5;
  if (thisYearBirthdayMoment < now) {
    // 生日已过
    p5 = `你已在
          <strong>${cal}</strong>
          过了生日`;
  } else {
    p5 = `你将在
          <strong>${cal}</strong>
          迎来你下个生日`;
  }
  $("#birthInfo").html(p1 + p2 + p3 + p4 + p5);
}
// $("#birthInput").on("change", setBirthInfo);
$("#birthInput").on("input", setBirthInfo);

setNow();
setInterval(setNow, 1000);
