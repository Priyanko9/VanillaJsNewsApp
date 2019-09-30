import {fetchCall,render} from './utilities.js';
import NewsSection from './NewsSection.js';
import Filter from './Filter.js';

let newsSection=NewsSection.getInstance();
let filter=Filter.getInstance();

export default function handleAction({type,data}){
    let store=JSON.parse(localStorage.getItem("state"));
    switch(type){ 
        case "loadNews":  
        if(!store || !store.viewChange){
            fetchCall().then(response=>{
                let latestNews=store && store.retrievedData[0].title;
                let moreNews;
                let showNews;
                if(response.articles[0].title!==latestNews && latestNews){
                    moreNews=true;
                    showNews=store.showNews;
                } else {
                    showNews=response.articles.slice(0,10);
                }
                localStorage.setItem("state",JSON.stringify({retrievedData:response.articles,showNews,moreNews}));
                render();
                
            });
        } else{
            render();
            store.viewChange=false;
            localStorage.setItem("state",JSON.stringify(store));
        }
        return;
     
        case "fetchMoreNews": 
        let newsSectionContainer=document.getElementById("NewsSection");
        if(newsSectionContainer.scrollHeight-newsSectionContainer.scrollTop===newsSectionContainer.clientHeight){
            if(!store.filteredNews || store.filteredNews.length===0){
                let endPoint=store.showNews.length+10;
                store.showNews=store.retrievedData.slice(0,endPoint);
                localStorage.setItem("state",JSON.stringify(store));
                filter.render();
                newsSection.render();
            }
        }
        return;
    
        case "latestNews" :
        store.showNews=store.retrievedData.slice(0,10);
        store.moreNews=false;
        localStorage.setItem("state",JSON.stringify(store));
        newsSection.render();
        return;
     
        case "search": 
        if(store.showNews.length===0||data===""){
            store.filteredNews=[];
        } else{
            store.filteredNews=store.showNews.filter((ele)=>{
                if(ele.title.toLowerCase().indexOf(data.toLowerCase())>-1){
                    return true;
                }
                return false;
            })
        }
        localStorage.setItem("state",JSON.stringify(store));
        newsSection.render();
        return;
    }
}