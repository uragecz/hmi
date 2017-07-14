/**
 * Created by urunzl on 20.10.2016.
 */
import React from 'react';
import Page from '../../../component/Page/Page'
import InputList from '../../../component/InputList/InputList';
import productSettingsStore from '../../../stores/productSettingsStore';
import actionSettings from '../../../actions/settingsActions';
import './productSettings.css';

class ProductSettings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            productSpeed: productSettingsStore.getTotalSpeed(),
            productPackage: productSettingsStore.getPackage(),
            productAIR: productSettingsStore.getAIR(),
            productROTOR: productSettingsStore.getROTOR()
        };
        this.update = this.update.bind(this);
    }
    render(){
        const { data } = this.props;
        const text = data.productSettings;
        return(
            <Page>  
                <div className="item size-4-4">
                    <div className="element">
                        <div className="element size-1-3">
                            <InputList data={text.speed} modal={false} name="PS" header={[text.speed.label,"",""]} type={["name","input1","unit1"]} save={this.saveList.bind(this)} list={this.state.productSpeed}/>
                            <InputList data={text.air} modal={false} name="PA" header={[text.air.label,"",""]} type={["name","input1","unit1"]} save={this.saveList.bind(this)} list={this.state.productAIR}/>
                        </div>
                        <div className="element size-1-3">
                            <div id="rotor-image"></div>
                        </div>
                        <div className="element size-1-3">
                            <InputList data={text.package} modal={false} name="PP" header={[text.package.label,"",""]} type={["name","input1","unit1"]} save={this.saveList.bind(this)} list={this.state.productPackage}/>
                            <InputList data={text.rotor} modal={false} name="PR" header={[text.rotor.label,"",""]} type={["name","input1","unit1"]} save={this.saveList.bind(this)} list={this.state.productROTOR}/>
                        </div>
                    </div>
                </div>
                    <div className="container">
                    <div className="item size-1-3">
                        <div className="element full">
                            <div className="column-label">FSI</div>
                            <div className="checkboxOne">
                                <input type="checkbox" value="1" id="checkboxOneInput" name=""/>
                                <label htmlFor="checkboxOneInput"></label>
                            </div>
                        </div>
                    </div>
                    <div className="item size-1-3">
                        <div className="element full">
                        <div className="column-label">QSI</div>
                        <div className="checkboxOne">
                            <input type="checkbox" value="1" id="checkboxTwoInput" name=""/>
                            <label htmlFor="checkboxTwoInput"></label>
                            </div>
                        </div>
                    </div>
                     <div className="item size-1-3">
                        <div className="element full">
                            <div className="column-label">ASI</div>
                            <div className="checkboxOne">
                                <input type="checkbox" value="1" id="checkboxThreeInput" name=""/>
                                <label htmlFor="checkboxThreeInput"></label>
                            </div>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }

    componentWillUnmount(){
        productSettingsStore.removeChangeListener(this.update);
    }

    componentWillMount(){
        productSettingsStore.addChangeListener(this.update);
    }

    toggleChange(){

    }

    update(){
        this.setState({
            productSpeed: productSettingsStore.getTotalSpeed(),
            productPackage: productSettingsStore.getPackage(),
            productROTOR: productSettingsStore.getROTOR(),
            productAIR: productSettingsStore.getAIR()
        })
    }

    saveList(list,type){
        if(type === 'PS')
            actionSettings.setProductSpeed(list);
        else if(type === "PP")
            actionSettings.setProductPackage(list);
        else if(type === "PA")
            actionSettings.setAir(list);
        else if(type === "PR")
            actionSettings.setRotor(list);
    }
}

export default ProductSettings;

