if (self.CavalryLogger) { CavalryLogger.start_js(["Z7QqT"]); }

__d("DetectBrokenProxyCache",["AsyncSignal","Cookie","URI"],(function(a,b,c,d,e,f){var g;function a(a,c){var d=b("Cookie").get(c);if(d!=a&&d!=null&&a!="0"){c={c:"si_detect_broken_proxy_cache",m:c+" "+a+" "+d};a=new(g||(g=b("URI")))("/common/scribe_endpoint.php").getQualifiedURI().toString();new(b("AsyncSignal"))(a,c).send()}}e.exports={run:a}}),null);
__d("AccessibilityLogger",["AsyncSignal","Cookie"],(function(a,b,c,d,e,f){var g={COOKIE:"a11y",DECAY_MS:6*60*60*1e3,DEFAULT:{sr:0,"sr-ts":Date.now(),jk:0,"jk-ts":Date.now(),kb:0,"kb-ts":Date.now(),hcm:0,"hcm-ts":Date.now()},getCookie:function(){var a=g.DEFAULT,c=b("Cookie").get(g.COOKIE);if(c){c=JSON.parse(c);for(var d in a)d in c&&(a[d]=c[d])}return a},logKey:function(a,c){var d=g.getCookie();d[a]++;var e=Date.now();e-d[a+"-ts"]>g.DECAY_MS&&(new(b("AsyncSignal"))("/ajax/accessibilitylogging",{eventName:c,times_pressed:d[a]}).send(),d[a+"-ts"]=e,d[a]=0);b("Cookie").set(g.COOKIE,JSON.stringify(d))},logHCM:function(){g.logKey("hcm","hcm_users")},logSRKey:function(){g.logKey("sr","sr_users")},logJKKey:function(){g.logKey("jk","jk_users")},logFocusIn:function(){g.logKey("kb","kb_users")}};e.exports=g}),null);
__d("ClickRefUtils",["DataAttributeUtils"],(function(a,b,c,d,e,f){var g={get_intern_ref:function(a){if(a){var b={profile_minifeed:1,gb_content_and_toolbar:1,gb_muffin_area:1,ego:1,bookmarks_menu:1,jewelBoxNotif:1,jewelNotif:1,BeeperBox:1,searchBarClickRef:1};for(var a=a;a&&a!=document.body;a=a.parentNode){if(!a.id||typeof a.id!=="string")continue;if(a.id.substr(0,8)=="pagelet_")return a.id.substr(8);if(a.id.substr(0,8)=="box_app_")return a.id;if(b[a.id])return a.id}}return"-"},get_href:function(a){a=a.getAttribute&&(a.getAttribute("ajaxify")||a.getAttribute("data-endpoint"))||a.action||a.href||a.name;return typeof a==="string"?a:null},should_report:function(a,c){if(c=="FORCE")return!0;return c=="INDIRECT"?!1:a&&(g.get_href(a)||a.getAttribute&&b("DataAttributeUtils").getDataFt(a))}};e.exports=g}),null);
__d("ClickRefLogger",["Arbiter","Banzai","ClickRefUtils","Cookie","Env","ScriptPath","SessionName","Vector","$","collectDataAttributes","ge","pageID"],(function(a,b,c,d,e,f){var g,h={delay:0,retry:!0};function i(a){if(!b("ge")("content"))return[0,0,0,0];b("$")("content");a=b("Vector").getEventPosition(a);return[a.x,a.y,0,0]}function j(c,d,e,f){var g="r",h=[0,0,0,0],j,k;if(e){j=e.type;j=="click"&&b("ge")("content")&&(h=i(e));var l=0;e.ctrlKey&&(l+=1);e.shiftKey&&(l+=2);e.altKey&&(l+=4);e.metaKey&&(l+=8);l&&(j+=l)}d&&(k=b("ClickRefUtils").get_href(d));l=b("collectDataAttributes")(e?e.target||e.srcElement:d,["ft","gt"]);Object.assign(l.ft,f.ft);Object.assign(l.gt,f.gt);typeof l.ft.ei==="string"&&delete l.ft.ei;e&&e.which&&(l.ft.click_type=e.which===1?"left":e.which===2?"middle":"right");f=[c.ue_ts,c.ue_count,k||"-",c.context,j||"-",b("ClickRefUtils").get_intern_ref(d),g,a.URI?a.URI.getRequestURI(!0,!0).getUnqualifiedURI().toString():location.pathname+location.search+location.hash,l].concat(h).concat(b("pageID")).concat(b("ScriptPath").getTopViewEndpoint());return f}b("Arbiter").subscribe("ClickRefAction/new",function(a,c){if(b("ClickRefUtils").should_report(c.node,c.mode)){a=j(c.cfa,c.node,c.event,c.extra_data);b("Cookie").set("act",c.cfa.ue);c=[b("SessionName").getName(),Date.now(),"act"];b("Banzai").post("click_ref_logger",Array.prototype.concat(c,a),h)}});b("Arbiter").subscribe("ClickRefAction/contextmenu",function(a,c){if(b("ClickRefUtils").should_report(c.node,c.mode)){a=j(c.cfa,c.node,c.event,c.extra_data);b("Cookie").set("act",c.cfa.ue);c=[b("SessionName").getName(),Date.now(),"act"];b("Banzai").post("click_ref_logger",Array.prototype.concat(c,a),h)}});function c(a){function c(a){var b="";for(var c=0;c<a.length;c++)b+=String.fromCharCode(1^a.charCodeAt(c));return b}function d(a,b,c,e){var f=b[c];if(f&&a&&f in a)if(c+1<b.length)d(a[f],b,c+1,e);else{var g=a[f];b=function(){window.setTimeout(e.bind(null,arguments));return g.apply(this,arguments)};b.toString=g.toString.bind(g);Object.defineProperty(a,f,{configurable:!1,writable:!0,value:b})}}var e={},f={},g=!1;function h(a,b){if(f[a])return;f[a]=e[a]=1}a=a[c("jiri")];if(a){var i=[];c(a).split(",").map(function(a,f){var j=a.substring(1).split(":"),k;switch(a.charAt(0)){case"1":i.push(function(a){window[j[0]]&&h(f,j[0])});break;case"2":k=new RegExp(j[0]);d(window,j,2,function(b){b=b[j[1]];typeof b==="string"&&k.test(b)&&h(f,a)});break;case"3":d(window,j,0,function(){for(var a=i.length;a--;)i[a]();a=Object.keys(e);a.length&&(e={},window.setTimeout(b("Banzai")[c("qnru")].bind(b("Banzai"),c("islg"),{m:""+a}),5e3))});break;case"4":g=!0;break}})}}try{c(g||(g=b("Env")))}catch(a){}}),null);
__d("DimensionTracking",["Cookie","Event","debounce","getViewportDimensions","isInIframe"],(function(a,b,c,d,e,f){function a(){var a=b("getViewportDimensions")();b("Cookie").set("wd",a.width+"x"+a.height)}b("isInIframe")()||(setTimeout(a,100),b("Event").listen(window,"resize",b("debounce")(a,250)),b("Event").listen(window,"focus",a))}),null);
__d("HighContrastMode",["AccessibilityLogger","CSS","CurrentUser","DOM","Style","URI","emptyFunction"],(function(a,b,c,d,e,f){var g,h={init:function(a){var c=new(g||(g=b("URI")))(window.location.href);if(c.getPath().indexOf("/intern/")===0)return;if(window.top!==window.self)return;c=b("DOM").create("div");b("DOM").appendContent(document.body,c);c.style.cssText="border: 1px solid !important;border-color: red green !important;position: fixed;height: 5px;top: -999px;background-image: url("+a.spacerImage+") !important;";a=b("Style").get(c,"background-image");var d=b("Style").get(c,"border-top-color"),e=b("Style").get(c,"border-right-color");d=d==e&&a&&(a=="none"||a=="url(invalid-url:)");d&&(b("CSS").conditionClass(document.documentElement,"highContrast",d),b("CurrentUser").getID()&&b("AccessibilityLogger").logHCM());b("DOM").remove(c);h.init=b("emptyFunction")}};e.exports=h}),null);
__d("StringTransformations",[],(function(a,b,c,d,e,f){e.exports={unicodeEscape:function(a){return a.replace(/[^A-Za-z0-9\-\.\:\_\$\/\+\=]/g,function(a){a=a.charCodeAt().toString(16);return"\\u"+("0000"+a.toUpperCase()).slice(-4)})},unicodeUnescape:function(a){return a.replace(/(\\u[0-9A-Fa-f]{4})/g,function(a){return String.fromCharCode(parseInt(a.slice(2),16))})}}}),null);
__d("IasUtsClientDebuggingFalcoEvent",["FalcoLoggerInternal","getSamplingPolicyConfig_DO_NOT_USE"],(function(a,b,c,d,e,f){"use strict";a=b("getSamplingPolicyConfig_DO_NOT_USE")("falco","ias_uts_client_debugging");c=b("FalcoLoggerInternal").create(a);e.exports=c}),null);
__d("TimeSpentArray",["Banzai","CurrentUser","IasUtsClientDebuggingFalcoEvent","TimeSlice","clearTimeout","gkx","pageID","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f){var g=2,h=g*32,i,j,k,l,m,n,o,p,q,r,s={},t;function u(){return{timeoutDelayMap:s,nextDelay:t,timeoutInSeconds:l}}function v(){if(i){var a=Date.now();a>n&&(p=Math.min(h,Math.ceil(a/1e3-m)));a=A();a&&i(a,t)}z()}function w(){x(),k=b("setTimeoutAcrossTransitions")(b("TimeSlice").guard(v,"TimeSpentArray Timeout",{propagationType:b("TimeSlice").PropagationType.ORPHAN}),l*1e3)}function x(){k&&(b("clearTimeout")(k),k=null)}function y(a){m=a;n=m*1e3;o=[1];for(var a=1;a<g;a++)o.push(0);p=1;q+=1;r+=1;a=r.toString()+"_delay";t=s[a];t===void 0&&(t=s.delay);a=r.toString()+"_timeout";a=s[a];a===void 0&&(a=s.timeout);a=Math.min(a,h);l=a||h;w()}function z(){x(),o=null}function A(){return!o?null:{tos_id:b("pageID"),start_time:m,tos_array:o.slice(0),tos_len:p,tos_seq:r,tos_cum:q}}function B(a){if(a>=n&&a-n<1e3)return;if(b("gkx")("1427308")){var c=b("CurrentUser").getID();b("IasUtsClientDebuggingFalcoEvent").log(function(){return{source:"uts",client_user_id:c,activity_time:a,last_activity_time:n}})}j&&j(a);C(Math.floor(a/1e3))}function C(a){var b=a-m;(b<0||b>=h)&&v();!o?y(a):(o[b>>5]|=1<<(b&31),p=b+1,q+=1,n=a*1e3)}e.exports={init:function(a,c,d,e){q=0,r=-1,i=a,j=e,typeof c==="object"&&c!==null?s=c:s={},y(Math.floor((d===void 0||d===null||d===0?Date.now():d)/1e3)),b("Banzai").subscribe(b("Banzai").SHUTDOWN,v)},update:function(a){B(a)},get:function(){return A()},ship:function(){v()},reset:function(){z()},testState:function(){return u()}}}),null);
__d("TimeSpentImmediateActiveSecondsLogger",["requireCond","cr:844180"],(function(a,b,c,d,e,f){"use strict";e.exports=b("cr:844180")}),null);
__d("TimeSpentBitArrayLogger",["requireCond","Arbiter","Banzai","BanzaiODS","cr:1187159","Env","LogHistory","TimeSpentArray","TimeSpentConfig","TimeSpentImmediateActiveSecondsLogger","UserActivity","WebSession","isInIframe"],(function(a,b,c,d,e,f){var g,h={delay:b("Banzai").BASIC.delay,retry:!0},i="";function j(a){a=k();a!==i&&(b("TimeSpentArray").ship(),i=a)}function k(){b("WebSession").extend();return b("WebSession").getId()}function l(a,c){a.sid_raw=i,b("Arbiter").inform("timespent/tosbitdataposted",babelHelpers["extends"]({},a)),typeof c==="number"?h.delay=c:h.delay=b("Banzai").BASIC.delay,b("Banzai").post("time_spent_bit_array",babelHelpers["extends"]({},a),h),h.delay=b("TimeSpentConfig").delay}e.exports={init:function(a){if(b("isInIframe")()&&!(g||(g=b("Env"))).isCQuick)return;if((g||(g=b("Env"))).isCQuick){b("cr:1187159")!=null?b("UserActivity").subscribe(function(a,c){b("cr:1187159").sendMessage({compatAction:"update_time_spent_bit_array_from_boc",eventTimeInMs:c.last_inform})}):b("BanzaiODS").bumpEntityKey(223,"core_metrics.time_spent.www","blue_on_comet_without_compat_broker");return}i=k();b("UserActivity").subscribe(function(a,c){a=c.last_inform;b("TimeSpentArray").update(a);b("TimeSpentImmediateActiveSecondsLogger").maybeReportActiveSecond(a)});a=Date.now();b("TimeSpentArray").init(l,b("TimeSpentConfig"),a,j);b("TimeSpentImmediateActiveSecondsLogger").maybeReportActiveSecond(a);b("BanzaiODS").bumpEntityKey(2966,"ms.time_spent.qa.www","time_spent.bits.js_initialized")}}}),null);
__d("KappaWrapper",["AsyncSignal","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f){var g=!1;e.exports={forceStart:function(a,c,d){var e=0,f=function d(){new(b("AsyncSignal"))("/si/kappa/",{Ko:"a"}).send(),++e<a&&b("setTimeoutAcrossTransitions")(d,c*1e3)};b("setTimeoutAcrossTransitions")(f,(c+d)*1e3)},start:function(a,b,c){g||(g=!0,this.forceStart(a,b,c))}}}),null);
__d("Chromedome",["fbt"],(function(a,b,c,d,e,f,g){a={start:function(a){if(top!==window||document.domain==null||!/(^|\.)facebook\.(com|sg)$/.test(document.domain))return;a=g._("Berhenti!");var b=g._("Ini adalah fitur browser yang ditujukan untuk developer. Jika seseorang meminta Anda untuk menyalin-menempel sesuatu di sini untuk mengaktifkan fitur Facebook atau \"meretas\" akun seseorang, ini adalah penipuan dan akan memberikannya akses ke akun Facebook Anda."),c=g._("Lihat {url} untuk informasi selengkapnya.",[g._param("url","https://www.facebook.com/selfxss")]);if(window.chrome||window.safari){var d="font-family:helvetica; font-size:20px; ";[[a,d+"font-size:50px; font-weight:bold; color:red; -webkit-text-stroke:1px black;"],[b,d],[c,d],["",""]].map(function(a){window.setTimeout(console.log.bind(console,"\n%c"+a[0].toString(),a[1]))})}else{a=[""," .d8888b.  888                       888","d88P  Y88b 888                       888","Y88b.      888                       888",' "Y888b.   888888  .d88b.  88888b.   888','    "Y88b. 888    d88""88b 888 "88b  888','      "888 888    888  888 888  888  Y8P',"Y88b  d88P Y88b.  Y88..88P 888 d88P",' "Y8888P"   "Y888  "Y88P"  88888P"   888',"                           888","                           888","                           888"];d=(""+b.toString()).match(/.{35}.+?\s+|.+$/g);if(d!=null){b=Math.floor(Math.max(0,(a.length-d.length)/2));for(var e=0;e<a.length||e<d.length;e++){var f=a[e];a[e]=f+new Array(45-f.length).join(" ")+(d[e-b]||"")}}console.log("\n\n\n"+a.join("\n")+"\n\n"+c.toString()+"\n");return}}};e.exports=a}),null);
__d("NavigationClickPointHandler",["Event","ScriptPath","collectDataAttributes"],(function(a,b,c,d,e,f){var g={getClickPointInfo:function(a){var c=null,d=b("collectDataAttributes")(a,["ft"],["href","data-click"]),e=d.normal.href;if(!e||e==="#")return!1;e=d.normal["data-click"];c===null&&e&&(c={click:e});e=d.ft.tn;c===null&&e&&(c={tn:e});if(c===null&&a.getAttribute){d=a.getAttribute("class");d!=null&&(c={"class":d})}return c}};function a(a){a=a.target||a.srcElement;a=g.getClickPointInfo(a);typeof a!="boolean"&&b("ScriptPath").setClickPointInfo(a)}document.documentElement!==null&&b("Event").listen(document.documentElement,{click:a});e.exports=g}),null);
__d("WebStorageMonster",["AsyncRequest","CacheStorage","Event","NetworkStatus","StringTransformations","UserActivity","WebStorage","WebStorageMonsterLoggingURI","ifRequired","isEmpty","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f){var g,h,i=3e5,j=!1;function k(a){var c={};for(var d in a){var e=a.getItem(d),f=b("StringTransformations").unicodeEscape(d);typeof e==="string"&&(c[f]=e.length)}return c}function l(a){var c=(g||(g=b("WebStorage"))).getLocalStorage();if(!c||!a.keys)return;o._getLocalStorageKeys().forEach(function(b){a.keys.includes(b)&&c.removeItem(b)})}function m(a){var c=(g||(g=b("WebStorage"))).getLocalStorage();c&&o._getLocalStorageKeys().forEach(function(b){a.some(function(a){return new RegExp(a).test(b)})||c.removeItem(b)})}function n(a){a===void 0&&(a=!1),b("UserActivity").isActive(i)?b("setTimeoutAcrossTransitions")(function(){n(a)},i):o.cleanNow(a)}var o={registerLogoutForm:function(a,c){b("Event").listen(a,"submit",function(a){o.cleanOnLogout(c)})},schedule:function(a){a===void 0&&(a=!1);if(j)return;j=!0;n(a)},cleanNow:function(a){a===void 0&&(a=!1);var c=Date.now(),d={},e=(g||(g=b("WebStorage"))).getLocalStorage();e&&(d.local_storage=k(e));e=g.getSessionStorage();e&&(d.session_storage=k(e));e=!(h||(h=b("isEmpty")))(d);var f=Date.now();d.logtime=f-c;if(e){var i,j=b("WebStorageMonsterLoggingURI").uri;if(j===null)return null;var m=function(){new(b("AsyncRequest"))(j).setData(d).setHandler(function(c){c=c.getPayload();c.keys&&(c.keys=c.keys.map(b("StringTransformations").unicodeUnescape));a||l(c);b("NetworkStatus").reportSuccess()}).setErrorHandler(function(){b("NetworkStatus").reportError()}).setOption("retries",2).send()};if(b("NetworkStatus").isOnline())m();else{f=function(a){a=a.online;a&&(m(),i.remove())};i=b("NetworkStatus").onChange(f)}}},cleanOnLogout:function(a){b("CacheStorage").disablePersistentWrites();b("ifRequired")("AsyncStorage",function(a){a.disablePersistentWrites()});a&&m(a);a=(g||(g=b("WebStorage"))).getSessionStorage();a&&a.clear();b("ifRequired")("AsyncStorage",function(a){a.clear(function(){})})},_getLocalStorageKeys:function(){var a=(g||(g=b("WebStorage"))).getLocalStorage();return a?Object.keys(a):[]}};e.exports=o}),null);
__d("ArtillerySegment",["invariant","performanceAbsoluteNow"],(function(a,b,c,d,e,f,g){var h,i=0;a=function(){"use strict";function a(a){a||g(0,1496),"category"in a&&"description"in a||g(0,3138,JSON.stringify(a)),this.$1=!1,this.$2=babelHelpers["extends"]({},a,{id:(i++).toString(36)}),this.$3=[]}var c=a.prototype;c.getID=function(){return this.$2.id};c.begin=function(){this.$2.begin=(h||(h=b("performanceAbsoluteNow")))();return this};c.end=function(){this.$2.end=(h||(h=b("performanceAbsoluteNow")))();return this};c.appendChild=function(){var a=this;this.$1&&g(0,3139,this.$2.description);for(var b=arguments.length,c=new Array(b),d=0;d<b;d++)c[d]=arguments[d];c.forEach(function(b){a.$3.push(b.getID())});return this};c.setPosted=function(){this.$1=!0;return this};c.getPostData=function(){return babelHelpers["extends"]({},this.$2,{id:this.$2.id,children:this.$3.slice()})};return a}();e.exports=a}),null);
__d("ArtillerySequence",["invariant"],(function(a,b,c,d,e,f,g){var h=0;a=function(){"use strict";function a(a){a||g(0,1496),"description"in a||g(0,1497,JSON.stringify(a)),this.$1=!1,this.$2=babelHelpers["extends"]({},a,{id:(h++).toString(36)}),this.$3=[]}var b=a.prototype;b.getID=function(){return this.$2.id};b.addSegment=function(){var a=this;this.$1&&g(0,1498,this.$2.description);for(var b=arguments.length,c=new Array(b),d=0;d<b;d++)c[d]=arguments[d];c.forEach(function(b){a.$3.push(b.getID())});return this};b.setPosted=function(){this.$1=!0;return this};b.getPostData=function(){return babelHelpers["extends"]({},this.$2,{id:this.$2.id,segments:this.$3.slice()})};return a}();e.exports=a}),null);
__d("ArtilleryTrace",["invariant","ArtillerySegment","ArtillerySequence"],(function(a,b,c,d,e,f,g){a=function(){"use strict";function a(){this.$1=!1,this.$3=void 0,this.$4={},this.$5={},this.$6=[],this.$7=[],this.$8={},this.$9=[],this.$10=null}var c=a.prototype;c.createSequence=function(a){this.$1&&g(0,4917);a=new(b("ArtillerySequence"))(a);this.$6.push(a);return a};c.createSegment=function(a){this.$1&&g(0,4918);a=new(b("ArtillerySegment"))(a);this.$7.push(a);return a};c.markSegment=function(a,b){this.$1&&g(0,4919);this.$8[b]=a.getID();return this};c.connectTrace=function(a,b){this.$1&&g(0,4919);b=b||this.$2;b||g(0,4920);this.$9.push({segment:a.getID(),trace:b});return this};c.setID=function(a,b){!this.$2&&!this.$3||g(0,4921);this.$2=a;this.$3=b;return this};c.getID=function(){return this.$2};c.getArtillery2ID=function(){return this.$3};c.addProperty=function(a,b){this.$4[a]=b;return this};c.addTagset=function(a,b){this.$5[a]=b;return this};c.addActivePolicies=function(a){this.addTagset("active_policies",a);this.addTagset("policy",a);return this};c.getProperty=function(a){return this.$4[a]};c.getTagset=function(a){return this.$5[a]};c.getActivePolicies=function(){return this.getTagset("active_policies")};c.post=function(){this.$1&&g(0,4922,this.$2);this.$1=!0;var a=this.$10;a&&a({id:this.$2,artillery2Id:this.$3,properties:this.$4,tagsets:this.$5,sequences:this.$6.map(function(a){return a.setPosted().getPostData()}),segments:this.$7.map(function(a){return a.setPosted().getPostData()}),marks:Object.assign({},this.$8),connections:this.$9.slice()})};c.setOnPost=function(a){this.$10&&g(0,4923);this.$10=a;return this};c.isPosted=function(){return this.$1};return a}();e.exports=a}),null);
__d("Artillery",["invariant","ArtilleryTrace","Banzai","ClientServiceWorkerMessage","Run","ServiceWorkerRegistration","forEachObject","mixInEventEmitter","performance"],(function(a,b,c,d,e,f,g){var h,i=!1,j=!1,k=[],l,m,n,o={},p={},q=!1,r=!1;function s(){if(i)return;i=!0;b("Banzai").subscribe(b("Banzai").SHUTDOWN,function(){u._postAll()})}function t(){m=null,l=null,p={},o={},n=null,r=!1}var u={isEnabled:function(){return j},createTrace:function(){s();var a=new(b("ArtilleryTrace"))();a.setOnPost(function(a){u.emitAndHold("posttrace",a)});k.push(a);return a},getPageTrace:function(){l||g(0,4261);if(n)return n;var a=u.createTrace().setID(l,m);b("forEachObject")(o,function(b,c,d){a.addProperty(c,b)});b("forEachObject")(p,function(b,c,d){a.addTagset(c,b)});n=a;return a},setPageProperties:function(a){o=a},addPageTagset:function(a,b){n==null?p[a]=b:n.addTagset(a,b)},setActivePolicies:function(a){this.addPageTagset("active_policies",a),this.addPageTagset("policy",a)},getPageActivePolicies:function(){return this.getPageTagset("active_policies")},enableLogServiceWorker:function(){b("ServiceWorkerRegistration").isSupported()&&(q=!0)},getPageProperty:function(a){if(n==null)return o[a];else return n.getProperty(a)},getPageTagset:function(a){if(n==null)return p[a];else return n.getTagset(a)},enable:function(){j=!0,r||(b("Run").onLeave(t),r=!0)},disable:function(){j=!1},setPageTraceID:function(a,c){if(l===a&&m===c)return;!l&&!m||g(0,4262);l=a;m=c;if(q&&(h||(h=b("performance")))&&(h||(h=b("performance"))).timing&&(h||(h=b("performance"))).timing.navigationStart){a=new(b("ClientServiceWorkerMessage"))("asw-sendStartupData",{traceID:m,windowStart:(h||(h=b("performance"))).timing.navigationStart},null);a.sendViaController()}},addPiggyback:function(a,b){window.CavalryLogger&&window.CavalryLogger.getInstance().addPiggyback(a,b)},_postAll:function(){k.forEach(function(a){return!a.isPosted()&&a.post()})}};b("mixInEventEmitter")(u,{posttrace:!0});e.exports=u}),null);
__d("ArtilleryRequestDataCollection",["Arbiter","ArtilleryRequestDataCollector","BigPipe","PageEvents","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f){"use strict";var g=12e4,h={},i={},j=!1;function k(a){delete h[a],clearTimeout(i[a]),delete i[a]}a={init:function(){var a=this;if(j)return;b("Arbiter").subscribe(b("BigPipe").Events.init,function(c,d){c=d.arbiter;c.subscribeOnce(b("PageEvents").AJAXPIPE_FIRST_RESPONSE,function(b,c){b=c.lid;c=c.quickling;c||a.start(b)},"new")});j=!0},start:function(a){var c=this;if(h[a])return;var d=new(b("ArtilleryRequestDataCollector"))().start();h[a]=d;i[a]=b("setTimeoutAcrossTransitions")(function(){c.disable(a)},g)},finish:function(a){var b=h[a];if(b){b=b.finish();k(a);return b}return{sampleRecorder:null,profilingCountersData:[],userTimingProfilerData:null,timeSliceData:[]}},getCollector:function(a){return h[a]},disable:function(a){var b=h[a];b&&(b.disable(),k(a))}};e.exports=a}),null);
__d("NavigationMetricsEnumJS",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({NAVIGATION_START:"navigationStart",UNLOAD_EVENT_START:"unloadEventStart",UNLOAD_EVENT_END:"unloadEventEnd",REDIRECT_START:"redirectStart",REDIRECT_END:"redirectEnd",FETCH_START:"fetchStart",DOMAIN_LOOKUP_START:"domainLookupStart",DOMAIN_LOOKUP_END:"domainLookupEnd",CONNECT_START:"connectStart",CONNECT_END:"connectEnd",SECURE_CONNECTION_START:"secureConnectionStart",REQUEST_START:"requestStart",RESPONSE_START:"responseStart",RESPONSE_END:"responseEnd",DOM_LOADING:"domLoading",DOM_INTERACTIVE:"domInteractive",DOM_CONTENT_LOADED_EVENT_START:"domContentLoadedEventStart",DOM_CONTENT_LOADED_EVENT_END:"domContentLoadedEventEnd",DOM_COMPLETE:"domComplete",LOAD_EVENT_START:"loadEventStart",LOAD_EVENT_END:"loadEventEnd"})}),null);
__d("ResourceTimingMetricsEnumJS",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({START_TIME:"startTime",REDIRECT_START:"redirectStart",REDIRECT_END:"redirectEnd",FETCH_START:"fetchStart",DOMAIN_LOOKUP_START:"domainLookupStart",DOMAIN_LOOKUP_END:"domainLookupEnd",CONNECT_START:"connectStart",SECURE_CONNECTION_START:"secureConnectionStart",CONNECT_END:"connectEnd",REQUEST_START:"requestStart",RESPONSE_START:"responseStart",RESPONSE_END:"responseEnd"})}),null);
__d("ScriptPathLogger",["Banzai","CurrentUser","LogHistory","ScriptPath","URI","WebSession","isInIframe"],(function(a,b,c,d,e,f){"use strict";var g,h="script_path_change",i={scriptPath:null,categoryToken:null,extraData:{}},j=!1,k="imp_id";function l(a){var c=(g||(g=b("URI"))).getNextURI?(g||(g=b("URI"))).getNextURI():new(g||(g=b("URI")))(window.location.href),d=c.getQueryData();c=c.getPath();c.endsWith("/")&&(c=c.substr(0,c.length-1));d.comment_id&&(a.extra_data=babelHelpers["extends"]({},a.extra_data,{graphql_comment_id:d.comment_id}));var e=m(c,d);if(e){a.content_id=e;return}e=n(c);if(e!==""){a.dest_topic_feed=e;return}if(o(c)){e=d.queue_id;e&&(a.dest_srt_queue_id=e);c=d.job_in_review;c&&(a.dest_srt_reviewing_job_id=c);return}}function m(a,b){if(b.story_fbid)return b.story_fbid;if(b.fbid)return b.fbid;if(b.view==="permalink"&&b.id)return b.id;b=/\/(posts|videos|notes|groups\/.*\/permalink)\//;var c=/^[0-9]+$/;if(b.test(a)){b=a.split("/");a=b[b.length-1];if(c.test(a))return a}return""}function n(a){if(!a||a.search("/feed/topics/")==-1)return"";a=a.split("/");return a[a.length-1]}function o(a){return!!a&&a.search("/intern/review/")!==-1}function p(a,c,d,e){b("WebSession").extend();if(!j||b("isInIframe")())return;var f=b("CurrentUser").isLoggedIn(),g=f?b("Banzai").VITAL:b("Banzai").BASIC;f&&(e=e||{},e.via_banzai_vital="1");f={source_path:a.scriptPath,source_token:a.categoryToken,dest_path:c.scriptPath,dest_token:c.categoryToken,impression_id:c.extraData?c.extraData.imp_id:null,cause:d,sid_raw:b("WebSession").getId()};d=d==="unload";d||l(f);if(e!=null){var i=e;i=i.snowlift_content_id;!d&&i!=null&&(f.content_id=i,delete e.snowlift_content_id);f.extra_data=babelHelpers["extends"]({},f.extra_data,e)}a.scriptPath===null&&(f.referrer=document.referrer);d=b("ScriptPath").getClickPointInfo();d&&(f.click_point_info=d);if(a.extraData)for(var m in a.extraData)m!=k&&(f["source_"+m]=a.extraData[m]);if(c.extraData)for(var n in c.extraData)n!=k&&(f["dest_"+n]=c.extraData[n]);a.topViewEndpoint&&(f.source_endpoint=a.topViewEndpoint);c.topViewEndpoint&&(f.dest_endpoint=c.topViewEndpoint);a.restored&&(f.source_restored=!0);b("Banzai").post(h,f,g);b("ScriptPath").setClickPointInfo(null)}function q(){p(b("ScriptPath").getSourcePageInfo()||i,b("ScriptPath").getPageInfo()||i,"load")}function r(a,b,c){p(a,b,"transition",c)}function a(){p(b("ScriptPath").getPageInfo()||i,i,"unload"),b("ScriptPath").shutdown()}var s=b("ScriptPath").subscribe(function(a){if(j){var b=a.source,c=a.dest,d=a.cause;a=a.extraData;d?p(b||i,c||i,d,a):b?r(b,c||i,a):q()}});b("Banzai").subscribe(b("Banzai").SHUTDOWN,a);c={startLogging:function(){j=!0,b("ScriptPath").getPageInfo()&&q()},stopLogging:function(){j=!1,s.remove()},BANZAI_LOGGING_ROUTE:h};e.exports=c}),null);
__d("ImageTimingHelper",["Arbiter","BigPipe","URI"],(function(a,b,c,d,e,f){var g,h={},i={};function j(a){var c=a.lid,d=a.pagelet,e=a.images,f=a.timeslice,j=a.ts,k=h[c];k||(k=h[c]=[]);e.forEach(function(a){try{var c=new(g||(g=b("URI")))(a);a=c.setFragment("").toString()}catch(a){return}if(i[a])return;i[a]=!0;k.push({pagelet:d,timeslice:f,ts:j,uri:a})})}b("Arbiter").subscribe(b("BigPipe").Events.init,function(a,b){b.lid&&b.lid!=="0"&&b.arbiter.subscribe("images_displayed",function(a,b){j(b)})});b("Arbiter").subscribe("MRenderingScheduler/images_displayed",function(a,b){j(b)});e.exports.getImageTimings=function(a){return h[a]||[]}}),null);
__d("NavigationTimingHelper",["NavigationMetricsEnumJS","forEachObject","performance"],(function(a,b,c,d,e,f){var g;function h(a,c){var d={};b("forEachObject")(b("NavigationMetricsEnumJS"),function(b){var e=c[b];e&&(d[b]=e+a)});return d}var i={getAsyncRequestTimings:function(a){if(!a||!(g||(g=b("performance"))).timing||!(g||(g=b("performance"))).getEntriesByName)return void 0;a=(g||(g=b("performance"))).getEntriesByName(a);return a.length===0?void 0:h(g.timing.navigationStart,a[0])},getPerformanceNavigationTiming:function(){if(!(g||(g=b("performance"))).timing||!(g||(g=b("performance"))).getEntriesByType)return{};var a=(g||(g=b("performance"))).getEntriesByType("navigation");return!a.length?{}:h(g.timing.navigationStart,a[0])},getNavTimings:function(){if(!(g||(g=b("performance"))).timing)return void 0;var a=babelHelpers["extends"]({},h(0,(g||(g=b("performance"))).timing),i.getPerformanceNavigationTiming());return h(0,a)}};e.exports=i}),null);
__d("PageletEventsHelper",["Arbiter","PageletEventConstsJS"],(function(a,b,c,d,e,f){var g="BigPipe/init",h="MRenderingScheduler/init",i="pagelet_event",j="phase_begin",k={},l=[],m=!1;function n(){return{pagelets:{},categories:{},phase_start:{},display_resources:{},all_resources:{}}}function o(a,b,c,d){k[d]==void 0&&(k[d]=n()),k[d].pagelets[b]==void 0&&(k[d].pagelets[b]={}),k[d].pagelets[b][a]=c}function p(a){a.subscribe(i,function(a,c){var d=c.event,e=c.ts;a=c.id;var f=c.lid,g=c.phase,h=c.categories,i=c.allResources;c=c.displayResources;o(d,a,e,f);var j=k[f],m=j.pagelets[a];d===b("PageletEventConstsJS").ARRIVE_END&&(m.phase=g,j.all_resources[a]=i,j.display_resources[a]=c);(d===b("PageletEventConstsJS").ONLOAD_END||d===b("PageletEventConstsJS").DISPLAY_END)&&h&&h.forEach(function(a){j.categories[a]==void 0&&(j.categories[a]={}),j.categories[a][d]=e});for(var m=0,g=l.length;m<g;m++)l[m](a,d,e,f)}),a.subscribe(j,function(a,b){k[b.lid].phase_start[b.phase]=b.ts})}a={init:function(){if(m)return;b("Arbiter").subscribe(g,function(a,b){a=b.lid;b=b.arbiter;k[a]=n();p(b)});b("Arbiter").subscribe(h,function(a,b){a=b.lid;b=b.arbiter;k[a]=n();p(b)});m=!0},getMetrics:function(a){return k[a]?JSON.parse(JSON.stringify(k[a])):null},subscribeToPageletEvents:function(a){l.push(a);return{remove:function(){l.splice(l.indexOf(a),1)}}}};e.exports=a}),null);
__d("ResourceTimingBootloaderHelper",["Bootloader","ResourceTimingMetricsEnumJS","ResourceTimingsStore","ResourceTypes","URI","forEachObject","performance"],(function(a,b,c,d,e,f){var g,h,i=500,j=[],k={},l={},m=new Map(),n=[".mp4",".m4v",".mpd","m4a"],o=new Set(["bootload","js_exec","start_bootload","tag_bootload"]);function p(a){for(var b=0;b<n.length;b++){var c=n[b];if(a.endsWith(c))return!0}return!1}function q(a){var c=new Map();b("ResourceTimingsStore").getMapFor(a).forEach(function(a){if(a.requestSent!=null){var b=c.get(a.uri);b!=null?b.push(a):c.set(a.uri,[a])}});c.forEach(function(a){return a.sort(function(a,b){return a.requestSent-b.requestSent})});return c}function r(a,b,c,d){var e=a.get(b);if(e==null){var f=b.indexOf("?");if(f!==-1){b=b.substring(0,f);e=a.get(b)}}if(e!=null)for(var f=0;f<e.length;f++){a=e[f];b=a.requestSent;a=a.responseReceived;if((c==null||b!=null&&b<=c)&&(d==null||a!=null&&a>=d))return e.splice(f,1)[0]}return null}function s(a,c,d,e,f,h,i){if(!(g||(g=b("performance"))).timing||!(g||(g=b("performance"))).getEntriesByType)return null;var j=(g||(g=b("performance"))).timing.navigationStart;e=Array.from(g.getEntriesByType("resource"));e=e.filter(function(a){return a.duration>=0&&a.startTime!=null&&a.startTime+j>c&&(f==null||a.responseEnd==null||a.responseEnd+j<f)});e.sort(function(a,b){return a.startTime-b.startTime});var k=e.length,n=0,o=0,s=0,w=0,x=0,y=q(b("ResourceTypes").XHR),z=q(b("ResourceTypes").CSS),A=q(b("ResourceTypes").JS);for(var B=0;B<e.length;B++){var C=e[B],D="",E="",F=void 0,G=C.initiatorType;switch(G){case"css":case"link":case"script":G=b("ResourceTimingsStore").parseMakeHasteURL(C.name);if(!G)continue;var H=G[0];G=G[1];if(G==="css"||G==="js"){var I=G==="css"?z:A;F=r(I,C.name,C.startTime+j,C.responseEnd+j);if(F!=null&&i){E=G;D=F.uid;break}else{E=G;G=(I=m.get(C.name))!=null?I:s++;D=G+"_"+H}}else{I=v(C.name);G=I[0];E=I[1];D=o+++"_"+G}break;case"img":D=o+++"_"+t(C.name);E="img";break;case"iframe":D=w+++"_"+t(C.name)+u(C.name);E="iframe";break;case"xmlhttprequest":if(h){H=t(C.name);I=u(C.name);if(p(I)){D=x+++"_"+H+I;E="video";break}else{F=r(y,C.name,C.startTime+j,C.responseEnd+j);if(F!=null){E=b("ResourceTypes").XHR;D=F.uid;break}}}default:continue}G={};H=Object.keys(b("ResourceTimingMetricsEnumJS"));for(var I=0;I<H.length;I++){var J=b("ResourceTimingMetricsEnumJS")[H[I]],K=C[J];K&&(G[J]=K+(g||(g=b("performance"))).timing.navigationStart)}if(F!=null){J=F;K=J.requestSent;I=J.responseReceived;if(c!=null&&K!=null&&K<c||f!=null&&I!=null&&I>f)continue;G.requestSent=K;G.responseReceived=I}G.type=E;G.desc=D;if(F!=null&&(E===b("ResourceTypes").JS||E===b("ResourceTypes").CSS||E===b("ResourceTypes").XHR)){H=b("ResourceTimingsStore").getAnnotationsFor(E,F.uid);H!=null&&(G.annotations=H)}E=="img"&&Object.prototype.hasOwnProperty.call(d,C.name)&&(G.pagelet=d[C.name]);G.transferSize=C.transferSize;G.encodedBodySize=C.encodedBodySize;a[C.name]==void 0&&(a[C.name]=[]);n++;a[C.name].push(G)}return i?{numValidEntries:k,numSuccessfulMetrics:n}:null}function t(a){a=new(h||(h=b("URI")))(a).getDomain();return a}function u(a){a=new(h||(h=b("URI")))(a).getPath();return a}function v(a){return[t(a),"img"]}function w(a){var b=Object.keys(a).filter(function(a){return a.startsWith("start_bootload/")}).sort(function(b,c){return a[b]-a[c]}).map(function(a){return a.substring(a.indexOf("/")+1)});b.forEach(function(b){return o.forEach(function(c){c=c+"/"+b;a[c]!=null&&(k[c]=a[c])})});j=j.concat(b);if(j.length>i){b=j.splice(0,j.length-i);b.forEach(function(a){return o.forEach(function(b){k[b+"/"+a]&&delete k[b+"/"+a]})})}}a={addPastBootloaderMetricsToResourceTimings:function(c,d){c===void 0&&(c={});d===void 0&&(d={});var a=b("Bootloader").getURLToHashMap();b("forEachObject")(c,function(b,c){var e=a.get(c);if(!e)return;var f=new Map();f.set("bootloader_hash",e);o.forEach(function(a){var b=a+"/"+e;b=d[b]||k[b];b!=null&&f.set(a,b)});f.size>0&&b.forEach(function(a){if(a.requestSent||a.responseReceived)return;f.forEach(function(b,c){return a[c]=b})})})},mergeBootloaderMetricsAndResourceTimings:function(a,c,d){a===void 0&&(a={});c===void 0&&(c={});d===void 0&&(d=!0);m.size===0&&(m=b("Bootloader").getURLToHashMap());var e=new Map();for(var f=m,g=Array.isArray(f),h=0,f=g?f:f[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var i;if(g){if(h>=f.length)break;i=f[h++]}else{h=f.next();if(h.done)break;i=h.value}i=i;var j=i[0];i=i[1];e.set(j,i)}var k=[];b("forEachObject")(c,function(b,c){var d=c.indexOf("/");if(d===-1)return;var f=c.substring(0,d);if(!o.has(f))return;k.push(c);var g=c.substring(d+1);c=e.get(g);if(!c){c=g;g=m.get(c);if(!g)return}c.startsWith("data:")&&(c="inlined resource: "+g);a[c]==null&&(a[c]=[{}]);a[c].forEach(function(a){a.bootloader_hash=g,a[f]=b})});d||(w(c),k.forEach(function(a){return delete c[a]}));return a},getLastTTIAndE2EImageResponseEnds:function(a,c,d){var e={TTI:a,E2E:c};if(!(g||(g=b("performance"))).timing)return e;var f=d.filter(function(b){return b.ts<=a}).map(function(a){return a.uri}).reduce(function(b,a){b[a]=!0;return b},{}),h=d.map(function(a){return a.uri}).reduce(function(b,a){b[a]=!0;return b},{});for(var i in l)l[i].forEach(function(a){a.type==="img"&&(f[i]&&(e.TTI=Math.max(e.TTI,a.responseEnd)),h[i]&&(e.E2E=Math.max(e.E2E,a.responseEnd)))});return e},getMetrics:function(a,c,d,e,f,g){c===void 0&&(c={});l={};m.size===0&&(m=b("Bootloader").getURLToHashMap());a=s(l,a,c,d,e,f,g);return{data:l,diagnostics:a}}};e.exports=a}),null);
__d("PerfXFlusher",["invariant","Banzai"],(function(a,b,c,d,e,f,g){var h="perfx_custom_logger_endpoint",i=["perfx_page","perfx_page_type","lid"];function j(a){i.forEach(function(b){return g(b in a,'PerfXFlusher: Field "%s" missing in the PerfX payload',b)})}a={flush:function(a){j(a),b("Banzai").post(h,a,{signal:!0})},registerToSendWithBeacon:function(a){b("Banzai").subscribe(b("Banzai").SHUTDOWN,function(){var c=a();c.length&&b("Banzai").post(h,c,{delay:b("Banzai").VITAL_WAIT})})}};e.exports=a}),null);
__d("pageLoadedViaSWCache",[],(function(a,b,c,d,e,f){function a(){return self.__SW_CACHE__===1}e.exports=a}),null);
__d("PerfXLogger",["ArtilleryOnUntilOffLogging","BanzaiODS","DataAttributeUtils","NavigationMetrics","NavigationTimingHelper","PerfXFlusher","PerfXSharedFields","QuicklingRefreshOverheadUtil","VisibilityListener","forEachObject","pageLoadedViaSWCache","performanceAbsoluteNow","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f){var g,h={},i={},j=65*1e3,k=["e2e","tti","all_pagelets_displayed","all_pagelets_loaded","artillery_disable_time"],l={},m={_listenersSetUp:!1,_uploadEarly:!1,_alreadyUploadedEarly:!1,_setupListeners:function(){var a=this;if(this._listenersSetUp)return;this._subscribeToNavigationMetrics();b("PerfXFlusher").registerToSendWithBeacon(function(){var c=[];b("forEachObject")(h,function(b,d){if(!h[d].sent){b=a.getPayload(d,"unload fired");b!=null&&c.push(b)}});h={};return c});this._listenersSetUp=!0},_init:function(a){var b=a.lid;if(b==null)return;this._alreadyUploadedEarly=!1;this._uploadEarly=!!a.upload_perfx_early;delete a.upload_perfx_early;var c=i[b]||[];delete i[b];if(a.sw_controlled_tags){if(navigator.serviceWorker&&navigator.serviceWorker.controller)for(var d=0;d<a.sw_controlled_tags.length;d++)c.push(a.sw_controlled_tags[d]);delete a.sw_controlled_tags}h[b]=babelHelpers["extends"]({tags:new Set(c),sent:!1},a);this._registerTimeoutSendback(b);this._setupListeners()},initWithNavigationMetricsLID:function(a,c){var d=b("NavigationMetrics").getFullPageLoadLid();if(!d)return;this._init(babelHelpers["extends"]({},c,{lid:d}));if(a&&a.always)for(var c=0;c<a.always.length;c++)m.addTag(d,a.always[c]);if(a&&a.swCache&&b("pageLoadedViaSWCache")())for(var c=0;c<a.swCache.length;c++)m.addTag(d,a.swCache[c])},init:function(a,b){b!=null&&a.lid!=null&&(l[a.lid]=b),this._init(a)},addTag:function(a,c){this._alreadyUploadedEarly&&b("BanzaiODS").bumpEntityKey(2966,"PerfXLateTag",c);var d=h[a];if(d){d.tags.add(c);return}i[a]||(i[a]=[]);i[a].push(c)},addTagWithNavigationMetricsLID:function(a){this._alreadyUploadedEarly&&b("BanzaiODS").bumpEntityKey(2966,"PerfXLateTag",a);var c=b("NavigationMetrics").getFullPageLoadLid();if(!c)return;m.addTag(c,a)},_registerTimeoutSendback:function(a){var c=this,d=this._getFetchStart(a),e=j;d!=null&&(e-=(g||(g=b("performanceAbsoluteNow")))()-d);b("setTimeoutAcrossTransitions")(function(){return c._uploadPayload(a,"sendback time out")},e)},_subscribeToNavigationMetrics:function(){var a=this,c;(c=b("NavigationMetrics")).addRetroactiveListener(c.Events.EVENT_OCCURRED,function(b,c){if(!(b in h))return;k.includes(c.event)&&Object.prototype.hasOwnProperty.call(c,"timestamp")&&c.timestamp!=null&&(h[b][c.event]=c.timestamp);c.event==="all_pagelets_displayed"&&a._uploadEarly&&(k.forEach(function(a){Object.prototype.hasOwnProperty.call(c,a)&&c[a]!=null&&(h[b][a]=c[a])}),a._uploadPayload(b),a._alreadyUploadedEarly=!0)});c.addRetroactiveListener(c.Events.NAVIGATION_DONE,function(b,c){var d=c.serverLID;if(!(d in h))return;k.forEach(function(a){Object.prototype.hasOwnProperty.call(c,a)&&c[a]!=null&&(h[d][a]=c[a])});a._uploadPayload(d)})},_getPayloadWithOffset:function(a,c,d){a=h[a];if(a==null)return null;var e=Object.assign({},a),f=document.querySelector('[id^="hyperfeed_story_id"]');if(f){f=JSON.parse(b("DataAttributeUtils").getDataFt(f));f&&(e.mf_query_id=f.qid)}e.tags=Array.from(a.tags);e.art_id||(e.artillery_disable_time=b("ArtilleryOnUntilOffLogging").lastDisableTime());this._adjustValues(e,c);e.fetch_start=c;if(e.perfx_page_type==="normal"){f=b("NavigationTimingHelper").getNavTimings();f!=null&&f.navigationStart!=null&&(e.nav_to_fetch=c-f.navigationStart);a=b("QuicklingRefreshOverheadUtil").getOverhead(c);a!==null&&(e.quickling_refresh_overhead=a)}d!=null&&(e.sendback_reason=d);b("PerfXSharedFields").addCommonValues(e);b("VisibilityListener").supported()&&e.fetch_start&&e.all_pagelets_displayed&&e.tti&&e.e2e&&(e.tab_hidden_time_dd=b("VisibilityListener").getHiddenTime(e.fetch_start,e.fetch_start+e.all_pagelets_displayed),e.tab_hidden_time_tti=b("VisibilityListener").getHiddenTime(e.fetch_start,e.fetch_start+e.tti),e.tab_hidden_time_e2e=b("VisibilityListener").getHiddenTime(e.fetch_start,e.fetch_start+e.e2e));window&&window.location&&window.location.pathname&&(e.request_uri=window.location.pathname);delete e.sent;return e},_uploadPayload:function(a,c){if(h[a]!=null&&!h[a].sent){c=this.getPayload(a,c);c!=null&&(b("PerfXFlusher").flush(c),h[a].sent=!0)}},getPayload:function(a,b){return this._getPayloadWithOffset(a,this._getFetchStart(a),b)},_getFetchStart:function(a){if(!(a in h))return null;var c=h[a].perfx_page_type;if(c=="quickling")if(!(a in l))return null;else c=b("NavigationTimingHelper").getAsyncRequestTimings(l[a]);else c=b("NavigationTimingHelper").getNavTimings();return!c||!c.fetchStart?null:c.fetchStart},_adjustValues:function(a,b){k.forEach(function(c){Object.prototype.hasOwnProperty.call(a,c)&&(a[c]-=b)})}};e.exports=m}),null);
__d("TimeSpentImmediateActiveSecondsLoggerBlue",["Banzai","ImmediateActiveSecondsConfig","ScriptPath"],(function(a,b,c,d,e,f){var g="immediate_active_seconds",h={signal:!0,retry:!0},i=b("ImmediateActiveSecondsConfig").sampling_rate,j=b("ImmediateActiveSecondsConfig").ias_bucket,k=0;function l(a){if(i<=0)return!1;a=Math.floor(a/1e3)%i;return a===j}function a(a){if(a>=k&&a-k<1e3)return;if(l(a)){var c={activity_time_ms:a,last_activity_time_ms:k,script_path:b("ScriptPath").getTopViewEndpoint()};b("Banzai").post(g,c,h)}k=Math.floor(a/1e3)*1e3}e.exports={maybeReportActiveSecond:a}}),null);