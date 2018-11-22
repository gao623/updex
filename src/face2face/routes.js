import React from 'react'
import { Redirect, Route, Switch } from 'dva/router'
import storage from 'modules/storage'
import Face2FacePage from './Face2FacePage'
import Face2FaceModals from './Modals'
import TokenModals from '../dex/tokens/Modals'

import NotificationsModals from '../dex/notifications/Modals'

const Logged = (props)=>{
  const isLogged = true
  if(isLogged){
    return (
      <div>
        <Switch>
          <Route path={`/face2face`} exact component={Face2FacePage} />
        </Switch>
        <Face2FaceModals />
        <TokenModals />
        <NotificationsModals />
      </div>
    )
  }else{
  }
}

export default class Routes extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {match,location} = this.props;
    // const {url} = match;
    const url = ""
    return (
      <div>
        <Switch>
          <Route path={`/face2face`}  component={Logged} />
        </Switch>
      </div>
    );
  }
}




