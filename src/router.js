import handleAction from './HandleAction.js';

export default class Router{
    constructor(){
        this.route=[];
        window.addEventListener("hashchange",this.hashChange);
    }
    addRoute(route){
        this.route.push(route);
    }
    hashChange=(event)=>{
        if(window.location.hash===""){
            let state=JSON.parse(localStorage.getItem("state"));
            state.viewChange=true;
            if(state.filteredNews)  state.filteredNews.length=0;
            localStorage.setItem("state",JSON.stringify(state));
            let interval=localStorage.getItem("interval");
            if(!interval){
                let interval=setInterval(()=>{
                    handleAction({type:"loadNews"});
                },15000)
                localStorage.setItem("interval",interval);
            }
            handleAction({type:"loadNews"});
        } else {
            let state=JSON.parse(localStorage.getItem("state"));
            state.viewChange=true;
            localStorage.setItem("state",JSON.stringify(state));
            let interval=localStorage.getItem("interval");
            if(interval){
                clearInterval(interval);
                localStorage.removeItem("interval");
            }
            this.route.map(ele=>{
                if(window.location.hash.match(new RegExp(ele.route))){
                    let {Component}=ele;
                    Component.forEach((view)=>{
                        let component=new view();
                        component.render();
                    })
                }
            })
        }
    }
}