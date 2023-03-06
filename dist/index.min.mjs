/**
 * promistro v1.0.0 by Matt Scheurich <matt@lvl99.com> (License: Apache-2.0)
 */
function e(e,t){const{wait:r,leading:o,accumulate:a}={wait:100,leading:!1,accumulate:!1,...t};let n,s;const c=[];return function(...t){const i=c.push(t);n?clearTimeout(s):(n={},n.promise=new Promise(((e,t)=>{n.resolve=e,n.reject=t})));var u=()=>{Promise.resolve(e.apply(e,a?[c]:t)).then(n.resolve,n.reject)};return o&&1===i&&u(),s=setTimeout(u,r),n.promise}}export{e as default,e as promistro};
//# sourceMappingURL=index.min.mjs.map
