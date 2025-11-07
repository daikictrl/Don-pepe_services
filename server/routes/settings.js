import express from 'express';
import { supabaseAdmin, supabasePublic } from '../supabaseClient.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabasePublic
      .from('site_settings')
      .select('*');

    if (error) throw error;

    const settings = {};
    data.forEach(setting => {
      settings[setting.key] = setting.value;
    });

    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=120');
    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:key', async (req, res) => {
  try {
    const { data, error } = await supabasePublic
      .from('site_settings')
      .select('*')
      .eq('key', req.params.key)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Setting not found' });

    res.set('Cache-Control', 'public, max-age=60');
    res.json(data.value);
  } catch (error) {
    console.error('Error fetching setting:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { key, value } = req.body;
    
    const { data, error } = await supabaseAdmin
      .from('site_settings')
      .upsert({ key, value }, { onConflict: 'key' })
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error saving setting:', error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:key', async (req, res) => {
  try {
    const { error } = await supabaseAdmin
      .from('site_settings')
      .delete()
      .eq('key', req.params.key);

    if (error) throw error;

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting setting:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
