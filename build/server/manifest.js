const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.6e074b4c.js","imports":["_app/immutable/entry/start.6e074b4c.js","_app/immutable/chunks/index.78a93697.js","_app/immutable/chunks/singletons.e24997e9.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.94a1bf75.js","imports":["_app/immutable/entry/app.94a1bf75.js","_app/immutable/chunks/index.78a93697.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./chunks/0-88b480d6.js'),
			() => import('./chunks/1-652ffad6.js'),
			() => import('./chunks/2-3481db60.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
