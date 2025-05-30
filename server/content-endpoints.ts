import { Express, Request, Response } from "express";
import { 
  ensureContentEditsTable, 
  ensureTeacherResourcesTable,
  saveContentEdit, 
  getContentEdits, 
  deleteContentEdit, 
  resetContentEdits,
  getResourcesForUnit,
  saveResourcesForUnit,
  TeacherResource
} from './content-management';

export function registerContentEndpoints(app: Express) {
  // Ensure the content_edits and teacher_resources tables exist
  ensureContentEditsTable().then(success => {
    if (success) {
      console.log("Content edits table is ready");
    } else {
      console.error("Failed to initialize content edits table");
    }
  });
  
  ensureTeacherResourcesTable().then(success => {
    if (success) {
      console.log("Teacher resources table is ready");
    } else {
      console.error("Failed to initialize teacher resources table");
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

  // API endpoint to get teacher resources for a specific book and unit
  app.get("/api/direct/:bookId/:unitId/resources", isAuthenticated, (req, res) => {
    try {
      const { bookId, unitId } = req.params;
      
      const resources = getResourcesForUnit(bookId, unitId);
      
      return res.status(200).json({ 
        success: true, 
        resources: resources || [] 
      });
    } catch (error) {
      console.error("Error getting teacher resources:", error);
      return res.status(500).json({ success: false, error: "Server error" });
    }
  });
  
  // API endpoint to save teacher resources for a specific book and unit
  app.post("/api/direct/:bookId/:unitId/resources", isAuthenticated, (req, res) => {
    try {
      const { bookId, unitId } = req.params;
      const { resources } = req.body;
      
      // Basic validation
      if (!resources || !Array.isArray(resources)) {
        return res.status(400).json({ success: false, error: "Invalid resources data" });
      }
      
      const success = saveResourcesForUnit(bookId, unitId, resources);
      
      if (success) {
        return res.status(200).json({ 
          success: true, 
          message: "Resources saved successfully" 
        });
      } else {
        return res.status(500).json({ success: false, error: "Failed to save resources" });
      }
    } catch (error) {
      console.error("Error saving teacher resources:", error);
      return res.status(500).json({ success: false, error: "Server error" });
    }
  });
  
  // API endpoint to delete slides from a unit
  app.post("/api/content/:bookId/:unitId/delete-slides", isAuthenticated, async (req, res) => {
    try {
      const { bookId, unitId } = req.params;
      const { materialIds } = req.body;
      
      // Basic validation
      if (!Array.isArray(materialIds) || materialIds.length === 0) {
        return res.status(400).json({ 
          success: false, 
          error: "Invalid or empty materialIds array" 
        });
      }
      
      // Log the deletion request
      console.log(`Slide deletion request for book ${bookId}, unit ${unitId}:`, materialIds);
      
      // Get the user ID from the session
      const userId = req.user?.id || 1; // Fallback to ID 1 for testing
      
      // Check if the user is an admin or has appropriate permissions
      const isAdmin = req.user?.role === 'admin';
      
      if (!isAdmin) {
        return res.status(403).json({ 
          success: false, 
          error: "Only admin users can delete slides" 
        });
      }
      
      // For each material ID, create a content edit entry that marks it as deleted
      const results = [];
      
      for (const materialId of materialIds) {
        // Create a content edit marking the slide as deleted
        const editResult = await saveContentEdit({
          userId,
          bookId,
          unitId,
          materialId,
          editType: 'qa_delete',
          isDeleted: true
        });
        
        results.push({
          materialId,
          success: editResult.success,
          id: editResult.id
        });
      }
      
      // Return all results
      return res.status(200).json({ 
        success: true, 
        message: `${materialIds.length} slides marked as deleted`,
        results
      });
    } catch (error) {
      console.error("Error deleting slides:", error);
      return res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Server error" 
      });
    }
  });

  console.log("Content management endpoints registered successfully");
}