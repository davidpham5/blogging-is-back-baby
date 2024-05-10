module.exports = {
	commit: {
		ref: process.env.COMMIT_REF || null,
		url: process.env.REPOSITORY_URL,
	},
	title: "Aram ZS | Digital Garden",
	description: "Microblog and feed from David Pham.",
	url: "https://davidchicopham.com",
	feedUrl: "https://davidchicopham.com/writing/feed.xml",
	author: {
		name: "David Pham",
		email: "davidpham5@hacktext.com",
	},
};
