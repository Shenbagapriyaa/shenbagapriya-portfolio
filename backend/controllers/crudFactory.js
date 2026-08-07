// Generic CRUD handlers shared by all resource controllers.
// Keeps each resource controller to a few lines while staying explicit about routes.
export function getAll(Model, defaultSort = { order: 1, createdAt: -1 }) {
  return async (req, res, next) => {
    try {
      const docs = await Model.find().sort(defaultSort);
      res.json(docs);
    } catch (err) { next(err); }
  };
}

export function getOne(Model) {
  return async (req, res, next) => {
    try {
      const doc = await Model.findById(req.params.id);
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json(doc);
    } catch (err) { next(err); }
  };
}

export function createOne(Model) {
  return async (req, res, next) => {
    try {
      const doc = await Model.create(req.body);
      res.status(201).json(doc);
    } catch (err) { next(err); }
  };
}

export function updateOne(Model) {
  return async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json(doc);
    } catch (err) { next(err); }
  };
}

export function deleteOne(Model) {
  return async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Deleted successfully' });
    } catch (err) { next(err); }
  };
}
