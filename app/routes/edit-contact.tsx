import { Form, redirect, useNavigate } from "react-router";
import type { Route } from "./+types/edit-contact";

import { getContact, updateContact } from "../data";

export async function loader({ params }: Route.LoaderArgs) {
	const contact = await getContact(params.contactId);
	if (!contact) {
		throw new Response("Not Found", { status: 404 });
	}
	return { contact };
}
export async function action({ params, request }: Route.ActionArgs) {
	const formData = await request.formData();
	const updates = Object.fromEntries(formData);
	await updateContact(params.contactId, updates);
	return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact({ loaderData }: Route.ComponentProps) {
	const { contact } = loaderData;
	const navigate = useNavigate();

	return (
		<Form key={contact.id} id="contact-form" method="post">
			<p>
				<span>名前</span>
				<input
					aria-label="名"
					defaultValue={contact.first}
					name="first"
					placeholder="名"
					type="text"
				/>
				<input
					aria-label="姓"
					defaultValue={contact.last}
					name="last"
					placeholder="姓"
					type="text"
				/>
			</p>
			<label>
				<span>Twitter</span>
				<input
					defaultValue={contact.twitter}
					name="twitter"
					placeholder="@jack"
					type="text"
				/>
			</label>
			<label>
				<span>アバター URL</span>
				<input
					aria-label="アバター URL"
					defaultValue={contact.avatar}
					name="avatar"
					placeholder="https://example.com/avatar.jpg"
					type="text"
				/>
			</label>
			<label>
				<span>メモ</span>
				<textarea defaultValue={contact.notes} name="notes" rows={6} />
			</label>
			<p>
				<button type="submit">保存</button>
				<button type="button" onClick={() => navigate(-1)}>
					キャンセル
				</button>
			</p>
		</Form>
	);
}
