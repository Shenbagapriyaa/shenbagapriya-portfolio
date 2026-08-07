import Profile from '../models/Profile.js';

export async function getProfile(req, res, next) {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = await Profile.create({});
    res.json(profile);
  } catch (err) { next(err); }
}

export async function updateProfile(req, res, next) {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = await Profile.create(req.body);
    else profile = await Profile.findByIdAndUpdate(profile._id, req.body, { new: true, runValidators: true });
    res.json(profile);
  } catch (err) { next(err); }
}
