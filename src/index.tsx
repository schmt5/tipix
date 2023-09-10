import * as React from 'react';
import { EditorContent, Editor } from '@tiptap/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { SearchContext } from './SearchContext';
import { MarkButton } from './MarkButton';
import { MenuItem } from './MenuItem';
import { IconSearch } from './IconSearch';
import './index.css'

interface Props {
    children: React.ReactNode;
    editor: Editor;
    marks?: React.ReactNode;
    shortcut?: string;
}

export function Tipix({ children, editor, marks, shortcut = 'Space' }: Props) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');

    const handleShortcut = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.stopPropagation();

        if (event.ctrlKey && event.code === shortcut) {
            console.log('CTRL + Space was pressed')
            setOpen(true);
        }
    }

    return (
        <>
            <div className='editor-wrapper' onKeyUp={handleShortcut}>
                <SearchContext.Provider value={search}>
                    <div className='tipix'>
                        <div className='toolbar'>
                            {marks}

                            <DropdownMenu.Root modal={false} open={open} onOpenChange={(open) => setOpen(open)}>
                                <DropdownMenu.Trigger className="trigger">
                                    <IconSearch size={16} />
                                    <div className='triggerLabel'>
                                        <span>Search</span>
                                        <span className='triggerHint'>
                                            {`CTRL + ${shortcut.toLocaleUpperCase()}`}
                                        </span>
                                    </div>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.Content
                                        sideOffset={-36}
                                        align="start"
                                        loop
                                        className="tipixContent"
                                        onCloseAutoFocus={(event) => {
                                            event.preventDefault();
                                            setSearch('');
                                            editor.chain().focus().run();
                                        }}
                                    >
                                        <div className='search'>
                                            <IconSearch className='searchIcon' size={16} />
                                            <label className='sr-only' htmlFor="search">Search Nodes</label>
                                            <input
                                                id='search'
                                                className='searchInput'
                                                autoComplete='off'
                                                autoFocus
                                                type='text'
                                                placeholder='Search...'
                                                value={search}
                                                onChange={(event) => {
                                                    setSearch(event.target.value)
                                                }}
                                                onKeyUp={(event) => {
                                                    if (event.code === 'ArrowDown') {
                                                        const parentElement = document.activeElement?.parentNode as HTMLElement;
                                                        const nextElement = parentElement.nextElementSibling as HTMLElement;
                                                        
                                                        if (nextElement) {
                                                            nextElement.focus();
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                        {children}
                                    </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Root >
                        </div>
                    </div>
                </SearchContext.Provider>
                <EditorContent editor={editor} />
            </div>
        </>
    )
}

Tipix.MenuItem = MenuItem;
Tipix.MarkButton = MarkButton;
