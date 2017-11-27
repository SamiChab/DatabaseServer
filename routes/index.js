

const mongoose = require('mongoose');

const Note = mongoose.model('notes');

module.exports = (app) => {

	app.post('/get/note', async (req, res) => {
		console.log('/get/note', req.body);
		if(req.body._id) {
			const id = req.body._id.toString();
			const note = await Note.findById(id, function(err, note) {
				if(note === null) {
					res.status(404).send("L'id de la note fourni n'existe pas");
					return;
				}
				if (!err) {
					res.json(note);
				} else {
					res.status(404).send(err);
				}
			});
		} else {
			res.status(404).send('Veuillez fournir l\'id de la note que vous désirez');
		}
	});

	app.post('/update/note', async (req, res) => {
		console.log('/update/note', req.body);
		console.log(Date.now());
		
		if(req.body._id) {
			console.log('req.body._id', req.body._id);
			
			const id = req.body._id.toString();
			const note = await Note.findById(id, async function(err, note) {
				if(note === null) {
					res.status(404).send("L'id de la note fourni n'existe pas");
					return;
				}
				if (!err) {
					console.log('no error', id);
					console.log('no error', note);
					note.title = req.body.title ? req.body.title : note.title;
					note.body = req.body.body ? req.body.body : note.body;
					note.date = Date.now();
					const newNote = await note.save();
					console.log('new note');					
					res.json(newNote);
				} else {
					res.status(404).send(err);
				}
			});
		} else {
			res.status(404).send('Veuillez fournir l\'id de la note à mettre à jour');
		}
	});

	app.post('/delete/note', async (req, res) => {
		console.log('/delete/note', req.body);
		if(req.body._id) {
			const id = req.body._id.toString();
			const note = await Note.findById(id, function(err, note) {
				if(note === null) {
					res.status(404).send("L'id de la note fourni n'existe pas");
					return;
				}
				if (!err) {
					res.json(note);
					note.remove();
				} else {
					res.status(404).send(err);
				}
			});
		} else {
			res.status(404).send('Veuillez fournir l\'id de la note à supprimer');
		}
	});

	app.get('/get/notes', async (req, res) => {
		console.log('/get/notes', req.body);		
		// const note = await mongoose.model('notes').find({}, function(err, note) {
		const note = await Note.find({}, function(err, note) {
			if (!err) {
				res.json(note);
			} else {
				res.status(404).send(err);
			}
		});
	});

	app.post('/set/note', async (req, res) => {
		console.log('/set/note', req.body);		
		if(req.body.title || req.body.body) {
			const title = req.body.title ? req.body.title : "Titre par défaut";
			const body = req.body.body ? req.body.body : "Contenu par défaut";
			// const date = req.title || "Titre par défaut";

			const note = await new Note({ 
				title: title,
				body: body,
				date: Date.now()
			}).save()

			res.send(note);

		} else {
			res.status(404).send('Entrez au moins un titre ou un contenu...');
		}
		
	});

};

// 5a16150dd73b27292c314f31
// 5a16156c9a7c8a293efdaff9
// 5a16219ddce6312a26e97074
