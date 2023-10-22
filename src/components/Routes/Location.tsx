import { Link, useParams } from 'react-router-dom';
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

function Location() {
  const params = useParams();
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
          <LocationForm />
        </section>
      </main>
    </>
  );
}

export default Location;
