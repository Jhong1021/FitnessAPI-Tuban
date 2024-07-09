const jwt = require('jsonwebtoken');
const secret = 'inventoryManagement';

module.exports.createAccessToken = (user) => {

	
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	};

	return jwt.sign(data, secret, {});
}

module.exports.verify = (req, res, next) => {

	console.log(req.headers.authorization);

	if(typeof token === 'undefined') {

		return res.send({ auth: 'Failed. No Token'});

	} else {

		console.log(token);
		// token = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2NiNzg0ZTgzNThiNWZjZWJlOTZjNCIsImVtYWlsIjoianNtaXRoQG1haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcxNTMzNTkzMn0.ZIipYLL90I18cAMdUWWFl6IJIujdSAuUfna6_mjjtwc
		token = token.slice(7, token.length);
		// token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2NiNzg0ZTgzNThiNWZjZWJlOTZjNCIsImVtYWlsIjoianNtaXRoQG1haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcxNTMzNTkzMn0.ZIipYLL90I18cAMdUWWFl6IJIujdSAuUfna6_mjjtwc
		console.log(token);

		// verify() method to decrypt the token
		jwt.verify(token, secret, function(err, decodedToken) {

			if(err) {

				return res.send({
					auth: 'Failed',
					message: err.message
				})

			} else {

				/*
					{
						id: '663cb784e8358b5fcebe96c4',
						email: 'jsmith@mail.com',
						isAdmin: false,
						iat: 1715335932
					}
				*/
				console.log('Resulkt from verify method:');
				console.log(decodedToken);

				/*
					req.user = {
						id: '663cb784e8358b5fcebe96c4',
						email: 'jsmith@mail.com',
						isAdmin: false,
						iat: 1715335932
					}
				*/
				req.user = decodedToken;

				// next() method allows us to move to the next function
				next();
			}
		})
	}
}
