import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
// const DATE_FORMAT = 'YYYY-MM-DD';

export function formatUtcString(
  utcString: string,
  fmt: string = DATE_TIME_FORMAT
) {
  return dayjs(utcString).utcOffset(8).format(fmt);
}

// 自定义格式化时间
// export function formatDate2(time: any, fmt: string) {
//   const date = new Date(time);
//   const o = {
//     'M+': date.getMonth() + 1, //月份
//     'd+': date.getDate(), //日
//     'h+': date.getHours(), //小时
//     'm+': date.getMinutes(), //分
//     's+': date.getSeconds(), //秒
//     'q+': Math.floor((date.getMonth() + 3) / 3), //季度
//     S: date.getMilliseconds() //毫秒
//   };
//   if (/(y+)/.test(fmt)) {
//     fmt = fmt.replace(
//       RegExp.$1,
//       (date.getFullYear() + '').substr(4 - RegExp.$1.length)
//     );
//   }
//   for (let k in o) {
//     if (new RegExp('(' + k + ')').test(fmt)) {
//       fmt = fmt.replace(
//         RegExp.$1,
//         RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
//       );
//     }
//   }

//   return fmt;
// }
