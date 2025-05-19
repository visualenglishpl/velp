/**
 * Content Questions API Routes
 * 
 * These routes handle CRUD operations for content questions,
 * including creating, updating, and reviewing questions.
 */

const express = require('express');
const router = express.Router();
const { storage } = require('../storage');

// Get a question by ID
router.get('/questions/:id', async (req, res) => {
  try {
    const question = await storage.getContentQuestionById(req.params.id);
    
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    
    res.json(question);
  } catch (error) {
    console.error('Error getting question:', error);
    res.status(500).json({ error: 'Failed to get question' });
  }
});

// Create a new question
router.post('/questions', async (req, res) => {
  try {
    const { question, answer, bookId, unitId, slideId } = req.body;
    
    if (!question || !answer || !bookId || !unitId || !slideId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if a question already exists for this slide
    const existingQuestion = await storage.getContentQuestionBySlideId(slideId);
    
    if (existingQuestion) {
      return res.status(409).json({ 
        error: 'A question for this slide already exists',
        question: existingQuestion
      });
    }
    
    const userId = req.user?.id || null;
    
    const newQuestion = await storage.createContentQuestion({
      question,
      answer,
      bookId,
      unitId,
      slideId,
      createdBy: userId,
      status: userId && req.user?.role === 'admin' ? 'approved' : 'pending'
    });
    
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ error: 'Failed to create question' });
  }
});

// Update an existing question
router.patch('/questions/:id', async (req, res) => {
  try {
    const { question, answer, status } = req.body;
    const questionId = req.params.id;
    
    // Get the existing question
    const existingQuestion = await storage.getContentQuestionById(questionId);
    
    if (!existingQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }
    
    // Prepare update data
    const updateData = {};
    
    if (question) updateData.question = question;
    if (answer) updateData.answer = answer;
    
    // Only admins can change status
    if (status && req.user?.role === 'admin') {
      updateData.status = status;
      updateData.reviewedBy = req.user.id;
      updateData.reviewedAt = new Date();
    }
    
    // For non-admin users, set status to pending for review
    if ((question || answer) && req.user?.role !== 'admin') {
      updateData.status = 'pending';
    }
    
    const updatedQuestion = await storage.updateContentQuestion(questionId, updateData);
    
    res.json(updatedQuestion);
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ error: 'Failed to update question' });
  }
});

// Get questions for specific book/unit or slide
router.get('/questions', async (req, res) => {
  try {
    const { bookId, unitId, slideId, status } = req.query;
    
    if (slideId) {
      // Get questions for a specific slide
      const question = await storage.getContentQuestionBySlideId(slideId);
      return res.json(question ? [question] : []);
    }
    
    if (bookId && unitId) {
      // Get questions for a specific book and unit
      const questions = await storage.getContentQuestionsByUnit(bookId, unitId, status);
      return res.json(questions);
    }
    
    if (bookId) {
      // Get questions for a specific book
      const questions = await storage.getContentQuestionsByBook(bookId, status);
      return res.json(questions);
    }
    
    // Get all questions (admin only)
    if (req.user?.role === 'admin') {
      const questions = await storage.getAllContentQuestions(status);
      return res.json(questions);
    }
    
    res.status(400).json({ error: 'Missing required query parameters' });
  } catch (error) {
    console.error('Error getting questions:', error);
    res.status(500).json({ error: 'Failed to get questions' });
  }
});

module.exports = router;