!(function (c) {
  var t,
    e,
    n,
    o,
    s,
    i =
      '<svg><symbol id="icon-biaoqian" viewBox="0 0 1024 1024"><path d="M788.48 629.418667c0-17.066667-5.802667-31.744-17.749333-44.714667L421.205333 235.861333c-12.288-12.288-29.354667-22.869333-49.834667-31.744-21.162667-8.874667-39.936-12.970667-57.002667-12.970667L110.933333 191.146667c-17.066667 0-31.744 6.485333-44.032 18.773333-12.288 12.288-18.773333 26.965333-18.773333 44.032l0 202.752c0 17.066667 4.096 36.522667 12.970667 57.002667 8.874667 21.162667 18.773333 37.546667 31.744 49.834667l349.525333 349.525333c12.288 12.288 26.965333 17.749333 44.032 17.749333 17.066667 0 31.744-5.802667 44.714667-17.749333l239.616-239.616C781.994667 661.162667 788.48 646.485333 788.48 629.418667L788.48 629.418667 788.48 629.418667zM248.490667 392.192c-12.288 12.288-26.965333 18.090667-44.032 18.090667-17.066667 0-31.744-5.802667-44.032-18.090667-12.288-12.288-18.090667-26.965333-18.090667-44.032 0-17.066667 5.802667-31.744 18.090667-44.032 12.288-12.288 26.965333-18.090667 44.032-18.090667 17.066667 0 31.744 5.802667 44.032 18.090667C260.778667 316.416 266.24 331.093333 266.24 348.16 267.264 365.568 260.778667 379.904 248.490667 392.192L248.490667 392.192 248.490667 392.192zM958.122667 584.362667 608.597333 235.861333c-12.288-12.288-29.354667-22.869333-49.834667-31.744C537.6 195.242667 518.826667 191.146667 501.76 191.146667l-109.909333 0c17.066667 0 36.522667 4.096 57.002667 12.970667 21.162667 8.874667 37.546667 18.773333 49.834667 31.744l349.525333 348.501333c12.288 12.970667 18.090667 27.648 18.090667 44.714667s-5.802667 31.744-18.090667 44.032l-229.034667 229.717333c9.898667 9.898667 18.773333 17.066667 25.941333 21.845333 7.168 4.778667 17.066667 6.485333 28.672 6.485333 17.066667 0 31.744-5.802667 44.714667-18.090667l239.616-240.298667c12.288-12.288 17.749333-26.965333 17.749333-44.032S970.069333 597.674667 958.122667 584.362667L958.122667 584.362667 958.122667 584.362667zM958.122667 584.362667"  ></path></symbol><symbol id="icon-server-host-full" viewBox="0 0 1024 1024"><path d="M768 0H256c-35.3 0-64 28.6-64 64v928c0 17.7 14.3 32 32 32h576c17.7 0 32-14.3 32-32V64c0-35.4-28.7-64-64-64zM546 831.5c-8.4 8.4-20.1 13.7-32.9 13.7H511c-25.7 0-46.6-20.9-46.6-46.6 0-12.9 5.2-24.5 13.7-32.9s20-13.7 32.9-13.7h2.1c25.7 0 46.6 20.9 46.6 46.6-0.1 12.9-5.3 24.5-13.7 32.9zM479.3 672c0-8.8 3.6-16.8 9.4-22.6 5.8-5.8 13.8-9.4 22.6-9.4h1.4c17.7 0 32 14.3 32 32 0 8.8-3.6 16.8-9.4 22.6-5.8 5.8-13.8 9.4-22.6 9.4h-1.4c-17.7 0-32-14.3-32-32z m224.3-112c0 8.8-7.2 16-16 16H335.8c-8.8 0-16-7.2-16-16V400c0-8.8 7.2-16 16-16h351.8c8.8 0 16 7.2 16 16v160z m0-256c0 8.8-7.2 16-16 16H335.8c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h351.8c8.8 0 16 7.2 16 16v32z m0.4-128c0 8.8-7.2 16-16 16H336.2c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16H688c8.8 0 16 7.2 16 16v32z"  ></path><path d="M639.6 452v56c0 2.2-1.8 4-4 4H387.8c-2.2 0-4-1.8-4-4v-56c0-2.2 1.8-4 4-4h247.8c2.2 0 4 1.8 4 4z"  ></path></symbol><symbol id="icon-duankou" viewBox="0 0 1024 1024"><path d="M832 106.666667H192C145.066667 106.666667 106.666667 145.066667 106.666667 192v640c0 46.933333 38.4 85.333333 85.333333 85.333333h640c46.933333 0 85.333333-38.4 85.333333-85.333333V192c0-46.933333-38.4-85.333333-85.333333-85.333333zM277.333333 778.666667c0 17.066667-14.933333 32-32 32s-32-14.933333-32-32v-106.666667c0-17.066667 14.933333-32 32-32s32 14.933333 32 32v106.666667z m128 0c0 17.066667-14.933333 32-32 32s-32-14.933333-32-32v-106.666667c0-17.066667 14.933333-32 32-32s32 14.933333 32 32v106.666667z m128 0c0 17.066667-14.933333 32-32 32s-32-14.933333-32-32v-106.666667c0-17.066667 14.933333-32 32-32s32 14.933333 32 32v106.666667z m128 0c0 17.066667-14.933333 32-32 32s-32-14.933333-32-32v-106.666667c0-17.066667 14.933333-32 32-32s32 14.933333 32 32v106.666667z m128 0c0 17.066667-14.933333 32-32 32s-32-14.933333-32-32v-106.666667c0-17.066667 14.933333-32 32-32s32 14.933333 32 32v106.666667zM810.666667 426.666667c0 23.466667-19.2 42.666667-42.666667 42.666666h-85.333333c-23.466667 0-42.666667-19.2-42.666667-42.666666v-42.666667c0-23.466667-19.2-42.666667-42.666667-42.666667h-170.666666c-23.466667 0-42.666667 19.2-42.666667 42.666667v42.666667c0 23.466667-19.2 42.666667-42.666667 42.666666h-85.333333c-23.466667 0-42.666667-19.2-42.666667-42.666666v-170.666667c0-23.466667 19.2-42.666667 42.666667-42.666667h512c23.466667 0 42.666667 19.2 42.666667 42.666667v170.666667z"  ></path></symbol><symbol id="icon-jiaohuanji" viewBox="0 0 1024 1024"><path d="M288 746.666667c-17.066667 0-32 14.933333-32 32V853.333333H138.666667c-17.066667 0-32 14.933333-32 32S121.6 917.333333 138.666667 917.333333h149.333333c17.066667 0 32-14.933333 32-32v-106.666666c0-17.066667-14.933333-32-32-32zM437.333333 277.333333c17.066667 0 32-14.933333 32-32v-106.666666c0-17.066667-14.933333-32-32-32S405.333333 121.6 405.333333 138.666667v106.666666c0 17.066667 14.933333 32 32 32zM586.666667 277.333333c17.066667 0 32-14.933333 32-32v-106.666666c0-17.066667-14.933333-32-32-32S554.666667 121.6 554.666667 138.666667v106.666666c0 17.066667 14.933333 32 32 32zM586.666667 746.666667c-17.066667 0-32 14.933333-32 32v106.666666c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-106.666666c0-17.066667-14.933333-32-32-32zM885.333333 853.333333H768v-74.666666c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v106.666666c0 17.066667 14.933333 32 32 32h149.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM832 341.333333H192c-46.933333 0-85.333333 38.4-85.333333 85.333334v170.666666c0 46.933333 38.4 85.333333 85.333333 85.333334h640c46.933333 0 85.333333-38.4 85.333333-85.333334v-170.666666c0-46.933333-38.4-85.333333-85.333333-85.333334zM245.333333 597.333333c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32 32 14.933333 32 32-14.933333 32-32 32z m0-106.666666c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32 32 14.933333 32 32-14.933333 32-32 32z m106.666667 106.666666c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32 32 14.933333 32 32-14.933333 32-32 32z m0-106.666666c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32 32 14.933333 32 32-14.933333 32-32 32zM437.333333 746.666667c-17.066667 0-32 14.933333-32 32v106.666666c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-106.666666c0-17.066667-14.933333-32-32-32z"  ></path></symbol><symbol id="icon-kongzhiqi" viewBox="0 0 1024 1024"><path d="M832 106.666667H192C145.066667 106.666667 106.666667 145.066667 106.666667 192v640c0 46.933333 38.4 85.333333 85.333333 85.333333h640c46.933333 0 85.333333-38.4 85.333333-85.333333V192c0-46.933333-38.4-85.333333-85.333333-85.333333zM202.666667 277.333333H405.333333v64H202.666667c-17.066667 0-32-14.933333-32-32S185.6 277.333333 202.666667 277.333333z m0 213.333334H256v64H202.666667c-17.066667 0-32-14.933333-32-32S185.6 490.666667 202.666667 490.666667zM533.333333 768H202.666667c-17.066667 0-32-14.933333-32-32S185.6 704 202.666667 704H533.333333v64z m288 0H704c0 23.466667-19.2 42.666667-42.666667 42.666667h-21.333333c-23.466667 0-42.666667-19.2-42.666667-42.666667v-64c0-23.466667 19.2-42.666667 42.666667-42.666667h21.333333c23.466667 0 42.666667 19.2 42.666667 42.666667h117.333333c17.066667 0 32 14.933333 32 32s-14.933333 32-32 32z m0-213.333333H426.666667c0 23.466667-19.2 42.666667-42.666667 42.666666h-21.333333c-23.466667 0-42.666667-19.2-42.666667-42.666666v-64c0-23.466667 19.2-42.666667 42.666667-42.666667h21.333333c23.466667 0 42.666667 19.2 42.666667 42.666667h394.666666c17.066667 0 32 14.933333 32 32s-14.933333 32-32 32z m0-213.333334H576c0 23.466667-19.2 42.666667-42.666667 42.666667h-21.333333c-23.466667 0-42.666667-19.2-42.666667-42.666667v-64c0-23.466667 19.2-42.666667 42.666667-42.666666h21.333333c23.466667 0 42.666667 19.2 42.666667 42.666666h245.333333c17.066667 0 32 14.933333 32 32s-14.933333 32-32 32z"  ></path></symbol></svg>',
    v = (v = document.getElementsByTagName("script"))[
      v.length - 1
    ].getAttribute("data-injectcss"),
    h = function (c, t) {
      t.parentNode.insertBefore(c, t);
    };
  if (v && !c.__iconfont__svg__cssinject__) {
    c.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
      );
    } catch (c) {
      console && console.log(c);
    }
  }
  function d() {
    s || ((s = !0), n());
  }
  function l() {
    try {
      o.documentElement.doScroll("left");
    } catch (c) {
      return void setTimeout(l, 50);
    }
    d();
  }
  (t = function () {
    var c,
      t = document.createElement("div");
    (t.innerHTML = i),
      (i = null),
      (t = t.getElementsByTagName("svg")[0]) &&
        (t.setAttribute("aria-hidden", "true"),
        (t.style.position = "absolute"),
        (t.style.width = 0),
        (t.style.height = 0),
        (t.style.overflow = "hidden"),
        (t = t),
        (c = document.body).firstChild ? h(t, c.firstChild) : c.appendChild(t));
  }),
    document.addEventListener
      ? ~["complete", "loaded", "interactive"].indexOf(document.readyState)
        ? setTimeout(t, 0)
        : ((e = function () {
            document.removeEventListener("DOMContentLoaded", e, !1), t();
          }),
          document.addEventListener("DOMContentLoaded", e, !1))
      : document.attachEvent &&
        ((n = t),
        (o = c.document),
        (s = !1),
        l(),
        (o.onreadystatechange = function () {
          "complete" == o.readyState && ((o.onreadystatechange = null), d());
        }));
})(window);
