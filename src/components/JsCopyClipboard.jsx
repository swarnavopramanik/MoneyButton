import React, {Component} from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class JsCopyClipboard extends React.Component {
    static defaultProps = {
        ...Component.defaultProps,
        currency: "USD",
    }

    state = {
        copied: false
    }    

    render() {
        let code=`
        <div style="padding:5px">
        <div>
          ${this.props.labelReference}
        </div>
        <div>
          <input type="text" maxLength="20" id="pay-reference" size="15" name="pay-reference" onkeyup="return changeReference(this, event);"></input>
        </div>
        <div>
          ${this.props.labelAmount}
        </div>
        <div>
          <input type="number" min="0.01" max="100000.00" step="0.01" size="100px" onkeyup="return changeAmount(this, event);" id="pay-amount" name="pay-amount"></input>
        </div>
      </div>
      
      <div id="pay-button"></div>
      <script src="https://api.moneybutton.com/moneybutton.js"></script>
      <script>
        const mb_to = '${this.props.to}';
        const mb_type = '${this.props.type}';
        const mb_currency = '${this.props.currency}';
        const mb_label = '${this.props.labelMoneyButton}';
        moneyButton.render(
          document.getElementById('pay-button'), {
            to: mb_to,
            type: mb_type,
            amount: 0,
            currency: mb_currency,
            label: mb_label
          }
        );
      
        function renderMoneyButton(amt, reference) {
          moneyButton.render(
            document.getElementById('pay-button'), {
              to: mb_to,
              type: mb_type,
              amount: amt,
              currency: mb_currency,
              opReturn: reference,
              label: mb_label
            }
          );
        }
      
        function changeAmount(obj, event) {
          if (event.target.value) {
            renderMoneyButton(event.target.value, document.getElementById('pay-reference').value);
          }
        }
      
        function changeReference(obj, event) {
          if (event.target.value) {
            renderMoneyButton(document.getElementById('pay-amount').value, event.target.value);
          }
        }
      
      </script>
          `;
    
        return (
            <Card>
                  <CardBody>
                    <CardTitle>
                        <CopyToClipboard text={code}
                            onCopy={() => this.setState({copied: true})}>
                            <Button>Copy to clipboard</Button>
                        </CopyToClipboard>
                        {this.state.copied ? <span style={{color: 'green'}}>{' '}Copied. Paste the code into your site.</span> : null}
                    </CardTitle>
                    <div>
                      <textarea id="mb-code" rows="9" cols="80" value={code} 
                      style={{"overflow":"hidden", "resize":"none"}}  
                      readOnly={true}>
                      </textarea>
                    </div>
                    </CardBody>
            </Card>
        );
    }
}

export default JsCopyClipboard;