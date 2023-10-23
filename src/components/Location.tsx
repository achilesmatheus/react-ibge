import React from 'react';
import { DrawingPinIcon, GlobeIcon, HomeIcon } from '@radix-ui/react-icons';
import { Card, CardContent } from './ui/card';
import { Link } from 'react-router-dom';

function Location({ link = '', location }) {
  return (
    <Link className="min-w-[290px]" to={'/location/' + link}>
      <Card className="cursor-pointer hover:scale-105 transition ease-in-out duration-200">
        <CardContent className="grid gap-1 pt-6">
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
            <DrawingPinIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Identificador</p>
              <p className="text-sm text-muted-foreground">{location.id}</p>
            </div>
          </div>
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
            <GlobeIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Estado</p>
              <p className="text-sm text-muted-foreground">{location.state}</p>
            </div>
          </div>
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
            <HomeIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Cidade</p>
              <p className="text-sm text-muted-foreground">{location.city}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default Location;
