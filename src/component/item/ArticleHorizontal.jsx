import React, { Component } from "react";
import "./ArticleHorizontal.css";
import dompurify from "dompurify";
import NoImage from "../box/NoImage.jsx";
import { getApiURL } from "../../utils/env.jsx";
import Chip from "../form/Chip.jsx";
import { dateToString } from "../../utils/date.jsx";
import DialogArticleEditor from "../dialog/DialogArticleEditor.jsx";

export default class ArticleHorizontal extends Component {
	constructor(props) {
		super(props);

		this.getCompanyTagsContent = this.getCompanyTagsContent.bind(this);
		this.isArticlePublic = this.isArticlePublic.bind(this);

		this.state = {
		};
	}

	isArticlePublic() {
		if (this.props.info === null
			|| this.props.info === undefined
			|| this.props.info.status !== "PUBLIC"
			|| this.props.info.publication_date === null) {
			return false;
		}

		return true;
	}

	getCompanyTagsContent() {
		if (this.props.myCompanies !== null
			&& this.props.myCompanies !== undefined
			&& this.props.info !== undefined
			&& this.props.info !== null
			&& this.props.info.company_tags !== undefined) {
			const companies = this.props.myCompanies
				.filter((v) => this.props.info.company_tags.indexOf(v.id) >= 0);

			if (companies.length === 0) {
				return null;
			}

			return <div className="card-tags">
				{companies.map((v) => <Chip
					key={v.name}
					label={v.name}
				/>)}
			</div>;
		}

		return null;
	}

	render() {
		return <div className={"ArticleHorizontal card " + (this.isArticlePublic() ? "ArticleHorizontal-public" : "")}>
			<div className="card-horizontal">
				<div className="img-square-wrapper">
					{this.props.info.image !== null && this.props.info.image !== undefined
						? <img
							className="card-img-top"
							src={getApiURL() + "public/get_image/" + this.props.info.image}
							alt="Card image cap"/>
						: <NoImage/>
					}

					<div className="card-date">
						{this.props.info.type === "EVENT"
							? <div>
								{dateToString(this.props.info.start_date, "DD MMM YYYY HH:mm")}
								<br/>
								{dateToString(this.props.info.end_date, "DD MMM YYYY HH:mm")}
							</div>
							: dateToString(this.props.info.publication_date, "DD MMM YYYY")
						}
					</div>
				</div>
				<div className="card-body">
					<h5 className="card-title">{this.props.info.title}</h5>

					{this.getCompanyTagsContent()}

					<DialogArticleEditor
						trigger={<button
							className={"blue-background"}
						>
							<i className="far fa-edit"/> Open editor
						</button>}
						article={this.props.info}
						myCompanies={this.props.myCompanies}
						afterConfirmation={this.getMyArticles}
					/>
				</div>
			</div>
			{this.props.info.abstract !== null && this.props.info.abstract.length > 0
				&& <div className="card-text">
					<div dangerouslySetInnerHTML={{
						__html:
						dompurify.sanitize(this.props.info.abstract),
					}} />
				</div>
			}
		</div>;
	}
}
