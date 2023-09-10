import * as React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { SearchContext } from "./SearchContext";

interface Props {
    label: string;
    aliases?: string[];
    icon: React.ReactNode;
    isActive?: boolean;
    onSelect?: () => void;
    description?: string;
}

export function MenuItem({ label, icon, description, isActive, onSelect, aliases = [] }: Props) {
    const search = React.useContext(SearchContext);

    if (omitMenuItem(search, [...aliases, label.toLocaleLowerCase()])) {
        return null;
    }

    return (
        <DropdownMenu.Item
            className='item'
            onSelect={onSelect}
            data-active={isActive}
            textValue=''
        >
            <div className='itemInner'>
                <div className='icon'>
                    {icon}
                </div>
                <div className='itemContent'>
                    <span className='itemLabel'>
                        {label}
                    </span>
                    {description && (
                        <span className='itemInfo'>Use to toggle Bullet List</span>
                    )}
                </div>
            </div>
        </DropdownMenu.Item>
    );
}

function omitMenuItem(search: string = '', aliases: string[] = []): boolean {
    if (search === '') {
        return false;
    }

    const searchLowerCased = search.toLowerCase();
    const someStartsWith = aliases.some((alias) => alias.startsWith(searchLowerCased));
    return !someStartsWith;
}
