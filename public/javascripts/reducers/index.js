// @flow
import { combineReducers } from 'redux'

import _ from 'underscore'

import type { Project } from '../api/projects'
import type { Action } from '../actions'

export type Ids = Array<string>
export type ProjectIndex = { [key: string]: Project }
export type Flags = { createDialogOpened: boolean }
export type RootState = { ids: Ids, projects: ProjectIndex, flags: Flags }

const ids = (state: Ids = [ ], action: Action): Ids => {
  switch (action.type) {
    case 'FIND_ALL_PROJECTS_SUCCESS':
      return action.projects.map(p => p.id).sort()
    case 'CREATE_PROJECT_SUCCESS':
      return [ ...state, action.project.id ]
    case 'REMOVE_PROJECT_SUCCESS':
      const candidate = action.id
      return state.filter(id => id !== candidate)
    default:
      return state
  }
}

const projects = (state: ProjectIndex = { }, action: Action): ProjectIndex => {
  switch (action.type) {
    case 'FIND_ALL_PROJECTS_SUCCESS':
      return action.projects.reduce((all, p) => ({ ...all, [p.id]:p }), { })
    case 'CREATE_PROJECT_SUCCESS':
      // falls through
    case 'BUILD_PROJECT_SUCCESS':
      return { ...state, [action.project.id]:action.project }
    case 'REMOVE_PROJECT_SUCCESS':
      return _.omit(state, action.id)
    default:
      return state
  }
}

const flags = (state: Flags = { createDialogOpened:false }, action: Action): Flags => {
  switch (action.type) {
    case 'TOGGLE_CREATE_NEW_PROJECT_DIALOG':
      return { ...state, createDialogOpened: !state.createDialogOpened }
    default:
      return state
  }
}

const RootReducer: RootState = combineReducers({
  ids,
  projects,
  flags,
})

export default RootReducer

export const getProjects = (state: RootState): Array<Project> =>
  state.ids.map(id => state.projects[id])

export const getProject = (state: RootState, id: string): Project =>
  state.projects[id]

export const is = (flagName: string, state: RootState): boolean =>
  state.flags[flagName] || false
