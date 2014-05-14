exports.convertBytesToMegabytes = function(bytes) {
  return bytes/1024/1024;
};

exports.convertMegabytesToBytes = function(megabytes) {
  return megabytes*1024*1024;
};
