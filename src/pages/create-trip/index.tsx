import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestsModal } from './invite-guests-modal'
import { ConfirmTripModal } from './confirm-trip-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestStep } from './steps/invite-guests-step'
import { DateRange } from 'react-day-picker'
import { api } from '../../lib/axios'

export function CreateTripPage() {
	const Navigate = useNavigate()
	const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
	const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
	const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])
	const [tripDestination, setTripDestination] = useState('')
	const [ownerName, setOwnerName] = useState('')
	const [ownerEmail, setOwnerEmail] = useState('')
	const [eventStartAndEndDate, setEventStartAndEndDate] = useState<
		DateRange | undefined
	>()

	function openGuestsInput() {
		setIsGuestsInputOpen(true)
	}

	function closeGuestsInput() {
		setIsGuestsInputOpen(false)
	}

	function openGuestsModal() {
		setIsGuestsModalOpen(true)
	}

	function closeGuestsModal() {
		setIsGuestsModalOpen(false)
	}

	function openConfirmTripModal() {
		setIsConfirmModalOpen(true)
	}

	function closeConfirmTripModal() {
		setIsConfirmModalOpen(false)
	}

	function addNewEmail(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const data = new FormData(event.currentTarget)
		const email = data.get('email')?.toString()

		if (!email) return

		if (emailsToInvite.includes(email)) return

		setEmailsToInvite([...emailsToInvite, email])

		event.currentTarget.reset()
	}

	function removeEmail(emailToRemove: string) {
		const newEmailList = emailsToInvite.filter(
			(email) => email !== emailToRemove
		)

		setEmailsToInvite(newEmailList)
	}

	async function createTrip(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		if (
			!tripDestination ||
			!eventStartAndEndDate?.from ||
			!eventStartAndEndDate?.to ||
			emailsToInvite.length === 0 ||
			!ownerEmail ||
			!ownerName
		)
			return

		const response = await api.post('/trips', {
			destination: tripDestination,
			starts_at: eventStartAndEndDate?.from,
			ends_at: eventStartAndEndDate?.to,
			emails_to_invite: emailsToInvite,
			owner_name: ownerName,
			owner_email: ownerEmail,
		})

		Navigate(`/trips/${response.data.tripId}`)
	}

	return (
		<div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
			<div className="max-w-3xl w-full px-6 text-center space-y-10">
				<div className="flex flex-col items-center gap-3">
					<img src="/logo.svg" alt="plann.er" />
					<p className="text-zinc-300 text-lg">
						Convide seus amigos e planeje sua próxima viagem!
					</p>
				</div>

				<div className="space-y-4">
					<DestinationAndDateStep
						closeGuestsInput={closeGuestsInput}
						isGuestsInputOpen={isGuestsInputOpen}
						openGuestsInput={openGuestsInput}
						setTripDestination={setTripDestination}
						setEventStartAndEndDate={setEventStartAndEndDate}
						eventStartAndEndDate={eventStartAndEndDate}
					/>

					{isGuestsInputOpen && (
						<InviteGuestStep
							emailsToInvite={emailsToInvite}
							openConfirmTripModal={openConfirmTripModal}
							openGuestsModal={openGuestsModal}
						/>
					)}
				</div>

				<p className="text-sm text-zinc-500">
					Ao planeja sua viagem pela plann.er você automaticamente concorda{' '}
					<br />
					com nossos{' '}
					<a href="#" className="text-zinc-300 underline">
						termos de uso
					</a>{' '}
					e{' '}
					<a href="#" className="text-zinc-300 underline">
						políticas de privacidade
					</a>
				</p>
			</div>

			{isGuestsModalOpen && (
				<InviteGuestsModal
					closeGuestsModal={closeGuestsModal}
					removeEmail={removeEmail}
					addNewEmail={addNewEmail}
					emailsToInvite={emailsToInvite}
				/>
			)}

			{isConfirmModalOpen && (
				<ConfirmTripModal
					createTrip={createTrip}
					closeConfirmTripModal={closeConfirmTripModal}
					setOwnerEmail={setOwnerEmail}
					setOwnerName={setOwnerName}
					tripDestination={tripDestination}
					eventStartAndEndDate={eventStartAndEndDate}
				/>
			)}
		</div>
	)
}
