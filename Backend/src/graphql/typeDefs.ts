import { gql } from "graphql-tag";

export const typeDefs = gql`

  scalar DateTime

  #//- Object types #

  type Task {
    id: ID!
    title: String!
    description: String
    status: Boolean!
    author: String!
    createdAt: String!
    updatedAt: String!
  }

  type Reminder {
    id: ID!
    title: String!
    description: String
    author: String!
    dueDate: String!
    priority: String!
    tags: [Tag!]!
    createdAt: String!
    updatedAt: String!
  }

  type Tag {
    id: ID!
    name: String!
    color: String!
    author: String!
    createdAt: String!
    updatedAt: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    createdAt: String!
    updatedAt: String!
    lastLogin: String!
  }

  type Session {
    id: ID!
    userId: ID!
    token: String!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!,
    refreshToken: String!
    user: User!
  }


  # //- Inputs Types #

  input ReminderInput {
    title: String!
    description: String
    dueDate: String!
    priority: String!
    tagIds: [Int!]!
    author: String!
  }

  input TaskInput {
    title: String!
    description: String
    author: ID!
  }

  input TagInput {
    name: String!
    color: String!
    author: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UserInput {
    name: String!
    email: String!
    role: String!
    password: String!
  }

  #//- Queries and Mutations #

  type Query {
    getTasks: [Task!]!
    getTask(id: ID!): Task
    getReminders: [Reminder!]!
    getReminder(id: ID!): Reminder
    getTags: [Tag!]!
    getTag(id: ID!): Tag
    getUsers: [User!]!
    getUser(id: ID!): User
    getSessions: [Session!]!
    getSession(id: ID!): Session
  }

  type Mutation {
    createTask(input: TaskInput!): Task!
    updateTask(id: ID!, input: TaskInput!): Task!
    deleteTask(id: ID!): Task!
    createReminder(input: ReminderInput!): Reminder!
    updateReminder(id: ID!, input: ReminderInput!): Reminder!
    deleteReminder(id: ID!): Reminder!
    createTag(input: TagInput!): Tag!
    updateTag(id: ID!, input: TagInput!): Tag!
    detachTagFromReminder(reminderId: ID!, tagId: ID!): Reminder! 
    deleteTag(id: ID!): Tag!
    updateUser(id: ID!, input: UserInput! ): User!
    deleteUser(id: ID!): User!
    signUp(input: UserInput!): User!
    logIn(input: LoginInput!): AuthPayload!
    logOut(id: ID!): Boolean!
    refreshToken(token: String!): AuthPayload!
  }
`