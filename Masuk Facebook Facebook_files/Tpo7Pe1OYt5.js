if (self.CavalryLogger) { CavalryLogger.start_js(["UtZtj"]); }

__d("DOMTraverser",["DOM"],(function(a,b,c,d,e,f){var g={previousNode:function(a){if(a.previousElementSibling){var b=a.previousElementSibling;while(b.lastElementChild!==null)b=b.lastElementChild;return b}return a.parentElement},nextNode:function(a){if(a.firstElementChild)return a.firstElementChild;if(a.nextElementSibling)return a.nextElementSibling;a=a.parentElement;while(a!=null){if(a.nextElementSibling)return a.nextElementSibling;a=a.parentElement}return null},previousFilteredNode:function(a,b,c){if(b===a)return null;b=g.previousNode(b);while(b!=null){if(b instanceof HTMLElement&&c(b))return b;if(b===a)return null;b=g.previousNode(b)}return null},nextFilteredNode:function(a,c,d){c=g.nextNode(c);while(c!=null){if(a&&!b("DOM").contains(a,c))return null;if(c instanceof HTMLElement&&d(c))return c;c=g.nextNode(c)}return null}};e.exports=g}),null);
__d("ReactComposerEvents",[],(function(a,b,c,d,e,f){a=Object.freeze({CHANGE:"change",INSTANCE_MOUNTED:"composer/instanceMounted/",ACTIVATE_ATTACHMENT:"composer/activateAttachment/",MENTION_INPUT_FOCUS:"composer/mentionInputFocused/",TEXT_PREFILL_BEFORE_BOOTLOAD:"composer/textPrefillBeforeBootload/",RERENDER_MENTION_INPUT:"reactComposer/rerenderMentionInput/",OPTIMISTIC_POSTING_STARTED:"composer/optimisticPostingStarted/",POST_FINALLY:"composer/postFinally/",POST_FAILED:"composer/postFailed/",POST_STARTED:"composer/postStarted/",OPTIMISTIC_POST_STARTED:"composer/optimisticPostStarted/",POST_SUCCEEDED:"composer/postSucceeded/",COMPOSER_RESET:"composer/reset/",COMPOSER_UNMOUNT:"composer/unmount/",SET_PREFILL_DATA:"reactComposer/setPrefillData/",RICH_TEXT_EDITOR_MOUNTED:"reactComposer/richTextEditorMounted/",SAVE_STARTED:"composer/saveStarted/",HIGHLIGHT_TOP_COMPOSER:"reactComposer/highlightTopComposer"});e.exports=a}),null);
__d("ReactComposerConstants",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({ID_PREFIX:"rc.",GK_VIDEO_COPYRIGHT:"video_copyright_confirmation_dialog",GK_MULTILINGUAL_COMPOSER:"multilingual_composer_www",GK_PAGE_BREAKING_COMPOSER:"breaking_news_page"})}),null);
__d("ReactComposerIDGenerator",["ReactComposerConstants","uniqueID"],(function(a,b,c,d,e,f){"use strict";a={getID:function(){return b("ReactComposerConstants").ID_PREFIX+b("uniqueID")()},isComposerID:function(a){return!!a&&a.startsWith(b("ReactComposerConstants").ID_PREFIX)}};e.exports=a}),null);
__d("keyMirrorRecursive",["invariant","isTruthy"],(function(a,b,c,d,e,f,g){"use strict";a=function a(c,d){var e={};h(c)||g(0,580);for(var f in c){if(!Object.prototype.hasOwnProperty.call(c,f))continue;var i=c[f],j=b("isTruthy")(d)?d+"."+f:f;h(i)?i=a(i,j):i=j;e[f]=i}return e};function h(a){return a instanceof Object&&!Array.isArray(a)}e.exports=a}),null);
__d("setByPath",["invariant"],(function(a,b,c,d,e,f,g){"use strict";function a(a,b,c){a=a;for(var d=0;d<b.length;d++){var e=b[d];if(d===b.length-1){a[e]=c;return}!Object.prototype.hasOwnProperty.call(a,e)?a[e]={}:a[e]==null?a[e]={}:Array.isArray(a[e])||Object.prototype.toString.call(a[e])==="[object Object]"||g(0,1041,a[e]);a=a[e]}}e.exports=a}),null);