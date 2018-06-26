import { getOrderHash } from '../loopringjs/src/relay/rpc/order'
import {toHex} from '../loopringjs/src/common/formatter'

export default class Wallet {

  /**
   * @return (error,result) {error:{errorCode:,message:''},result:'en'}
   */
  getLanguage () {
    throw new Error('unimplemented')
  }

  /**
   * @return(error,result) {error:{errorCode:,message:''},result:'RMB'}
   */
  getCurrency () {
    throw new Error('unimplemented')
  }

  /**
   * @return (error,result) {error:{errorCode:,message:''},result:0.0002}
   */
  getLrcFee () {
    throw new Error('unimplemented')
  }

  /**
   * @@return (error,result) {error:{errorCode:,message:''},result:'0x00000000'}
   */
  getCurrentAccount () {
    throw new Error('unimplemented')
  }

  /**
   * @param message
   * @return (error,result) {error:{errorCode:,message:''},result:{r:'0x',s:'0x',v:27}}
   */
  signMessage (message) {
    throw new Error('unimplemented')
  }

  /**
   *
   * @param tx rawTx
   * @param feeCustomizable bool
   * @return (error,result) {error:{errorCode:,message:''},result:'0x112121212'}
   */

  signTx (tx,feeCustomizable) {
    throw new Error('unimplemented')
  }

  signOrder (order) {
    const hash = getOrderHash(order);
    return this.signMessage(toHex(hash))
  }

  setConfigs = async () => {
    this.address =  (await this.getCurrentAccount()).result
    this.language = (await this.getLanguage()).result
    this.currency = (await this.getCurrency()).result
  }

}
