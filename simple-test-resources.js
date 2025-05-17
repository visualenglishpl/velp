/**
 * Simple Test Resources Server
 * 
 * A simplified Express server that just displays PDF resources to test
 * our unit-based organization approach.
 */

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5001;

// Enable JSON body parsing
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Sample unit titles
const unitTitles = {
  '1': 'Hello',
  '2': 'My School',
  '3': 'Food',
  '4': 'My House',
  '5': 'Pets and Animals',
  '6': 'My Favourite Colour'
};

// Simulated resource creation function (simplified version of what we use in the app)
function createPdfResource(unitId, id, title, description, pdfUrl) {
  return {
    id: `book1-unit${unitId}-${id}`,
    bookId: '1',
    unitId,
    resourceType: 'pdf',
    title,
    description,
    provider: 'Visual English',
    sourceUrl: pdfUrl,
    content: {
      type: 'pdf',
      embedUrl: pdfUrl
    },
    fileUrl: pdfUrl
  };
}

// Generate PDF resources for units 1-6 as a test
function getTestPdfResources() {
  return Array.from({ length: 6 }, (_, i) => {
    const unit = (i + 1).toString();
    const unitPrefix = '00 A';
    const unitTitle = unitTitles[unit] || `Unit ${unit}`;
    
    const pdfUrl = `https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit${unit}/${unitPrefix} Visual English 1 – Unit ${unit} – New Version.pdf`;
    
    return createPdfResource(
      unit, 
      'main-pdf',
      `Unit ${unit}: ${unitTitle} - PDF`,
      `Visual English Book 1 - Unit ${unit} PDF`,
      pdfUrl
    );
  });
}

// Create a map of unit IDs to PDF resources for easier lookup
function createPdfResourcesByUnit(resources) {
  return resources.reduce((acc, resource) => {
    if (resource.unitId) {
      if (!acc[resource.unitId]) {
        acc[resource.unitId] = [];
      }
      acc[resource.unitId].push(resource);
    }
    return acc;
  }, {});
}

// Generate PDF resources
const pdfResources = getTestPdfResources();
const pdfResourcesByUnit = createPdfResourcesByUnit(pdfResources);

// API endpoint to get all PDF resources
app.get('/api/pdf-resources', (req, res) => {
  res.json(pdfResources);
});

// API endpoint to get PDF resources by unit
app.get('/api/pdf-resources/:unitId', (req, res) => {
  const { unitId } = req.params;
  const resources = pdfResourcesByUnit[unitId] || [];
  res.json(resources);
});

// Create a simple HTML page to display the PDF resources
const htmlPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PDF Resources by Unit</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
    h1 { color: #333; }
    .unit-container { margin-bottom: 30px; }
    .unit-title { font-size: 1.2rem; background: #f3f4f6; padding: 10px; border-radius: 6px; }
    .resources-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px; margin-top: 16px; }
    .resource-card { border: 1px solid #ddd; border-radius: 8px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; }
    .resource-card:hover { transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .resource-header { background: linear-gradient(to right, #3b82f6, #1d4ed8); color: white; padding: 10px; font-size: 0.8rem; }
    .resource-content { padding: 10px; background: white; }
    .resource-title { font-weight: 500; font-size: 0.9rem; margin-bottom: 5px; }
    .resource-desc { font-size: 0.8rem; color: #666; margin-bottom: 10px; }
    .resource-link { display: inline-block; padding: 6px 12px; background: #f3f4f6; color: #333; text-decoration: none; border-radius: 4px; font-size: 0.8rem; }
    .resource-link:hover { background: #e5e7eb; }
  </style>
</head>
<body>
  <h1>PDF Resources by Unit</h1>
  <div id="units-container"></div>

  <script>
    // Fetch and display resources by unit
    async function fetchResources() {
      try {
        const response = await fetch('/api/pdf-resources');
        const resources = await response.json();
        
        // Group resources by unit
        const resourcesByUnit = {};
        resources.forEach(resource => {
          if (!resourcesByUnit[resource.unitId]) {
            resourcesByUnit[resource.unitId] = [];
          }
          resourcesByUnit[resource.unitId].push(resource);
        });
        
        // Display resources by unit
        const container = document.getElementById('units-container');
        
        Object.keys(resourcesByUnit).sort().forEach(unitId => {
          const unitResources = resourcesByUnit[unitId];
          
          // Create unit container
          const unitContainer = document.createElement('div');
          unitContainer.className = 'unit-container';
          
          // Create unit title
          const unitTitle = document.createElement('h2');
          unitTitle.className = 'unit-title';
          unitTitle.textContent = \`Unit \${unitId}: \${unitResources[0].title.split(':')[1].split('-')[0].trim()}\`;
          unitContainer.appendChild(unitTitle);
          
          // Create resources grid
          const resourcesGrid = document.createElement('div');
          resourcesGrid.className = 'resources-grid';
          
          // Add resources
          unitResources.forEach(resource => {
            const card = document.createElement('div');
            card.className = 'resource-card';
            
            const header = document.createElement('div');
            header.className = 'resource-header';
            header.textContent = 'PDF';
            
            const content = document.createElement('div');
            content.className = 'resource-content';
            
            const title = document.createElement('div');
            title.className = 'resource-title';
            title.textContent = resource.title;
            
            const desc = document.createElement('div');
            desc.className = 'resource-desc';
            desc.textContent = resource.description;
            
            const link = document.createElement('a');
            link.className = 'resource-link';
            link.href = resource.sourceUrl;
            link.target = '_blank';
            link.textContent = 'Open PDF';
            
            content.appendChild(title);
            content.appendChild(desc);
            content.appendChild(link);
            
            card.appendChild(header);
            card.appendChild(content);
            
            resourcesGrid.appendChild(card);
          });
          
          unitContainer.appendChild(resourcesGrid);
          container.appendChild(unitContainer);
        });
      } catch (error) {
        console.error('Error fetching resources:', error);
        document.getElementById('units-container').innerHTML = '<p>Error loading resources. Please try again.</p>';
      }
    }
    
    // Load resources when the page loads
    window.addEventListener('DOMContentLoaded', fetchResources);
  </script>
</body>
</html>
`;

// Route to serve the HTML page
app.get('/', (req, res) => {
  res.send(htmlPage);
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`PDF Resources Test Server running at http://0.0.0.0:${port}`);
});