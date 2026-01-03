import { useState, useEffect } from 'react';
import { Counter } from './components/Counter';
import { BubbleEffect } from './components/BubbleEffect';
import { getCounterValue, subscribeToCounter } from './services/counter';

function App() {
  const [counterValue, setCounterValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [bubbleTrigger, setBubbleTrigger] = useState(0);

  useEffect(() => {
    let subscription: any;

    const initializeCounter = async () => {
      try {
        const initialValue = await getCounterValue();
        setCounterValue(initialValue);
        setIsLoading(false);

        subscription = subscribeToCounter((newValue) => {
          if (newValue !== counterValue) {
            setBubbleTrigger(prev => prev + 1);
          }
          setCounterValue(newValue);
        });
      } catch (error) {
        console.error('Failed to initialize counter:', error);
        setIsLoading(false);
      }
    };

    initializeCounter();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <BubbleEffect trigger={bubbleTrigger} />

      <div className="text-center">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-cyan-400 mb-2">
            Számláló
          </h1>
          <p className="text-cyan-300/70">
            Real-time frissítések Supabase-ből
          </p>
        </div>

        <div className="neon-circle flex items-center justify-center">
          <Counter value={counterValue} isLoading={isLoading} />
        </div>

        <div className="mt-12 text-cyan-400/60 text-sm">
          {isLoading ? 'Csatlakozás az adatbázishoz...' : 'Csatlakozva'}
        </div>
      </div>
    </div>
  );
}

export default App;
