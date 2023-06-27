//paywall component will go here
import React from 'react';
import MoneyButton from '@moneybutton/react-money-button'

class PayWall extends React.Component {

    state = {
        paid: false,
        lastPayment: null
    }

    mbOnPaymentCallback = (payment) => {
        this.setState({paid: true});
        this.setState({lastPayment: payment});
        //call the onPayment event handler that was passed to us
        if (this.props.onPayment) {
            this.props.onPayment(payment);
        }
    }

    render () {
        //TODO: check if payment expired
        return (
            <div>
                { !this.state.paid ? (
                <MoneyButton to='145' type='buy' amount='1' currency='USD' 
                buttonData='{"website":"GitHub","category":"paywall","description":"swipe code","owner":"dfoderick"}'
                label="to get code"
                onPayment={this.mbOnPaymentCallback}></MoneyButton>
                ) : null}
            </div>
        );
    }
}

export default PayWall;