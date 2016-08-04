// @flow
import * as api from '../api/projects'

import type { Project, CreateRequestBody } from '../api/projects'
import type { RootState } from '../reducers'

export type Action =
    { type: 'FIND_ALL_PROJECTS_SUCCESS', projects: Array<Project> }
  | { type: 'FIND_ALL_PROJECTS_ERROR' }
  | { type: 'BUILD_PROJECT_SUCCESS', project: Project }
  | { type: 'BUILD_PROJECT_ERROR' }
  | { type: 'CREATE_PROJECT_SUCCESS', project: Project }
  | { type: 'CREATE_PROJECT_ERROR' }
  | { type: 'REMOVE_PROJECT_SUCCESS', id: string }
  | { type: 'REMOVE_PROJECT_ERROR' }

type D = ((a: Action) => void)
type G = (() => RootState)

export const findAllProjects = () => async (dispatch:D, getState:G) => {
  try {
    const resp = await api.findAll()
    dispatch({ type: 'FIND_ALL_PROJECTS_SUCCESS', projects: resp.data })
  } catch (e) {
    dispatch({ type: 'FIND_ALL_PROJECTS_ERROR' })
  }
}

export const buildProject = (id: string) => async (dispatch:D, getState:G) => {
  try {
    const resp = await api.build(id)
    dispatch({ type: 'BUILD_PROJECT_SUCCESS', project: resp.data })
  } catch (e) {
    dispatch({ type: 'BUILD_PROJECT_ERROR' })
  }
}

export const addProject = (data: CreateRequestBody) => async (dispatch:D, getState:G) => {
  try {
    const resp = await api.create(data)
    dispatch({ type: 'CREATE_PROJECT_SUCCESS', project: resp.data })
  } catch (e) {
    dispatch({ type: 'CREATE_PROJECT_ERROR' })
  }
}

export const unregisterProject = (id: string) => async (dispatch:D, getState:G) => {
  try {
    const resp = await api.remove(id)
    dispatch({ type: 'REMOVE_PROJECT_SUCCESS', id })
  } catch (e) {
    dispatch({ type: 'REMOVE_PROJECT_ERROR' })
  }
}
