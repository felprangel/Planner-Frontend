interface ButtonProps {
    children: React.ReactNode
}

export function Button(props: ButtonProps) {
	return (
		<button className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700">
			{props.children}
		</button>
	)
}
