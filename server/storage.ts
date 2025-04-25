import { 
  users, type User, type InsertUser, 
  books, type Book, type InsertBook,
  units, type Unit, type InsertUnit,
  materials, type Material, type InsertMaterial,
  plans, schools, subscriptions, schoolTeachers
} from "@shared/schema";
import { eq, and, desc, asc } from "drizzle-orm";
import session from "express-session";
import createMemoryStore from "memorystore";

// Interface for Storage Operations
export interface IStorage {
  // Session store
  sessionStore: session.Store;

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

// Memory Storage Implementation
export class MemStorage implements IStorage {
  private users: User[] = [];
  private nextUserId = 1;
  private books: Book[] = [];
  private nextBookId = 1;
  private units: Unit[] = [];
  private nextUnitId = 1;
  private materials: Material[] = [];
  private nextMaterialId = 1;
  
  // Session store
  sessionStore: session.Store;
  
  constructor() {
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    
    // Create admin user
    this.createUser({
      username: "admin",
      password: "$2b$10$PX5aQ5N5YCgBZq7TwwQw7.QRH65VNqnWJwWDc8QFG0EY0g/3erRZa", // password: "admin123"
      email: "admin@example.com",
      fullName: "Admin User",
      role: "admin",
      createdAt: new Date()
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      ...insertUser,
      id: this.nextUserId++,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(user);
    return user;
  }
  
  // Book operations
  async getBooks(): Promise<Book[]> {
    return [...this.books].sort((a, b) => a.bookId.localeCompare(b.bookId));
  }
  
  async getBookById(id: number): Promise<Book | undefined> {
    return this.books.find(book => book.id === id);
  }
  
  async getBookByBookId(bookId: string): Promise<Book | undefined> {
    return this.books.find(book => book.bookId === bookId);
  }
  
  async createBook(book: InsertBook): Promise<Book> {
    const newBook: Book = {
      ...book,
      id: this.nextBookId++,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.books.push(newBook);
    return newBook;
  }
  
  async updateBook(id: number, book: Partial<InsertBook>): Promise<Book> {
    const index = this.books.findIndex(b => b.id === id);
    if (index === -1) {
      throw new Error(`Book with id ${id} not found`);
    }
    
    const updatedBook: Book = {
      ...this.books[index],
      ...book,
      updatedAt: new Date()
    };
    
    this.books[index] = updatedBook;
    return updatedBook;
  }
  
  async deleteBook(id: number): Promise<void> {
    const index = this.books.findIndex(book => book.id === id);
    if (index !== -1) {
      this.books.splice(index, 1);
      // Also delete all units and materials associated with this book
      const unitIds = this.units.filter(unit => unit.bookId === id).map(unit => unit.id);
      this.units = this.units.filter(unit => unit.bookId !== id);
      unitIds.forEach(unitId => {
        this.materials = this.materials.filter(material => material.unitId !== unitId);
      });
    }
  }
  
  // Unit operations
  async getUnits(bookId: number): Promise<Unit[]> {
    return [...this.units]
      .filter(unit => unit.bookId === bookId)
      .sort((a, b) => a.unitNumber - b.unitNumber);
  }
  
  async getUnitById(id: number): Promise<Unit | undefined> {
    return this.units.find(unit => unit.id === id);
  }
  
  async createUnit(unit: InsertUnit): Promise<Unit> {
    const newUnit: Unit = {
      ...unit,
      id: this.nextUnitId++,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.units.push(newUnit);
    return newUnit;
  }
  
  async updateUnit(id: number, unit: Partial<InsertUnit>): Promise<Unit> {
    const index = this.units.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error(`Unit with id ${id} not found`);
    }
    
    const updatedUnit: Unit = {
      ...this.units[index],
      ...unit,
      updatedAt: new Date()
    };
    
    this.units[index] = updatedUnit;
    return updatedUnit;
  }
  
  async deleteUnit(id: number): Promise<void> {
    const index = this.units.findIndex(unit => unit.id === id);
    if (index !== -1) {
      this.units.splice(index, 1);
      // Also delete all materials associated with this unit
      this.materials = this.materials.filter(material => material.unitId !== id);
    }
  }
  
  // Material operations
  async getMaterials(unitId: number): Promise<Material[]> {
    return [...this.materials]
      .filter(material => material.unitId === unitId)
      .sort((a, b) => a.orderIndex - b.orderIndex);
  }
  
  async getMaterialById(id: number): Promise<Material | undefined> {
    return this.materials.find(material => material.id === id);
  }
  
  async createMaterial(material: InsertMaterial): Promise<Material> {
    const newMaterial: Material = {
      ...material,
      id: this.nextMaterialId++,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.materials.push(newMaterial);
    return newMaterial;
  }
  
  async updateMaterial(id: number, material: Partial<InsertMaterial>): Promise<Material> {
    const index = this.materials.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error(`Material with id ${id} not found`);
    }
    
    const updatedMaterial: Material = {
      ...this.materials[index],
      ...material,
      updatedAt: new Date()
    };
    
    this.materials[index] = updatedMaterial;
    return updatedMaterial;
  }
  
  async deleteMaterial(id: number): Promise<void> {
    const index = this.materials.findIndex(material => material.id === id);
    if (index !== -1) {
      this.materials.splice(index, 1);
    }
  }
}

// Use MemStorage instead of DatabaseStorage
export const storage = new MemStorage();
