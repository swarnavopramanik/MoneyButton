import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { TwitterFollowButton } from 'react-twitter-embed';
import MoneyButtonDonate from './MoneyButtonDonate.jsx';


function DonateToMe(props) {
    return <Card className="card text-white bg-dark mb-6">
    <CardBody>
      <CardTitle>If you found this site useful then please consider leaving a tip for the author.</CardTitle>
      <div className="row">
        <div style={{"padding":"5px"}}>
          <MoneyButtonDonate display="slider" buttonId="dropdown" 
              devMode={false} labelMoneyButton="Tip me"
              labelAmount = "Tip Amount" labelReference = ""
              maxAmount='50'
              showTransaction = {false} showSocialMedia = {true}
              type='tip' to='145' defaultAmount="1"
            />
        </div>
        <div style={{"width":"50%", "textAlign":"right", "padding":"5px"}}>
          <TwitterFollowButton screenName={'swarnavo1701'} />
        </div>
      </div>
    </CardBody>
  </Card>
;
}

  export default DonateToMe;