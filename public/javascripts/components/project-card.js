import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { buildProject, unregisterProject } from '../actions'

import moment from 'moment'

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import * as Colors from 'material-ui/styles/colors'

const ProjectCard = ({ id, projectName, tech, buildHistory, onBuildClick, onUnregisterClick }) => {
  const lastBuild = buildHistory.length > 0 ? buildHistory[buildHistory.length - 1] : null
  const buildStatus = lastBuild ? `Triggered ${moment(lastBuild.buildTime).fromNow()}.` : 'Has not been built yet.'
  const buildCommit = lastBuild ? `Last commit is ${lastBuild.commit}` : ''
  let buildHealthColor = Colors.grey500
  if (lastBuild) {
    switch (lastBuild.status) {
      case 'success': buildHealthColor = Colors.lightGreen500; break
      case 'warning': buildHealthColor = Colors.orange500; break
      case 'error':   buildHealthColor = Colors.pink500; break
      default:        buildHealthColor = Colors.grey500; break
    }
  }
  return (
    <Card style={ {flexBasis:305, margin:5 } }>
      <CardTitle title={ projectName } subtitle={ `A ${tech} Project` } />
      <CardText>
        { buildStatus }
        <br />
        { buildCommit }
        <div style={{width:'100%', height:20, borderRadius:4, marginTop:5, backgroundColor:buildHealthColor, transition: 'background-color 500ms linear' }}/>
      </CardText>
      <CardActions>
        <RaisedButton icon={<i className="material-icons color-white">play_arrow</i>} primary={ true } onClick={onBuildClick(id)} />
        <FlatButton icon={<i className="material-icons">delete_forever</i>} onClick={onUnregisterClick(id)} />
        <FlatButton icon={<i className="material-icons">edit</i>} onClick={ () => browserHistory.push(id) } />
      </CardActions>
    </Card>
  )
}

ProjectCard.propTypes = {
  id: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  tech: PropTypes.string.isRequired,
  buildHistory: PropTypes.arrayOf(
    PropTypes.shape({
      buildTime: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['success', 'warning', 'error']).isRequired,
      commit: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onBuildClick: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  onBuildClick: (id) => (e) => {
    dispatch(buildProject(id))
  },
  onUnregisterClick: (id) => (e) => {
    dispatch(unregisterProject(id))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(ProjectCard)
