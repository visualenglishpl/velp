import { Express, Request, Response } from "express";
import { ensureContentEditsTable, saveContentEdit, getContentEdits, deleteContentEdit, resetContentEdits } from './content-management';

export function registerContentEndpoints(app: Express) {
  // Ensure the content_edits table exists
  ensureContentEditsTable().then(success => {
    if (success) {
      console.log("Content edits table is ready");
    } else {
      console.error("Failed to initialize content edits table");
    }
  });

  // Basic authentication middleware - made optional for direct paths
  const isAuthenticated = (req: Request, res: Response, next: Function) => {
    // For development and testing, allow access even if not authenticated
    // In production, this should be properly secured
    console.log(`Authentication check for ${req.path} - allowing access`);
    return next();
  };
  
  // API endpoint to save content edits (Q&A modifications, image hiding)
  app.post("/api/direct/content-edits", isAuthenticated, async (req, res) => {
    try {
      const { bookId, unitId, materialId, editType, questionText, answerText, isDeleted, hideImage } = req.body;
      
      // Basic validation
      if (!bookId || !unitId || !materialId || !editType) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }
      
      // Get the user ID from the session
      const userId = req.user?.id || 1; // Fallback to ID 1 for testing
      
      const edit = {
        userId,
        bookId,
        unitId,
        materialId,
        editType,
        questionText,
        answerText,
        isDeleted,
        hideImage
      };
      
      const result = await saveContentEdit(edit);
      
      if (result.success) {
        return res.status(200).json({ 
          success: true, 
          id: result.id,
          message: result.updated ? "Content edit updated" : "Content edit saved" 
        });
      } else {
        return res.status(500).json({ success: false, error: result.error });
      }
    } catch (error) {
      console.error("Error saving content edit:", error);
      return res.status(500).json({ success: false, error: "Server error" });
    }
  });
  
  // API endpoint to get content edits for a specific book and unit
  app.get("/api/direct/content-edits/:bookId/:unitId", isAuthenticated, async (req, res) => {
    try {
      const { bookId, unitId } = req.params;
      
      // Get the user ID from the session
      const userId = req.user?.id || 1; // Fallback to ID 1 for testing
      
      const edits = await getContentEdits(userId, bookId, unitId);
      
      return res.status(200).json({ success: true, edits });
    } catch (error) {
      console.error("Error getting content edits:", error);
      return res.status(500).json({ success: false, error: "Server error" });
    }
  });
  
  // API endpoint to reset a specific content edit
  app.delete("/api/direct/content-edits/:bookId/:unitId/:materialId", isAuthenticated, async (req, res) => {
    try {
      const { bookId, unitId, materialId } = req.params;
      
      // Get the user ID from the session
      const userId = req.user?.id || 1; // Fallback to ID 1 for testing
      
      const result = await resetContentEdits(userId, bookId, unitId, parseInt(materialId));
      
      if (result.success) {
        return res.status(200).json({ success: true, message: "Content edit reset" });
      } else {
        return res.status(500).json({ success: false, error: result.error });
      }
    } catch (error) {
      console.error("Error resetting content edit:", error);
      return res.status(500).json({ success: false, error: "Server error" });
    }
  });

  console.log("Content management endpoints registered successfully");
}