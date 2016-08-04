import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as ProjectName from 'project-name-generator'

import { is } from '../reducers'
import { addProject } from '../actions'

import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FloatingActionButton from 'material-ui/FloatingActionButton'

class RegisterProjectDialog extends React.Component {
  constructor() {
    super()
    this.state = {
      tech: "React/Redux",
      projectName: ProjectName.generate().dashed,
    }
  }

  onTechChange(evt, idx, value) { this.setState({ tech: value }) }
  onProjectNameChange(evt) { this.setState({ projectName: evt.target.value }) }
  onGenerateNewName(evt) { this.setState({ projectName: ProjectName.generate().dashed }) }

  onRegisterClick(e) { this.props.onRegisterClick(this.state) }

  render() {
    return (
      <Dialog
        title="Register new project"
        modal={ false }
        open={ this.props.createDialogOpened }
        onRequestClose={ this.props.onDialogClose }
        actions={[
          <RaisedButton label="Register" primary={ true } onTouchTap={ this.onRegisterClick.bind(this) }/>,
          <FlatButton label="Cancel" onTouchTap={this.props.onDialogClose} />,
        ]}
      >
        <TextField floatingLabelText="Project name" value={ this.state.projectName } onChange={ this.onProjectNameChange.bind(this) } />
        <FloatingActionButton mini={ true } onClick={ this.onGenerateNewName.bind(this) }>
          <i className="material-icons">refresh</i>
        </FloatingActionButton>
        <br />
        <SelectField value={ this.state.tech } floatingLabelText="Technology stack" onChange={ this.onTechChange.bind(this) }>
          <MenuItem value={ "React/Redux" } primaryText="React/Redux" />
          <MenuItem value={ "Groovy/Grails" } primaryText="Groovy/Grails" />
          <MenuItem value={ "Elixir/Phoenix" } primaryText="Elixir/Phoenix" />
        </SelectField>
      </Dialog>
    )
  }
}

const mapStateToProps = (state) => ({
  createDialogOpened: is('createDialogOpened', state)
})

const mapDispatchToProps = (dispatch) => ({
  onDialogClose: (e) => {
    dispatch({type:'TOGGLE_CREATE_NEW_PROJECT_DIALOG'})
  },
  onRegisterClick: (data) => {
    dispatch(addProject(data))
    dispatch({type:'TOGGLE_CREATE_NEW_PROJECT_DIALOG'})
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterProjectDialog)
