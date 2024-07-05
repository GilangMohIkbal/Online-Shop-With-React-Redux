import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
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
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GuestPage } from "@/components/guard/GuestPage";

const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, "your username is under 3 character")
    .max(16, "your username is over 16 character"),
  password: z.string().min(8, "your password need to be 8 character or more"),
});
const LoginPage = () => {
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
    reValidateMode: "onSubmit",
  });

  const handleLogin = async (values) => {
    try {
      const userResponse = await axiosInstance.get("/users", {
        params: {
          username: values.username,
          password: values.password,
        },
      });
      if (
        !userResponse.data.length ||
        userResponse.data[0].password !== values.password
      ) {
        alert("Invalid credential");
        return;
      }
      alert("successfully log in as " + userResponse.data[0].username);
      dispatch({
        type: "USER_LOGIN",
        payload: {
          username: userResponse.data[0].username,
          id: userResponse.data[0].id,
          role: userResponse.data[0].role,
        },
      });
      localStorage.setItem("current-user", userResponse.data[0].id);
      form.reset();
      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  return (
    <GuestPage>
      <main className="px-4 container py-8 flex flex-col justify-center items-center max-w-screen-md h-[80vh]">
        <Form {...form}>
          <form
            className="w-full max-w-[540px]"
            onSubmit={form.handleSubmit(handleLogin)}
          >
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back!</CardTitle>
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

                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type={isChecked ? "text" : "password"}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-password"
                    onCheckedChange={(checked) => setIsChecked(checked)}
                  />

                  <Label htmlFor="show-password">Show Paswword</Label>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col space-y-4 w-full">
                  <Button type="submit">Login</Button>
                  <Link to="/register">
                    <Button variant="link" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </main>
    </GuestPage>
  );
};

export default LoginPage;
