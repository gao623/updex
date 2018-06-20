import React from 'react'
import {connect} from 'dva'
import {TickerFm} from 'modules/tickers/formatters'
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal'

function TickerItem(props) {
  console.log('TickerItem render',props)
  const showAllTickers = ()=>{
    props.dispatch({
      type:"layers/showLayer",
      payload:{
        id:'ListAllTickers',
      }
    })
  }
  const gotoWallet = ()=>{
    routeActions.gotoPath('/wallet')
  }
  const priceSelected = (value, e) => {
    e.preventDefault()
    props.dispatch({type:'placeOrder/priceChange', payload:{priceInput:value}})
  }
  const looprTickerFm = new TickerFm(props.tickers.item.loopr || {})
  const tokens = looprTickerFm.getTokens()
  return (
    <div className="tradeHeaderEle justify-content-between align-items-center" style={{display: "flex"}}>
        <div id="back" onClick={gotoWallet}><i className="icon-chevron-left"></i></div>
        <div className="pair-select d-flex justify-content-between tokenselect" onClick={showAllTickers}>
        {props.tickers.filters.market} <b className="caret"></b>
        </div>
        <div className="token-last-quotes">
            <ul className="d-flex justify-content-between align-items-center">
              <li><small>{intl.get('ticker.last')}</small><em><span className="text-up"><span className="cursor-pointer" onClick={priceSelected.bind(this, looprTickerFm.getLast())}> {looprTickerFm.getLast()} </span> {tokens.right}</span> <span hidden>$0.34</span></em></li>
                <li><small>{intl.get('ticker.change')}</small><em><span className="text-down">{looprTickerFm.getChange()}</span></em></li>
              <li><small>{intl.get('ticker.high')}</small><em><span className="cursor-pointer" onClick={priceSelected.bind(this, looprTickerFm.getHigh())}> {looprTickerFm.getHigh()} </span> {tokens.right}</em></li>
              <li><small>{intl.get('ticker.low')}</small><em><span className="cursor-pointer" onClick={priceSelected.bind(this, looprTickerFm.getLow())}> {looprTickerFm.getLow()} </span> {tokens.right}</em></li>
                <li><small>{intl.get('ticker.vol')}</small><em>{looprTickerFm.getVol()} {tokens.right}</em></li>
            </ul>
        </div>
    </div>
  )
}
export default connect(
  ({sockets:{tickers}})=>({tickers})
)(TickerItem)