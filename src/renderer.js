const { ipcRenderer } = require("electron");

ipcRenderer.on("get-sum", (_, args) => {
  console.log({ args });
  document.getElementById("result").innerText = args;
});

ipcRenderer.send("get-sum");
