import R from 'ramda'
import uuid from 'uuid-v4'
import * as ProjectName from 'project-name-generator'
import moment from 'moment'

const newProject = () => ({
  id: uuid(),
  projectName: ProjectName.generate({number:true}).dashed,
  buildHistory: [ ],
})

let memoryDatabase = [
  newProject(),
  newProject(),
  newProject(),
]

const newRandomBuildHistory = () => ({
  buildTime: moment().format(),
  status: Math.random() > 0.5 ? 'success' : 'error',
})

const addRandomBuildHistory = (project) => {
  return Math.random() > 0.75 ?
      R.evolve({buildHistory: R.append(newRandomBuildHistory())}, project) :
      project
}

export const findAll = () => {
  return memoryDatabase = R.map(addRandomBuildHistory, memoryDatabase)
}

export const findById = (id) => {
  return R.find(R.propEq('id', id), findAll())
}

export const unregister = (id) => {
  memoryDatabase = R.reject(R.propEq('id', id), memoryDatabase)
}

export const update = (id, project) => {
  if (id === project.id) {
    memoryDatabase = R.adjust(
      R.assoc('projectName', project.projectName),
      R.findIndex(R.propEq('id', id), memoryDatabase),
      memoryDatabase)
  }
}

