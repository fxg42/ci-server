import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter, browserHistory } from 'react-router'
import { getProject } from '../reducers'

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

const onClose = () =>
  browserHistory.push('/')

const EditProjectDialog = ({ project, editDialogOpened }) => {
  if (project) {
    return (
      <Dialog
        title={ `Project ${project.projectName}` }
        modal={ false }
        open={ editDialogOpened }
        onRequestClose={ onClose }
        actions={[
          <FlatButton label="Close" onClick={onClose} />,
        ]}
      >
        <ul>
          {project.buildHistory.map(b => <li key={b.commit}>{b.commit}</li>)}
        </ul>
      </Dialog>
    )
  } else {
    return <div/>
  }
}

const mapStateToProps = (state, { params }) => ({
  editDialogOpened: params && params.projectId != undefined,
  project: getProject(state, params.projectId),
})

export default withRouter(connect(mapStateToProps)(EditProjectDialog))
