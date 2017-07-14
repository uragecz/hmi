import React, { Component } from 'react'
import "./Option.css"
import selectionStore from '../../stores/selectionStore';
import selectionActions from '../../actions/selectionActions';
import NumpadModal from '../ModalWindow/NumpadModal';
import ListModal from '../ModalWindow/ListModal';

var downTimer;
var touchClick = false;

class Option extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unit: parseInt(selectionStore.getUnit(), 10),
            group: selectionStore.getGroup(),
            shift: selectionStore.getShift(),
            step: selectionStore.getUnitStep(),
            minUnit: selectionStore.getMinUnit(),
            maxUnit: selectionStore.getMaxUnit(),
            shiftList: selectionStore.getShiftList(),
            groupList: selectionStore.getGroupList(),
            activeItem: selectionStore.getActiveItem(),
            showList: false,
            showOption: false,
            activeShift: selectionStore.isShiftActive(),
            openItem: null
        };
        this.handleOpenList = this.handleOpenList.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.update = this.update.bind(this);
        this.openOptions = this.openOptions.bind(this);
    }
    

    render () {
        const {data, mobile} = this.props;
        return (
            <div id="option">
                <div id="group-unit">
                    <div id="group" className={"option-item " + (this.state.activeItem === "group" ? "active" : false)} onClick={this.changeActiveOption.bind(this,'group')} onTouchStart={this.handleTouchStart.bind(this,"group")} onTouchEnd={this.handleTouchEnd.bind(this)} onMouseUp={this.handleMouseUp.bind(this)} onMouseDown={this.handleMouseDown.bind(this,"group")}>
                        {this.state.groupList[this.state.group]}
                    </div>
                    {this.state.activeItem==="group" ?
                        this.plusMinus("group")
                    : false}
                    <div id="unit" className={"option-item " + (this.state.activeItem === "unit" ? "active" : false)} onClick={this.changeActiveOption.bind(this,'unit')} onTouchStart={this.handleTouchStart.bind(this,"unit")} onTouchEnd={this.handleTouchEnd.bind(this)} onMouseUp={this.handleMouseUp.bind(this)} onMouseDown={this.handleMouseDown.bind(this,"unit")}>
                        {this.state.unit}
                    </div>
                    {this.state.activeItem==="unit" ?
                        this.plusMinus("unit")
                    : false}
                </div>
                <div id="shift" className={"option-item "+ (this.state.activeShift? "active" : false)} onClick={this.changeActiveOption.bind(this,'shift')} onTouchStart={this.handleTouchStart.bind(this,"shift")} onTouchEnd={this.handleTouchEnd.bind(this)} onMouseUp={this.handleMouseUp.bind(this)} onMouseDown={this.handleMouseDown.bind(this,"shift")}>
                    <div className="shift from">
                        {this.state.shiftList[this.state.shift][2]}
                    </div>
                    <div className="shift num">
                        {this.state.shiftList[this.state.shift][1]}
                    </div>
                    <div className="shift to">
                        {this.state.shiftList[this.state.shift][3]}
                    </div>
                </div>
                {this.state.activeShift ?
                    this.plusMinus("shift")
                : false}
                {this.state.showList ?
                                (() => {
                                    switch (this.state.openItem) {
                                        case "unit":
                                            return <NumpadModal onUpdate={this.handleOpenList} min={this.state.minUnit}
                                                                max={this.state.maxUnit} value={this.state.unit}
                                                                editValue={this.changeValue}/>;
                                        case "group":
                                            return <ListModal type="group" title={data.option.group} list={this.state.groupList}
                                                              onUpdate={this.handleOpenList} item={this.state.group}/>;
                                        case "shift":
                                            return <ListModal type="shift" title={data.option.shift} list={this.state.shiftList} 
                                                              onUpdate={this.handleOpenList} item={this.state.shift}/>;
                                        default:
                                            return false;
                                    }
                                })()
                : false }
            </div>
        )
    }

    componentDidMount() {
        this.props.mobile ? window.addEventListener('click', this.pageClick, false) : false;
    }

    componentWillUnmount(){
        this.props.mobile ? window.removeEventListener('click', this.pageClick, false) : false;
    }

    componentWillMount() {
        selectionStore.addChangeListener(this.update);
    }
    componentWillUnmount() {
        selectionStore.removeChangeListener(this.update);
    }

    update() {
        this.setState({
            unit: selectionStore.getUnit(),
            shift: selectionStore.getShift(),
            group: selectionStore.getGroup(),
            shiftList: selectionStore.getShiftList(),
            groupList: selectionStore.getGroupList(),
            step: selectionStore.getUnitStep(),
            minUnit: selectionStore.getMinUnit(),
            maxUnit: selectionStore.getMaxUnit(),
            activeShift: selectionStore.isShiftActive(),
            activeItem: selectionStore.getActiveItem()
        });
    }

    changeActiveOption(type) {
        console.log(type);
        if(type === "shift")
            selectionActions.setShiftActive();
        else
            selectionActions.setActiveItem(type);
    }

    openOptions() {
        this.setState({
            showOption: true
        })
    }

    changeValue(value){
        selectionActions.switchUnit(parseInt(value,10));
        this.setState({
            showList: !this.state.showList
        })
    }

    changeActiveOption(type) {
        if(type === "shift")
            selectionActions.setShiftActive();
        else
            selectionActions.setActiveItem(type);
    }

    handleOpenList(type){
        this.setState({
            showList: !this.state.showList,
            openItem: type
        })
    }

    handleChangeValueByOne(operation,item){
        console.log('byOne',operation,item);
        if(item === "group" || item === "unit"){
            if (this.state.activeItem === "unit"){
                let number = operation === '+' ? this.state.unit + this.state.step : this.state.unit - this.state.step;
                if (number <= this.state.maxUnit && number >= this.state.minUnit)
                    selectionActions.switchUnit(number);
            }
            else if (this.state.activeItem === "group")
                operation === "+" ? selectionActions.switchGroup(this.state.group+1) : selectionActions.switchGroup(this.state.group-1)
        }
        else
            operation === "+" ?selectionActions.switchShift(this.state.shift+1): selectionActions.switchShift(this.state.shift-1);
    }

   plusMinus(type){
        return (
                <div className="plus-minus">
                        <div className="operator">
                            <svg className="plus-minus shift" width="60px" height="50px" onClick={this.handleChangeValueByOne.bind(this,"-",type)}  stroke="#244c5a" strokeWidth="3">
                                <path d="M20,25 L40,25"/>
                            </svg>
                        </div>
                    <div className="operator">
                        <svg  className="plus-minus shift" width="60px" height="50px" onClick={this.handleChangeValueByOne.bind(this,"+", type)} stroke="#244c5a" strokeWidth="3">
                            <path d="M20,25 L40,25"/>
                            <path d="M30,15 L30,35"/>
                        </svg>
                    </div>
                </div>
        )
    }

    handleTouchStart(type){
        console.log("touchStart",type)
        clearTimeout(this.downTimer);
        downTimer = setTimeout(()=>  {
            touchClick = true;
            this.handleOpenList(type);
        }, 300);
    }

    handleTouchEnd(e){
        clearTimeout(downTimer);
        touchClick ? e.preventDefault() : false; //because of modalList/Numpad dissaperring
        touchClick = false;
    }

    handleMouseUp(){
        clearTimeout(downTimer);
    }

    handleMouseDown(type){
        console.log("mouseDown",type)
        clearTimeout(this.downTimer);
        downTimer = setTimeout(()=>  {
            this.handleOpenList(type);
        }, 300);
    }
}




export default Option;