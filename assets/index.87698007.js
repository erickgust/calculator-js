const L=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}};L();const E={"+":(t,e)=>+t+ +e,"-":(t,e)=>+t-+e,"\xF7":(t,e)=>+t/+e,x:(t,e)=>+t*+e};function O(t,e){const[o,c]=t.match(e),n=o.split(c),r=E[c](...n),s=t.split(o).join(r);return l(s,e)}function l(t,e){return e.test(t)?O(t,e):t}function p(t){const e="(?:\\d+)\\.?(?:\\d+)?";return new RegExp(`${e}(${t})${e}`)}function m(t){const e=l(t,p("[x\xF7]"));return l(e,p("[-+]"))}function i(t){return document.querySelector(`[data-js="${t}"]`)}const h=i("screen"),v=d("cover"),a=d("current"),g=d("result");function d(t){const e=document.createElement("div");return e.className=t,e}function f(){return a.textContent}function u(t){a.textContent=t}function b(t){g.textContent=t}function y(){b("")}function $(t){const e=m(t);e!==t&&b(e)}v.appendChild(a);h.appendChild(v);h.appendChild(g);const x=document.querySelectorAll('[data-js="button-number"]'),S=document.querySelectorAll('[data-js="button-operation"]'),q=i("button-ac"),B=i("button-equal");function R({target:t}){const e=f()+t.value;u(e),$(e)}function k({target:t}){const e=C(f()),o=e+t.value;e!==""&&u(o)}function A(){u(""),y()}function N(t){const e=["-","+","x","\xF7"],o=t.slice(-1);return e.includes(o)}function C(t){return N(t)?t.slice(0,-1):t}function j(){const t=C(f());u(m(t)),y()}B.addEventListener("click",j);q.addEventListener("click",A);x.forEach(t=>{t.addEventListener("click",R)});S.forEach(t=>{t.addEventListener("click",k)});
