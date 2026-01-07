"use client";

import { useEffect } from "react";

// Optimized External Link Prefetcher - Inlined to avoid serving as a page
const PREFETCH_SCRIPT = `
(function(){
  'use strict';
  var conn=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
  if(typeof window==='undefined'||conn?.saveData||conn?.effectiveType?.includes('2g'))return;
  
  var idle='requestIdleCallback'in window?requestIdleCallback:function(c){return setTimeout(c,1)};
  var prefetched=new Set(),preconnected=new Set(),observed=new WeakSet(),queue=[],active=0,scanning=false;
  
  function getLimit(){var t=conn?.effectiveType;return t==='3g'?2:t==='4g'?6:4}
  
  function process(){
    var limit=getLimit();
    while(active<limit&&queue.length){
      var url=queue.shift();if(!url)continue;
      active++;
      var link=document.createElement('link');
      link.rel='prefetch';link.href=url;link.as='document';
      link.onload=link.onerror=function(){active--;if(queue.length)idle(process)};
      document.head.appendChild(link);
    }
  }
  
  function preconnect(origin){
    if(preconnected.has(origin))return;
    preconnected.add(origin);
    var link=document.createElement('link');
    link.rel='preconnect';link.href=origin;link.crossOrigin='anonymous';
    document.head.appendChild(link);
    var dns=document.createElement('link');
    dns.rel='dns-prefetch';dns.href=origin;
    document.head.appendChild(dns);
  }
  
  function prefetch(url,priority){
    if(!url||prefetched.has(url))return;
    try{
      var target=new URL(url);
      if(target.origin===location.origin||/\\.(zip|pdf|exe|dmg|pkg|mp4|webm|avi|mov|png|jpg|jpeg|gif|webp|svg|ico|mp3|wav|ogg)$/i.test(target.pathname))return;
      preconnect(target.origin);
      prefetched.add(url);
      priority?queue.unshift(url):queue.push(url);
      idle(process);
    }catch(e){}
  }
  
  var observer=new IntersectionObserver(function(entries){
    for(var i=0;i<entries.length;i++){
      if(entries[i].isIntersecting){
        prefetch(entries[i].target.href);
        observer.unobserve(entries[i].target);
      }
    }
  },{rootMargin:'50%',threshold:0});
  
  function scan(){
    if(scanning||document.hidden)return;
    scanning=true;
    idle(function(){
      var links=document.querySelectorAll('a[href^="http"]:not([data-no-prefetch])');
      for(var i=0;i<links.length;i++){
        var a=links[i];
        if(observed.has(a)||a.href.startsWith(location.origin))continue;
        observed.add(a);
        observer.observe(a);
        (function(el){
          el.addEventListener('mouseenter',function h(){prefetch(el.href,true);el.removeEventListener('mouseenter',h)},{passive:true});
          el.addEventListener('touchstart',function h(){prefetch(el.href,true);el.removeEventListener('touchstart',h)},{once:true,passive:true});
        })(a);
      }
      scanning=false;
    });
  }
  
  document.addEventListener('visibilitychange',function(){if(!document.hidden&&queue.length)idle(process)},{passive:true});
  
  if(document.body){
    new MutationObserver(function(){idle(scan)}).observe(document.body,{childList:true,subtree:true});
  }
  
  if(document.readyState==='complete')idle(scan);
  else window.addEventListener('load',function(){idle(scan)},{once:true});
})();
`;

export default function ExternalPrefetch() {
    useEffect(() => {
        // Execute the prefetch script after hydration
        const script = document.createElement("script");
        script.textContent = PREFETCH_SCRIPT;
        script.id = "external-prefetch";
        document.body.appendChild(script);

        return () => {
            const existing = document.getElementById("external-prefetch");
            if (existing) existing.remove();
        };
    }, []);

    return null;
}
