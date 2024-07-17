import { Calendar, Tag, X } from 'lucide-react'
import { Button } from '../../components/button'
import { FormEvent } from 'react'
import { api } from '../../lib/axios'
import { useParams } from 'react-router-dom'

interface CreateActivityModalProps {
	closeCreateActivityModal: () => void
}

export function CreateActivityModal(props: CreateActivityModalProps) {
	const { tripId } = useParams()

	async function createActivity(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const data = new FormData(event.currentTarget)

		const title = data.get('title')?.toString()
		const occours_at = data.get('occours-at')?.toString()

		await api.post(`trips/${tripId}/activities`, {
			title,
			occours_at,
		})

		props.closeCreateActivityModal()
	}

	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center">
			<div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold">
							Confirmar criação de viagem
						</h2>
						<button onClick={props.closeCreateActivityModal} type="button">
							<X className="size-5 text-zinc-400" />
						</button>
					</div>
					<p className="text-sm text-zinc-400">
						Todos convidados podem visualizar as atividades.
					</p>
				</div>

				<form onSubmit={createActivity} className="space-y-3">
					<div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
						<Tag className="text-zinc-400 size-5" />
						<input
							type="text"
							name="title"
							placeholder="Qual a atividade?"
							className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
						/>
					</div>

					<div className="flex items-center gap-2">
						<div className="flex-1 h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
							<Calendar className="text-zinc-400 size-5" />
							<input
								type="datetime-local"
								name="occours-at"
								placeholder="Data e horário da atividade"
								className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
							/>
						</div>
					</div>

					<Button variant="primary" size="full">
						Salvar atividade
					</Button>
				</form>
			</div>
		</div>
	)
}
