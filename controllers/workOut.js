const Item = require("../models/Item");

module.exports.addItem = (req,res) => {

	let newItem = new Item({
		name : req.body.name,
		quantity : req.body.quantity
	});

	newItem.save()
	.then(savedItem => res.status(201).send(savedItem))
	.catch(saveErr => {

		console.error("Error in saving the item: ", saveErr)
		return res.status(500).send({ error: 'Failed to save the item' });
	})

};

module.exports.getAllItems = (req, res) => {

	Item.find({})
	.then(items => {

	    if (items.length > 0){
	        return res.status(200).send({ items });
	    }
	    else {

	        return res.status(200).send({ message: 'No items found.' })
	    }

	}).catch(err => res.status(500).send({ error: 'Error finding items.' }));

};

module.exports.getItemById = (req, res) => {

	Item.findById(req.params.id)
	.then(foundItem => {
		if (!foundItem) {
			return res.status(404).send({ error: 'Item not found' });
		}
		return res.status(200).send({ foundItem });
	})
	.catch(err => {
		console.error("Error in fetching the Item: ", err)
		return res.status(500).send({ error: 'Failed to fetch Item' });
	});

};

module.exports.updateItem = (req, res) => {

	let itemUpdates = {
        name: req.body.name,
        quantity: req.body.quantity
    }

    return Item.findByIdAndUpdate(req.params.id, itemUpdates)
    .then(updatedItem => {

        if (!updatedItem) {

            return res.status(404).send({ error: 'Item not found' });

        }

        return res.status(200).send({ 
        	message: 'Item updated successfully', 
        	updatedItem: updatedItem 
        });

    })
    .catch(err => {
		console.error("Error in updating an Item : ", err)
		return res.status(500).send({ error: 'Error in updating an Item.' });
	});
};

module.exports.deleteItem = (req, res) => {

    return Item.deleteOne({ _id: req.params.id})
    .then(deletedResult => {

        if (deletedResult < 1) {

            return res.status(400).send({ error: 'No Item deleted' });

        }

        return res.status(200).send({ 
        	message: 'Item deleted successfully'
        });

    })
    .catch(err => {
		console.error("Error in deleting an Item : ", err)
		return res.status(500).send({ error: 'Error in deleting an Item.' });
	});
};