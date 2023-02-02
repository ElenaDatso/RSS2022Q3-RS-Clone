const express = require('express');
const Project = require('../models/Project');
const User = require('../models/User');
const router = express.Router();

function isCorrectProjectInfo(body) {
  return typeof body.title === 'string' 
    && body.title !== ''
    && typeof body.description === 'string' 
    && typeof body.key === 'string' 
    && body.key !== ''
    && typeof body.author === 'string'
    && body.author !== ''
    && typeof body.pathImage === 'string'
    && body.pathImage !== '';
}

const valuesColumnType = ['common', 'final'];
function isCorrectProjectColumn(body) {
  return typeof body.title === 'string' && valuesColumnType.indexOf(body.type) >= 0; 
}


// Get Methods

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({})
    res.json(projects);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.get('/:id/info', async (req, res) => {
  try {
    const project = (await Project.find({ _id: req.params.id }))[0];
    if (!project) throw new Error('Not found');

    res.json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.get('/:id/columns', async (req, res) => {
  try {
    const project = (await Project.find({ _id: req.params.id }))[0];
    if (!project) throw new Error('Not found');

    res.json(project.columnList);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});


// Post Methods

router.post('/', async (req, res) => {
  try {
    if (!isCorrectProjectInfo(req.body)) throw new Error('Not found property');

    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      key: req.body.key,
      author: req.body.author,
      team: [],
      pathImage: req.body.pathImage,
      columnList: [],
    });

    project.columnList.push({
      title: "dev",
      type: "common"
    });

    project.columnList.push({
      title: "done",
      type: "final"
    });

    await project.save();
    res.json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.post('/:id/team', async (req, res) => {
  try {
    if (typeof req.body.userId !== 'string' && req.body.userId === '') throw new Error('Not found property');

    const user = (await User.find({ _id: req.body.userId }))[0]
    if (!user) throw new Error('Not found user');
    
    const project = (await Project.find({ _id: req.params.id }))[0];
    if (!project) throw new Error('Not found project');

    project.team.push(user._id);

    await project.save();
    res.json(project.team);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.post('/:id/columns', async (req, res) => {
  try {
    if (!isCorrectProjectColumn(req.body)) throw new Error('Not found property');

    const project = (await Project.find({ _id: req.params.id }))[0];
    if (!project) throw new Error('Not found');

    project.columnList.push({
      title: req.body.title,
      type: req.body.type
    });

    await project.save();
    res.json(project.columnList);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});


// Put Methods

router.put('/:id/info', async (req, res) => {
  try {
    if (!isCorrectProjectInfo(req.body)) throw new Error('Not found property');

    const project = (await Project.find({ _id: req.params.id }))[0];
    if (!project) throw new Error('Not found');

    project.title = req.body.title;
    project.description = req.body.description;
    project.key = req.body.key;
    project.author = req.body.author;
    project.pathImage = req.body.pathImage;

    await project.save();
    res.json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.put('/:id/columns/:columnId', async (req, res) => {
  try {
    if (!isCorrectProjectColumn(req.body)) throw new Error('Not found property');

    const project = (await Project.find({ _id: req.params.id }))[0];
    if (!project) throw new Error('Not found project');

    const idx = project.columnList.findIndex((column) => column._id === req.params.columnId);
    if (idx < 0) throw new Error('Not found column');

    project.columnList[idx].title = req.body.title;
    project.columnList[idx].type = req.body.type;

    await project.save();
    res.json(true);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});


// Delete Methods

router.delete('/:id/info', async (req, res) => {
  try {
    const project = (await Project.find({ _id: req.params.id }))[0];
    if (!project) throw new Error('Not found');

    await Project.deleteOne({ _id: project._id });
    res.json(true);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.delete('/:id/team/:userId', async (req, res) => {
  try {
    const project = (await Project.find({ _id: req.params.id }))[0];
    if (!project) throw new Error('Not found project');

    const idx = project.team.indexOf(req.params.userId);
    if (idx < 0) throw new Error('Not found column');

    project.team.splice(idx, 1);

    await project.save();
    res.json(true);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.delete('/:id/columns/:columnId', async (req, res) => {
  try {
    const project = (await Project.find({ _id: req.params.id }))[0];
    if (!project) throw new Error('Not found project');

    const idx = project.columnList.findIndex((column) => column._id === req.params.columnId);
    if (idx < 0) throw new Error('Not found column');

    project.columnList.splice(idx, 1);

    await project.save();
    res.json(true);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});


module.exports = router;