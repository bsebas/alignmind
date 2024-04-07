'use server'

import { FeedbackEmail, sendEmail } from '@mindfulyze/emails'
import { BAD_REQUEST_CODE, CREATED_CODE } from '@mindfulyze/utils'

import { withActionSession } from '@lib/auth/utils'
import { FeedbackSchema } from '@schemas/feedback'

import type { z } from 'zod'

export async function sendFeedback(input: z.infer<typeof FeedbackSchema>) {
  const { data: response, status, message } = await withActionSession(FeedbackSchema, input)

  if (response == null) return { data: response, status, message }
  const { session, data } = response

  try {
    const response = await sendEmail({
      subject: '🎉 New Feedback Received!',
      react: FeedbackEmail({
        email: session.user.email,
        feedback: data.feedback,
      }),
      email: 'bjohansebas@gmail.com',
    })

    return { status: CREATED_CODE, response }
  } catch (e) {
    return { message: "Your feedback couldn't be sent.", status: BAD_REQUEST_CODE }
  }
}
