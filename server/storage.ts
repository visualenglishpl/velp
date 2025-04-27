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
import { initialBooks, initialUnits, initialSlideOrders, type SlideOrder, initialDeletedSlides, type DeletedSlide } from "./memory-data";
import { QuestionAnswerEntry } from "./excel-unit-processor";

// Interface for Storage Operations
// Flagged question interface
export interface FlaggedQuestion {
  id: number;
  materialId: number;
  questionText: string;
  answerText: string;
  suggestedQuestion: string | null;
  suggestedAnswer: string | null;
  reason: string | null;
  status: string;
  bookId: string;
  unitId: string;
  createdAt: Date;
  reviewedAt: Date | null;
  adminNotes?: string | null;
}

export interface InsertFlaggedQuestion {
  materialId: number;
  questionText: string;
  answerText: string;
  suggestedQuestion?: string | null;
  suggestedAnswer?: string | null;
  reason?: string | null;
  status?: string;
  bookId: string;
  unitId: string;
  createdAt?: Date;
}

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
  
  // SlideOrder operations
  getSlideOrder(bookPath: string, unitPath: string): Promise<number[] | null>;
  saveSlideOrder(bookPath: string, unitPath: string, order: number[]): Promise<void>;
  
  // Deleted slides operations
  getDeletedSlides(bookPath: string, unitPath: string): Promise<number[]>;
  markSlideAsDeleted(bookPath: string, unitPath: string, slideId: number): Promise<void>;
  
  // Flagged question operations
  getFlaggedQuestions(filters?: { status?: string; bookId?: string; unitId?: string }): Promise<FlaggedQuestion[]>;
  createFlaggedQuestion(question: InsertFlaggedQuestion): Promise<FlaggedQuestion>;
  updateFlaggedQuestion(id: number, updates: Partial<FlaggedQuestion>): Promise<FlaggedQuestion | null>;
  
  // Unit question-answer operations from Excel
  getUnitQuestionAnswers(bookId: string, unitId: string): Promise<QuestionAnswerEntry[]>;
  saveUnitQuestionAnswers(bookId: string, unitId: string, entries: QuestionAnswerEntry[]): Promise<boolean>;
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
  private slideOrders: SlideOrder[] = [];
  private nextSlideOrderId = 1;
  private deletedSlides: DeletedSlide[] = [];
  private nextDeletedSlideId = 1;
  private flaggedQuestions: FlaggedQuestion[] = [];
  private nextFlaggedQuestionId = 1;
  private unitQuestionAnswers: { bookId: string; unitId: string; entries: QuestionAnswerEntry[] }[] = [];
  
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
    
    // Initialize with books from memory-data.ts
    console.log('Initializing storage with predefined books and units');
    
    // Add books
    this.books = initialBooks;
    this.nextBookId = Math.max(...initialBooks.map(book => book.id)) + 1;
    
    // Add units
    this.units = initialUnits;
    this.nextUnitId = Math.max(...initialUnits.map(unit => unit.id)) + 1;
    
    // Add slide orders (if any)
    this.slideOrders = initialSlideOrders;
    if (initialSlideOrders.length > 0) {
      this.nextSlideOrderId = Math.max(...initialSlideOrders.map(order => order.id)) + 1;
    }
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
  
  // SlideOrder operations
  async getSlideOrder(bookPath: string, unitPath: string): Promise<number[] | null> {
    const slideOrder = this.slideOrders.find(
      order => order.bookPath === bookPath && order.unitPath === unitPath
    );
    return slideOrder ? slideOrder.order : null;
  }
  
  async saveSlideOrder(bookPath: string, unitPath: string, order: number[]): Promise<void> {
    // Check if an order already exists for this book/unit
    const existingIndex = this.slideOrders.findIndex(
      so => so.bookPath === bookPath && so.unitPath === unitPath
    );
    
    const now = new Date();
    
    if (existingIndex !== -1) {
      // Update existing slide order
      this.slideOrders[existingIndex] = {
        ...this.slideOrders[existingIndex],
        order,
        updatedAt: now
      };
    } else {
      // Create a new slide order
      const newSlideOrder: SlideOrder = {
        id: this.nextSlideOrderId++,
        bookPath,
        unitPath,
        order,
        createdAt: now,
        updatedAt: now
      };
      this.slideOrders.push(newSlideOrder);
    }
    
    console.log(`Saved slide order for ${bookPath}/${unitPath} to permanent storage`);
  }
  
  // Flagged question operations
  async getFlaggedQuestions(filters?: { status?: string; bookId?: string; unitId?: string }): Promise<FlaggedQuestion[]> {
    let result = [...this.flaggedQuestions];
    
    // Apply filters if provided
    if (filters) {
      if (filters.status && filters.status !== 'all') {
        result = result.filter(q => q.status === filters.status);
      }
      
      if (filters.bookId) {
        result = result.filter(q => q.bookId === filters.bookId);
      }
      
      if (filters.unitId) {
        result = result.filter(q => q.unitId === filters.unitId);
      }
    }
    
    // Sort by createdAt in descending order (newest first)
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  
  async createFlaggedQuestion(question: InsertFlaggedQuestion): Promise<FlaggedQuestion> {
    const flaggedQuestion: FlaggedQuestion = {
      id: this.nextFlaggedQuestionId++,
      materialId: question.materialId,
      questionText: question.questionText,
      answerText: question.answerText,
      suggestedQuestion: question.suggestedQuestion || null,
      suggestedAnswer: question.suggestedAnswer || null,
      reason: question.reason || null,
      status: question.status || 'pending',
      bookId: question.bookId,
      unitId: question.unitId,
      createdAt: question.createdAt || new Date(),
      reviewedAt: null
    };
    
    this.flaggedQuestions.push(flaggedQuestion);
    console.log(`Created flagged question with ID ${flaggedQuestion.id}`);
    
    return flaggedQuestion;
  }
  
  async updateFlaggedQuestion(id: number, updates: Partial<FlaggedQuestion>): Promise<FlaggedQuestion | null> {
    const index = this.flaggedQuestions.findIndex(q => q.id === id);
    
    if (index === -1) {
      return null;
    }
    
    const updatedQuestion: FlaggedQuestion = {
      ...this.flaggedQuestions[index],
      ...updates
    };
    
    this.flaggedQuestions[index] = updatedQuestion;
    console.log(`Updated flagged question with ID ${id}`);
    
    return updatedQuestion;
  }
  
  // Unit question-answer operations from Excel
  async getUnitQuestionAnswers(bookId: string, unitId: string): Promise<QuestionAnswerEntry[]> {
    const existing = this.unitQuestionAnswers.find(
      qa => qa.bookId === bookId && qa.unitId === unitId
    );
    
    if (existing) {
      console.log(`Found ${existing.entries.length} cached QA entries for ${bookId}/${unitId}`);
      return existing.entries;
    }
    
    console.log(`No cached QA entries found for ${bookId}/${unitId}`);
    return [];
  }
  
  async saveUnitQuestionAnswers(bookId: string, unitId: string, entries: QuestionAnswerEntry[]): Promise<boolean> {
    const existingIndex = this.unitQuestionAnswers.findIndex(
      qa => qa.bookId === bookId && qa.unitId === unitId
    );
    
    if (existingIndex !== -1) {
      // Update existing entries
      this.unitQuestionAnswers[existingIndex].entries = entries;
    } else {
      // Add new entry
      this.unitQuestionAnswers.push({
        bookId,
        unitId,
        entries
      });
    }
    
    console.log(`Saved ${entries.length} QA entries for ${bookId}/${unitId}`);
    return true;
  }
}

// Use MemStorage instead of DatabaseStorage
export const storage = new MemStorage();
