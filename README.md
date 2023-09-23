# Tipix

Tipix seamlessly integrates Radix UI dropdown menus into the TipTap Editor, boasting keyboard shortcut support and accessibility. With Tipix, you'll enjoy a superb user experience while retaining the complete capabilities of the TipTap Editor.

## Usage
Define your TipTap Editor as you know it.

```
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

const editor = useEditor({
    extensions: [
        StarterKit,
          Placeholder.configure({
        placeholder: 'Enter text or press `CTRL + Space`',
    }),
    ]
})
```

Use Tipix instead of `EditorContent` from TipTap (Tipix render EditorContent internally). `Children` of Tipix get rendered as a Item inside the dropdown menu. As you can see, the control over the content is still and only on TipTap (e.g: `editor.chain().focus().toggleHeading({ level: 1 }).run()`)

```
import { Tipix } from 'tipix'
import { IconH1 } from '@tabler/icons-react';


<Tipix editor={editor}>
    <Tipix.MenuItem
        label='Heading 1'
        description='Use to toggle Heading 1'
        icon={<IconH1 size={18} />}
        onSelect={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
        aliases={['h1', 'heading1', 'heading 1']}
    />
</Tipix>
```

## Try it out
See [Tipix Doc](https://tiptap.dev/introduction) to try it out!