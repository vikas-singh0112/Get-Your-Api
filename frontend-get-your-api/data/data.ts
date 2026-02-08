export const api = [
	// users
	{
		api: "users",
		routes: [
			{
				name: "help",
				globalRoute: "/users/help",
				privateRoute: "/users/help?scope=me",
				method: "GET",
				usage: "shows all the end points",
			},
			{
				name: "get all users",
				globalRoute: "/users",
				privateRoute: "/users?scope=me",
				method: "GET",
				usage: "Returns all users, default limit of 50 users ",
			},
			{
				name: "get all users with limit",
				globalRoute: "/users?limit=10",
				privateRoute: "/users?limit=10&scope=me",
				method: "GET",
				usage: "Returns all users, set limit manually",
			},
			{
				name: "get users by id",
				globalRoute: "/users/:id",
				privateRoute: "users/:id?scope=me",
				method: "GET",
				usage: "Returns a single user or user not found",
			},
			{
				name: "search users",
				globalRoute: "/users/search?q=adam",
				privateRoute: "/users/search?user=adam&scope=me",
				method: "GET",
				usage: "Returns an array of users or users not found, default limit 10",
			},
			{
				name: "search users with limit",
				globalRoute: "/users/search?q=adam&limit=10",
				privateRoute: "/users/search?user=adam&limit=10&scope=me",
				method: "GET",
				usage:
					"Returns an array of users or users not found, change limit manually",
			},
			{
				name: "create user",
				globalRoute: "/users/create",
				method: "POST",
				usage: "create user, for persisted creation signin",
			},
		],
		data: {
			firstName: "john",
			lastName: "doe",
			email: "johndoe@gmail.com",
			phoneNumber: "1234567890",
			role: "user",
			address: "TCL Chinese Theatre, 6925 Hollywood Blvd",
			city: "Hollywood",
			state: "CA",
			country: "USA",
			zipCode: "90028",
		},
	},
	// posts
	// 	{
	// 	api: "posts",
	// 	routes: [
	// 		{
	// 			name: "help",
	// 			route: "/posts/help",
	// 			method: "GET",
	// 			usage: "shows all the end points",
	// 		},
	// 		{
	// 			name: "get all posts",
	// 			route: "/posts",
	// 			method: "GET",
	// 			usage: "Returns all posts, default limit of 50 posts ",
	// 		},
	// 		{
	// 			name: "get all posts with limit",
	// 			route: "/posts?limit=10",
	// 			method: "GET",
	// 			usage: "Returns all posts, set limit manually",
	// 		},
	// 		{
	// 			name: "get posts by id",
	// 			route: "/posts/:id",
	// 			method: "GET",
	// 			usage: "Returns a single post or post not found",
	// 		},
	// 		{
	// 			name: "create post",
	// 			route: "/posts/create",
	// 			method: "POST",
	// 			usage: "create post, for persisted creation signin",
	// 		},
	// 	],
	// 	data: {
	// 		firstName: "john",
	// 		lastName: "doe",
	// 		email: "johndoe@gmail.com",
	// 		phoneNumber: "1234567890",
	// 		role: "post",
	// 		address: "TCL Chinese Theatre, 6925 Hollywood Blvd",
	// 		city: "Hollywood",
	// 		state: "CA",
	// 		country: "USA",
	// 		zipCode: "90028",
	// 	},
	// },
	//actors
	//  {
	// 	api: "actors",
	// 	routes: [
	// 		{
	// 			name: "help",
	// 			route: "/actors/help",
	// 			method: "GET",
	// 			usage: "shows all the end points",
	// 		},
	// 		{
	// 			name: "get all actors",
	// 			route: "/actors",
	// 			method: "GET",
	// 			usage: "Returns all actors, default limit of 50 actors ",
	// 		},
	// 		{
	// 			name: "get all actors with limit",
	// 			route: "/actors?limit=10",
	// 			method: "GET",
	// 			usage: "Returns all actors, set limit manually",
	// 		},
	// 		{
	// 			name: "get actors by id",
	// 			route: "/actors/:id",
	// 			method: "GET",
	// 			usage: "Returns a single actor or actor not found",
	// 		},
	// 		{
	// 			name: "search actors",
	// 			route: "/actors/search?q=adam",
	// 			method: "GET",
	// 			usage: "Returns an array of actors or actors not found, default limit 10",
	// 		},
	// 		{
	// 			name: "search actors with limit",
	// 			route: "/actors/search?q=adam&limit=10",
	// 			method: "GET",
	// 			usage:
	// 				"Returns an array of actors or actors not found, change limit manually",
	// 		},
	// 		{
	// 			name: "create actor",
	// 			route: "/actors/create",
	// 			method: "POST",
	// 			usage: "create actor, for persisted creation signin",
	// 		},
	// 	],
	// 	data: {
	// 		firstName: "john",
	// 		lastName: "doe",
	// 		email: "johndoe@gmail.com",
	// 		phoneNumber: "1234567890",
	// 		role: "user",
	// 		address: "TCL Chinese Theatre, 6925 Hollywood Blvd",
	// 		city: "Hollywood",
	// 		state: "CA",
	// 		country: "USA",
	// 		zipCode: "90028",
	// 	},
	// },
	
];
