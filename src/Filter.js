import {setDOM} from './utilities.js';

export default class Filter{
    
    static getInstance(){
        return new Filter();
    }
    render(){
        let dom=`<div class="filter">
            <input type="text" id="searchInput" placeholder="search news"/>
        </div>`;
        setDOM(dom,"filter");
    }
} 