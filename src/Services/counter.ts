import { supabase } from './supabase';

export interface CounterData {
  value: number;
}

export async function getCounterValue(): Promise<number> {
  const { data, error } = await supabase
    .from('counter')
    .select('value')
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching counter:', error);
    return 0;
  }

  return data?.value || 0;
}

export function subscribeToCounter(
  callback: (value: number) => void
) {
  const subscription = supabase
    .from('counter')
    .on('*', (payload) => {
      if (payload.new) {
        callback(payload.new.value);
      }
    })
    .subscribe();

  return subscription;
}
