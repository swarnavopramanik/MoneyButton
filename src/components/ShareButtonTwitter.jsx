import React, {Component} from 'react'
import { TwitterShareButton } from 'react-twitter-embed';

class ShareButtonTwitter extends Component {
    render() {
        return (
            <div style={{padding:"1px"}}>
            <TwitterShareButton
                url={'https://moneybutton.com'}
                options={{ text: '#moneybutton is awesome', size: 'large' }}
                />
            </div>
        );
    }

}

export default ShareButtonTwitter;