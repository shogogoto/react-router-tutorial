import { Link } from "react-router";

export default function About() {
	return (
		<div id="about">
			<Link to="/">← デモへ移動</Link>
			<h1>React Router Contactsについて</h1>

			<div>
				<p>
					これは、動的ルーティング、ネストされたルート、ローダー、アクションなど、React
					Routerの強力な機能のいくつかを紹介するデモアプリケーションです。
				</p>

				<h2>機能</h2>
				<p>React Routerがどのように処理するかをデモで確認してください。</p>
				<ul>
					<li>ローダーとアクションによるデータのロードと変更</li>
					<li>親子関係によるネストされたルーティング</li>
					<li>動的なセグメントによるURLベースのルーティング</li>
					<li>保留中および楽観的なUI</li>
				</ul>

				<h2>詳細</h2>
				<p>
					React
					Routerで優れたWebアプリケーションを構築する方法の詳細については、公式ドキュメント（
					<a href="https://reactrouter.com">reactrouter.com</a>
					）をご覧ください。
				</p>
			</div>
		</div>
	);
}
