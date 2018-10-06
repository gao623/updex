import React from 'react'
import { Button, NavBar, Modal,List,InputItem,TextareaItem,Toast } from 'antd-mobile'
import routeActions from 'common/utils/routeActions'
import UserAgent from 'common/utils/useragent'
import { connect } from 'dva'
import { Icon } from 'antd'
import storage from 'modules/storage'
import uuidv4 from 'uuid/v4'
import intl from 'react-intl-universal'


class Auth extends React.Component {
  state={
    address:''
  }
  authByThirdPartyWallet = (wallet) => {
    const ua = new UserAgent()
    if(ua.isWechat()){
      Modal.alert('Open Wallet in Safari','Please click top-right corner button')
    }else{
      const {dispatch} = this.props
      const uuid = uuidv4().substring(0, 8)
      dispatch({
        type: 'sockets/extraChange',
        payload: {id: 'addressUnlock', extra: {uuid}}
      })
      dispatch({type:'sockets/fetch',payload:{id:'addressUnlock'}});
      const data = {type: 'UUID', value: uuid}
      window.location = `${wallet}://${JSON.stringify(data)}`
    }
    
  }

  authByAddress = () => {
    const {address} = this.state;
    const re = new RegExp("^0x[0-9a-fA-F]{40}$")
    if(address && re.test(address)){
      storage.wallet.storeUnlockedAddress('address', address)
      window.RELAY.account.register(address)
      // routeActions.gotoPath('/pc/trade/lrc-weth')
      this.props.dispatch({
        type: 'sockets/extraChange',
        payload: {id: 'addressUnlock', extra: {uuid:""}}
      })
      this.props.dispatch({
        type: 'layers/hideLayer',
        payload: {id: 'auth2'}
      })
      this.props.dispatch({type: 'sockets/unlocked'});
      Modal.alert(intl.get('notifications.title.log_in_suc'))
    }else{
      Toast.fail(intl.get("notifications.title.invalid_address_tip"))
    }
  }

  amountChange = (value) => {
    this.setState({address:value})
  }

  render () {
    const {uuid,item} = this.props
    const {address} = this.state;
    

    const _this = this
    return (
      <div className="bg-white" style={{height:'100vh',overflow:'auto'}}>
        <NavBar
          className="bg-white d-none"
          mode="light"
          leftContent={null &&[
            <span onClick={()=>{}} className="color-black-1" key="1"><Icon type="left" /></span>,
          ]}
          rightContent={null && [
            <span className="color-black-1" key="1"  onClick={()=>{}}><Icon type="question-circle-o" /></span>
          ]}
        >
          <div className="text-primary fs16">
            Access Your Wallet
          </div>
        </NavBar>
        <div className="divider 1px zb-b-t"></div>
        <div className="pt50 pb35 pl15 pr15">
          <div className="text-center pb30">
            <img style={{height:'5rem'}} src={require('../assets/images/up-logo-notext.png')} alt=""/>
            <div className="text-primary fs20 font-weight-bold mt5 mb5">UP DEX</div>
          </div>
          <List className="no-border am-list-bg-none selectable">
            <InputItem
              type="text"
              onChange={this.amountChange}
              value={address}
              className="circle h-default color-black-2 fs13"
              placeholder="Paste ETH address"
              extra={<Icon hidden type="scan" />}
              clear
            >
            </InputItem>
          </List>
          <Button onClick={this.authByAddress} className="mt20 fs18" type="primary">Log In By Address</Button>
          <Button hidden onClick={()=>{}} className="mt20 fs16" type="ghost">Skip to Log In</Button>
        </div>
        <div className="">
          <div className="divider 1px zb-b-t"></div>
          <div className="pt20">
            <div className="fs14 color-black-4 text-left pl25">
            Log In By Wallet
            </div>
          </div>
          <div onClick={()=>{}} className="row m15 p15 no-gutters align-items-center bg-fill"
               style={{padding: '7px 0px',borderRadius:'50em'}}>
            <div className="col-auto text-left pl15 pr20">
              <img style={{height: '30px'}} src={require('../assets/images/up-logo-notext.png')} alt=""/>
            </div>
            <div className="col text-left">
              <div className="fs16 text-primary text-left">UP Wallet</div>
            </div>
            <div className="col-auto text-right">
              <div className="fs14 text-wrap text-left">
                <span className="fs13 color-black-4 mr5">Scan Qrcode</span>
                <Icon className="color-black-4" type="right"/>
              </div>
            </div>
          </div>
          <div onClick={()=>{}} className="row m15 p15 no-gutters align-items-center bg-fill"
               style={{padding: '7px 0px',borderRadius:'50em'}}>
            <div className="col-auto text-left pl15 pr20">
              <i className="icon-loopr text-primary fs28"></i>
            </div>
            <div className="col text-left">
              <div className="fs16 text-primary text-left">Loopr Wallet</div>
            </div>
            <div className="col-auto text-right">
              <div className="fs14 text-wrap text-left">
                <span className="fs13 color-black-4 mr5">Scan Qrcode</span>
                <Icon className="color-black-4" type="right"/>
              </div>
            </div>
          </div>
          <div onClick={()=>{}} className="row m15 p15 no-gutters align-items-center bg-fill"
               style={{padding: '7px 0px',borderRadius:'50em'}}>
            <div className="col-auto text-left pl15 pr20">
              <i className="icon-Metamaskwallet text-primary fs26"></i>
            </div>
            <div className="col text-left">
              <div className="fs16 text-primary text-left">MetaMask</div>
            </div>
            <div className="col-auto text-right">
              <div className="fs14 text-wrap text-left">
                <span className="fs13 color-black-4 mr5">Connect</span>
                <Icon className="color-black-4" type="right"/>
              </div>
            </div>
          </div>
          <div onClick={()=>{}} className="row m15 p15 no-gutters align-items-center bg-fill"
               style={{padding: '7px 0px',borderRadius:'50em'}}>
            <div className="col-auto text-left pl15 pr20">
              <i className="icon-ledgerwallet text-primary fs26"></i>
            </div>
            <div className="col text-left">
              <div className="fs16 text-primary text-left">Ledger</div>
            </div>
            <div className="col-auto text-right">
              <div className="fs14 text-wrap text-left">
                <span className="fs13 color-black-4 mr5">Connect</span>
                <Icon className="color-black-4" type="right"/>
              </div>
            </div>
          </div>

        </div>
        <div hidden className="pt10 pb15 text-center"style={{position:'absolute',bottom:'0',left:'0',right:'0'}}>
          <div className="fs13 text-primary">Skip to Log In</div>
        </div>
      </div>
    )
  }

}

function mapStateToProps (state) {
  return {
    item: state.sockets.addressUnlock.item,
    uuid:state.sockets.addressUnlock.extra.uuid
  }
}

export default connect(mapStateToProps)(Auth)