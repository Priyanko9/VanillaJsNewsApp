import {setDOM} from './utilities.js';
import handleAction from './HandleAction.js';

export default class NewsSection{
    
    dispatch(action){
        handleAction(action);
    }
    static getInstance(){
        return new NewsSection();
    }
    render(){
        let state=JSON.parse(localStorage.getItem("state"))||{};
        let newsToDisplay=(state.filteredNews && state.filteredNews.length > 0) ? state.filteredNews :state.showNews
        let dom= `<div class="newsSection">
        ${state.moreNews ? `<div class="latestNews"><a>Latest News</a></div>`:`<div></div>`}
         ${ newsToDisplay ?
            newsToDisplay.map((ele,index)=>{
            return `<a href="/#/detailNews?id=${index}"><div class="newsRow">
                <div class="titlePane">
                ${ele.author!==""&&ele.author!==null?`<div>
                    <label>Author:</label>
                    <span>${ele.author}</span>
                </div>`:`<div></div>`}
                <div class="title">
                   ${ele.title}
                </div>
                </div>
                <div class="image">
                    <img src="${ele.urlToImage}"/>
                </div>
            </div></a>`;
         }):`<div></div>`
        }
        </div>`;
        setDOM(dom,"NewsSection");
      
    }
}