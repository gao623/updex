import React from 'react';
import {Icon,Alert} from 'antd'
import {Button, NavBar, Toast,Result,Modal} from 'antd-mobile'
import intl from 'react-intl-universal'
import {connect} from 'dva'
import Notification from 'LoopringUI/components/Notification'

class SignResult extends React.Component {

  render(){
    const {dispatch,signResult} = this.props
    const hideLayer = (payload = {}) => {
      dispatch({
        type: 'layers/hideLayer',
        payload: {
          ...payload
        }
      })
    }
    const updated = ()=>{
      hideLayer({id:'signResult'})
    }
    const unUpdated = ()=>{
      Modal.alert('网页端还未同步更新？', null, [
        { text: '继续等待', onPress: () => console.log('cancel') },
        { text: '再次扫码', onPress: () => console.log('ok') },
      ])
    }
    return (
      <div className="bg-fill" style={{maxHeight:'100%',overflow:'auto'}}>
        <NavBar
          className="bg-white"
          mode="light"
          onLeftClick={() => hideLayer({id:'signResult'})}
          leftContent={[
            <span className="text-primary circle-30 bg-primary-light center-center fs14"><Icon key="1" type="close" /></span>,
          ]}
          rightContent={[]}
        >
          Result
        </NavBar>
        <div className="divider 1px zb-b-t"></div>
        <div className="bg-white p15" style={{}}>
          <Result
            img={<Icon className="color-success fs50 center-center color-white" type="check-circle" theme="filled" />}
            title={<div className="fs20">登录签名成功</div>}
            message={<div className="fs12">请确认网页端是否正常</div>}
          />
          <div className="pt15 pb15 fs12 color-black3 lh25 text-left">
            <div>1. 如果网页端已自动同步，关闭当前页面即可</div>
            <div>2. 如果网页端无反应，您可以继续等待或者刷新网页端</div>
            <div>3. 如果网页端刷新后结果不正常，您需要再次尝试扫码</div>
          </div>
        </div>
        <div className="bg-white p15" style={{}}>
          <Result
            img={<Icon className="color-success fs50 center-center color-white" type="check-circle" theme="filled" />}
            title={<div className="fs20">下单签名成功</div>}
            message={<div className="fs12">请确认网页端是否正常</div>}
          />
          <div className="pt15 pb15 fs12 color-black3 lh25 text-left">
            <div>1. 如果网页端已自动同步，关闭当前页面即可</div>
            <div>2. 如果网页端无反应，您可以继续等待或者刷新网页端</div>
            <div>3. 如果网页端刷新后结果不正常，您需要再次尝试扫码</div>
          </div>
        </div>
        <div className="bg-white p15" style={{}}>
          <Result
            img={<Icon className="color-success fs50 center-center color-white" type="check-circle" theme="filled" />}
            title={<div className="fs20">取消订单签名成功</div>}
            message={<div className="fs12">请确认网页端是否正常</div>}
          />
          <div className="pt15 pb15 fs12 color-black3 lh25 text-left">
            <div>1. 如果网页端已自动同步，关闭当前页面即可</div>
            <div>2. 如果网页端无反应，您可以继续等待或者刷新网页端</div>
            <div>3. 如果网页端刷新后结果不正常，您需要再次尝试扫码</div>
          </div>
        </div>
        <div className="bg-white p15" style={{}}>
          <Result
            img={<Icon className="color-error fs50 center-center color-white" type="close-circle" theme="filled" />}
            title={<div className="fs20">操作失败</div>}
            message={<div className="fs12">操作失败</div>}
          />
          <Button className="w-100 d-block mt15 mb0" size="" type="primary" onClick={()=>{}} disabled={false}>继续扫码</Button>
        </div>
      </div>
    );
  }

};

function mapToProps(state) {
  return {
  }
}
export default connect(mapToProps)(SignResult)
