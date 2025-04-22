import { useEffect } from "react";
import {
	Form,
	Link,
	NavLink,
	Outlet,
	useNavigation,
	useSubmit,
} from "react-router";
import { getContacts } from "../data";
import type { Route } from "./+types/sidebar";

export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url);
	const q = url.searchParams.get("q");
	const contacts = await getContacts(q);
	return { contacts, q };
}
export default function SidebarLayout({ loaderData }: Route.ComponentProps) {
	const { contacts, q } = loaderData;
	const navigation = useNavigation();
	const submit = useSubmit();
	const searching =
		navigation.location &&
		new URLSearchParams(navigation.location.search).has("q");
	useEffect(() => {
		const searchField = document.getElementById("q");
		if (searchField instanceof HTMLInputElement) {
			searchField.value = q || "";
		}
	}, [q]);
	return (
		<>
			<div id="sidebar">
				<h1>
					<Link to="about">React Router Contacts</Link>
				</h1>
				<div>
					<Form
						id="search-form"
						role="search"
						onChange={(ev) => submit(ev.currentTarget)}
					>
						<input
							aria-label="Search contacts"
							className={searching ? "loading" : ""}
							defaultValue={q || ""}
							id="q"
							name="q"
							placeholder="Search"
							type="search"
						/>
						<div aria-hidden hidden={!searching} id="search-spinner" />
					</Form>
					<Form method="post">
						<button type="submit">New</button>
					</Form>
				</div>

				<nav>
					{contacts.length ? (
						<ul>
							{contacts.map((contact) => (
								<li key={contact.id}>
									<NavLink
										className={({ isActive, isPending }) =>
											isActive ? "active" : isPending ? "pending" : ""
										}
										//prefetch="intent"
										to={`contacts/${contact.id}`}
									>
										{contact.first || contact.last ? (
											<>
												{contact.first} {contact.last}
											</>
										) : (
											<i>名前なし</i>
										)}
										{contact.favorite ? <span>★</span> : null}
									</NavLink>
								</li>
							))}
						</ul>
					) : (
						<p>
							<i>コンタクトなし</i>
						</p>
					)}
				</nav>
			</div>
			<div
				id="detail"
				className={
					navigation.state === "loading" && !searching ? "loading" : ""
				}
			>
				<Outlet />
			</div>
		</>
	);
}
