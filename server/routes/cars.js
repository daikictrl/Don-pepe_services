import express from 'express';
import { supabaseAdmin, supabasePublic } from '../supabaseClient.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabasePublic
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=120');
    res.json(data || []);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabasePublic
      .from('cars')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Car not found' });

    res.set('Cache-Control', 'public, max-age=60');
    res.json(data);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('cars')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('cars')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Car not found' });

    res.json(data);
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { error } = await supabaseAdmin
      .from('cars')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
