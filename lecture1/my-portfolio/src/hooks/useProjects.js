import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const useProjects = ({ limit } = {}) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let query = supabase
          .from('projects')
          .select('*')
          .eq('is_published', true)
          .order('sort_order', { ascending: true });

        if (limit) query = query.limit(limit);

        const { data, error: queryError } = await query;
        if (queryError) throw queryError;
        setProjects(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [limit]);

  return { projects, loading, error };
};

export default useProjects;
