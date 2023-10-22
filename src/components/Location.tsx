import React from 'react';
import { DrawingPinIcon, GlobeIcon, HomeIcon } from '@radix-ui/react-icons';
import { Card, CardContent } from './ui/card';
import { Link } from 'react-router-dom';

function Location({ link = '' }) {
  return (
    <Link to={'/location/' + link}>
      <Card className="cursor-pointer hover:scale-105 transition ease-in-out duration-200">
        <CardContent className="grid gap-1 pt-6">
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <DrawingPinIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Identificador</p>
              <p className="text-sm text-muted-foreground">
                Email digest, mentions & all activity.
              </p>
            </div>
          </div>
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <GlobeIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Estado</p>
              <p className="text-sm text-muted-foreground">
                Only mentions and comments.
              </p>
            </div>
          </div>
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <HomeIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Cidade</p>
              <p className="text-sm text-muted-foreground">
                Turn off all notifications.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default Location;
