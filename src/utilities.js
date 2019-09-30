import NewsSection from './NewsSection.js';
import Filter from './Filter.js';
import Router from './router.js';
import DetailedNews from './DetailedNews.js';
import handleAction from './HandleAction.js';
import {API_KEY} from './constant.js';

let newsSection=NewsSection.getInstance();
let filter=Filter.getInstance();
let timeout;

export const handleChange=(event=>{
    
    let value=event.target.value;
    if(timeout){
        clearTimeout(timeout);
    } 
    timeout=setTimeout(()=>{
        handleAction({type:"search",data:value})
   },300);
})

export function setDOM(dom,view){
    let container=document.getElementById("container");
    let state=JSON.parse(localStorage.getItem("state"));
    if(state&&state.viewChange){
        while(container.hasChildNodes()){
            container.removeChild(container.firstChild);
        }
        state.viewChange=false;
        localStorage.setItem("state",JSON.stringify(state));
    }
    let component=document.getElementById(view);
    if(!component) {
        component=document.createElement("div");
        component.setAttribute("id",view);
        component.insertAdjacentHTML("beforeend",dom);
        container.appendChild(component);
    } else{
        if(component.hasChildNodes()){
            component.removeChild(component.firstChild);
        }
        component.insertAdjacentHTML("beforeend",dom);
    }
    let searchInput=document.getElementById("searchInput");
    searchInput && searchInput.addEventListener("input",handleChange);
    let newsSection=document.getElementById("NewsSection");
    newsSection && newsSection.addEventListener("scroll",()=>handleAction({type:"fetchMoreNews"}));
    let anchor=document.getElementsByClassName("latestNews")[0];
    anchor && anchor.addEventListener("click",()=>handleAction({type:"latestNews"}));
}

export function fetchCall(url,options){
    var urlstring = 'https://newsapi.org/v2/top-headlines?country=us&apiKey='+API_KEY;
    var req = new Request(urlstring);
    return fetch(req).then((response)=>{
        if(response.status < 400) return response.json();
        throw new Error(response.statusText);        
    }).catch(error=>{
        throw new Error(error);
    })
}

export function render(){
    filter.render();
    newsSection.render();
    let router=new Router();
    router.addRoute({route:"^#/detailNews",Component:[DetailedNews]});
}

