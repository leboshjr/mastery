const ModelResolver = requireF('core/services/resolvers/ModelResolver');

export default async () => {
  if (!isMaster) return;

  const modelResolver = new ModelResolver();
  const {
    role,
    user,
  } = modelResolver.getModels(['role', 'user']);

  const anonymousRole = await role.findOrCreate({
    where: {
      name: 'anonymous',
    },
  });

  const anonymousUserExist = await user.count({
    where: {
      username: 'anonymous',
    },
  });
  if (!anonymousUserExist) {
    const anonymousUser = await user.build({
      username: 'anonymous',
      email: ' ',
      password: ' ',
      skipDefaultRole: true,
    });
    anonymousUser.save({
      validate: false,
    });
    anonymousUser.addRole(anonymousRole[0]);
  }
};
