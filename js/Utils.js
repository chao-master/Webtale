function importScripts(scriptRelative,files){
  if (scriptRelative){
    var regex = /^(?:[a-z]+:)\//i,
        curSrc = document.currentScript.src,
        prefix = curSrc.substring(0,curSrc.lastIndexOf("/")+1);
    files = files.map(function(f){return regex.test(f) ? f : prefix+f;});
  }

  var promises = files.map(function(f){
    return new Promise(function(resolve,reject){
      var s = document.createElement("script");
      s.onload = function(){resolve(f);};
      s.onerror = function(){reject(f);};
      document.currentScript.parentNode.insertBefore(s, document.currentScript);
      s.src = f;
    });
  });
  return Promise.all(promises);
}
