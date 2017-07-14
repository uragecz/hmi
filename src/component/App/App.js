import React, { Component } from 'react';
import './App.css';
import Footer from '../Footer/Footer';
import languageStore from '../../stores/languageStore';
import loginStore from '../../stores/loginStore';
import Sides from '../Sides/Sides';
import InfoPage from '../InfoPage/InfoPage';
import Help from '../Help/Help';
import Message from '../Message/Message';

global.Perf = require('react-addons-perf');

class App extends Component {
    constructor(props){
        super(props);
        this.state= {
            data: languageStore.getData(),
            user: loginStore.getLoggedUser(),
            infoPage: false,
            helpPage: false,
            mobile:  ((window.innerWidth > 0 ? window.innerWidth : screen.width)  <= 720)
        };
        this.changeLanguage = this.changeLanguage.bind(this);
        this.getLoggedUser = this.getLoggedUser.bind(this);
    };

    render() {
        const data = this.state.data;
        return (
            <div id="appContainer" on>
                <Message />
                <Sides data={data.page} mobile={this.state.mobile} closeInfoPage={this.closeInfoPage.bind(this)} logged={this.state.user} lang={data.lang} pathName={this.props.location.pathname}/>
                <div id="content">
                    {React.cloneElement(this.props.children, { data: data.page.content, mobile: this.state.mobile})}
                </div>
                <Footer languageActiveIcon={data.languageIcon} lang={data.lang} closeHelpPage={this.closeHelpPage.bind(this)}/>
                {this.state.infoPage ? <InfoPage closeInfoPage={this.closeInfoPage.bind(this)}/> : false}
                {this.state.helpPage ? <Help closeHelpPage={this.closeHelpPage.bind(this)} languageActiveIcon={data.languageIcon} lang={data.lang} /> : false}
            </div>
        );
    }

    componentDidUpdate () {
        let page = document.getElementById("page");
        let newScale = this.props.mobile ? 1 :  (document.body.clientHeight - 100) / page.offsetHeight ;
        if (newScale < 1)
        {
            page.style.transform = 'scaleY('+newScale+')';
            page.style.transformOrigin = "top left";
        }
    }

    componentDidMount () {
        let page = document.getElementById("page");
        let newScale = this.props.mobile ? 1 :  (document.body.clientHeight - 100) / page.offsetHeight ;
        if (newScale < 1)
        {
            page.style.transform = 'scaleY('+newScale+')';
            page.style.transformOrigin = "top left";
        }
    }
    
    closeInfoPage(close){
        this.setState({
            infoPage : close
        })
    }

    closeHelpPage(close){
        this.setState({
            helpPage : close
        })
    }

    changeLanguage(){
        this.setState({
            data: languageStore.getData()
        })
    }

    getLoggedUser(){
        this.setState({
            user: loginStore.getLoggedUser()
        })
    }

    componentWillMount() {
        languageStore.addChangeListener(this.changeLanguage);
        loginStore.addChangeListener(this.getLoggedUser);
        window.addEventListener("resize", this.changeDevice.bind(this));
    }

    componentWillUnmount(){
        languageStore.removeChangeListener(this.changeLanguage);
        loginStore.removeChangeListener(this.getLoggedUser)
        window.removeEventListener("resize", this.changeDevice.bind(this));
    }

    changeDevice(){
        this.setState({
             mobile: ((window.innerWidth > 0 ? window.innerWidth : screen.width)  <= 720)
        })
    }
}

export default App;
