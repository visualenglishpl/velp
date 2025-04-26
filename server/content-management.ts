// Import drizzle-orm SQL builder
import { sql } from 'drizzle-orm';

// Try to import the database connection
let db: any = null;
try {
  const dbModule = require('./db');
  db = dbModule.db;
  console.log('Database connection imported successfully');
} catch (error) {
  console.error('Failed to import database connection:', error);
}

// Interface for content edits data
export interface ContentEdit {
  id?: number;
  userId: number;
  bookId: string;
  unitId: string;
  materialId: number;
  editType: 'qa_edit' | 'qa_delete' | 'image_hide';
  questionText?: string;
  answerText?: string;
  isDeleted?: boolean;
  hideImage?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Create content_edits table if it doesn't exist
export async function ensureContentEditsTable() {
  // If db is not available, use localStorage
  if (!db) {
    console.log('Database not available - using localStorage for content edits');
    return true;
  }

  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS content_edits (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        book_id TEXT NOT NULL,
        unit_id TEXT NOT NULL,
        material_id INTEGER NOT NULL,
        edit_type TEXT NOT NULL,
        question_text TEXT,
        answer_text TEXT,
        is_deleted BOOLEAN DEFAULT FALSE,
        hide_image BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Content edits table created or already exists');
    return true;
  } catch (error) {
    console.error('Error creating content_edits table:', error);
    return false;
  }
}

// Save a content edit
export async function saveContentEdit(edit: ContentEdit) {
  // If db is not available, return a mock success response
  if (!db) {
    console.log('Database not available - content changes will be stored in localStorage only');
    return { 
      success: true, 
      id: Math.floor(Math.random() * 1000) + 1, // Generate a fake ID
      updated: false,
      dbAvailable: false
    };
  }

  try {
    // Check if there's an existing edit for this material
    const existingEdits = await db.execute(sql`
      SELECT id FROM content_edits 
      WHERE user_id = ${edit.userId} 
      AND book_id = ${edit.bookId} 
      AND unit_id = ${edit.unitId} 
      AND material_id = ${edit.materialId}
    `);

    if (existingEdits && existingEdits.length > 0) {
      // Update existing edit
      const editId = existingEdits[0].id;
      await db.execute(sql`
        UPDATE content_edits SET
        edit_type = ${edit.editType},
        question_text = ${edit.questionText || null},
        answer_text = ${edit.answerText || null},
        is_deleted = ${edit.isDeleted || false},
        hide_image = ${edit.hideImage || false},
        updated_at = CURRENT_TIMESTAMP
        WHERE id = ${editId}
      `);
      return { success: true, id: editId, updated: true, dbAvailable: true };
    } else {
      // Insert new edit
      const result = await db.execute(sql`
        INSERT INTO content_edits (
          user_id, book_id, unit_id, material_id, edit_type, 
          question_text, answer_text, is_deleted, hide_image
        ) VALUES (
          ${edit.userId}, ${edit.bookId}, ${edit.unitId}, ${edit.materialId}, ${edit.editType},
          ${edit.questionText || null}, ${edit.answerText || null}, 
          ${edit.isDeleted || false}, ${edit.hideImage || false}
        ) RETURNING id
      `);
      return { success: true, id: result[0].id, updated: false, dbAvailable: true };
    }
  } catch (error) {
    console.error('Error saving content edit:', error);
    if (error instanceof Error) {
      return { success: false, error: error.message, dbAvailable: true };
    } else {
      return { success: false, error: 'Unknown error', dbAvailable: true };
    }
  }
}

// Get content edits for a specific user, book, and unit
export async function getContentEdits(userId: number, bookId: string, unitId: string) {
  // If db is not available, return an empty array
  if (!db) {
    console.log('Database not available - returning empty edits list');
    return [];
  }
  
  try {
    const edits = await db.execute(sql`
      SELECT * FROM content_edits 
      WHERE user_id = ${userId} 
      AND book_id = ${bookId} 
      AND unit_id = ${unitId}
    `);
    
    if (!edits || !Array.isArray(edits)) {
      console.log('No edits found or invalid result format');
      return [];
    }
    
    // Transform from snake_case DB columns to camelCase for frontend
    return edits.map((edit: any) => ({
      id: edit.id,
      userId: edit.user_id,
      bookId: edit.book_id,
      unitId: edit.unit_id,
      materialId: edit.material_id,
      editType: edit.edit_type,
      questionText: edit.question_text,
      answerText: edit.answer_text,
      isDeleted: edit.is_deleted,
      hideImage: edit.hide_image,
      createdAt: edit.created_at,
      updatedAt: edit.updated_at
    }));
  } catch (error) {
    console.error('Error getting content edits:', error);
    return [];
  }
}

// Delete a content edit
export async function deleteContentEdit(id: number, userId: number) {
  // If db is not available, return success (will rely on localStorage)
  if (!db) {
    console.log('Database not available - deletion will rely on localStorage only');
    return { success: true, dbAvailable: false };
  }
  
  try {
    await db.execute(sql`
      DELETE FROM content_edits 
      WHERE id = ${id} AND user_id = ${userId}
    `);
    return { success: true, dbAvailable: true };
  } catch (error) {
    console.error('Error deleting content edit:', error);
    if (error instanceof Error) {
      return { success: false, error: error.message, dbAvailable: true };
    } else {
      return { success: false, error: 'Unknown error', dbAvailable: true };
    }
  }
}

// Reset all edits for a specific material
export async function resetContentEdits(userId: number, bookId: string, unitId: string, materialId: number) {
  // If db is not available, return success (will rely on localStorage)
  if (!db) {
    console.log('Database not available - reset will rely on localStorage only');
    return { success: true, dbAvailable: false };
  }
  
  try {
    await db.execute(sql`
      DELETE FROM content_edits 
      WHERE user_id = ${userId} 
      AND book_id = ${bookId} 
      AND unit_id = ${unitId} 
      AND material_id = ${materialId}
    `);
    return { success: true, dbAvailable: true };
  } catch (error) {
    console.error('Error resetting content edits:', error);
    if (error instanceof Error) {
      return { success: false, error: error.message, dbAvailable: true };
    } else {
      return { success: false, error: 'Unknown error', dbAvailable: true };
    }
  }
}