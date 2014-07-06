exports.sizeToBytes = function(amount, size) {
  switch(size){
    case 'B': return parseFloat(amount); break;
    case 'KiB': return parseFloat(amount)*1024; break;
    case 'MiB': return parseFloat(amount)*1024*1024; break;
    case 'GiB': return parseFloat(amount)*1024*1024*1024; break;
  }
};

exports.convertBytesToMegabytes = function(bytes) {
  return bytes/1024/1024;
};

exports.convertMegabytesToBytes = function(megabytes) {
  return megabytes*1024*1024;
};
