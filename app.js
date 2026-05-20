const devices = {

  iphone:{
    width:390,
    height:844,
    rotated:false
  },

  android:{
    width:412,
    height:915,
    rotated:false
  },

  tablet:{
    width:768,
    height:1024,
    rotated:false
  }

};

const PROXY_URL =
"https://YOUR_WORKER.workers.dev/?url=";

function normalizeUrl(url){

  if(
    !url.startsWith("http://") &&
    !url.startsWith("https://")
  ){
    return "https://" + url;
  }

  return url;
}

function proxify(url){

  return PROXY_URL +
  encodeURIComponent(url);
}

function loadAllFrames(){

  let url =
  document.getElementById("urlInput").value.trim();

  if(!url){

    alert("Masukkan URL");

    return;
  }

  url = normalizeUrl(url);

  const proxied =
  proxify(url);

  Object.keys(devices).forEach(id=>{

    document.getElementById(id).src =
    proxied;

  });

}

function rotate(id){

  const frame =
  document.getElementById(id);

  const info =
  document.getElementById(id+"Info");

  const device =
  devices[id];

  device.rotated =
  !device.rotated;

  if(device.rotated){

    frame.width =
    device.height;

    frame.height =
    device.width;

    info.innerText =
    `${device.height} × ${device.width}`;

  }else{

    frame.width =
    device.width;

    frame.height =
    device.height;

    info.innerText =
    `${device.width} × ${device.height}`;
  }

}

function resizeDevice(id,width){

  const frame =
  document.getElementById(id);

  const info =
  document.getElementById(id+"Info");

  frame.width = width;

  info.innerText =
  `${width} × ${frame.height}`;
}

async function captureScreen(){

  const target =
  document.querySelector(".devices-grid");

  const canvas =
  await html2canvas(target);

  const link =
  document.createElement("a");

  link.download =
  "responsive-preview.png";

  link.href =
  canvas.toDataURL();

  link.click();
}

function setPreset(type){

  const presets = {

    iphone:"390px",

    android:"412px",

    tablet:"768px",

    desktop:"1440px"
  };

  document.body.style.maxWidth =
  presets[type];
}
