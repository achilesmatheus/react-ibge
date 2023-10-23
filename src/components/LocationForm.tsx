import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Input } from './ui/input';
import {
  Cross2Icon,
  DrawingPinIcon,
  GlobeIcon,
  HomeIcon,
} from '@radix-ui/react-icons';
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { UpdateLocation, DeleteLocation } from '@/api';
import { useNavigate } from 'react-router-dom';
import { toast } from './ui/use-toast';

export function LocationForm({ location }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const formSchema = z.object({
    id: z.number().min(1, { message: 'O campo id não pode ficar me branco' }),
    state: z
      .string()
      .min(1, { message: 'O campo Estado não pode ficar em branco' }),
    city: z
      .string()
      .min(1, { message: 'O campo Cidade não pode ficar em branco' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      state: '',
      city: '',
    },
  });

  async function handleUpdate(values: z.infer<typeof formSchema>) {
    const token = localStorage.getItem('token');
    const { url, options } = UpdateLocation(values, token);
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch(url, options);
      const status = response.status;

      if (status === 400 || status === 500) {
        throw new Error(
          'Não foi possível atualizar a localidade. Verifique se os dados estão corretos e tente novamente!'
        );
      }

      toast({
        title: 'Atualização de Localidade',
        description: 'Localidade atualizada com sucesso',
      });
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(values: z.infer<typeof formSchema>) {
    const token = localStorage.getItem('token');
    const { url, options } = DeleteLocation(values.id, token);
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch(url, options);
      const status = response.status;

      if (status === 400 || status === 500) {
        throw new Error(
          'Não foi possível excluir a localidade. Verifique se os dados estão corretos e tente novamente!'
        );
      }

      navigate('/home');
      toast({
        title: 'Remoção de Localidade',
        description: 'Localidade removida com sucesso',
      });
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    form.setValue('id', location.id);
    form.setValue('state', location.state);
    form.setValue('city', location.city);
  }, [form, location.state, location.city, location.id]);
  return (
    <Card className="max-w-xl m-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Você está editando a localidade - {location.city}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <Cross2Icon />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmação de exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir esta localidade?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleDelete)}>
                    <div className="flex gap-2">
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction type="submit">
                        Excluir
                      </AlertDialogAction>
                    </div>
                  </form>
                </Form>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardTitle>
        <CardDescription>
          Insira o Estado e a Cidade para editar
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdate)}>
          <CardContent className="grid gap-6">
            <div className="flex items-center justify-between gap-6">
              <div className="min-w-fit flex gap-2">
                <DrawingPinIcon />
                <p className="text-sm font-medium leading-none">
                  Identificador
                </p>
              </div>
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-between gap-6">
              <div className="min-w-fit flex gap-2">
                <GlobeIcon />
                <p className="text-sm  font-medium leading-none">Estado</p>
              </div>
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-between gap-6">
              <div className="min-w-fit flex gap-2">
                <HomeIcon />
                <p className="text-sm  font-medium leading-none">Cidade</p>
              </div>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Salvar</Button>
          </CardContent>
        </form>
      </Form>
      <CardFooter className="justify-end gap-2"></CardFooter>
    </Card>
  );
}
