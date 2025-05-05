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

// Resource cache to improve performance
const resourceCache: Record<string, { resources: any[], timestamp: number }> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache TTL

// Content edit cache
const editCache: Record<string, { edits: any[], timestamp: number }> = {};

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
      
      // Invalidate cache for this book/unit
      const cacheKey = `${userId}:${bookId}:${unitId}`;
      delete editCache[cacheKey];
      
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
      
      // Check cache first
      const cacheKey = `${userId}:${bookId}:${unitId}`;
      const now = Date.now();
      
      if (editCache[cacheKey] && (now - editCache[cacheKey].timestamp) < CACHE_TTL) {
        console.log(`Using cached edits for User ${userId}, Book ${bookId}, Unit ${unitId}`);
        return res.status(200).json({
          success: true,
          edits: editCache[cacheKey].edits,
          fromCache: true
        });
      }
      
      // No cache hit, get from storage
      const edits = await getContentEdits(userId, bookId, unitId);
      
      // Update cache
      editCache[cacheKey] = {
        edits,
        timestamp: now
      };
      
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
      
      // Invalidate cache for this book/unit
      const cacheKey = `${userId}:${bookId}:${unitId}`;
      delete editCache[cacheKey];
      
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

  // API endpoint to get teacher resources for a specific book and unit (with caching)
  app.get("/api/direct/:bookId/:unitId/resources", isAuthenticated, (req, res) => {
    try {
      const { bookId, unitId } = req.params;
      const cacheKey = `${bookId}:${unitId}`;
      const now = Date.now();
      
      // Check if we have a valid cache entry
      if (resourceCache[cacheKey] && (now - resourceCache[cacheKey].timestamp) < CACHE_TTL) {
        console.log(`Using cached resources for Book ${bookId}, Unit ${unitId}`);
        return res.status(200).json({
          success: true,
          resources: resourceCache[cacheKey].resources || [],
          fromCache: true
        });
      }

      // No cache or expired cache, fetch fresh data
      const resources = getResourcesForUnit(bookId, unitId);
      
      // Update cache
      resourceCache[cacheKey] = {
        resources: resources || [],
        timestamp: now
      };
      
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
      
      // Clear cache when updating resources
      const cacheKey = `${bookId}:${unitId}`;
      delete resourceCache[cacheKey];
      
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
  
  console.log("Content management endpoints registered successfully");
}
