$(document).ready(function () {
  //init
  M.AutoInit();
});

$(document).ajaxStop(function () {
  // alert('load finished');
  console.log(`load finished`);
});

function playAudio(audioId) {
  const audioList = ['audio1', 'audio2', 'audio3'];
  const index = audioList.indexOf(audioId);

  audioList.splice(index, 1);

  audioList.forEach(function (id) {
    document.getElementById(id).pause();
    document.getElementById(id).currentTime = 0;
  });
  const audio = document.getElementById(audioId);
  audio.paused ? audio.play() : audio.pause();
}
