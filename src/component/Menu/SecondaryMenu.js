/**
 * Created by urunzl on 17.10.2016.
 */
//components/stores/actions
import React,{ Component } from 'react';
import { Link, browserHistory } from 'react-router';
import routes from '../../route/routes';


//styles/icons
import './Menu.css';
import arrowDown from '../../../assets/arrow-down.png'

/* eslint-disable */

class SecondaryMenu extends Component{
    constructor(props){
        super(props);
        this.state={
            showedObject : null,
            activeItem : null,
        };
        this.closeSub = this.closeSub.bind(this);
    }

    render(){
        const {visitedItems, pathArray, obj, ...others} = this.props;
        let counter = -1;
        let counterA = -1;  
        let mainItemActive = false;
        return(
            <div id="header">
                <div className={"topMenu level-" + visitedItems.length } id="topMenu">
                    <div className="x-scroll">
                    {visitedItems.map(function (item){
                        let model = item;
                        let activeItem;
                        if(pathArray[pathArray.length-1] === model.name){
                            mainItemActive = true;
                            activeItem = true;
                        }
                        else
                            activeItem = false;
                        counter++;
                        if (model.name !== pathArray[pathArray-1]){
                            return(
                                <div key={model.name} className={"topMenuItem active level-" + counter + " " + (activeItem? "actual" : "")} onClick={this.showSubMenu.bind(this,model)}>
                                   <div className="topMenuIcon">
                                        <Link key={item} to={model.hash} onClick={e => e.preventDefault()} className="menuLink">
                                            <img src={model.icon} className="secondaryIcon" height="35px" width="35px"/>
                                            {counter === 0 || Object.keys(visitedItems[counter-1].children).length !== 1 ? this.state.activeItem !== model ?
                                                <svg className="listMenu" width={16} height={12} strokeWidth={2} stroke='white'>
                                                    <path d="M0,2 L16,2"/>
                                                    <path d="M0,6 L16,6"/>
                                                    <path d="M0,10 L16,10"/>
                                                </svg>
                                                    :<svg id="arrowDown" width="16px" height="12px" fill="white">
                                                <polygon points="0,2 8,12 16,2"></polygon>
                                            </svg>
                                            :false}
                                            <div className="secondaryText">
                                                {model.names[this.props.lang].toUpperCase()}
                                            </div>
                                        </Link>
                                    </div>
                                    {this.state.activeItem === model  ?
                                        <div className="subTop">
                                            
                                            <div className={"subTopMenu level-"+counter}>
                                                {Object.keys(this.state.showedObject).map(function(item){
                                                let model = this.state.showedObject[item];
                                                return(
                                                    <div key={item} className="subTopMenuItem">
                                                        <Link key={item} to={model.hash} className="menuLink">
                                                            <img src={model.icon} className="secondaryIcon" height="35px" width="35px"/>
                                                            <div className="secondaryText">
                                                                {model.names[this.props.lang].toUpperCase()}
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )
                                            },this)}
                                            </div>
                                        </div>
                                        :false
                                    }
                                </div>
                            )
                        }
                    },this)}
                    {Object.keys(obj).map(function (item) {
                        let model = obj[item];
                        counterA++;
                        let activeItem = pathArray[pathArray.length-1] === model.name;
                        return(
                            <div key={model.name} className={ "topMenuItem finalItem level-"+(counter+1) + " " + (activeItem? "actual" : "")}>
                                <div className="topMenuIcon">
                                    <Link key={item} to={model.hash} className="menuLink">
                                        <img src={model.icon} height="35px" className="secondaryIcon" width="35px"/>
                                        <div className="secondaryText">
                                            {model.names[this.props.lang].toUpperCase()}
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    },this)}
                </div>
            </div>
            </div>
        )
    }

    closeSub(){
        this.setState({showedObject: null, activeItem: null});
        document.removeEventListener("click", this.closeSub);
    }

    showSubMenu(i){
        let showSub = null;
        let obj = routes;
        this.props.pathArray.map(function (item) {
            if (obj[item].name === item) {
                if (obj[item] === i)
                    showSub = obj;
                if ( Object.keys(obj[item].children).length !== 0)
                    obj = obj[item].children;
            }
        });
        if(Object.keys(showSub).length < 2){
            browserHistory.push(i.hash);
            return;
        }
        
        let topMenu = document.getElementById("topMenu");
        topMenu.style.overflowY = showSub === this.state.showedObject ? "scroll" : "visible";

        if(showSub === this.state.showedObject)
            this.setState({showedObject: null, activeItem: null});
        else{
            this.setState({showedObject : showSub, activeItem: i});
            document.addEventListener("click", this.closeSub);
        }
    }
}

export default SecondaryMenu;

