require('dotenv/config')
const  {roleExists} = require('../../api/controllers/role.controller')
const  ERoles =  require('../../api/enums/ERoles')
const models  = require('../models')

const createAdmin = async () => {
  const roleName = ERoles.ADMINISTRATOR;
  const role = await roleExists(roleName);
  if (!role) {
    console.log(`FATAL: create ${roleName} role first.[Hint: run 'npm run db:seeds' to create role]`);
    return;
  }
  const { SYSTEM_ADMIN_PASSWORD, SYSTEM_ADMIN_EMAIL } = process.env;

  const admin = {
    fullName: 'System Admin',
    email: SYSTEM_ADMIN_EMAIL,
    password: SYSTEM_ADMIN_PASSWORD,
    roles: [roleName],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await models.Users.create(admin);
  console.log(`${roleName} created`);
};

createAdmin();
