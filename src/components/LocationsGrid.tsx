import { useCallback, useEffect, useState } from 'react';
import Location from './Location';
import { ScrollArea } from './ui/scroll-area';
import { GetLocations } from '@/api';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';

export function LocationsGrid({ location }) {
  const [locations, setLocations] = useState([]);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(15);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function loadMore() {
    setSkip((old) => old + 1);
    setDisabled(false);
  }

  function loadLess() {
    setSkip((old) => old - 1);
  }

  useEffect(() => {
    async function getLocations(skip, take) {
      const token = window.localStorage.getItem('token');
      if (token === null) {
        navigate('/');
      }

      setLoading(true);
      const { url, options } = GetLocations(token, skip, take);
      const response = await fetch(url, options);
      if (response.status === 400 || response.status === 500) return;

      const data = await response.json();
      setLocations(data);
      setLoading(false);
    }
    getLocations(skip, take);
    if (skip === 0) {
      setDisabled(true);
      return;
    }
  }, [skip, take, navigate]);

  console.log(locations);
  return (
    <>
      <ScrollArea className="h-[550px] w-full mt-8 border-b-2">
        <div className="flex justify-between gap-y-4 flex-wrap p-4">
          {location && location?.state !== null ? (
            <>
              <Location
                key={location.id}
                location={location}
                link={`${location.id}`}
              />
            </>
          ) : (
            <>
              {locations.map((location) => (
                <Location
                  key={location.id}
                  location={location}
                  link={`${location.id}`}
                />
              ))}
            </>
          )}
        </div>
      </ScrollArea>
      <div className="mt-20 w-fit mx-auto flex gap-2 mb-8">
        <Button disabled={disabled} onClick={loadLess} variant={'outline'}>
          <ChevronLeftIcon />
          Página anterior
        </Button>
        <Button onClick={loadMore} variant={'outline'}>
          Próxima página
          <ChevronRightIcon />
        </Button>
      </div>
    </>
  );
}
