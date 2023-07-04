import React, {Component} from 'react';
import logo from '../logo.svg';
import { TwitterFollowButton } from 'react-twitter-embed';
import { Card, } from 'reactstrap';

class Header extends Component {
    render() {
        return (
          <Card className="card text-white bg-dark mb-6">
            <header className="App-header">
            <div className="clearfix" style={{ padding: '.5rem' }}>
              <div className="float-left">
                <a target="blank" href="https://www.moneybutton.com"><img src={logo} className="App-logo" alt="logo" /></a>
                <h1 className="App-title">Create your customized NeucronPay Button</h1>
              </div>
              <div className="float-right" style={{"padding":"5px"}}>
                <TwitterFollowButton screenName={'swarnavo1701'} />
              </div>
            </div>
            </header>
            </Card>
    
        );
    }
}

export default Header;