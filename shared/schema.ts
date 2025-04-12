import { pgTable, text, serial, integer, boolean, decimal, timestamp, pgEnum, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// User-related tables
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  role: text("role").default("teacher").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  role: true,
});

// Plans and subscription-related tables
export const planTypeEnum = pgEnum("plan_type", [
  "individual_lesson", 
  "individual_digital", 
  "individual_print", 
  "school_small",
  "school_medium",
  "school_large",
  "school_custom"
]);

export const subscriptionLengthEnum = pgEnum("subscription_length", [
  "three_months",
  "six_months",
  "nine_months",
  "twelve_months"
]);

export const plans = pgTable("plans", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  planType: planTypeEnum("plan_type").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  features: text("features").array(),
  isHighlighted: boolean("is_highlighted").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  planId: integer("plan_id").references(() => plans.id).notNull(),
  startDate: timestamp("start_date").defaultNow().notNull(),
  endDate: timestamp("end_date").notNull(),
  subscriptionLength: subscriptionLengthEnum("subscription_length").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const schools = pgTable("schools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address"),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone"),
  maxTeachers: integer("max_teachers").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const schoolTeachers = pgTable("school_teachers", {
  id: serial("id").primaryKey(),
  schoolId: integer("school_id").references(() => schools.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  subscriptions: many(subscriptions),
  schoolTeachers: many(schoolTeachers),
}));

export const plansRelations = relations(plans, ({ many }) => ({
  subscriptions: many(subscriptions),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
  plan: one(plans, {
    fields: [subscriptions.planId],
    references: [plans.id],
  }),
}));

export const schoolsRelations = relations(schools, ({ many }) => ({
  teachers: many(schoolTeachers),
}));

export const schoolTeachersRelations = relations(schoolTeachers, ({ one }) => ({
  school: one(schools, {
    fields: [schoolTeachers.schoolId],
    references: [schools.id],
  }),
  user: one(users, {
    fields: [schoolTeachers.userId],
    references: [users.id],
  }),
}));

// Content Management Tables
export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  bookId: text("book_id").notNull().unique(), // e.g., "0a", "1", "2", etc.
  title: text("title").notNull(),
  description: text("description"),
  thumbnail: text("thumbnail").notNull(),
  level: text("level").notNull(), // difficulty level
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id").references(() => books.id).notNull(),
  unitNumber: integer("unit_number").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  thumbnail: text("thumbnail"),
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(), 
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Content types
export const contentTypeEnum = pgEnum("content_type", [
  "lesson",
  "exercise",
  "quiz",
  "video",
  "audio",
  "document"
]);

export const materials = pgTable("materials", {
  id: serial("id").primaryKey(),
  unitId: integer("unit_id").references(() => units.id).notNull(),
  title: text("title").notNull(),
  contentType: contentTypeEnum("content_type").notNull(),
  content: jsonb("content").notNull(), // JSON structure for different content types
  orderIndex: integer("order_index").notNull(),
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Define content relations
export const booksRelations = relations(books, ({ many }) => ({
  units: many(units),
}));

export const unitsRelations = relations(units, ({ one, many }) => ({
  book: one(books, {
    fields: [units.bookId],
    references: [books.id],
  }),
  materials: many(materials),
}));

export const materialsRelations = relations(materials, ({ one }) => ({
  unit: one(units, {
    fields: [materials.unitId],
    references: [units.id],
  }),
}));

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Plan = typeof plans.$inferSelect;
export const insertPlanSchema = createInsertSchema(plans).omit({ id: true, createdAt: true });
export type InsertPlan = z.infer<typeof insertPlanSchema>;

export type Subscription = typeof subscriptions.$inferSelect;
export const insertSubscriptionSchema = createInsertSchema(subscriptions).omit({ id: true, createdAt: true });
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;

export type School = typeof schools.$inferSelect;
export const insertSchoolSchema = createInsertSchema(schools).omit({ id: true, createdAt: true });
export type InsertSchool = z.infer<typeof insertSchoolSchema>;

export type SchoolTeacher = typeof schoolTeachers.$inferSelect;
export const insertSchoolTeacherSchema = createInsertSchema(schoolTeachers).omit({ id: true, createdAt: true });
export type InsertSchoolTeacher = z.infer<typeof insertSchoolTeacherSchema>;

// Content types
export type Book = typeof books.$inferSelect;
export const insertBookSchema = createInsertSchema(books).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertBook = z.infer<typeof insertBookSchema>;

export type Unit = typeof units.$inferSelect;
export const insertUnitSchema = createInsertSchema(units).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertUnit = z.infer<typeof insertUnitSchema>;

export type Material = typeof materials.$inferSelect;
export const insertMaterialSchema = createInsertSchema(materials).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertMaterial = z.infer<typeof insertMaterialSchema>;
