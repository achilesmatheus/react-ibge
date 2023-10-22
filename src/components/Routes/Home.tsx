import { LocationsGrid } from '../LocationsGrid';
import FilterBar from '../FilterBar';
import Header from '../Header';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (!token) navigate('/');
  }, [navigate]);
  return (
    <>
      <div className="h-screen">
        {/* Header */}
        <Header />
        <main className="flex gap-4 w-full pt-8 max-w-[960px] m-auto">
          <section className="flex-1 fromLeft">
            <h2 className="text-2xl font-bold text-center mb-8">
              Lista de Localidades
            </h2>

            <FilterBar />
            <LocationsGrid />
          </section>
        </main>
      </div>
    </>
  );
}

export default Home;
