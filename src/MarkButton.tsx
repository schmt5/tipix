import * as React from 'react';
import './MarkButton.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

export function MarkButton({ label, ...props }: Props) {
    return (
        <button {...props} className={'markButton'}>
            {label && (
                <span className='sr-only'>{label}</span>
            )}
            {props.children}
        </button>
    )
}
