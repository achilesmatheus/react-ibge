import { Input } from './ui/input';
import FilterButton from './FilterButton';
import { Button } from './ui/button';
import { PlusIcon, ReloadIcon } from '@radix-ui/react-icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { CreateLocation } from '@/api';
import { useToast } from './ui/use-toast';

function FilterBar({ code, setCode, setLocation }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const formSchema = z.object({
    state: z.string(),
    city: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      state: '',
      city: '',
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const token = window.localStorage.getItem('token');
    const { url, options } = CreateLocation(values, token);

    setLoading(true);
    try {
      const response = await fetch(url, options);
      const status = response.status;

      if (status === 400 || status === 500) {
        throw new Error(
          'Não foi possível realizar cadastrar uma nova localidade. Verifique se os dados estão corretos e tente novamente!'
        );
      }

      toast({
        title: 'Sucesso',
        description: 'Localidade Criada com sucesso!',
      });
    } catch (err) {
      toast({
        title: 'Sucesso',
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex justify-between px-4">
        <div className="flex gap-4">
          <Input
            value={code}
            onChange={({ target }) => {
              setCode(target.value);
            }}
            placeholder="Pesquisa por Código"
          />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-1">
              <PlusIcon />
              Criar Localidade
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <DialogHeader>
                  <DialogTitle>Adicionar Localidade</DialogTitle>
                  <DialogDescription>
                    Insira a abreviação do Estado e o nome da Cidade para criar
                    uma nova localidade
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <Input placeholder="MG" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input placeholder="Sete Lagoas" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                </div>

                <DialogFooter className="mt-4">
                  <Button disabled={loading} type="submit" className="w-full">
                    {loading ? (
                      <>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Carregando
                      </>
                    ) : (
                      'Salvar'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default FilterBar;
