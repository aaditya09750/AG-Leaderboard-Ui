import { supabase } from '../lib/supabase';
import { User, PointHistory, ClaimResult } from '../types';

export const userService = {
  // Get all users ordered by total points
  async getUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('total_points', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Add a new user
  async addUser(name: string): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, total_points: 0 }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Claim points for a user
  async claimPoints(userId: string): Promise<ClaimResult> {
    // Generate random points between 1 and 10
    const points = Math.floor(Math.random() * 10) + 1;
    
    // Get current user data
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('total_points')
      .eq('id', userId)
      .single();
    
    if (userError) throw userError;
    
    const newTotal = user.total_points + points;
    
    // Update user's total points
    const { error: updateError } = await supabase
      .from('users')
      .update({ total_points: newTotal })
      .eq('id', userId);
    
    if (updateError) throw updateError;
    
    // Add to point history
    const { error: historyError } = await supabase
      .from('point_history')
      .insert([{ user_id: userId, points_awarded: points }]);
    
    if (historyError) throw historyError;
    
    return { points, newTotal };
  },

  // Get point history
  async getPointHistory(): Promise<PointHistory[]> {
    const { data, error } = await supabase
      .from('point_history')
      .select(`
        *,
        users (name)
      `)
      .order('created_at', { ascending: false })
      .limit(20);
    
    if (error) throw error;
    return data || [];
  },

  // Delete a user
  async deleteUser(userId: string): Promise<void> {
    // First delete all point history for this user
    await supabase
      .from('point_history')
      .delete()
      .eq('user_id', userId);
    
    // Then delete the user
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);
    
    if (error) throw error;
  }
};