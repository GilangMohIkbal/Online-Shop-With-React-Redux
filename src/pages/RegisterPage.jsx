import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import {
  Form,
  FormItem,
  FormMessage,
  FormLabel,
  FormField,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/lib/axios";
import { GuestPage } from "@/components/guard/GuestPage";
import { useNavigate } from "react-router-dom";

const registerFormSchema = z
  .object({
    username: z
      .string()
      .min(3, "your username is under 3 character")
      .max(16, "your username is over 16 character"),
    password: z.string().min(8, "your password need to be 8 character or more"),
    repeatPassword: z
      .string()
      .min(8, "your password need to be 8 character or more"),
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword) {
      ctx.addIssue({
        code: "custom",
        message: "password do not match",
        path: ["repeatPassword"],
      });
    }
  });
const RegisterPage = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      repeatPassword: "",
    },
    resolver: zodResolver(registerFormSchema),
    reValidateMode: "onSubmit",
  });

  const handleRegister = async (values) => {
    const userResponse = await axiosInstance.get("/users", {
      params: {
        username: values.username,
      },
    });
    if (userResponse.data.length) {
      alert("username alredy taken");
      return;
    }
    try {
      await axiosInstance.post("/users", {
        username: values.username,
        password: values.password,
        role: "user",
      });
      alert(`user registered`);
      form.reset();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GuestPage>
      <main className="px-4 container py-8 flex flex-col justify-center items-center max-w-screen-md h-[80vh]">
        <Form {...form}>
          <form
            className="w-full max-w-[540px]"
            onSubmit={form.handleSubmit(handleRegister)}
          >
            <Card>
              <CardHeader>
                <CardTitle>Create an account!</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 ">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Username has to be between 3 and 16 character
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormDescription>
                        password has to be 8 character or more
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="repeatPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Repeat Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormDescription>
                        Make sure your password match
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <div className="flex flex-col space-y-4 w-full">
                  <Button type="submit">Register</Button>
                  <Button variant="link" className="w-full">
                    Log in instead
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </main>
    </GuestPage>
  );
};

export default RegisterPage;
