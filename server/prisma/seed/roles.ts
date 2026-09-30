// server/prisma/seed/roles.ts


import {PrismaClient, Role} from '@prisma/client';

export async function seedRoles(prisma: PrismaClient): Promise<void> {

  const adminRole: Role = await prisma.role.upsert({
    where: { id: 'ADMIN' },
    update: {},
    create: { id: 'ADMIN', name: 'Admin' },
  });

  const chatModeratorRole: Role = await prisma.role.upsert({
    where: { id: 'CHAT_MODERATOR' },
    update: {},
    create: { id: 'CHAT_MODERATOR', name: 'Chat Moderator' },
  });

  const moderatorRole: Role = await prisma.role.upsert({
    where: { id: 'NAME_CHANGE_MODERATOR' },
    update: {},
    create: { id: 'NAME_CHANGE_MODERATOR', name: 'Moderator' },
  });

  const mapEditorRole: Role = await prisma.role.upsert({
    where: { id: 'SYSTEM_MAP_EDITOR' },
    update: {},
    create: { id: 'SYSTEM_MAP_EDITOR', name: 'System Map Editor' },
  });

  const playerRole: Role = await prisma.role.upsert({
    where: { id: 'PLAYER' },
    update: {},
    create: { id: 'PLAYER', name: 'Player' },
  });

  // Assign Permissions to Roles
  const permissions = [
    { name: 'ADMIN', roleIds: [adminRole.id] },
    { name: 'BYPASS_MAINTENANCE', roleIds: [adminRole.id] },
    { name: 'MAP_EDIT_ALL', roleIds: [adminRole.id, mapEditorRole.id] },
    { name: 'MAP_EDIT_OWN', roleIds: [adminRole.id, mapEditorRole.id, playerRole.id] },
    { name: 'MAP_EDIT_SYSTEM', roleIds: [adminRole.id] },
    { name: 'CHAT_MODERATOR', roleIds: [adminRole.id, chatModeratorRole.id] },
    { name: 'NAME_CHANGE_MODERATOR', roleIds: [adminRole.id, moderatorRole.id] },
  ];

  for (const permission of permissions) {
    for (const roleId of permission.roleIds) {
      let permissionId: string = `${roleId}-${permission.name}`;
      await prisma.rolePermission.upsert({
        where: { id: permissionId },
        update: {},
        create: { id: permissionId, roleId: roleId, permission: permission.name },
      }).catch(() => {
        return prisma.rolePermission.create({
          data: { id: permissionId, roleId, permission: permission.name },
        });
      });
    }
  }

  console.log('Roles and permissions seeded.');
}
