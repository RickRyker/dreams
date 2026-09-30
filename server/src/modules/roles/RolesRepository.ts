// server/src/modules/roles/RolesRepository.ts

import { Role, PlayerRole, Prisma } from '@prisma/client';
import { prisma } from "@prisma";

export class RolesRepository {
  async inTransaction<T>(fn: (tx: Prisma.TransactionClient) => Promise<T>) {
    return prisma.$transaction(fn);
  }

  async listRoles(tx?: Prisma.TransactionClient): Promise<Role[]> {
    const client = tx || prisma;
    return client.role.findMany({
      include: {
        permissions: true,
      },
    });
  }

  async getRoleById(roleId: string, tx?: Prisma.TransactionClient): Promise<Role | null> {
    const client = tx || prisma;
    return client.role.findUnique({
      where: { id: roleId },
      include: {
        permissions: true,
      }
    });
  }

  async assignRoleToPlayer(
    playerId: string,
    roleId: string,
    tx?: Prisma.TransactionClient
  ): Promise<PlayerRole> {
    const client = tx || prisma;
    return client.playerRole.create({
      data: {
        playerId,
        roleId,
      }
    });
  }

  async removeRoleFromPlayer(
    playerId: string,
    roleId: string,
    tx?: Prisma.TransactionClient
  ): Promise<PlayerRole | null> {
    const client = tx || prisma;
    const existing = await client.playerRole.findUnique({
      where: {
        playerId_roleId: {
          playerId,
          roleId,
        },
      }
    });

    if (!existing) return null;

    return client.playerRole.delete({
      where: { id: existing.id }
    });
  }

  async getPlayerRoles(playerId: string, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return client.player.findUnique({
      where: { id: playerId },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: true
              }
            }
          },
        }
      }
    });
  }

  async playerHasPermission(
    playerId: string,
    permission: string,
    tx?: Prisma.TransactionClient
  ): Promise<boolean> {
    const client = tx || prisma;
    const player = await client.player.findUnique({
      where: { id: playerId },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: true
              }
            }
          }
        }
      }
    });

    if (!player) return false;

    for (const playerRole of player.roles) {
      for (const perm of playerRole.role.permissions) {
        if (perm.permission === permission) return true;
      }
    }

    return false;
  }
}
