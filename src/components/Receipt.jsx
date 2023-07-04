import React, {Component} from 'react'
import { Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactToPrint from "react-to-print";
import axios from 'axios'

//set props.payment
//state.transaction gets pulled from cloud
class Receipt extends Component {
    state = {
        openReceipt: false,
        showDetails: false,
        payment: null,
        transaction: null
    }

    componentDidMount () {
        this.loadTransaction(this.state.payment);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.payment !== prevState.payment){
            if (!nextProps.payment || nextProps.payment['txid'] === "undefined") {
                return;
            }
            return {payment : nextProps.payment};
            // const tx = this.loadTransaction(nextProps.payment);
            // this.setState({transaction : tx});
        }
        else return {};
     }
     
     componentDidUpdate(prevProps, prevState) {
        if (this.props.payment !== prevProps.payment) {
            this.loadTransaction(this.props.payment);
        }
      }

    loadTransaction(payment) {
        if (!payment) {
            console.debug("skipping null payment");
            return null;
        }
        let tx = null;
        axios.get(`https://rest.bitcoin.com/v1/transaction/details/${payment['txid']}`)
        .then(response =>  {
                tx = JSON.stringify(response['data']);
                this.setState({transaction: tx});
            })
        .catch(error => {
            this.setState({transaction: null});
            console.error(error);
        });
    }

    timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
      }

      showRawTransaction = () => {
        window.open(`https://explorer.bitcoin.com/bch/tx/${this.props.payment['txid']}`, '_blank');
    }

    refreshTransaction = () => {
        this.loadTransaction(this.state.payment);
    }

    toggleReceipt = () => {
        this.setState({openReceipt: !this.state.openReceipt});
    }

    toggleDetails = () => {
        this.setState({showDetails: !this.state.showDetails});
    }
    clickTransaction = () => {
        // let txid = "invalid";
        // if(this.state.lastPayment && this.state.lastPayment.hasOwnProperty('txid')) {
        //     txid = this.state.lastPayment["txid"];
        // } else if (this.state.isDebug) {
        //     txid = this.state.debugTxid;
        // }
        //this.setState({txid: txid});
        this.setState({openReceipt: true});
    }

    render () {
        //console.log("render");
        let txid = "";
        if (this.props.payment) {
            txid = this.props.payment['txid'];
        }
        let tx = [];
        let vout1 = null;
        if (this.state.transaction) {
            tx = JSON.parse(this.state.transaction);
            vout1 = tx['vout'][0];
        }
        return (
            <div>
                <Button onClick={this.clickTransaction} style={{height:"30px", width:"75px", padding:"3px"}}
                >
                    Receipt
                </Button>

                <Modal isOpen={this.state.openReceipt} toggle={this.toggleReceipt} size="lg"
                    ref={el => (this.componentRef = el)}>
                <ModalHeader toggle={this.toggleReceipt}>Transaction Receipt</ModalHeader>
                <ModalBody>
                    {/* <Receipt txid={this.state.txid} ref={el => (this.componentRef = el)}></Receipt> */}
                    <div>txid: {txid}</div>
                    <div>time: {this.timeConverter(tx['time'])}</div>
                    <div>value: {vout1 ? vout1['value']: '?'}</div>
                    <div>fees: {tx['fees']}</div>
                    <div>addresses: {vout1 ? vout1['scriptPubKey']['addresses']: '?'}</div>
                    <div>confirmations: {tx['confirmations']}</div>
                    { this.state.showDetails ? (
                     <div>{this.state.transaction}</div>
                    ): null}
                </ModalBody>
                <ModalFooter>
                    <ReactToPrint
                    trigger={() => <Button color="primary">Print</Button>}
                    content={() => this.componentRef}
                    />
                    {' '}
                    <Button color="secondary" onClick={this.showRawTransaction}>Transaction</Button>{' '}
                    <Button color="secondary" onClick={this.toggleDetails}>Details</Button>{' '}
                    <Button color="secondary" onClick={this.refreshTransaction}>Refresh</Button>{' '}
                    <Button color="secondary" onClick={this.toggleReceipt}>Close</Button>
                </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Receipt;
