import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_FILE = path.join(__dirname, '../../campaigns.json');

/**
 * Ensures the campaigns.json file exists with initial dummy data
 */
function ensureDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    const dummyData = [
      {
        id: '1',
        name: 'Summer Sale 2025',
        budget: 50000,
        status: 'active',
        startDate: '2025-06-01',
        endDate: '2025-08-31',
        targetAudience: 'Young Adults',
        platform: 'Social Media',
        createdAt: new Date('2025-05-15').toISOString()
      },
      {
        id: '2',
        name: 'Holiday Special',
        budget: 75000,
        status: 'active',
        startDate: '2025-12-01',
        endDate: '2025-12-31',
        targetAudience: 'Families',
        platform: 'TV & Digital',
        createdAt: new Date('2025-11-01').toISOString()
      },
      {
        id: '3',
        name: 'Product Launch Campaign',
        budget: 100000,
        status: 'planned',
        startDate: '2026-01-15',
        endDate: '2026-03-15',
        targetAudience: 'Tech Enthusiasts',
        platform: 'Digital',
        createdAt: new Date('2025-12-01').toISOString()
      }
    ];
    fs.writeFileSync(DATA_FILE, JSON.stringify(dummyData, null, 2));
  }
}

/**
 * Retrieves all campaigns from the data file
 * @returns {Array} Array of campaign objects
 */
function getAllCampaigns() {
  ensureDataFile();
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

/**
 * Creates a new campaign and saves it to the data file
 * @param {Object} campaignData - Campaign data to create
 * @returns {Object} The newly created campaign
 */
function createCampaign(campaignData) {
  const campaigns = getAllCampaigns();
  
  const newCampaign = {
    id: Date.now().toString(),
    ...campaignData,
    budget: typeof campaignData.budget === 'string' 
      ? parseFloat(campaignData.budget) 
      : campaignData.budget,
    status: campaignData.status || 'planned',
    createdAt: new Date().toISOString()
  };

  campaigns.push(newCampaign);
  fs.writeFileSync(DATA_FILE, JSON.stringify(campaigns, null, 2));
  
  return newCampaign;
}

export { getAllCampaigns, createCampaign };

