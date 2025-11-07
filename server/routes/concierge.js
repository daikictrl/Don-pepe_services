import express from 'express';
import { supabaseAdmin, supabasePublic } from '../supabaseClient.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabasePublic
      .from('concierge_services')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=120');
    res.json(data || []);
  } catch (error) {
    console.error('Error fetching concierge services:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('concierge_services')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating concierge service:', error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('concierge_services')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Concierge service not found' });

    res.json(data);
  } catch (error) {
    console.error('Error updating concierge service:', error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { error } = await supabaseAdmin
      .from('concierge_services')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting concierge service:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
