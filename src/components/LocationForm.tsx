import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Input } from './ui/input';
import { DrawingPinIcon, GlobeIcon, HomeIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { AlertDialogHeader, AlertDialogFooter } from './ui/alert-dialog';

export function LocationForm() {
  return (
    <Card className="max-w-xl m-auto">
      <CardHeader>
        <CardTitle>Você está editando a localidade - </CardTitle>
        <CardDescription>
          Insira o Estado e a Cidade para editar
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between gap-6">
          <div className="min-w-fit flex gap-2">
            <DrawingPinIcon />
            <p className="text-sm font-medium leading-none">Identificador</p>
          </div>
          <p className="font-semibold">10001</p>
        </div>
        <div className="flex items-center justify-between gap-6">
          <div className="min-w-fit flex gap-2">
            <GlobeIcon />
            <p className="text-sm  font-medium leading-none">Estado</p>
          </div>
          <Input />
        </div>
        <div className="flex items-center justify-between gap-6">
          <div className="min-w-fit flex gap-2">
            <HomeIcon />
            <p className="text-sm  font-medium leading-none">Cidade</p>
          </div>
          <Input />
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button>Salvar</Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Excluir</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Excluir</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
