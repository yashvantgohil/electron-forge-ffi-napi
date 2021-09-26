const ffi = require("ffi-napi");
const path = require("path");
const { dialog } = require("electron");

let math;
const loadLibrary = () => {
  const int = "int";
  math = ffi.Library(path.join(__dirname, "/library/MathLibrary"), {
    sum: [int, [int, int]],
    sumWithBuffer: [int, [int, int, "int *"]],
  });
};

const sumFromLibrary = () => {
  let buf = new Buffer.allocUnsafe(4);
  var total = math.sum(1, 2);
  console.log({ total });
  var result = math.sumWithBuffer(234, 434, buf);
  console.log({ result, buf });
  console.log(buf.readInt32LE());
  console.log("finished..");
  const msg = `sum : ${total} & sumWithBuffer :${result}`;
  dialog.showMessageBox(null, {
    message: msg,
  });
  return msg;
};

module.exports = {
  loadLibrary,
  sumFromLibrary,
};
