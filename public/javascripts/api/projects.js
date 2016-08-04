// @flow
export type CreateRequestBody = { projectName: string }
export type UpdateRequestBody = { id: string, projectName: string, tech: string }
export type Build = { buildTime: string, commit: string, status: 'success' | 'warning' | 'error' }
export type Project = { id: string, projectName: string, tech: string, buildHistory: Array<Build> }
type FindAllResponse = { data: Array<Project> }
type FindResponse = { data: Project }
type CreateResponse = { data: Project }
type UpdateResponse = { data: Project }
type BuildResponse = { data: Project }

import axios from 'axios'

export const findAll = (): Promise<FindAllResponse> =>
  axios.get('/projects')

export const find = (id: string): Promise<FindResponse> =>
  axios.get(`/projects/${id}`)

export const remove = (id: string): Promise<void> =>
  axios.delete(`/projects/${id}`)

export const create = (data: CreateRequestBody): Promise<CreateResponse> =>
  axios.post('/projects', data)

export const update = (project: UpdateRequestBody): Promise<UpdateResponse> =>
  axios.put(`/projects/${project.id}`, project)

export const build = (id: string): Promise<BuildResponse> =>
  axios.post(`/projects/${id}/builds`)
