import React from 'react'
import Containers from 'modules/containers'
import UiContainers from 'LoopringUI/containers'
import HelperOfSignStepPC from './HelperOfSignStepPC'
function Modals(props) {
  return (
    <div>
      <Containers.Layers id="helperOfSignStepPC">
        <UiContainers.Drawer id="helperOfSignStepPC" position="right" width="480px" style={{height:'100%'}}>
          <HelperOfSignStepPC />
        </UiContainers.Drawer>
      </Containers.Layers>
    </div>
  )
}
export default Modals