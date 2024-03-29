function setCookie(name,value,days,path,domain,secure) {
  path="/";

  var expires, date;
  if (typeof days == "number") {
    date = new Date();
    date.setTime( date.getTime() + (days*24*60*60*1000) );
		expires = date.toGMTString();
  }
  document.cookie = name + "=" + escape(value) +
    ((expires) ? "; expires=" + expires : "") +
    ((path) ? "; path=" + "/" : "/") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
}


function getCookie(name) {
  var nameq = name + "=";
  var c_ar = document.cookie.split(';'); 
  for (var i=0; i<c_ar.length; i++) {
    var c = c_ar[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameq) == 0) 
      return unescape(decodeURIComponent(c.substring(nameq.length, c.length)));
  }
  return null;
}


function deleteCookie(name) {
  if (getCookie(name)) 
	document.cookie = name+'=; Max-Age=-99999999;';  
}

