import React, {Component} from 'react'
import MoneyButton from '@moneybutton/react-money-button'
import ShareButtonTwitter from './ShareButtonTwitter.jsx';
import Receipt from './Receipt.jsx'
// import {
//     TwitterShareButton, TwitterIcon
//   } from 'react-share';

class MoneyButtonDonate extends React.Component {

    static defaultProps = {
        ...Component.defaultProps,
        currency: "USD",
        to: "0",
        type: 'tip',
        labelMoneyButton: 'Slide to Donate',
        labelReference: 'Order Number',
        labelAmount: 'Amount',
        maxAmount: 100,
        minAmount: .01,
        showTransaction: false,
        showSocialMedia: false,
        hashTag:"",
        buttonId: null,
        buttonData: null,
        clientIdentifier: null
    }

    state = {
        isDebug: false,
        debugTxid: "50eac9fafcbb060779f37bca4e54f5ff5e179656ba6bd2788530de7e89b62047",
        amount: "",
        reference: "",
        isAfterSwipeSuccess: false,
        lastPayment:"",
        txid:""
    };

    handleChangeAmount = event => {
        this.setState({ amount: event.target.value });
    }
    handleChangeReference = event => {
        this.setState({ reference: event.target.value });
    }

    styleFont = {
        fontFamily: 'sans-serif'
      };

    mbOnPaymentCallback = (payment) => {
        const msg = JSON.stringify(payment)
        console.log(msg);
        this.setState({isAfterSwipeSuccess: true});
        this.setState({lastPayment: payment});
    }

    mbOnErrorCallback = (error) => {
        this.setState({isAfterSwipeSuccess: false});
        console.error(error);
        alert(`An error occured in Money Button. 
        Most likely there is a problem with they way you have set up your button. 
        The error message is "${error}"`);
    }

    render() {
        //let amt = process.env.REACT_APP_DONATE_AMOUNT;
        //to has to be assigned a value otherwise the button does not render.
        //if user tries to swipe with to = 0 then they will get an error
        let toAddress = this.props.to || "0";
        let amt = this.state.amount || this.props.defaultAmount || "0.01";
        let amtInput = this.state.amount || this.props.defaultAmount;
        let dsp = this.props.display;
        return (
            <div style={{"minWidth":"450px"}}>
                <datalist id="amounts">
                <option value="1" label="$1"/>
                <option value="5"/>
                <option value="10"/>
                <option value="20" label="$20"/>
                <option value="25"/>
                <option value="50" label="$50"/>
                <option value="75"/>
                <option value="100" label="$100"/>
                </datalist>
                {dsp === 'dropdown' ? (
                <div style={{float:"left", padding:"5px"}}>
                    <div style={{fontSize:"small", ...this.styleFont}}>
                        {this.props.labelAmount}
                    </div>
                    <div style={{...this.styleFont}}>
                    <select value={amt} style={{width:"90px"}}
                        onChange={this.handleChangeAmount}>
                        <option value="1">$1</option>
                        <option value="5">$5</option>
                        <option value="10">$10</option>
                        <option value="20">$20</option>
                        <option value="50">$50</option>
                        <option value="75">$75</option>
                        <option value="100">$100</option>
                    </select>
                    </div>
                </div>
                ) : null}
                {dsp === 'input' ? (
                <div style={{float:"left", padding:"5px"}}>
                    <div style={{fontSize:"small", ...this.styleFont}}>
                        {this.props.labelReference}
                    </div>
                    <div style={{...this.styleFont}}>
                        <input type="text" maxLength="20" id="reference"
                            value={this.state.reference} size="15"
                            onChange={this.handleChangeReference}></input>
                    </div>
                    <div style={{fontSize:"small", ...this.styleFont}}>
                        {this.props.labelAmount}
                    </div>
                    <div style={{fontSize:"small", ...this.styleFont}}>
                        <input type="number" value={amtInput} onChange={this.handleChangeAmount} 
                        min={this.props.minAmount} max={this.props.maxAmount} step="0.01" size="100px"></input>
                    </div>
                </div>
                ) : null}
                {dsp === 'slider' || !dsp ? (
                <div style={{float:"left", padding:"5px"}}>
                    <div style={{fontSize:"small", ...this.styleFont}}>
                        {this.props.labelAmount}
                    </div>
                    <div style={{...this.styleFont}}>
                        <input type="range" min={this.props.minAmount} max={this.props.maxAmount} 
                            id="donationamount" step=".01"
                            list="amounts"
                            value={this.state.amount}
                            onChange={this.handleChangeAmount}></input>
                    </div>
                </div>
                ) : null}
                <div style={{float:"left"}}>
                    <MoneyButton
                        to={toAddress}
                        clientIdentifier={this.props.clientIdentifier}
                        amount={amt}
                        currency={this.props.currency}
                        type={this.props.type}
                        label={this.props.labelMoneyButton}
                        opReturn={this.props.devMode ? null : this.state.reference}
                        onPayment={this.mbOnPaymentCallback}
                        onError={this.mbOnErrorCallback}
                        buttonId = {this.props.buttonId}
                        devMode={this.props.devMode}
                        buttonData={this.props.buttonData}
                    />
                        <div style={{position:"relative", display:"inline-block", verticalAlign:"top", margin:"1px"}}>
                        {this.state.isDebug || this.state.openReceipt || (this.state.isAfterSwipeSuccess && this.props.showTransaction) ? (
                            <div>
                                <Receipt payment={this.state.lastPayment}/>
                            </div>
                        ):null}
                        {this.state.isDebug || (this.state.isAfterSwipeSuccess && this.props.showSocialMedia) ? (
                            <div>
                            <ShareButtonTwitter/>
                            </div>
                        ):null}
                        </div>
                </div>
            </div>
        )
    }
}

export default MoneyButtonDonate;