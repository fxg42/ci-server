import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ProjectCard from './project-card'
import RegisterProjectDialog from './register-new-project-dialog'
import EditProjectDialog from './edit-project-dialog'
import { getProjects } from '../reducers'

import * as ProjectName from 'project-name-generator'

import AppBar from 'material-ui/AppBar';
import { Card } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'flex-start',
  padding: 5
}

const Dashboard = ({ projects, onAddNewClick }) =>
  <div className="dashboard">
    <AppBar title="CI Server" />
    <div className="card-container" style={style}>
      {projects.map(project =>
        <ProjectCard
          key={project.id}
          {...project}
        />
      )}
      <Card style={ {flexBasis:305, margin:5 } }>
        <div style={ {display:'flex', justifyContent:'center', alignItems:'center', height:209} }>
          <FloatingActionButton onTouchTap={onAddNewClick}>
            <i className="material-icons">add</i>
          </FloatingActionButton>
        </div>
      </Card>
      <RegisterProjectDialog />
      <EditProjectDialog />
    </div>
  </div>

Dashboard.propTypes = {
  projects: PropTypes.array.isRequired,
  onAddNewClick: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  projects: getProjects(state),
})

const mapDispatchToProps = (dispatch) => ({
  onAddNewClick: (e) => {
    dispatch({type:'TOGGLE_CREATE_NEW_PROJECT_DIALOG'})
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
