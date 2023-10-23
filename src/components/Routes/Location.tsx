import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../Header';

import { LocationForm } from '../LocationForm';
import { Button } from '../ui/button';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { useEffect, useState } from 'react';
import { GetLocationByCode } from '@/api';

function Location() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token === null) {
      navigate('/');
    }

    const code = params.id;

    async function getLocationByCode(token, code) {
      setLoading(true);
      const { url, options } = GetLocationByCode(token, code);
      const response = await fetch(url, options);
      if (response.status === 400 || response.status === 500) return;

      const data = await response.json();
      setLocation(data);
      setLoading(false);
    }

    getLocationByCode(token, code);
  }, [navigate, params.id]);
  return (
    <>
      <Header />
      <main className="flex gap-4 w-full pt-8 max-w-[960px] m-auto">
        <section className="flex-1 fromLeft">
          <h2 className="text-2xl font-bold text-center mb-8 flex justify-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/home">
                    <Button variant="outline" size="icon">
                      <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Voltar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            Editar Localidade {params.id}
          </h2>
          <LocationForm location={location} />
        </section>
      </main>
    </>
  );
}

export default Location;
