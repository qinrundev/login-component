export function WxLogin(a) {
  const b = document;
  let c="default";
  a.self_redirect===!0?c="true":a.self_redirect===!1&&(c="false");
  let d=b.createElement("iframe"),e="https://open.weixin.qq.com/connect/qrconnect?appid="+a.appid+"&scope="+a.scope+"&redirect_uri="+a.redirect_uri+"&state="+a.state+"&login_type=jssdk&self_redirect="+c+'&styletype='+(a.styletype || '')+'&sizetype='+(a.sizetype || '')+'&bgcolor='+(a.bgcolor || '')+'&rst='+(a.rst || '');
  e+=a.style?"&style="+a.style:"",e+=a.href?"&href="+a.href:"",d.src=e,d.frameBorder="0",d.allowTransparency="true",d.scrolling="no",d.width="300px",d.height="400px";
  const f=b.getElementById(a.id);
  f.innerHTML="",f.appendChild(d)
}

export function DDLogin(a) {
  var e,
    c = document.createElement('iframe'),
    d = 'https://login.dingtalk.com/login/qrcode.htm?goto=' + a.goto;
  (d += a.style ? '&style=' + encodeURIComponent(a.style) : ''),
    (d += a.href ? '&href=' + a.href : ''),
    (c.src = d),
    (c.frameBorder = '0'),
    (c.allowTransparency = 'true'),
    (c.scrolling = 'no'),
    (c.width = a.width ? a.width + 'px' : '365px'),
    (c.height = a.height ? a.height + 'px' : '400px'),
    (e = document.getElementById(a.id)),
    (e.innerHTML = ''),
    e.appendChild(c);
}

