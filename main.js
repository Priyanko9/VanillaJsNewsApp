import handleAction from './src/HandleAction.js';
import {fetchCall,render} from './src/utilities.js';


function setIntervalMethod(){
    let interval=setInterval(()=>{
        handleAction({type:"loadNews"});
    },15000)
    localStorage.setItem("interval",interval);
}
(function startApp(){
    handleAction({type:"loadNews"});
    setIntervalMethod();
})();
