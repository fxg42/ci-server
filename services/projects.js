// @flow
import uuid from 'uuid-v4'
import * as ProjectName from 'project-name-generator'
import moment from 'moment'
import Chance from 'chance'

import type { Project, Build } from '../public/javascripts/api/projects'

const techs: Array<string> = ['React/Redux', 'Groovy/Grails', 'Java/Spring Boot', 'Java/RabbitMQ', 'Python/Django', 'Ruby on Rails', 'Express/Node.js', 'Microservices', 'Elixir/Phoenix', 'Elm', 'C/C++']

const newProject = (): Project => {
  const chance = new Chance()
  return {
    id: uuid(),
    projectName: ProjectName.generate().dashed,
    tech: chance.pickone(techs),
    buildHistory: [ ],
  }
}

let memoryDatabase: Array<Project> = [
  newProject(),
  newProject(),
  newProject(),
]

const newRandomBuildHistory = (): Build => {
  const rand = Math.random()
  const chance = new Chance()
  return {
    buildTime: moment().format(),
    status: rand > 0.5 ? 'success' : rand > 0.2 ? 'warning' : 'error',
    commit: chance.string({ pool: 'abcdef0123456789', length:7 })
  }
}

const addRandomBuildHistory = (project:Project): Project => {
  if (Math.random() > 0.75) {
    return { ...project, buildHistory: [ ...project.buildHistory, newRandomBuildHistory() ] }
  } else {
    return project
  }
}

export const findAll = (): Array<Project> => {
  return memoryDatabase = memoryDatabase.map(addRandomBuildHistory)
}

export const findById = (findId:string) => {
  return findAll().find(p => p.id === findId)
}

export const register = (project:Project): Project => {
  const newProject = { ...project, id: uuid(), buildHistory: [ ] }
  memoryDatabase = [ ...memoryDatabase, newProject ]
  return newProject
}

export const unregister = (removeId:string) => {
  memoryDatabase = memoryDatabase.filter(p => p.id !== removeId)
}

export const update = (updateId:string, project:Project): void => {
  if (updateId === project.id) {
    const excluding = memoryDatabase.filter(p => p.id !== updateId)
    const prev = memoryDatabase.find(p => p.id === updateId)
    if (prev) {
      memoryDatabase = [ ...excluding, { ...prev, projectName: project.projectName } ]
    }
  }
}

export const build = (buildId:string): Project | void => {
  const project = memoryDatabase.find(p => p.id === buildId)
  if (project) {
    const newProject = { ...project, buildHistory: [ ...project.buildHistory, newRandomBuildHistory() ] }
    const excluding = memoryDatabase.filter(p => p.id !== buildId)
    memoryDatabase = [ ...excluding, newProject ]
    return newProject
  }
}
