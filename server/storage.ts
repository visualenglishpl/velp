import { 
  users, type User, type InsertUser, 
  books, type Book, type InsertBook,
  units, type Unit, type InsertUnit,
  materials, type Material, type InsertMaterial,
  plans, schools, subscriptions, schoolTeachers
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc } from "drizzle-orm";

// Interface for Storage Operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Book operations
  getBooks(): Promise<Book[]>;
  getBookById(id: number): Promise<Book | undefined>;
  getBookByBookId(bookId: string): Promise<Book | undefined>;
  createBook(book: InsertBook): Promise<Book>;
  updateBook(id: number, book: Partial<InsertBook>): Promise<Book>;
  deleteBook(id: number): Promise<void>;
  
  // Unit operations
  getUnits(bookId: number): Promise<Unit[]>;
  getUnitById(id: number): Promise<Unit | undefined>;
  createUnit(unit: InsertUnit): Promise<Unit>;
  updateUnit(id: number, unit: Partial<InsertUnit>): Promise<Unit>;
  deleteUnit(id: number): Promise<void>;
  
  // Material operations
  getMaterials(unitId: number): Promise<Material[]>;
  getMaterialById(id: number): Promise<Material | undefined>;
  createMaterial(material: InsertMaterial): Promise<Material>;
  updateMaterial(id: number, material: Partial<InsertMaterial>): Promise<Material>;
  deleteMaterial(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Book operations
  async getBooks(): Promise<Book[]> {
    return db.select().from(books).orderBy(asc(books.bookId));
  }
  
  async getBookById(id: number): Promise<Book | undefined> {
    const [book] = await db.select().from(books).where(eq(books.id, id));
    return book || undefined;
  }
  
  async getBookByBookId(bookId: string): Promise<Book | undefined> {
    const [book] = await db.select().from(books).where(eq(books.bookId, bookId));
    return book || undefined;
  }
  
  async createBook(book: InsertBook): Promise<Book> {
    const [newBook] = await db.insert(books).values(book).returning();
    return newBook;
  }
  
  async updateBook(id: number, book: Partial<InsertBook>): Promise<Book> {
    const [updatedBook] = await db
      .update(books)
      .set({...book, updatedAt: new Date()})
      .where(eq(books.id, id))
      .returning();
    return updatedBook;
  }
  
  async deleteBook(id: number): Promise<void> {
    await db.delete(books).where(eq(books.id, id));
  }
  
  // Unit operations
  async getUnits(bookId: number): Promise<Unit[]> {
    return db
      .select()
      .from(units)
      .where(eq(units.bookId, bookId))
      .orderBy(asc(units.unitNumber));
  }
  
  async getUnitById(id: number): Promise<Unit | undefined> {
    const [unit] = await db.select().from(units).where(eq(units.id, id));
    return unit || undefined;
  }
  
  async createUnit(unit: InsertUnit): Promise<Unit> {
    const [newUnit] = await db.insert(units).values(unit).returning();
    return newUnit;
  }
  
  async updateUnit(id: number, unit: Partial<InsertUnit>): Promise<Unit> {
    const [updatedUnit] = await db
      .update(units)
      .set({...unit, updatedAt: new Date()})
      .where(eq(units.id, id))
      .returning();
    return updatedUnit;
  }
  
  async deleteUnit(id: number): Promise<void> {
    await db.delete(units).where(eq(units.id, id));
  }
  
  // Material operations
  async getMaterials(unitId: number): Promise<Material[]> {
    return db
      .select()
      .from(materials)
      .where(eq(materials.unitId, unitId))
      .orderBy(asc(materials.orderIndex));
  }
  
  async getMaterialById(id: number): Promise<Material | undefined> {
    const [material] = await db.select().from(materials).where(eq(materials.id, id));
    return material || undefined;
  }
  
  async createMaterial(material: InsertMaterial): Promise<Material> {
    const [newMaterial] = await db.insert(materials).values(material).returning();
    return newMaterial;
  }
  
  async updateMaterial(id: number, material: Partial<InsertMaterial>): Promise<Material> {
    const [updatedMaterial] = await db
      .update(materials)
      .set({...material, updatedAt: new Date()})
      .where(eq(materials.id, id))
      .returning();
    return updatedMaterial;
  }
  
  async deleteMaterial(id: number): Promise<void> {
    await db.delete(materials).where(eq(materials.id, id));
  }
}

export const storage = new DatabaseStorage();
