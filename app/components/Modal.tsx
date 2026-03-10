import { ReactElement } from "react"

type Props = {
    children: ReactElement
    onClose: () => void
}

export default function Modal({ children, onClose }: Props) {
    return (
        <div
            onClick={onClose}
            className="h-screen w-screen fixed left-0 top-0 bg-neutral-600/70 flex items-center justify-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="p-4 bg-white rounded-xl"
            >
                {children}
            </div>
        </div>
    )
}