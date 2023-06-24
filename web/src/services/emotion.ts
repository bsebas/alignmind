import { type AxiosResponse } from 'axios'

import axios from '../api/axios'
import { type ErrorRequest } from './login'
import { type ResponseColor } from './color'
import { managerErrorNetwork } from '@/errors'

export interface ResponseEmotion {
  id: string
  name: string
  type: string
  color: ResponseColor
}

export type ResponseAllEmotions = ResponseEmotion[]

export async function getAllEmotions (credential: string): Promise<ResponseAllEmotions> {
  try {
    const response: AxiosResponse<ResponseAllEmotions, ErrorRequest> = await axios.get('emotions/', {
      headers: {
        Authorization: `Bearer ${credential}`
      }
    })

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}
