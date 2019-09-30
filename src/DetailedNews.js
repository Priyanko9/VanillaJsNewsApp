import { setDOM } from "./utilities.js";


export default class DetailedNews{
    
    render(){
        let searchid =window.location.href.split("?")[1].split("=")[1];
        let state=JSON.parse(localStorage.getItem("state"))||{};
        let newsArray=(state.filteredNews && state.filteredNews.length > 0) ? state.filteredNews :state.showNews
        let filteredNews;
        newsArray.forEach((ele,index)=>{
            if(index.toString()===searchid){
                filteredNews=ele;
            }
        });
        let dom=`<div class="detailNewsContainer">
                <div class="title">${filteredNews.title}</div>
                <div class="image">
                    <img src="${filteredNews.urlToImage}"/>
                </div>
                <div class="content">${filteredNews.content}</div>
        </div>`
        setDOM(dom,"detailView");
    }
}