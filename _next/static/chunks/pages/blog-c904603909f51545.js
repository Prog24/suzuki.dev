(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[195],{12963:function(e,r,t){"use strict";t.d(r,{Z:function(){return M}});var n=t(87462),o=t(63366),a=t(67294),i=(t(59864),t(45697),t(86010)),c=t(77463),s=t(11496),l=t(27623),u=t(15861),d=t(41796),p=t(82066),f=t(85893),h=(0,p.Z)((0,f.jsx)("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz"),g=t(47739);const m=(0,s.ZP)(g.Z,{skipSx:!0})((({theme:e})=>(0,n.Z)({display:"flex",marginLeft:e.spacing(.5),marginRight:e.spacing(.5)},"light"===e.palette.mode?{backgroundColor:e.palette.grey[100],color:e.palette.grey[700]}:{backgroundColor:e.palette.grey[700],color:e.palette.grey[100]},{borderRadius:2,"&:hover, &:focus":(0,n.Z)({},"light"===e.palette.mode?{backgroundColor:e.palette.grey[200]}:{backgroundColor:e.palette.grey[600]}),"&:active":(0,n.Z)({boxShadow:e.shadows[0]},"light"===e.palette.mode?{backgroundColor:(0,d._4)(e.palette.grey[200],.12)}:{backgroundColor:(0,d._4)(e.palette.grey[600],.12)})}))),x=(0,s.ZP)(h)({width:24,height:16});var b=function(e){const r=e;return(0,f.jsx)("li",{children:(0,f.jsx)(m,(0,n.Z)({focusRipple:!0},e,{ownerState:r,children:(0,f.jsx)(x,{ownerState:r})}))})},y=t(21420);function j(e){return(0,y.Z)("MuiBreadcrumbs",e)}var v=(0,t(11271).Z)("MuiBreadcrumbs",["root","ol","li","separator"]);const C=["children","className","component","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"],Z=(0,s.ZP)(u.Z,{name:"MuiBreadcrumbs",slot:"Root",overridesResolver:(e,r)=>[{[`& .${v.li}`]:r.li},r.root]})({}),P=(0,s.ZP)("ol",{name:"MuiBreadcrumbs",slot:"Ol",overridesResolver:(e,r)=>r.ol})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"}),w=(0,s.ZP)("li",{name:"MuiBreadcrumbs",slot:"Separator",overridesResolver:(e,r)=>r.separator})({display:"flex",userSelect:"none",marginLeft:8,marginRight:8});function k(e,r,t,n){return e.reduce(((o,a,i)=>(i<e.length-1?o=o.concat(a,(0,f.jsx)(w,{"aria-hidden":!0,className:r,ownerState:n,children:t},`separator-${i}`)):o.push(a),o)),[])}var M=a.forwardRef((function(e,r){const t=(0,l.Z)({props:e,name:"MuiBreadcrumbs"}),{children:s,className:u,component:d="nav",expandText:p="Show path",itemsAfterCollapse:h=1,itemsBeforeCollapse:g=1,maxItems:m=8,separator:x="/"}=t,y=(0,o.Z)(t,C),[v,w]=a.useState(!1),M=(0,n.Z)({},t,{component:d,expanded:v,expandText:p,itemsAfterCollapse:h,itemsBeforeCollapse:g,maxItems:m,separator:x}),S=(e=>{const{classes:r}=e;return(0,c.Z)({root:["root"],li:["li"],ol:["ol"],separator:["separator"]},j,r)})(M),O=a.useRef(null),_=a.Children.toArray(s).filter((e=>a.isValidElement(e))).map(((e,r)=>(0,f.jsx)("li",{className:S.li,children:e},`child-${r}`)));return(0,f.jsx)(Z,(0,n.Z)({ref:r,component:d,color:"text.secondary",className:(0,i.Z)(S.root,u),ownerState:M},y,{children:(0,f.jsx)(P,{className:S.ol,ref:O,ownerState:M,children:k(v||m&&_.length<=m?_:(e=>g+h>=e.length?e:[...e.slice(0,g),(0,f.jsx)(b,{"aria-label":p,onClick:()=>{w(!0);const e=O.current.querySelector("a[href],button,[tabindex]");e&&e.focus()}},"ellipsis"),...e.slice(e.length-h,e.length)])(_),S.separator,x,M)})}))}))},15423:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog",function(){return t(1391)}])},8938:function(e,r,t){"use strict";t.d(r,{Z:function(){return c}});var n=t(85893),o=t(53219);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(){return(i=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}var c=function(e){var r=i({},e);return(0,n.jsx)(o.Z,function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),n.forEach((function(r){a(e,r,t[r])}))}return e}({},r,{children:(0,n.jsx)("path",{d:"M6.79665 6.77627V5.24663C6.79665 4.96788 6.81108 4.87492 6.854 4.73191C6.9687 4.33881 7.35596 4.04579 7.81475 4.04579C8.27354 4.04579 8.66067 4.34594 8.77537 4.73191C8.81841 4.87492 8.83285 4.96788 8.83285 5.24663V7.60539C8.83285 7.7484 8.83285 7.89127 8.80411 8.02002C8.7253 8.37734 8.40267 8.69913 8.04414 8.7777C7.91514 8.80623 7.7717 8.80623 7.62827 8.80623H5.26241C4.98282 8.80623 4.88958 8.79197 4.74615 8.74905C4.35901 8.6347 4.05796 8.24873 4.05796 7.79131C4.05796 7.33377 4.35901 6.9478 4.74615 6.83344C4.88958 6.79053 4.98282 6.77627 5.26241 6.77627H6.79665ZM15.2279 17.4697H2.53803V6.32598C2.53803 6.18298 2.58823 6.06149 2.68862 5.9614L5.97933 2.68043C6.07973 2.58047 6.20158 2.53042 6.34501 2.53042H15.2279V17.4697ZM16.6691 0.0142621C16.6045 0.00713093 16.5185 0 16.3536 0H6.00794C5.89338 0 5.77868 0.00713093 5.69974 0.0142621C5.22652 0.0571765 4.8035 0.278753 4.46656 0.614682L0.616531 4.45316C0.279719 4.78922 0.0573491 5.21085 0.0144334 5.68265C0.00715303 5.76122 0 5.87557 0 5.98993V18.5918C0 18.7562 0.00715303 18.8421 0.0144334 18.9064C0.0716543 19.4425 0.559182 19.9284 1.09691 19.9856C1.16153 19.9929 1.24749 20 1.41239 20H16.3536C16.5185 20 16.6045 19.9929 16.6691 19.9856C17.2068 19.9284 17.6943 19.4425 17.7517 18.9064C17.7587 18.8421 17.766 18.7562 17.766 18.5918V1.40815C17.766 1.24375 17.7587 1.15792 17.7517 1.09362C17.6943 0.557505 17.2068 0.0714388 16.6691 0.0142621Z"})}))}},62110:function(e,r,t){"use strict";t.d(r,{W:function(){return c}});var n=t(85893),o=t(53219);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(){return(i=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}var c=function(e){var r=i({},e);return(0,n.jsxs)(o.Z,function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),n.forEach((function(r){a(e,r,t[r])}))}return e}({},r,{children:[(0,n.jsx)("path",{d:"M0.883714 18.8675H4.73422C4.93807 18.8675 5.11927 18.7542 5.23252 18.5957L15.8328 1.17781C15.9687 0.951305 15.8101 0.679504 15.5383 0.679504H11.8916C11.7104 0.679504 11.5519 0.770105 11.4613 0.928655L0.702514 18.5504C0.634564 18.6863 0.725164 18.8675 0.883714 18.8675Z"}),(0,n.jsx)("path",{d:"M14.1571 18.5957L19.1628 10.555C19.3213 10.3058 19.1401 9.98871 18.8457 9.98871H15.2216C15.0857 9.98871 14.9498 10.0567 14.8819 10.1699L9.74034 18.3919C9.60444 18.5957 9.76299 18.8675 10.0121 18.8675H13.7041C13.8853 18.8675 14.0665 18.7769 14.1571 18.5957Z"})]}))}},52207:function(e,r,t){"use strict";t.d(r,{Z:function(){return L}});var n,o=t(85893),a=t(11496),i=t(27948),c=t(55113),s=t(67294),l=t(41664),u=t(87357),d=t(85552),p=t(93946),f=t(15861),h=t(65823),g=t(26783),m=t(25084),x=t(25449),b=t(85611),y=t(62110),j=t(8938),v=t(90307);function C(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var Z=(0,a.ZP)("div")((function(e){var r=e.theme;return C(n={backgroundColor:r.palette.background.paper,width:"100%",borderTop:"8px solid ".concat(r.palette.primary.main)},r.breakpoints.down("md"),{padding:r.spacing(2)}),C(n,r.breakpoints.up("md"),{padding:r.spacing(8),paddingTop:r.spacing(4)}),n})),P=(0,a.ZP)("img")((function(e){e.theme;return{borderRadius:"50%",width:100,height:100}})),w=(0,a.ZP)("a")((function(e){return{marginRight:8,color:e.theme.palette.text.primary}})),k=(0,a.ZP)("p")((function(e){e.theme;return{display:"inline-flex",verticalAlign:"text-bottom",boxSizing:"inherit",alignItems:"center"}})),M=(0,a.ZP)("a")((function(e){return{color:e.theme.palette.text.primary,textDecoration:"underline",cursor:"pointer",marginRight:8}})),S=function(){var e=(0,s.useContext)(v.J),r=e.mode,t=e.setMode;return(0,o.jsx)(Z,{children:(0,o.jsxs)(i.Z,{maxWidth:"md",children:[(0,o.jsx)(u.Z,{sx:{display:"flex",flexDirection:"row-reverse",p:1},children:(0,o.jsx)(d.Z,{title:"light"===r?"Dark Mode":"Light Mode",placement:"bottom",children:(0,o.jsx)(p.Z,{size:"large",color:"primary",onClick:function(){return t("light"===r?"dark":"light")},children:"light"===r?(0,o.jsx)(h.Z,{"aria-label":"Dark Mode"}):(0,o.jsx)(g.Z,{"aria-label":"Light Mode"})})})}),(0,o.jsxs)("div",{style:{display:"flex"},children:[(0,o.jsx)("div",{style:{minWidth:100},children:(0,o.jsx)(P,{src:"/icon.png",alt:"Icon"})}),(0,o.jsxs)("div",{style:{marginLeft:24},children:[(0,o.jsx)(f.Z,{color:"textPrimary",sx:{marginBottom:1},variant:"h5",children:"Suzuki@Prog24"}),(0,o.jsxs)(f.Z,{color:"textSecondary",variant:"body1",children:["KSU / M2",(0,o.jsx)("br",{}),"\u60c5\u5831\u63a8\u85a6\u6280\u8853\u306e\u7814\u7a76\u3057\u305f\u308a\u3001\u30d5\u30ed\u30f3\u30c8\u30a8\u30f3\u30c9\u30a8\u30f3\u30b8\u30cb\u30a2\u3057\u305f\u308a\u3001UI\u30c7\u30b6\u30a4\u30ca\u3057\u305f\u308a"]})]})]}),(0,o.jsxs)("div",{style:{marginTop:16},children:[(0,o.jsxs)(k,{children:[(0,o.jsx)(m.Z,{sx:{color:"#1DA1F2"}}),(0,o.jsx)(w,{href:"https://twitter.com/Prog24_jp",target:"_blank",rel:"noreferrer",children:" Prog24_jp"})]}),(0,o.jsxs)(k,{children:[(0,o.jsx)(x.Z,{sx:{color:"#171515"}}),(0,o.jsx)(w,{href:"https://github.com/Prog24",target:"_blank",rel:"noreferrer",children:" Prog24"})]}),(0,o.jsxs)(k,{children:[(0,o.jsx)(j.Z,{sx:{color:"#41C9B4"}}),(0,o.jsx)(w,{href:"https://note.com/Prog24",target:"_blank",rel:"noreferrer",children:" Prog24"})]}),(0,o.jsxs)(k,{children:[(0,o.jsx)(y.W,{sx:{color:"#1DA1F2"}}),(0,o.jsx)(w,{href:"https://zenn.dev/prog24",target:"_blank",rel:"noreferrer",children:" prog24"})]}),(0,o.jsxs)(k,{children:[(0,o.jsx)(b.Z,{color:"primary"}),(0,o.jsx)(l.default,{href:"/blog",children:(0,o.jsx)(M,{children:"Blog"})})]})]})]})})};function O(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var _,$=(0,a.ZP)("div")((function(e){return{backgroundColor:e.theme.palette.background.default}})),R=(0,a.ZP)(i.Z)((function(e){var r=e.theme;return O(_={},r.breakpoints.down("md"),{paddingTop:r.spacing(2),paddingBottom:r.spacing(2)}),O(_,r.breakpoints.up("md"),{paddingTop:r.spacing(4),paddingBottom:r.spacing(4)}),_})),B=(0,a.ZP)(c.Z)((function(e){var r=e.theme;return{padding:r.spacing(2),borderRadius:r.spacing(1)}})),L=function(e){var r=e.children;return(0,o.jsxs)($,{children:[(0,o.jsx)(S,{}),(0,o.jsx)(R,{maxWidth:"md",children:(0,o.jsx)(B,{children:r})})]})}},1391:function(e,r,t){"use strict";t.r(r),t.d(r,{__N_SSG:function(){return f}});var n=t(85893),o=t(41664),a=t(52207),i=t(12963),c=t(15861),s=t(78462),l=t(97212),u=t(98619),d=t(79953),p=(0,t(11496).ZP)("a")((function(e){return{color:e.theme.palette.text.secondary,textDecoration:"underline",cursor:"pointer"}})),f=!0;r.default=function(e){return(0,n.jsxs)(a.Z,{children:[(0,n.jsxs)(i.Z,{"aria-label":"breadcrumb",children:[(0,n.jsx)(o.default,{href:"/",children:(0,n.jsx)(p,{children:"HOME"})}),(0,n.jsx)(c.Z,{color:"textPrimary",children:"blog"})]}),(0,n.jsx)(s.Z,{children:e.blogs.map((function(e,r){var t,a=new Date(e.frontmatter.date),i="yyyy.MM.dd".replace(/yyyy/g,(t=a).getFullYear()).replace(/MM/g,("0"+(t.getMonth()+1)).slice(-2)).replace(/dd/g,("0"+t.getDate()).slice(-2));return(0,n.jsx)(l.ZP,{disablePadding:!0,divider:!0,children:(0,n.jsx)(o.default,{href:"/blog/".concat(e.frontmatter.slug),children:(0,n.jsx)(u.Z,{disableGutters:!0,children:(0,n.jsx)(d.Z,{primary:e.frontmatter.title,secondary:i})})})},r)}))})]})}},69921:function(e,r){"use strict";var t=60103,n=60106,o=60107,a=60108,i=60114,c=60109,s=60110,l=60112,u=60113,d=60120,p=60115,f=60116,h=60121,g=60122,m=60117,x=60129,b=60131;if("function"===typeof Symbol&&Symbol.for){var y=Symbol.for;t=y("react.element"),n=y("react.portal"),o=y("react.fragment"),a=y("react.strict_mode"),i=y("react.profiler"),c=y("react.provider"),s=y("react.context"),l=y("react.forward_ref"),u=y("react.suspense"),d=y("react.suspense_list"),p=y("react.memo"),f=y("react.lazy"),h=y("react.block"),g=y("react.server.block"),m=y("react.fundamental"),x=y("react.debug_trace_mode"),b=y("react.legacy_hidden")}function j(e){if("object"===typeof e&&null!==e){var r=e.$$typeof;switch(r){case t:switch(e=e.type){case o:case i:case a:case u:case d:return e;default:switch(e=e&&e.$$typeof){case s:case l:case f:case p:case c:return e;default:return r}}case n:return r}}}var v=c,C=t,Z=l,P=o,w=f,k=p,M=n,S=i,O=a,_=u;r.ContextConsumer=s,r.ContextProvider=v,r.Element=C,r.ForwardRef=Z,r.Fragment=P,r.Lazy=w,r.Memo=k,r.Portal=M,r.Profiler=S,r.StrictMode=O,r.Suspense=_,r.isAsyncMode=function(){return!1},r.isConcurrentMode=function(){return!1},r.isContextConsumer=function(e){return j(e)===s},r.isContextProvider=function(e){return j(e)===c},r.isElement=function(e){return"object"===typeof e&&null!==e&&e.$$typeof===t},r.isForwardRef=function(e){return j(e)===l},r.isFragment=function(e){return j(e)===o},r.isLazy=function(e){return j(e)===f},r.isMemo=function(e){return j(e)===p},r.isPortal=function(e){return j(e)===n},r.isProfiler=function(e){return j(e)===i},r.isStrictMode=function(e){return j(e)===a},r.isSuspense=function(e){return j(e)===u},r.isValidElementType=function(e){return"string"===typeof e||"function"===typeof e||e===o||e===i||e===x||e===a||e===u||e===d||e===b||"object"===typeof e&&null!==e&&(e.$$typeof===f||e.$$typeof===p||e.$$typeof===c||e.$$typeof===s||e.$$typeof===l||e.$$typeof===m||e.$$typeof===h||e[0]===g)},r.typeOf=j},59864:function(e,r,t){"use strict";e.exports=t(69921)}},function(e){e.O(0,[438,680,774,888,179],(function(){return r=15423,e(e.s=r);var r}));var r=e.O();_N_E=r}]);