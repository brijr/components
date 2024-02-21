"use client";

import * as Craft from "@/components/craft/layout";
import Placeholder from "@/public/placeholder.jpg";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Component Imports
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export default function Hero() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Craft.Section>
      <Craft.Container>
        <div className="not-prose flex items-center flex-col text-center gap-6">
          <Button asChild className="w-fit" size={"sm"} variant={"outline"}>
            <Link href="https://9d8.dev">
              Lorem ipsum dolor sit amet <ArrowRight className="ml-2 w-4" />
            </Link>
          </Button>
          <h1 className="text-primary-500 text-4xl md:text-6xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </h1>
          <h2 className="text-xl md:text-3xl font-light">
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 text-left"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="md:w-96"
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </form>
          </Form>
          <div className="my-8 h-96 w-full overflow-hidden border rounded-lg md:rounded-xl md:h-[480px]">
            <Image
              className="h-full w-full object-cover object-bottom"
              src={Placeholder}
              width={1920}
              height={1080}
              alt="hero image"
              placeholder="blur"
            />
          </div>
        </div>
      </Craft.Container>
    </Craft.Section>
  );
}
