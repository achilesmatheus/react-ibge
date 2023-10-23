import { LocationsGrid } from '../LocationsGrid';
import FilterBar from '../FilterBar';
import Header from '../Header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetLocationByCode } from '@/api';

function Home() {
  const navigate = useNavigate();
  const [state, setState] = useState(null);
  const [code, setCode] = useState();

  if (Array.isArray(state)) {
    setState(null);
  }

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) navigate('/');

    const { url, options } = GetLocationByCode(token, code);
    async function getByCode() {
      const response = await fetch(url, options);
      if (response.status === 400 || response.status === 500) {
        return;
      }

      const json = await response.json();
      setState(json);
    }

    getByCode();
  }, [navigate, code]);

  return (
    <>
      <div className="h-screen">
        {/* Header */}
        <Header />
        <main className="flex gap-4 w-full pt-8 max-w-[960px] m-auto">
          <section className="flex-1 fromLeft">
            <h2 className="text-4xl font-bold text-center mb-8">
              Lista de Localidades
            </h2>

            <FilterBar code={code} setCode={setCode} setLocation={setState} />
            <LocationsGrid location={state} />
          </section>
        </main>
      </div>
    </>
  );
}

export default Home;
