import models from '../../db/models'

export const getRoles = async (req, res, next) => {
  try {
    const roles = await models.role.findAll();
    res.status(200).json({ roles });
  } catch (error) {
    next(error);
  }
};

export const getRoleById = async (req, res, next) => {
  const { role } = req.params;
  try {
    const roleData = await models.role.findOne({where: {role}});
    if (!roleData) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json({ roleData });
  } catch (error) {
    next(error);
  }
};

export const roleExists = async (role) => {
  const roleData = await models.role.findOne({where: {role}})
    if (!roleData) return false;
    return roleData
}
