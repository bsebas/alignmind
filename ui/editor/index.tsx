'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import { Dispatch, SetStateAction } from 'react'
import { EditorBubbleMenu } from './components/bubble-menu'
import { TiptapExtensions } from './extensions'
import { TiptapEditorProps } from './props'

export interface EditorProps {
  onChange: Dispatch<SetStateAction<object>>
}

export default function Editor({ onChange }: EditorProps) {
  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: ({ editor }) => {
      const textHTML = editor.getHTML()
      const textPlain = editor.getText()

      onChange({ withFormat: textHTML, withoutFormat: textPlain })
    },
    autofocus: 'end',
  })

  return (
    // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      onClick={() => {
        editor?.chain().focus().run()
      }}
      className='
      overflow-y-auto overflow-hidden relative min-h-48 h-48 w-full min-w-[300px] max-h-56 border-b-stone-200 bg-white p-6 sm:border-b'
    >
      {editor && <EditorBubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  )
}
