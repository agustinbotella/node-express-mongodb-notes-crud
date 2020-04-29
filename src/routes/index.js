const express = require('express');
const router = express.Router();

//I call the module created in task file, so we can use the Mongoose schema
const Task = require('../models/task');

//I render index.ejs when receive a request for /
router.get('/', async(req, res) => {
    const tasks = await Task.find();
    res.render('index', {
        tasks
    }
    )
});

// This is how I process the new tasks. I first save the task (which is taken from the form as "req.body" and
// then save it into a const called task.
router.post('/add', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.redirect('/');
});

// This is how I process the tasks status change. I first look for the object in the DB collection, using
//the id of the task. Then change status to the opposite and save it.
router.get('/turn/:id', async (req, res) => {
    let {id} = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
});

//This is how I show the edit page. First I find in the DB the requested task using the ID, then I render /edit/:id
//and pass the task as an object so I can show with HTML the items preloaded.
router.get('/edit/:id', async (req, res) => {
    let {id} = req.params;
    const task = await Task.findById(id);
    res.render('edit', {task});
});

// This is how I process the tasks edit. I first look for the object in the DB collection, using
//the id of the task. Then I update that in DB.
router.post('/edit/:id', async (req, res) => {
    let {id} = req.params;
    await Task.updateOne({_id: id}, req.body);
    res.redirect('/');
})

// This is the tasks delete process. I use :id to say that that's a variable that will change
router.get('/delete/:id', async (req, res) => {
    let {id} = req.params;
    await Task.deleteOne({_id : id});
    res.redirect('/');
});

module.exports = router;