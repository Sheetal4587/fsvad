import express from 'express';
import { deals } from '../data/deals.js';
import NodeCache from 'node-cache';

const router = express.Router();
const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

// Get all deals with pagination
router.get('/', (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const cacheKey = `deals_${page}_${limit}`;
        const cachedData = cache.get(cacheKey);
        
        if (cachedData) {
            return res.json(cachedData);
        }

        const paginatedDeals = deals.slice(startIndex, endIndex);
        const result = {
            data: paginatedDeals,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(deals.length / limit),
                totalItems: deals.length
            }
        };

        cache.set(cacheKey, result);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

// Get deal by ID
router.get('/:id', (req, res, next) => {
    try {
        const cacheKey = `deal_${req.params.id}`;
        const cachedDeal = cache.get(cacheKey);
        
        if (cachedDeal) {
            return res.json(cachedDeal);
        }

        const deal = deals.find(d => d.id === req.params.id);
        if (!deal) {
            const error = new Error('Deal not found');
            error.status = 404;
            throw error;
        }

        cache.set(cacheKey, deal);
        res.json(deal);
    } catch (error) {
        next(error);
    }
});

export default router;
