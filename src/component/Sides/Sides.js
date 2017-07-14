/**
 * Created by urunzl on 20.1.2017.
 */
//components
import React,{ Component } from 'react';
import routes from '../../route/routes';
import Options from '../Options/Options';
import MainMenu from '../Menu/MainMenu';
import SecondaryMenu from '../Menu/SecondaryMenu';
import historyActions from '../../actions/historyActions';
import helpStore from '../../stores/helpStore';
import NumpadModal from '../ModalWindow/NumpadModal';
import loginActions from '../../actions/loginActions';
import selectionStore from '../../stores/selectionStore';
import Toolbar from '../Toolbar/Toolbar';
import Option from '../Option/Option';
//styles and images
import './Sides.css';
import openMenu from '../../../assets/openMenu.png';
import login from '../../../assets/login.png';
import logout from '../../../assets/logout.png';

/* eslint-disable */

var path = null;

class Sides extends Component{
    constructor(props){
        super(props);
        this.state = {
            showMenu : false,
            showLogin: false,
            activeItem: selectionStore.getActiveItem(),
           
        };
        this.pageClick = this.pageClick.bind(this);
        this.update = this.update.bind(this);
    }

    render(){
        const { pathName, data, ...others } = this.props;
        const pathArray = pathName.split("/").filter(e => e.length);
        let obj = routes;
        let setting = null;
        let history = {};
        let visitedItems = [];
        if (pathArray.length !== 0 ){
            pathArray.map(function (item) {
                if (obj[item].name === item){
                    setting = obj[item].setting;
                    history = obj[item];
                    if ( Object.keys(obj[item].children).length !== 0){
                        obj = obj[item].children;
                        visitedItems.push(history);
                    }
                }
            })
        }
        !helpStore.getIsRendering() && path !== pathName ? historyActions.pushHistory(history): false;
        path = pathName;
        return(
            <div id="sides">
                <div id="left">
                    <div id="menuOpenButton" onClick={this.openMainMenu.bind(this)}>
                        <img src={openMenu} width={40} height={40} />
                    </div>
                <SecondaryMenu actualPage={history} obj={obj} visitedItems={visitedItems} pathArray={pathArray} lang={this.props.lang}/>
                </div>
                <div id="top">
                    <Toolbar  actualPage={history} lang={this.props.lang}/>
                    <div id="article">
                        <div id="article-text">
                        Article 1, Tx 26, Uno
                        </div>
                        <div id="article-hamburger">
                            <svg width={40} height={40} stroke="black" strokeWidth="2">
                                <line x1="10" y1="15" x2="30" y2="15"/>
                                <line x1="10" y1="20" x2="30" y2="20"/>
                                <line x1="10" y1="25" x2="30" y2="25"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div id="right">
                    {pathArray.length !== 0 && history.setting ?
                        <Option data={data}/>
                    : false }
                   
                    <div id="startButt"></div>
                </div>
                {this.state.showLogin ?
                    <NumpadModal value="" onUpdate={this.showLoginNumpad.bind(this)} editValue={this.setPassword.bind(this)} password={true}/>
                :false}
                {this.state.showMenu ?
                    <MainMenu update={this.openMainMenu.bind(this)} routes={routes} data={data} pathName={pathName} />
                 : false}
            </div>
        )
    }

    openMainMenu(){
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    showLoginNumpad(){
        this.setState({
            showLogin: !this.state.showLogin
        })
    }

    logout(item){
        this.props.closeInfoPage(item);
        loginActions.logout();

    }

    setPassword(value){
        this.setState({
            showLogin: !this.state.showLogin
        });
        loginActions.login(value);
    }

    componentDidMount() {
        this.myTimer = setTimeout(()=>{
            this.logout(true);
        },120000);
        window.addEventListener('click', this.pageClick, false);
    }

    update() {
        this.setState({
            activeItem: selectionStore.getActiveItem(),
           });
    }

    componentWillMount() {
        selectionStore.addChangeListener(this.update);
    }

    componentWillUnmount(){
        window.removeEventListener('click', this.pageClick, false);
        selectionStore.removeChangeListener(this.update);
    }

    pageClick(){
        clearTimeout(this.myTimer);
        this.myTimer = setTimeout(()=>{
            this.logout(true);
        },120000);
    }
}

export default Sides;