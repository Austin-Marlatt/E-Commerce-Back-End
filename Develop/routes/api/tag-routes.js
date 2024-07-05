const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: { model: Product },
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: { model: Product },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No Product with this id!' });
      return;
    };
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newTagData = await Tag.create(req.body);
    res.status(200).json(newTagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedTagData) {
      res.status(404).json({ message: 'No Tag with this id!' });
      return;
    };
    res.status(200).json(updatedTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const destroyedTagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!destroyedTagData) {
      res.status(404).json({ message: 'No Tag with this id!' });
      return;
    };
    res.status(200).json(destroyedTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
