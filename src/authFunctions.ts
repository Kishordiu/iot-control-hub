import { supabase } from './supabaseClient';

export async function handleRegister(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error('Registration error:', error.message);
    alert('Registration failed: ' + error.message);
  } else {
    console.log('Registration success:', data.user);
    alert('Registration successful! You can now log in.');
  }
}

export async function handleLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('Login error:', error.message);
    alert('Login failed: ' + error.message);
  } else {
    console.log('Login success:', data.user);
    alert('Login successful!');
    // Redirect to dashboard after login
    window.location.href = '/dashboard';
  }
}