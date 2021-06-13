const todayclock = document.querySelector(".js-todayclock");
const clock = document.querySelector(".js-clock");

function getTime() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let hours = String(today.getHours()).padStart(2, "0");
  let minutes = String(today.getMinutes()).padStart(2, "0");

  today = mm + "/" + dd + "/" + hours + "/" + minutes;
  clock.innerText = `오늘은 ${today}`;

  let end = new Date();
  end.setHours(23, 59, 59, 999);
  let time = new Date().getTime();
  let elapse = end - time;

  let hour = Math.floor((elapse % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  let minute = Math.floor(
    ((elapse % (24 * 60 * 60 * 1000)) % (60 * 60 * 1000)) / (60 * 1000)
  );
  let second = Math.floor(
    (((elapse % (24 * 60 * 60 * 1000)) % (60 * 60 * 1000)) % (60 * 1000)) / 1000
  );

  todayclock.innerText = `오늘 남은 시간 ! ${hour}시간, ${minute}분, ${second}초`;
}

function init() {
  setInterval(getTime, 1000);
}
init();
