import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GitHubLogoIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginUser, SignupUser } from '@/api';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const formSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  async function handleLogin(values: z.infer<typeof formSchema>) {
    const { url, options } = LoginUser(values);
    console.log(values);
    setLoading(true);
    try {
      const response = await fetch(url, options);
      const status = response.status;

      if (status === 400) {
        throw new Error(
          'Não foi possível realizar o login. Verifique se os dados estão corretos e tente novamente!'
        );
      }

      const json = await response.json();
      window.localStorage.setItem('token', json.data);

      navigate('/home');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup(values: z.infer<typeof formSchema>) {
    const { url, options } = SignupUser(values);
    console.log(values);
    setLoading(true);
    try {
      const response = await fetch(url, options);
      const status = response.status;

      if (status === 400) {
        throw new Error(
          'Não foi possível realizar o cadastro. Preencha todos os dados corretamente e tente novamente!!'
        );
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (token) navigate('/home');
  });

  return (
    <>
      <div className="h-screen grid place-content-center fromLeft">
        {message && (
          <Alert>
            <AlertTitle>Atenção!</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        <h1 className="text-3xl mb-4 text-center font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] hidden md:block">
          Desafio .Net
        </h1>
        <p className="text-base text-muted-foreground">
          Projeto de teste da Api Ibge desenvolvida para o desafio .Net - Balta
        </p>
        <section className="flex w-full justify-center space-x-4 pb-4 pt-4">
          <Button asChild>
            <a href="https://github.com/uitanmaciel/IbgeAPI">
              <GitHubLogoIcon className="mr-2" />
              Projeto
            </a>
          </Button>
          <Button variant={'outline'}>
            <a href="https://github.com/uitanmaciel/IbgeAPI/wiki/01.-Home">
              Documentação
            </a>
          </Button>
        </section>
        <div className="grid place-content-center">
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Login</TabsTrigger>
              <TabsTrigger value="password">Cadastro</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)}>
                  <Card>
                    <CardHeader className="space-y-1">
                      <CardTitle className="text-2xl">Fazer login</CardTitle>
                      <CardDescription>
                        Digite seu email e senha para entrar
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">
                            Dados
                          </span>
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                // type="email"
                                placeholder="exemplo@email.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      ></FormField>
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="****"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      ></FormField>
                    </CardContent>
                    <CardFooter>
                      <Button
                        disabled={loading}
                        type="submit"
                        className="w-full"
                      >
                        {loading ? (
                          <>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Carregando
                          </>
                        ) : (
                          'Entrar'
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="password">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSignup)}>
                  <Card>
                    <CardHeader className="space-y-1">
                      <CardTitle className="text-2xl">
                        Criar um cadastro
                      </CardTitle>
                      <CardDescription>
                        Digite seu email e senha para registrar-se
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">
                            Dados
                          </span>
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input placeholder="Nome" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      ></FormField>
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sobrenome</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="****"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      ></FormField>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="exemplo@email.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      ></FormField>
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="****"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      ></FormField>
                    </CardContent>
                    <CardFooter>
                      <Button
                        disabled={loading}
                        type="submit"
                        className="w-full"
                      >
                        {loading ? (
                          <>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Carregando
                          </>
                        ) : (
                          'Criar'
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};
