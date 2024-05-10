let data = {
	name: "David Pham",
	aboutMePage: "https://davidpham5.github.io/davidpham5/",
	rels: [
		{ href: "https://davidpham5.glitch.me/", title: "Link in Glitch" },
		{
			href: "https://mastodon.cloud/@davidpham5",
			title: "Mastodon",
		},
		{ href: "https://github.com/davidpham5", title: "GitHub" },
		{ href: "https://twitter.com/davidpham5", title: "Twitter" },
		{ href: "https://keybase.io/davidpham5", title: "Keybase" },
    { href: "https://bsky.app/profile/davidpham5.davidchicopham.com", title: "BlueSky" },
	],
	twitter: "@davidpham5",
};

data.avatar = `/img/twitter-avy.jpg`;

module.exports = (info) => {
	return data;
};
