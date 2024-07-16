import { ArrowRight, Calendar, MapPin, Settings2 } from 'lucide-react'
import { Button } from '../../../components/button'

interface DestinationAndDateStepProps {
	isGuestsInputOpen: boolean
	openGuestsInput: () => void
	closeGuestsInput: () => void
}

export function DestinationAndDateStep(props: DestinationAndDateStepProps) {
	return (
		<div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
			<div className="flex items-center gap-2 flex-1">
				<MapPin className="size-5 text-zinc-400" />
				<input
					disabled={props.isGuestsInputOpen}
					type="text"
					placeholder="Para onde você vai?"
					className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
				/>
			</div>
			<button
				disabled={props.isGuestsInputOpen}
				className="flex items-center gap-2 text-left"
			>
				<Calendar className="size-5 text-zinc-400" />
				<span className="text-lg text-zinc-400 w-40">
					Quando?
				</span>
			</button>

			<div className="w-px h-6 bg-zinc-800" />

			{props.isGuestsInputOpen ? (
				<Button onClick={props.closeGuestsInput} variant="secondary">
					Alterar local/data <Settings2 className="size-5" />
				</Button>
			) : (
				<Button onClick={props.openGuestsInput} variant="primary">
					Continuar <ArrowRight className="size-5" />
				</Button>
			)}
		</div>
	)
}
