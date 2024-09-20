  const {jwtAuthMiddleware} = require('../jwt')
  const express = require('express');
  const HealthRecord = require('./../models/healthRecord');

  const router = express.Router();

  // Create a new record
  router.post('/',jwtAuthMiddleware, async (req, res) => {
    try {
      const newRecord = new HealthRecord({
        ...req.body,
        userId: req.user.userData.id 
      });
      await newRecord.save();
      res.status(201).json(newRecord);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Get all records
  router.get('/',jwtAuthMiddleware, async (req, res) => {
    try {
      const userId = req.user.userData.id; 
      const records = await HealthRecord.find({ userId });
      res.json(records);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Get a specific record
  router.get('/:id',jwtAuthMiddleware, async (req, res) => {
    try {
      const userId = req.user.userData.id;
      const record = await HealthRecord.findOne({ _id: req.params.id, userId });
      if (!record) {
        return res.status(404).json({ error: 'Record not found' });
      }
      res.json(record);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Update record
  router.put('/:id',jwtAuthMiddleware, async (req, res) => {
    try {
      const userId = req.user.userData.id;
      const record = await HealthRecord.findOneAndUpdate(
        { _id: req.params.id, userId },
        req.body,
        { new: true }
      );
      if (!record) {
        return res.status(404).json({ error: 'Record not found' });
      }
      res.json(record);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Delete record
  router.delete('/:id',jwtAuthMiddleware, async (req, res) => {
    try {
      const userId = req.user.userData.id;
      const record = await HealthRecord.findOneAndDelete({ _id: req.params.id, userId });
  
      if (!record) {
        return res.status(404).json({ error: 'Record not found' });
      }
      res.json({ message: 'Record deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  module.exports = router;