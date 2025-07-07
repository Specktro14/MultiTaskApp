import { PrismaClient } from "../generated/prisma/index.js";
import { requireAuthn, requireAuthz, throwError } from "../middleware/auth.ts";
import type { User } from "../generated/prisma/index.d.ts";
import { comparePassword, hashPassword } from "../auth/hash.ts";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../auth/jwt.ts";
import { clearRefreshCookie, setRefreshCookie } from "../auth/cookies.ts";

export const resolvers = {
  Query: {
    getTasks: async (
      _: any,
      __: any,
      { prisma, user }: { prisma: PrismaClient; user: User }
    ) => {
      requireAuthn(user);
      const whereCondition = user.role === "admin" ? {} : { author: user.id };
      try {
        const tasks = await prisma.task.findMany({
          where: whereCondition,
        });
        return tasks;
      } catch (error: any) {
        throwError(
          "Error al obtener las tareas: " + error.message,
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    getTask: async (
      _: any,
      { id }: { id: number },
      { prisma, user }: { prisma: PrismaClient; user: User }
    ) => {
      requireAuthn(user);
      try {
        const task = await prisma.task.findUnique({
          where: {
            id: id,
          },
        });
        requireAuthz(user, task);
        return task;
      } catch (error: any) {
        throwError(
          "Error al obtener la tarea: " + error.message,
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    getReminders: async (
      _: any,
      __: any,
      { prisma, user }: { prisma: PrismaClient; user: User }
    ) => {
      requireAuthn(user);
      try {
        const whereCondition = user.role === "admin" ? {} : { author: user.id };

        const reminders = await prisma.reminder.findMany({
          where: whereCondition,
        });
        return reminders;
      } catch (error: any) {
        throwError(
          "Error al obtener los recordatorios: " + error.message,
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    getReminder: async (
      _: any,
      { id }: { id: number },
      { prisma, user }: { prisma: PrismaClient; user: User }
    ) => {
      requireAuthn(user);
      try {
        const reminder = await prisma.reminder.findUnique({
          where: {
            id: id,
          },
        });
        requireAuthz(user, reminder);
        return reminder;
      } catch (error: any) {
        throwError(
          "Error al obtener el recordatorio: " + error.message,
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    getTags: async (
      _: any,
      __: any,
      { prisma, user }: { prisma: PrismaClient; user: User }
    ) => {
      requireAuthn(user);
      try {
        const whereCondition = user.role === "admin" ? {} : { author: user.id };
        const tags = await prisma.tag.findMany({
          where: whereCondition,
        });
        return tags;
      } catch (error: any) {
        throwError(
          "Error al obtener las etiquetas: " + error.message,
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    getTag: async ( 
      _: any,
      { id }: { id: number },
      { prisma, user }: { prisma: PrismaClient; user: User }
    ) => {
      requireAuthn(user)
      try {
        const tag = await prisma.tag.findUnique({
          where: {
            id: id,
          },
        });
        requireAuthz(user, tag);
        return tag;
      } catch (error: any) {
        throwError(
          "Error al obtener la etiqueta: " + error.message,
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    getUsers:  async (
      _: any,
      __: any, 
      { prisma, user }: { prisma: PrismaClient; user: User }
    ) => {
      requireAuthn(user)
      try {
        if (user.role !== "admin") {
          throwError("No tienes permiso para ver los usuarios", "FORBIDDEN");
        }
        const users = await prisma.user.findMany({
          where: {
            role: "user", // Solo devuelve usuarios normales, no admins
          },
        });
        return users;
      } catch (error: any) {
        throwError(
          "Error al obtener los usuarios: " + error.message,
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    getUser: async (
      _: any,
      { id }: { id: string },
      { prisma, user }: { prisma: PrismaClient; user: User }
    ) => {
      requireAuthn(user);
      try {
        const wantedUser = await prisma.user.findUnique({
          where: {
            id: id,
          },
        });
        requireAuthz(user, wantedUser);
        return wantedUser;
      } catch (error: any) {
        throwError(
          "Error al obtener el usuario: " + error.message,
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    getSessions: async (
      _: any,
      __: any,
      { prisma, user }: { prisma: PrismaClient; user: User }
    ) => {
      requireAuthn(user)
      try {
        if (user.role !== "admin") {
          throwError("No tienes permiso para ver las sesiones", "FORBIDDEN");
        }
        const sessions = await prisma.session.findMany({
          where: {
            revoked: false,
          },
          include: {
            user: true
          }
        })
        return sessions;
      } catch (error: any) {
        throwError(
          "Error al obtener las sesiones: " + error.message,
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    getSession: async (
      _: any,
      { id }: { id: string },
      { prisma, user }: { prisma: PrismaClient; user: User }
    ) => {
      requireAuthn(user);
      try {
        if (user.role !== "admin") {
          throwError("No tienes permiso para ver la sesión", "FORBIDDEN");
        }
        const session = await prisma.session.findUnique({
          where: {
            id: id,
          },
          include: {
            user: true
          }
        });
        return session;
      } catch (error: any) {
        throwError(
          "Error al obtener la sesión: " + error.message,
          "INTERNAL_SERVER_ERROR"
        );
      }
    },
  },

  Mutation: {

    //TODO! Revisar mutaciones. 
    createTask: async (
      _: any,
      { input }: { input: any },
      { prisma, user }: { prisma: PrismaClient; user: User }
    ) => {
      requireAuthn(user);
      try {
        const { title, description, author } = input;
        //const { id } = user

        const task = await prisma.task.create({
          data: {
            title,
            description,
            author,
          },
        });
        return task;
      } catch (error: any) {
        throwError(
          "Error al crear la tarea: " + error.message,
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    updateTask: async (
      _: any,
      { input }: any,
      { prisma, user }: { prisma: PrismaClient; user: User }
    ) => {
      requireAuthn(user);
      try {
        const { id, title, description, status } = input;

        const taskExists = await prisma.task.findUnique({ where: { id } });

        if (!taskExists) {
          throwError("La tarea no existe", "NOT FOUND");
        }
        if (taskExists?.author !== user.id) {
          // TODO Añadir las opciones para el admin (limitar acceso aun siendo admin)
          // TODO Usar requireAuthz para comprobar el acceso
          throwError(
            "No tienes permiso para actualizar esta tarea. Comunique los cambios al autor de la tarea o pida el acceso a la tarea",
            "FORBIDDEN"
          );
        }

        const task = await prisma.task.update({
          where: {
            id,
          },
          data: {
            title,
            description,
            status,
          },
        });
        return task;
      } catch (error: any) {
        throwError(
          "Error al actualizar la tarea: " + error.message,
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    deleteTask: async (
      _: any,
      { id }: { id: number },
      { prisma, user }: { prisma: PrismaClient; user: User }
    ) => {
      requireAuthn(user);
      try {
        const taskExists = await prisma.task.findUnique({ where: { id: id } });

        if (!taskExists) {
          throwError("La tarea no existe", "NOT FOUND");
        }
        if (taskExists?.author !== user.id) {
          // TODO Añadir las opciones para el admin (limitar acceso aun siendo admin)
          throwError(
            "No tienes permiso para actualizar esta tarea. Comunique los cambios al autor de la tarea o pida el acceso a la tarea",
            "FORBIDDEN"
          );
        }

        const task = await prisma.task.delete({
          where: {
            id: id,
          },
        });

        return task;
      } catch (error: any) {
        throwError(
          "Error al eliminar la tarea: " + error.message,
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    createReminder: async (
      _: any,
      { input }: { input: any },
      { prisma, user }: { prisma: PrismaClient; user: User }
    ) => {
      requireAuthn(user);
      try {
        const { title, description, dueDate, priority, tagIds } = input;
        const reminder = await prisma.reminder.create({
          data: {
            title,
            description,
            dueDate: new Date(dueDate),
            priority,
            author: user.id,
            tags: {
              connect: tagIds.map((id: number) => ({ id })),
            },
          },
          include: {
            tags: true,
          },
        });
        return reminder;
      } catch (error: any) {
        throwError(
          "Error al crear el recordatorio: " + error.message,
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    updateReminder: async (
      _: any,
      { input }: { input: any },
      { prisma, user }: { prisma: PrismaClient; user: User }
    ) => {
      requireAuthn(user);
      try {
        const { id, title, description, dueDate, priority, tagIds } = input;
        const reminderExists = await prisma.reminder.findUnique({
          where: { id },
        });

        if (!reminderExists) {
          throwError("El recordatorio no existe", "NOT FOUND");
        }
        if (reminderExists?.author !== user.id) {
          // TODO Añadir las opciones para el admin (limitar acceso aun siendo admin)
          throwError(
            "No tienes permiso para actualizar este recordatorio. Comunique los cambios al autor del recordatorio o pida el acceso al recordatorio",
            "FORBIDDEN"
          );
        }

        const reminder = await prisma.reminder.update({
          where: {
            id,
          },
          data: {
            title,
            description,
            dueDate: new Date(dueDate),
            priority,
            tags: {
              set: [],
              connect: tagIds.map((id: number) => ({ id })),
            },
          },
          include: {
            tags: true,
          },
        });
        return reminder;
      } catch (error: any) {
        throwError(
          "Error al actualizar el recordatorio: " + error.message,
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    deleteReminder: async (
      _: any,
      { id }: { id: number },
      { prisma, user }: { prisma: PrismaClient; user: User }
    ) => {
      requireAuthn(user);
      try {
        const reminderExists = await prisma.reminder.findUnique({
          where: { id },
        });
        if (!reminderExists) {
          throwError("El recordatorio no existe", "NOT FOUND");
        }
        if (reminderExists?.author !== user.id) {
          // TODO Añadir las opciones para el admin (limitar acceso aun siendo admin)
          throwError(
            "No tienes permiso para eliminar este recordatorio. Comunique los cambios al autor del recordatorio o pida el acceso al recordatorio",
            "FORBIDDEN"
          );
        }
        const reminder = await prisma.reminder.delete({
          where: {
            id,
          },
        });
        return reminder;
      } catch (error: any) {
        throwError(
          "Error al eliminar el recordatorio: " + error.message,
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    createTag: async (
      _: any,
      { input }: { input: any },
      { prisma, user }: { prisma: PrismaClient; user: User }
    ) => {
      requireAuthn(user);
      try {
        const { name, color } = input;
        const tag = await prisma.tag.create({
          data: {
            name,
            color,
            author: user.id,
          },
        });
        return tag;
      } catch (error: any) {
        throwError(
          "Error al crear la etiqueta: " + error.message,
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    updateTag: async (
      _: any,
      { input }: { input: any },
      { prisma, user }: { prisma: PrismaClient; user: User }
    ) => {
      requireAuthn(user);
      try {
        const { id, name, color } = input;
        const tagExists = await prisma.tag.findUnique({ where: { id } });

        if (!tagExists) {
          throwError("La etiqueta no existe", "NOT FOUND");
        }
        if (tagExists?.author !== user.id) {
          // TODO Añadir las opciones para el admin (limitar acceso aun siendo admin)
          throwError(
            "No tienes permiso para actualizar esta etiqueta. Comunique los cambios al autor de la etiqueta o pida el acceso a la etiqueta",
            "FORBIDDEN"
          );
        }
        const tag = await prisma.tag.update({
          where: {
            id,
          },
          data: {
            name,
            color,
          },
        });
        return tag;
      } catch (error: any) {
        throwError(
          "Error al actualizar la etiqueta: " + error.message,
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    detachTagFromReminder: async (
      _: any,
      { reminderId, tagId }: { reminderId: number; tagId: number },
      { prisma, user }: { prisma: PrismaClient; user: User }
    ) => {
      requireAuthn(user);
      try {
        const reminderExists = await prisma.reminder.findUnique({
          where: { id: reminderId },
        });
        if (!reminderExists) {
          throwError("El recordatorio no existe", "NOT FOUND");
        }
        if (reminderExists?.author !== user.id) {
          // TODO Añadir las opciones para el admin (limitar acceso aun siendo admin)
          throwError(
            "No tienes permiso para actualizar este recordatorio. Comunique los cambios al autor del recordatorio o pida el acceso al recordatorio",
            "FORBIDDEN"
          );
        }
        const reminder = await prisma.reminder.update({
          where: { id: reminderId },
          data: {
            tags: {
              disconnect: {
                reminderId_tagId: {
                  reminderId,
                  tagId,
                },
              },
            },
          },
          include: {
            tags: true,
          },
        });
        return reminder;
      } catch (error: any) {
        throwError(
          "Error al eliminar la etiqueta del recordatorio: " + error.message,
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    deleteTag: async (
      _: any,
      { id }: { id: number },
      { prisma, user }: { prisma: PrismaClient; user: User }
    ) => {
      requireAuthn(user);
      try {
        const tagExists = await prisma.tag.findUnique({ where: { id } });
        if (!tagExists) {
          throwError("La etiqueta no existe", "NOT FOUND");
        }
        if (tagExists?.author !== user.id) {
          // TODO Añadir las opciones para el admin (limitar acceso aun siendo admin)
          throwError(
            "No tienes permiso para eliminar esta etiqueta. Comunique los cambios al autor de la etiqueta o pida el acceso a la etiqueta",
            "FORBIDDEN"
          );
        }
        const tag = await prisma.tag.delete({
          where: {
            id,
          },
        });
        return tag;
      } catch (error: any) {
        throwError(
          "Error al eliminar la etiqueta: " + error.message,
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    signUp: async (
      _: any,
      { input }: { input: any },
      { prisma }: { prisma: PrismaClient }
    ) => {
      try {
        const { name, email, role, password } = input;

        const userExists = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (userExists) {
          throw new Error("Existe un usuario con ese correo");
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            role, // or "admin" if appropriate
            lastLogin: new Date(),
          },
        });
        return newUser;
      } catch (error: any) {
        throwError(
          "Error al crear usuario: " + error.message,
          "INTERNAL_SERVER_ERROR"
        );
      }
    },

    logIn: async (
      _: any,
      { email, password }: { email: string; password: string },
      { prisma, res }: { prisma: PrismaClient; res: any }
    ) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (!user) {
          throw new Error("Usuario no encontrado");
        }
        if (await !comparePassword(password, user.password)) {
          throw new Error("Contraseña incorrecta");
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        await prisma.session.create({
          data: {
            userId: user.id,
            token: refreshToken,
          },
        });

        setRefreshCookie(res, refreshToken);

        return { token: accessToken };
      } catch (error: any) {
        throw new Error("Error al iniciar sesión: " + error.message);
      }
    },

    logOut: async (
      _: any,
      __: any,
      {
        prisma,
        user,
        req,
        res,
      }: { prisma: PrismaClient; user: User; req: any; res: any }
    ) => {
      requireAuthn(user);
      const refreshToken = req.cookies.refreshToken;
      if (refreshToken) {
        await prisma.session.updateMany({
          where: {
            token: refreshToken,
          },
          data: {
            revoked: true,
          },
        });
      }
      clearRefreshCookie(res);
      return { message: "Sesión cerrada correctamente" };
    },

    refreshToken: async (
      _: any,
      __: any,
      { prisma, req, res }: { prisma: PrismaClient; req: any; res: any }
    ) => {
      const oldToken = req.cookies.refreshToken;
      if (!oldToken) {
        throw new Error("No se ha proporcionado un token de actualización");
      }

      let payload;
      try {
        payload = verifyToken(oldToken);
      } catch (error: any) {
        throw new Error("Token de actualización inválido: " + error.message);
      }

      const session = await prisma.session.findUnique({
        where: {
          token: oldToken,
        },
      });
      if (!session || session.revoked) {
        throw new Error("Token de actualización no válido o revocado");
      }

      // Ensure payload is an object and has userId
      let userId: string | undefined;
      if (
        typeof payload === "object" &&
        payload !== null &&
        "userId" in payload
      ) {
        userId = (payload as any).userId;
      }
      if (!userId) {
        throw new Error(
          "El token de actualización no contiene un userId válido"
        );
      }

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new Error("Usuario no encontrado para el token de actualización");
      }

      await prisma.session.update({
        where: {
          token: oldToken,
        },
        data: {
          revoked: true,
        },
      });

      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      setRefreshCookie(res, newRefreshToken);

      await prisma.session.create({
        data: {
          userId: user.id,
          token: newRefreshToken,
        },
      });

      return { token: newAccessToken };
    },
  },
};
