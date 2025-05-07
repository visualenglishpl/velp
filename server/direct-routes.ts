import { Express } from 'express';
import path from 'path';
import fs from 'fs';

/**
 * Registers direct viewer routes that bypass React entirely
 */
export function registerDirectViewerRoutes(app: Express) {
  // Direct viewer for book content (completely standalone)
  app.get('/api/direct/viewer/book:bookId/unit:unitNumber', async (req, res) => {
    const { bookId, unitNumber } = req.params;
    
    // Serve a standalone HTML page with content viewer
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Visual English Book ${bookId}, Unit ${unitNumber}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f0f4f8;
        }
        .header {
          background-color: #4a76e8;
          color: white;
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .title {
          font-size: 18px;
          font-weight: 600;
        }
        .back-btn {
          background-color: transparent;
          border: 1px solid white;
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
        }
        .navigation {
          display: flex;
          justify-content: space-between;
          padding: 10px 20px;
          background-color: white;
          border-bottom: 1px solid #e2e8f0;
        }
        .nav-btn {
          background-color: #4a76e8;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .content-area {
          display: flex;
          height: calc(100vh - 120px);
        }
        .slide-container {
          flex: 1;
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f0f4f8;
          overflow: hidden;
        }
        .slide {
          max-width: 100%;
          max-height: 100%;
          display: block;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .sidebar {
          width: 320px;
          background-color: white;
          border-left: 1px solid #e2e8f0;
          padding: 15px;
          overflow-y: auto;
        }
        .sidebar h3 {
          margin-top: 0;
          padding-bottom: 10px;
          border-bottom: 1px solid #e2e8f0;
        }
        .qa-container {
          margin: 15px 0;
          padding: 15px;
          background-color: #f8fafc;
          border-radius: 6px;
          border-left: 3px solid #4a76e8;
        }
        .question {
          font-weight: 600;
          margin-bottom: 8px;
        }
        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          font-size: 18px;
          color: #4a5568;
        }
        .thumbnails {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 10px;
          margin-top: 20px;
        }
        .thumbnail {
          width: 100%;
          aspect-ratio: 4/3;
          object-fit: cover;
          border-radius: 4px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.2s;
        }
        .thumbnail.active {
          border-color: #4a76e8;
          transform: scale(1.05);
        }
        .info-box {
          margin-top: 15px;
          padding: 10px;
          background-color: #ebf8ff;
          border-radius: 4px;
          font-size: 14px;
        }
        @media (max-width: 768px) {
          .content-area {
            flex-direction: column;
            height: auto;
          }
          .sidebar {
            width: 100%;
            height: 300px;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="title">Visual English Book ${bookId}, Unit ${unitNumber}</div>
        <button class="back-btn" onclick="goBack()">Back to Homepage</button>
      </div>
      
      <div class="navigation">
        <button class="nav-btn" onclick="prevSlide()">&larr; Previous</button>
        <div id="progress">Loading...</div>
        <button class="nav-btn" onclick="nextSlide()">Next &rarr;</button>
      </div>
      
      <div class="content-area">
        <div class="slide-container">
          <div id="loading" class="loading">Loading content...</div>
          <img id="currentSlide" class="slide" style="display: none;" alt="Slide content">
        </div>
        
        <div class="sidebar">
          <h3>Question & Answer</h3>
          <div id="qaContainer" class="qa-container">
            <div class="loading">Loading Q&A data...</div>
          </div>
          
          <h3>Content Navigation</h3>
          <div id="thumbnailsContainer" class="thumbnails">
            <div class="loading">Loading thumbnails...</div>
          </div>
          
          <div class="info-box">
            <strong>Book ${bookId}, Unit ${unitNumber}</strong><br>
            This is a direct viewer that loads content immediately without requiring React.
          </div>
        </div>
      </div>
      
      <script>
        // State management
        let materials = [];
        let currentIndex = 0;
        
        // Start loading content immediately
        window.addEventListener('DOMContentLoaded', () => {
          loadMaterials();
        });
        
        async function loadMaterials() {
          try {
            const response = await fetch('/api/direct/book${bookId}/unit${unitNumber}/materials');
            if (!response.ok) {
              throw new Error('Failed to load materials');
            }
            
            materials = await response.json();
            if (materials.length === 0) {
              document.getElementById('loading').textContent = 'No content available for this unit';
              return;
            }
            
            // Initialize the first slide
            displaySlide(0);
            
            // Generate thumbnails
            generateThumbnails();
            
            // Update progress
            updateProgress();
          } catch (error) {
            document.getElementById('loading').textContent = 'Error loading content: ' + error.message;
            console.error('Error loading materials:', error);
          }
        }
        
        function displaySlide(index) {
          if (index < 0 || index >= materials.length) {
            return;
          }
          
          currentIndex = index;
          const material = materials[currentIndex];
          
          // Display the image
          const slideImg = document.getElementById('currentSlide');
          slideImg.src = material.content;
          slideImg.style.display = 'block';
          document.getElementById('loading').style.display = 'none';
          
          // Update Q&A if available
          updateQA(material);
          
          // Update thumbnails
          updateThumbnailHighlight();
          
          // Update progress
          updateProgress();
        }
        
        function updateQA(material) {
          const qaContainer = document.getElementById('qaContainer');
          const fileName = material.path.split('/').pop();
          
          // Parse the filename to get potential QA
          const match = fileName.match(/([^0-9]+)/);
          let questionText = match ? match[0].trim() : fileName;
          
          if (questionText.endsWith('.png') || questionText.endsWith('.jpg') || questionText.endsWith('.jpeg')) {
            questionText = questionText.substring(0, questionText.lastIndexOf('.'));
          }
          
          // Format QA display
          if (questionText) {
            // Try to format as a question if it might be one
            if (questionText.toLowerCase().includes('what') || 
                questionText.toLowerCase().includes('where') || 
                questionText.toLowerCase().includes('when') || 
                questionText.toLowerCase().includes('who') || 
                questionText.toLowerCase().includes('how') || 
                questionText.toLowerCase().includes('why') || 
                questionText.toLowerCase().includes('do you') || 
                questionText.toLowerCase().includes('can you') || 
                questionText.toLowerCase().includes('is it') || 
                questionText.toLowerCase().includes('are you')) {
              
              qaContainer.innerHTML = \`
                <div class="question">Q: \${questionText}</div>
                <div class="answer">A: [Practice answering this question]</div>
              \`;
            } else {
              qaContainer.innerHTML = \`
                <div>Content ID: \${material.id}</div>
                <div>Filename: \${fileName}</div>
              \`;
            }
          } else {
            qaContainer.innerHTML = '<div>No Q&A data available for this slide.</div>';
          }
        }
        
        function generateThumbnails() {
          const container = document.getElementById('thumbnailsContainer');
          container.innerHTML = '';
          
          // Only show first 20 thumbnails to avoid overloading
          const maxThumbnails = Math.min(materials.length, 20);
          
          for (let i = 0; i < maxThumbnails; i++) {
            const thumbnail = document.createElement('img');
            thumbnail.src = materials[i].content;
            thumbnail.className = 'thumbnail';
            thumbnail.alt = \`Slide \${i + 1}\`;
            thumbnail.onclick = () => displaySlide(i);
            
            if (i === currentIndex) {
              thumbnail.classList.add('active');
            }
            
            container.appendChild(thumbnail);
          }
          
          if (materials.length > 20) {
            const moreText = document.createElement('div');
            moreText.textContent = \`+ \${materials.length - 20} more slides\`;
            moreText.style.gridColumn = '1 / -1';
            moreText.style.textAlign = 'center';
            moreText.style.padding = '10px';
            moreText.style.color = '#4a5568';
            container.appendChild(moreText);
          }
        }
        
        function updateThumbnailHighlight() {
          const thumbnails = document.querySelectorAll('.thumbnail');
          thumbnails.forEach((thumb, idx) => {
            if (idx === currentIndex) {
              thumb.classList.add('active');
            } else {
              thumb.classList.remove('active');
            }
          });
        }
        
        function updateProgress() {
          const progressElement = document.getElementById('progress');
          progressElement.textContent = \`Slide \${currentIndex + 1} of \${materials.length}\`;
        }
        
        function nextSlide() {
          if (currentIndex < materials.length - 1) {
            displaySlide(currentIndex + 1);
          }
        }
        
        function prevSlide() {
          if (currentIndex > 0) {
            displaySlide(currentIndex - 1);
          }
        }
        
        function goBack() {
          window.location.href = '/minimal-access.html';
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowRight') {
            nextSlide();
          } else if (e.key === 'ArrowLeft') {
            prevSlide();
          }
        });
      </script>
    </body>
    </html>
    `;
    
    res.setHeader('Content-Type', 'text/html');
    res.send(htmlContent);
  });
  
  console.log("Direct viewer routes registered successfully");
}