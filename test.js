let query;
query.where = {
	ownerId: req.params.id,
	$or: [
		{ access: 'private' },
		
	]
}