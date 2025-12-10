import express from 'express';
import { getAllCampaigns, createCampaign } from '../models/campaigns.js';

const router = express.Router();

/**
 * GET /campaigns
 * Returns all campaigns
 */
router.get('/', (req, res, next) => {
  try {
    const campaigns = getAllCampaigns();
    res.json({
      success: true,
      data: campaigns
    });
  } catch (error) {
    next({
      status: 500,
      message: 'Failed to fetch campaigns'
    });
  }
});

/**
 * POST /campaigns
 * Creates a new campaign
 */
router.post('/', (req, res, next) => {
  try {
    const campaignData = req.body;
    
    // Validation
    const errors = {};
    
    if (!campaignData.name || campaignData.name.trim() === '') {
      errors.name = 'Campaign name is required';
    }
    
    if (!campaignData.budget) {
      errors.budget = 'Budget is required';
    } else if (typeof campaignData.budget === 'number' && campaignData.budget <= 0) {
      errors.budget = 'Budget must be a positive number';
    } else if (typeof campaignData.budget === 'string') {
      const budgetNum = parseFloat(campaignData.budget);
      if (isNaN(budgetNum) || budgetNum <= 0) {
        errors.budget = 'Budget must be a valid positive number';
      }
    }
    
    if (Object.keys(errors).length > 0) {
      return next({
        status: 400,
        message: 'Validation failed',
        errors: errors
      });
    }
    
    // Create campaign
    const newCampaign = createCampaign(campaignData);
    
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Campaign created successfully',
      data: newCampaign
    });
  } catch (error) {
    next({
      status: 500,
      message: 'Failed to create campaign'
    });
  }
});

export default router;

