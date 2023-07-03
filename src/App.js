import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.jsx'
import { Alert, Card, CardBody, CardTitle, Button, Input, Label } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { Form, FormGroup, FormFeedback, FormText } from 'reactstrap';
import classnames from 'classnames';
import MoneyButtonDonate from "./components/MoneyButtonDonate.jsx";
import DonateToMe from './components/DonateToMe.jsx'
import JsCopyClipboard from './components/JsCopyClipboard'
import Receipt from './components/Receipt.jsx';
import ShareButtonTwitter from './components/ShareButtonTwitter.jsx';
import PayWall from './components/PayWall.jsx'
import Blur from 'react-css-blur'

//import axios from 'axios'

class App extends Component {

  state = {
    devMode: true,
    debugTxid: "50eac9fafcbb060779f37bca4e54f5ff5e179656ba6bd2788530de7e89b62047",
    type: "buy",
    to:"",
    currency:'USD',
    defaultAmount: "",
    labelMoneyButton: "Slide to Donate",
    labelAmount: "Enter Amount",
    labelReference: "Order Address",
    configTransactionAfterPayment: false,
    configSocialMediaAfterPayment: false,
    buttonId:"",
    clientIdentifier:"",
    hideAmount: false,
    showSliderLive: false,
    showDropDownLive: false,
    showInputLive: false,
    activeTab: 'common',
    website: '',
    category: '',
    description: '',
    owner:'',
    paidForCode: false
    }

  componentDidMount() {


  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      copied: false
    });
  };

  updateType = val => event => {
    if (event.target) {
      if (event.target.checked) {
        this.setState({
          type: val,
          copied: false
        });
      }
    }
  }

  toggleInput = () => {
    this.setState({
      showInputLive: !this.state.showInputLive
    });
  }
  toggleSlider = () => {
    this.setState({
      showSliderLive: !this.state.showSliderLive
    });
  }
  toggleDropDown = () => {
    this.setState({
      showDropDownLive: !this.state.showDropDownLive
    });
  }

  toggleShowTransaction = () => {
    this.setState({
      configTransactionAfterPayment: !this.state.configTransactionAfterPayment
    });
  }

  toggleShowSocialMedia = () => {
    this.setState({
      configSocialMediaAfterPayment: !this.state.configSocialMediaAfterPayment
    });
  }

  styles = {
    padding: '5px'
  };

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  whenPaid = (payment) => {
    this.setState({paidForCode: true});
  }


  render() {

    const buttonData = JSON.stringify({"website":this.state.website,"category":this.state.category,"description":this.state.description,"owner":this.state.owner});

    return (
      <div className="App">
        <Header></Header>
        <div style={{"alignText":"left", padding:"20px"}}>
          <div className="row">
            <div style={{"width":"40%"}}>
            <p>View source on GitHub <a href="https://github.com/swarnavopramanik/MoneyButton.git">https://github.com/swarnavopramanik/MoneyButton.gite</a></p>
            </div>
          </div>
          <div>
            <div className="row">

            <Card style={{"width":"50%"}}>
              <CardBody>
              <CardTitle>Customize your Money Button</CardTitle>

              <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'common' })}
                  onClick={() => { this.toggleTab('common'); }}
                >
                  Common Settings
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'buttondata' })}
                  onClick={() => { this.toggleTab('buttondata'); }}
                >
                  ButtonData
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'advanced' })}
                  onClick={() => { this.toggleTab('advanced'); }}
                >
                  Advanced
                </NavLink>
              </NavItem>
            </Nav>

              <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="common">
          <Container>
            <Form className="form">
              <Row>
                <Col style={{width:"50%"
             }}>
                <Label>Button Behavior</Label>
                </Col>
                <Col>
                
                <input type="checkbox" radioGroup="type" checked={this.state.type === 'tip'} onChange={this.updateType('tip')}></input> Tip
                {' '}            
                <input type = /* "radio" */ "checkbox" radioGroup="type" checked={this.state.type === 'buy'} onChange={this.updateType('buy')}></input> Buy
                {' '}  
                <input type = /* "radio" */ "checkbox" radioGroup="type" checked={this.state.type === 'add-to-wallet'} onChange={this.updateType('add-to-wallet')}></input> Add-To-Wallet
                {' '}  
                {  <MoneyButtonDonate display="slider"  devMode={this.state.devMode} labelMoneyButton={this.state.type}
                 labelAmount = {this.state.labelAmount} labelReference = {this.state.labelReference}  
                  showTransaction = {this.state.configTransactionAfterPayment} showSocialMedia = {this.state.configSocialMediaAfterPayment}
                  buttonId={this.state.buttonId} buttonData={buttonData} clientIdentifier={this.state.clientIdentifier}
                  type={this.state.type} to={this.state.to} defaultAmount={this.state.defaultAmount}
            /> 
}
                
                </Col>
              </Row>
              <Row>
                <Col xs="6"> 
                  <Label>Send to (User Number or address)</Label>
                </Col>
                <Col xs="6">
                  <FormGroup>
                    <FormText>User is required for Button to work!</FormText>
                    <Input type="text" placeholder="Send To User Number or address" valid={false}
                    required value={this.state.to} onChange={this.handleChange("to")}></Input>
                    <FormFeedback invalid="true">
                      A Money Button User Number is required! Otherwise the Try it Now buttons will not work!
                    </FormFeedback>
                  </FormGroup>
                 </Col>
              </Row>
              <Row>
                <Col>
                <Label>Default Amount</Label>
                </Col>
                <Col>
                 <Input type="number" step="0.01" value={this.state.defaultAmount} 
                 onChange={this.handleChange("defaultAmount")}
                 placeholder="Default Amount"></Input>
                 </Col>
              </Row>
              <Row>
                <Col>
                <Label>Money Button Label</Label>
                </Col>
                <Col>
                 <Input type="text" value={this.state.labelMoneyButton} 
                 onChange={this.handleChange("labelMoneyButton")}
                 placeholder="Money Button Label"></Input>
                 </Col>
              </Row>
              <Row>
                <Col>
                <Label>Prompt for Amount</Label>
                </Col>
                <Col>
                 <Input type="text" value={this.state.labelAmount} 
                 onChange={this.handleChange("labelAmount")}
                 placeholder="Amount Prompt"></Input>
                 </Col>
              </Row>
              <Row>
                <Col>
                <Label>Prompt for Reference</Label>
                </Col>
                <Col>
                 <Input type="text" value={this.state.labelReference} 
                 onChange={this.handleChange("labelReference")}
                 placeholder="Reference Prompt"></Input>
                 </Col>
              </Row>

            </Form>
            </Container>
          </TabPane>

          <TabPane tabId="buttondata">
            <Container>
            <Form className="form">
              <Row>
                <Col>
                <Label>Website</Label>
                </Col>
                <Col>
                 <Input type="text" value={this.state.website} 
                 onChange={this.handleChange("website")}
                 placeholder="Website"
                 ></Input>
                </Col>
              </Row>
              <Row>
                <Col>
                <Label>Category</Label>
                </Col>
                <Col>
                 <Input type="text" value={this.state.category} 
                 onChange={this.handleChange("category")}
                 placeholder="Category"
                 ></Input>
                 </Col>
              </Row>
              <Row>
              <Col>
                <Label>Description</Label>
                </Col>
                <Col>
                 <Input type="text" value={this.state.description} 
                 onChange={this.handleChange("description")}
                 placeholder="Description"
                 ></Input>
                 </Col>
              </Row>
              <Row>
                <Col>
                <Label>Owner</Label>
                </Col>
                <Col>
                 <Input type="text" value={this.state.owner} 
                 onChange={this.handleChange("owner")}
                 placeholder="Owner"></Input>
                 </Col>
              </Row>

            </Form>
            </Container>
          </TabPane>


          <TabPane tabId="advanced">
          <Container>
            <Form className="form">
            <Row>
              <Col>
                <label className="col-sm-4 col-form-label" ></label>
                <Label check>
                  <Input type="checkbox" value={this.state.configTransactionAfterPayment} 
                  onChange={this.toggleShowTransaction}/>
                  {' '}
                  Show Receipt after swipe
                  <Receipt payment={{'txid': this.state.debugTxid}}/>
                </Label>
              </Col>
              </Row>
              <Row>
              <Col>
                <label className="col-sm-4 col-form-label" ></label>
                <Label check>
                  <Input type="checkbox" value={this.state.configSocialMediaAfterPayment} 
                  onChange={this.toggleShowSocialMedia}/>
                  {' '}
                  Share on Social Media
                  <ShareButtonTwitter/>
                </Label>
              </Col>
              </Row>
              <Row>
              <Col>
                <Label>Button Id</Label>
                </Col>
                <Col>
                 <Input type="text" value={this.state.buttonId} 
                 onChange={this.handleChange("buttonId")}
                 placeholder="Button Id"></Input>
              </Col>
              </Row>
              
              <Row>
              <Col>
                <Label>Client Identifier</Label>
                </Col>
                <Col>
                 <Input type="text" value={this.state.clientIdentifier} 
                 onChange={this.handleChange("clientIdentifier")}
                 placeholder="Client Identifier"></Input>
              </Col>
              </Row>
            </Form>
            </Container>
          </TabPane>
        </TabContent>

              </CardBody>
            </Card>
            <div>
              <PayWall onPayment={this.whenPaid}></PayWall>
              <Blur radius={!this.state.paidForCode ? '5px' : '0' } transition="400ms"> {/* ! */}
              <fieldset disabled={!this.state.paidForCode}> {/* ! */}
              <JsCopyClipboard 
                      type={this.state.type}
                      to={this.state.to}
                      labelMoneyButton={this.state.labelMoneyButton}
                      labelReference = {this.state.labelReference}
                      labelAmount = {this.state.labelAmount}
              />
              </fieldset>
              </Blur>
              </div>
           </div>
           </div>
           <Alert color="primary">
              The following 3 examples of Money Button work in demo mode. That means NO FUNDS will be spent from your account.
            </Alert>
          <Card>
            <CardBody>
            <CardTitle>Select amount with a textbox...</CardTitle>
              <div className="row">
              <div style={{width:"50%"}}>
                <MoneyButtonDonate display="input"
                  devMode={this.state.devMode} labelMoneyButton={this.state.labelMoneyButton}
                  labelAmount = {this.state.labelAmount} labelReference = {this.state.labelReference}
                  showTransaction = {this.state.configTransactionAfterPayment} showSocialMedia = {this.state.configSocialMediaAfterPayment}
                  buttonId={this.state.buttonId} buttonData={buttonData} clientIdentifier={this.state.clientIdentifier}
                  type={this.state.type} to={this.state.to} defaultAmount={this.state.defaultAmount}
                />
              </div>
              <Button color="danger" onClick={this.toggleInput} style={{height:"40px"}}>Try it Live!</Button>
              <Modal isOpen={this.state.showInputLive} toggle={this.toggleInput} size="lg" className={this.props.className}>
                <ModalHeader toggle={this.toggleInput}>This button is live! Use small amounts for testing</ModalHeader>
                <ModalBody>
                  <MoneyButtonDonate display="input"
                    devMode={false} labelMoneyButton={this.state.labelMoneyButton}
                    labelAmount = {this.state.labelAmount} labelReference = {this.state.labelReference}
                    showTransaction = {this.state.configTransactionAfterPayment} showSocialMedia = {this.state.configSocialMediaAfterPayment}
                    buttonId={this.state.buttonId} buttonData={buttonData} clientIdentifier={this.state.clientIdentifier}
                    type={this.state.type} to={this.state.to} defaultAmount={this.state.defaultAmount}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.toggleInput}>Close</Button>
                </ModalFooter>
              </Modal>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
            <CardTitle>Select amount with a slider control...</CardTitle>
              <div className="row">
              <div style={{width:"50%"}}>
              <MoneyButtonDonate display="slider" 
                devMode={this.state.devMode} labelMoneyButton={this.state.labelMoneyButton}
                labelAmount = {this.state.labelAmount} labelReference = {this.state.labelReference}
                showTransaction = {this.state.configTransactionAfterPayment} showSocialMedia = {this.state.configSocialMediaAfterPayment}
                buttonId={this.state.buttonId} buttonData={buttonData} clientIdentifier={this.state.clientIdentifier}
                type={this.state.type} to={this.state.to} defaultAmount={this.state.defaultAmount}
              />
              </div>
              <Button color="danger" onClick={this.toggleSlider} style={{height:"40px"}}>Try it Live!</Button>
              <Modal isOpen={this.state.showSliderLive} toggle={this.toggleSlider} size="lg" className={this.props.className}>
                <ModalHeader toggle={this.toggleSlider}>This button is live! Use small amounts for testing</ModalHeader>
                <ModalBody>
                  <MoneyButtonDonate display="slider"
                    devMode={false} labelMoneyButton={this.state.labelMoneyButton}
                    labelAmount = {this.state.labelAmount} labelReference = {this.state.labelReference}
                    showTransaction = {this.state.configTransactionAfterPayment} showSocialMedia = {this.state.configSocialMediaAfterPayment}
                    buttonId={this.state.buttonId} buttonData={buttonData} clientIdentifier={this.state.clientIdentifier}
                    type={this.state.type} to={this.state.to} defaultAmount={this.state.defaultAmount}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.toggleSlider}>Close</Button>
                </ModalFooter>
              </Modal>
              </div>
              </CardBody>
          </Card>

          <Card>
            <CardBody>
            <CardTitle>Select amount with a drop down control...</CardTitle>
              <div className="row">
              <div style={{width:"50%"}}>
              <MoneyButtonDonate display="dropdown"
                devMode={this.state.devMode} labelMoneyButton={this.state.labelMoneyButton}
                labelAmount = {this.state.labelAmount} labelReference = {this.state.labelReference}
                showTransaction = {this.state.configTransactionAfterPayment} showSocialMedia = {this.state.configSocialMediaAfterPayment}
                buttonId={this.state.buttonId} buttonData={buttonData} clientIdentifier={this.state.clientIdentifier}
                type={this.state.type} to={this.state.to} defaultAmount={this.state.defaultAmount}
              />
              </div>

              <Button color="danger" onClick={this.toggleDropDown} style={{height:"40px"}}>Try it Live!</Button>
              <Modal isOpen={this.state.showDropDownLive} toggle={this.toggleDropDown} size="lg" className={this.props.className}>
                <ModalHeader toggle={this.toggleDropDown}>This button is live! Use small amounts for testing</ModalHeader>
                <ModalBody>
                  <MoneyButtonDonate display="dropdown"
                    devMode={false} labelMoneyButton={this.state.labelMoneyButton}
                    labelAmount = {this.state.labelAmount} labelReference = {this.state.labelReference}
                    showTransaction = {this.state.configTransactionAfterPayment} showSocialMedia = {this.state.configSocialMediaAfterPayment}
                    buttonId={this.state.buttonId} buttonData={buttonData} clientIdentifier={this.state.clientIdentifier}
                    type={this.state.type} to={this.state.to} defaultAmount={this.state.defaultAmount}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.toggleDropDown}>Close</Button>
                </ModalFooter>
              </Modal>
              </div>
              </CardBody>
          </Card>
        </div>

        <DonateToMe></DonateToMe>
      </div>
    );
  }
}

export default App;
