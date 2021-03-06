/**
 * Created by urunzl on 1.8.2016.
 */
//components
import React, {Component} from 'react';
import qmSettingsStore from '../../../stores/qmSettingsStore';
import qmSettingsAction from '../../../actions/qmSettingsAction';
import Page from '../../../component/Page/Page';
import InputList from '../../../component/InputList/InputList';
import LoadingModal from '../../../component/ModalWindow/LoadingModal';
import Matrix from '../../../component/Matrix/Matrix';

//styles and images
import './qmSettings.css';

class QmSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            done: false,
            channels: qmSettingsStore.getChannels(),
            piecer: qmSettingsStore.getPiecer(),
            SLCMOSettings: qmSettingsStore.getSLCMOsettings(),
            qAlarms: qmSettingsStore.getQAlamrs(),
            yAlarms: qmSettingsStore.getYAlarms(),
            techAlarms: qmSettingsStore.getTechAlarms()
        };
        this.update = this.update.bind(this);
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({done: true});
        }, 200);  //delay this to allow React to actually render the initial state.
    }

    render(){
        const { data } = this.props;
        const text = data.qmSettings;
        return(
            <Page>
                <div className="item size-1-3">
                    <div className="element">
                        <InputList data={text.nslt} modal={false} name="CHAN" header={["N-S-L-T","%","mm",""]} multiple={true} type={["name","input1","input2","box"]} save={this.saveList} list={this.state.channels} />
                        <InputList data={text.slcmo} modal={false} name="SL" header={["SL-C-MO","%","m",""]} multiple={true} type={["name","input1","input2","box"]} save={this.saveList} list={this.state.SLCMOSettings} />
                    </div>
                </div>
                <div className={"item size-2-3" + (this.props.mobile ? "" : " matrix-center")} id="heightMatrix" >
                        {!this.state.done ? <LoadingModal/> : false}
                        {this.state.done ? <div className="it"><Matrix scale="heightMatrix" mobile={this.props.mobile} channels={this.state.channels} /></div> : false}
                </div>
                <div className="container">
                <div className="item size-1-4" >
                    <div className="element">
                        <InputList data={text.piecer} modal={false} name="PIER" header={[text.piecer.label,"%",""]} multiple={false} type={["name","input1","box"]} save={this.saveList} list={this.state.piecer} />
                    </div>
                </div>
                <div className="item size-1-4">
                    <div className="element">
                        <InputList data={text.qAlarms} modal={false} name="QA" header={[text.qAlarms.label,"%",""]} multiple={false} type={["name","input1","box"]} save={this.saveList} list={this.state.qAlarms} />
                    </div>
                </div>
                <div className="item size-1-4">
                    <div className="element">
                        <InputList data={text.yAlarms} modal={false} name="YA" header={[text.yAlarms.label,"No.","km",""]} multiple={true} type={["name","input1","input2","box"]} save={this.saveList} list={this.state.yAlarms} />
                    </div>
                </div>
                <div className="item size-1-4">
                    <div className="element">
                        <InputList data={text.techAlarms} modal={false} name="TA" header={[text.techAlarms.label,"%",""]} multiple={false} type={["name","input1","box"]} save={this.saveList} list={this.state.techAlarms} />
                    </div>
                </div>        
                </div>        
            </Page>
        )
    }

    componentWillMount(){
        qmSettingsStore.addChangeListener(this.update);
    }

    componentWillUnmount(){
        qmSettingsStore.removeChangeListener(this.update);
    }

    update(){
        this.setState({
            channels: qmSettingsStore.getChannels(),
            piecer: qmSettingsStore.getPiecer(),
            SLCMOSettings: qmSettingsStore.getSLCMOsettings(),
            qAlarms: qmSettingsStore.getQAlamrs(),
            yAlarms: qmSettingsStore.getYAlarms(),
            techAlarms: qmSettingsStore.getTechAlarms()
        })
    }

    saveList(list,type){
        switch (type){
            case 'CHAN':
                qmSettingsAction.setChannels(list);
                break;
            case 'SL':
                qmSettingsAction.setSLCMO(list);
                break;
            case 'QA':
                qmSettingsAction.setQAlarms(list);
                break;
            case 'YA':
                qmSettingsAction.setYAlarms(list);
                break;
            case 'TA':
                qmSettingsAction.setTechAlarms(list);
                break;
            case 'PIER':
                qmSettingsAction.setPiecer(list);
                break;
            default:
                return;
        }
    }
}

export default QmSettings;
