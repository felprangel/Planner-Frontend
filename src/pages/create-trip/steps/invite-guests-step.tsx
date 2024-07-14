import { ArrowRight, UserRoundPlus } from 'lucide-react'
import { Button } from '../../../components/button'

interface InviteGuestsStepProps {
	openGuestsModal: () => void
	openConfirmTripModal: () => void
	emailsToInvite: string[]
}

export function InviteGuestStep(props: InviteGuestsStepProps) {
	return (
		<div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
			<button
				onClick={props.openGuestsModal}
				type="button"
				className="flex items-center gap-2 flex-1 text-left"
			>
				<UserRoundPlus className="size-5 text-zinc-400" />
				{props.emailsToInvite.length === 0 ? (
					<span className="text-zinc-100 text-lg flex-1">
						{props.emailsToInvite.length} pessoa(s) convidada(s)
					</span>
				) : (
					<span className="text-zinc-400 text-lg flex-1">
						Quem estará na viagem?
					</span>
				)}
			</button>

			<div className="w-px h-6 bg-zinc-800" />

			<Button onClick={props.openConfirmTripModal} variant="primary">
				Confirmar viagem <ArrowRight className="size-5" />
			</Button>
		</div>
	)
}
